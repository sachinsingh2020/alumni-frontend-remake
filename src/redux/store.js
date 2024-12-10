import { configureStore } from '@reduxjs/toolkit';
// import { userReducer } from './reducers/userReducer';
import { alumniReducer } from './reducers/alumniReducer';

const store = configureStore({
    reducer: {
        // user: userReducer,
        alumni: alumniReducer,
    }
})

export default store

// export const server = 'https://prime-grukul-assignment.vercel.app/api/v1';
export const server = 'http://localhost:4000/api/v1';

// sachin 
