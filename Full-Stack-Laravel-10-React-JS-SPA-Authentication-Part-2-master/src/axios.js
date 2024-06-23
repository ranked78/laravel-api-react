import Axios from 'axios';
import {apiURL} from './config/config'

const axios = Axios.create({
	baseURL: apiURL,
	withCredentials: true,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json",
	},
});

export default axios;
