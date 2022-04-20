import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import gifReducer from './reducer/gifReducer'

export const store = configureStore({
    reducer: {
        gifs: gifReducer,
    },
})

setupListeners(store.dispatch)




