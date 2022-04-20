import { GET_GIF, GIF_ERROR } from '../types'

const initialState = {
    gifs: [],
    fetching: true
}

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_GIF:
            return {
                ...state,
                gifs: action.payload,
                fetching: false
            }
        case GIF_ERROR:
            return {
                ...state,
                gifs: action.payload,
                fetching: false
            }
        default: return state
    }

}