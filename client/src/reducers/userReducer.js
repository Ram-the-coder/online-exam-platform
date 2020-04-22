import actions from '../actions';

export const userReducer = (state = {authStatus: false, showLogin: true}, action) => {
	switch(action.type) {

		case actions.AUTHSTATE:
			return {...state, authStatus: action.data};

		case actions.LOGIN:
			return {...state, faculty: action.data, authStatus: true};

		case actions.TOGGLEFORM:
			return {...state, showLogin: !state.showLogin };

		case actions.SETDASHBOARD:
			return {...state, faculty: action.data};

		case actions.LOGOUT:
			return {...state, faculty: undefined, authStatus: false};

		default: return state;
	}
}