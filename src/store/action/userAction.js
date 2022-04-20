import { GET_GIF, GIF_ERROR } from '../types'
import axios from 'axios'


const api = axios.create({
    baseURL: process.env.GIF_API_URL || "https://api.giphy.com/v1/gifs"
});
export const trendingGifs = (limit) => async dispatch => {
    console.log("Getting gifs from demo api", limit);
    try {
        const gifResponse = await api.get(`/trending`,
            {
                params: {
                    api_key: "EW6FR9fdQ2soYn8NoFZgPUk7AEQGZSXn",
                    limit: limit,
                    rating: "g"
                }
            })
        dispatch({
            type: GET_GIF,
            payload: gifResponse.data
        })
        return true;
    }
    catch (e) {
        dispatch({
            type: GIF_ERROR,
            payload: console.log(e),
        })
    }
}
export const searchGifs = (query, limit) => async dispatch => {
    // console.log("Searching gifs from demo api", query, limit);
    try {
        const gifResponse = await api.get(`/search`,
            {
                params: {
                    api_key: "EW6FR9fdQ2soYn8NoFZgPUk7AEQGZSXn",
                    limit: limit,
                    rating: "g",
                    q: query,
                    lang: "en"
                }
            })
        // console.log(gifResponse);
        dispatch({
            type: GET_GIF,
            payload: gifResponse.data
        })
        return true;
    }
    catch (e) {
        dispatch({
            type: GIF_ERROR,
            payload: console.log(e),
        })
    }
}
