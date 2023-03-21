import { Task } from "@/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = [...action.payload];
    },
    pushTask(state, action: PayloadAction<Task>) {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTask(state, action: PayloadAction<Task>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
  },
});

export const taskActions = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
