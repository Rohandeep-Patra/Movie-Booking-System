import { axiosInstance } from './api.js';

// add a new movie
export const addMovie = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/movies/addMovies',payload)
        return response.data
    } catch (error) {
        return error.response
    }
}


//get all movies
export const getAllMovies = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/movies/getAllMovies',payload)
        return response.data
    } catch (error) {
        return error.response
    }
}