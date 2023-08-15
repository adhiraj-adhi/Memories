import axios from 'axios';

const baseURL = 'http://localhost:3001';

/** AUTH RELATED CALLS */
// 1) register user

export const createUser = (data)  => axios.post(`${baseURL}/signup`, data);

// 2) login user