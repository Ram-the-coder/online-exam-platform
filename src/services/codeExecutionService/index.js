const Docker = require('dockerode');
const fs = require('fs');
const stream = require('stream');

const docker = new Docker({
	host: process.env.DOCKER_IP,
	port: process.env.DOCKER_PORT,
	ca: fs.readFileSync(process.env.DOCKER_BASE_PATH + 'ca.pem'),
	cert: fs.readFileSync(process.env.DOCKER_BASE_PATH + 'cert.pem'),
	key: fs.readFileSync(process.env.DOCKER_BASE_PATH + 'key.pem'),

});

function containerLogs(container) {
  // create a single stream for stdin and stdout
  var logStream = new stream.PassThrough();
  logStream.on('data', function(chunk){
    console.log(chunk.toString('utf8'));
  });

  container.logs({
    follow: true,
    stdout: true,
    stderr: true
  }, function(err, stream){
  	let destroyTimer;
    if(err) {
      return logger.error(err.message);
    }
    container.modem.demuxStream(stream, logStream, logStream);
    stream.on('end', function(){
      logStream.end('!stop!');
      clearTimeout(destroyTimer);
      stream.destroy();
      container.stop().then(data => container.remove()).then(data => {console.log("Container removed"); stream.destroy();}).catch(err => console.log(err));
    });

    destroyTimer = setTimeout(function() {
      console.log("TLE");
      container.stop().then(data => container.remove()).then(data => {console.log("Container removed"); stream.destroy();}).catch(err => console.log(err));
    }, 5000);
  });
}



function executeCode(code, language) {
  let auxContainer;
  console.log("dirname: " + __dirname);
  docker.createContainer({
    Image: 'crun-image',
    Volumes: {
      '/home/files': {}
    },
    Binds: [ process.env.DOCKER_SHARE_FOLDER + ':/home/files']
  }).then(container => {
    console.log("Container created");
    auxContainer = container;
    return auxContainer.start();
  }).then( data => {
    console.log("Container started");
    containerLogs(auxContainer);
  }).catch(err => console.log(err));
}

module.exports = {executeCode};