import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import Layout from "./Layout.jsx";
import store from "./redux/store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import AllTasks from "./pages/AllTasks.jsx";
import AddTask from "./pages/AddTask.jsx";
import UpdateTask from "./pages/UpdateTask.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<AllTasks />} />
      <Route path="add" element={<AddTask />} />
      <Route path="update/:taskId" element={<UpdateTask />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
