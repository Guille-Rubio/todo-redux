import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
};

const taskListSlice = createSlice({
    name: 'tasklist',
    initialState,
    reducers: {
        setInitialTaskList: (state, action) => {
            const initialTasks = action.payload;
            return { ...state, tasks: [...state.tasks, initialTasks] }
        },
        addNewTask: (state, action) => {
            const newTask = {
                date: new Date().toJSON(),
                title: action.payload.title,
                id: action.payload.id,
                completed: false,
                position: state.tasks.length + 1,
                email: action.payload.email
            };

            return { ...state, tasks: [...state.tasks, newTask] }
        },
        addManyTasks: (state, action) => {
            const addedTasks = action.payload;
            return { ...state, tasks: [...state.tasks, ...addedTasks] };
        },
        editTask: (state, action) => {
            const { index, updatedTask } = action.payload;
            return {
                ...state, tasks:
                    [...state.tasks.slice(0, index),
                    { ...state.tasks[index], title: updatedTask },
                    ...state.tasks.slice(index + 1, state.tasks.length)
                    ]
            }
        },
        deleteTask: (state, action) => {
            console.log(action.payload)
            return {
                ...state, tasks:
                    state.tasks.filter((element) => element.id !== action.payload)
            }
        },
        deleteAllTasks: (state) => {
            return { ...state, tasks: [] }
        },
        toggleTaskCompleted: (state, action) => {
            const { status, index } = action.payload;
            return {
                ...state, tasks:
                    [...state.tasks.slice(0, index),
                    { ...state.tasks[index], completed: status },
                    ...state.tasks.slice(index + 1, state.tasks.length)
                    ]
            }
        },

    }
});

export const { addNewTask, addManyTasks, editTask, deleteTask, deleteAllTasks, toggleTaskCompleted, setInitialTaskList } = taskListSlice.actions;
export default taskListSlice.reducer;