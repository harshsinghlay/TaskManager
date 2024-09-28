import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks : []
}

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {

    setTasks: (state, action) => {
      state.tasks = action.payload;
    },

    addTask: (state, action) => {
      const task = {
        id: nanoid(),
        ...action.payload,
      };
      state.tasks.push(task);
      state.tasks = sortTasks(state.tasks);
    },

    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id !== action.payload.id ? task : { ...action.payload }
      );
      state.tasks = sortTasks(state.tasks);
    },

  },
});

const sortTasks = (tasks) => {
  return tasks.sort((a, b) => {
    // Sort by due date 
    const dateA = new Date(a.end);
    const dateB = new Date(b.end);

    // If due dates are different, sort by date
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }

    // If due dates are the same, sort by priority
    const priorityOrder = { high: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

export const { setTasks, addTask, removeTask, updateTask } = taskSlice.actions;
export default taskSlice.reducer;
