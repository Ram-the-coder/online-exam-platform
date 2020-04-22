import actions from '../index'; 
import axios from 'axios';

export const authStateRefresh = () => dispatch => {
  const token = localStorage.getItem('token')
  if (token === null || token === undefined) {
    dispatch({
      type: actions.AUTHSTATE,
      data: false
    })
  }
  else {
    dispatch({
      type: actions.AUTHSTATE,
      data: true
    })
  }
}

export const loginThunk = (email, password) => async dispatch => {
  console.log(process.env);
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/faculty/login`, {email, password});
        console.log(res);
        if(res.data.err)
            console.log(res.data.err);
        
        localStorage.setItem('token', res.data.token);
        dispatch({
            type: actions.LOGIN,
            data: res.data
        });

    } catch(err) {
        console.log(err);
    }

}

export const signupThunk = (email, password, name) => async dispatch => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/faculty/signup`, {email, password, name});
        console.log(res);
        await toggleForm();
    } catch(err) {
        console.log(err);
    }
}

export const toggleForm = () => dispatch => {
    dispatch({
        type: actions.TOGGLEFORM
    })
}

export const getDashboardThunk = () => async dispatch => {
	try {
		const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/faculty/dashboard`, {
			headers: {
				'auth-token': localStorage.getItem('token')
			}
		});

		console.log(res);

		dispatch({
			type: actions.SETDASHBOARD,
			data: res.data.faculty
		});

	} catch(err) {
		console.log(err);
	}
}

export const logoutThunk = () => async dispatch => {
  localStorage.removeItem('token');
  dispatch({
    type: actions.LOGOUT
  })
}