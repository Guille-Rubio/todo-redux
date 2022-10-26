import { configureStore } from '@reduxjs/toolkit';
import taskListSlice from './slices/taskListSlice';
import userSlice from './slices/userSlice';


export const store = configureStore({
    reducer:{
        taskList:taskListSlice,
        user:userSlice
    }
}) 



