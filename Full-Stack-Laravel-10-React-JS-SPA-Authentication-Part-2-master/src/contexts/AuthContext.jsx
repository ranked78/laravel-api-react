import { createContext, useContext, useState } from 'react';
import axios from '../axios';

const AuthContent = createContext({
	user: null,
	setUser: () => {},
	csrfToken: () => {},
});

export const AuthProvider = ({ children }) => {
	const userLog = localStorage.getItem("user"); //set key login
	const [user, _setUser] = useState(
	JSON.parse(localStorage.getItem('user')) || null
	);

	// set user to local storage
const setUser = (user) => {
	//if key log has => set user = object
	if(userLog){
	user = JSON.parse(userLog);
	}
	if (user) {
	localStorage.setItem('user', JSON.stringify(user));
	} else {
	localStorage.removeItem('user');
	}
	_setUser(user);
	};

	// csrf token generation for guest methods
const csrfToken = async () => {
	await axios.get('http://localhost:8000/sanctum/csrf-cookie');
	return true;
	};

	return (
		<AuthContent.Provider value={{ user, setUser, csrfToken }}>
			{children}
		</AuthContent.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContent);
};
