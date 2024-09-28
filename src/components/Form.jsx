import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask, updateTask } from "../redux/features/taskSlice";

const Form = ({ task = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      desc: "",
      start: "",
      end: "",
      status: "",
      priority: "",
    },
  });

  // Setting the form values if task passed
  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("desc", task.desc);
      setValue("start", task.start);
      setValue("end", task.end);
      setValue("status", task.status);
      setValue("priority", task.priority);
    }
  }, [task, setValue]);

  const onSubmit = (data) => {
    if (task) {
      dispatch(updateTask({ ...task, ...data }));
    } else {
      dispatch(addTask(data));
    }
    reset();
    navigate("/");
  };

  const closeButtonHandler = () => {
    navigate("/");
  };

  return (
    <>
      <div className="fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full"></div>
      <div className="fixed top-0 left-0 flex items-center justify-center h-screen w-full">
        <main className="relative bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-lg ">
          <div className="absolute top-4 right-4 text-2xl text-gray-300">
            <button onClick={closeButtonHandler}>
              <RxCross2 />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:divide-y sm:divide-gray-700">
              <div className="sm:py-8 text-base leading-6 space-y-3 sm:space-y-4 text-gray-300 sm:text-lg sm:leading-7 relative">
                <div className="flex flex-col">
                  <label className="leading-loose text-gray-400">Title</label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-500 w-full sm:text-sm border-gray-600 bg-gray-800 rounded-md focus:outline-none text-gray-300"
                    placeholder="Event title"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose text-gray-400">
                    Description
                  </label>
                  <textarea
                    {...register("desc", {
                      required: "Description is required",
                    })}
                    placeholder="Description..."
                    cols="30"
                    rows="5"
                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-500 w-full sm:text-sm border-gray-600 bg-gray-800 rounded-md focus:outline-none text-gray-300"
                  ></textarea>
                  {errors.desc && (
                    <p className="text-red-500 text-sm">
                      {errors.desc.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                  <div className="flex flex-col sm:w-full">
                    <label className="leading-loose text-gray-400">
                      Start Date
                    </label>
                    <input
                      type="date"
                      {...register("start", {
                        required: "Start date is required",
                      })}
                      className="px-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-500 w-full sm:text-sm border-gray-600 bg-gray-800 rounded-md focus:outline-none text-gray-300"
                    />
                    {errors.start && (
                      <p className="text-red-500 text-sm">
                        {errors.start.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:w-full">
                    <label className="leading-loose text-gray-400">
                      Due Date
                    </label>
                    <input
                      type="date"
                      {...register("end", { required: "End date is required" })}
                      className="px-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-500 w-full sm:text-sm border-gray-600 bg-gray-800 rounded-md focus:outline-none text-gray-300"
                    />
                    {errors.end && (
                      <p className="text-red-500 text-sm">
                        {errors.end.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex flex-col w-full">
                    <label className="leading-loose text-gray-400">
                      Status
                    </label>
                    <select
                      {...register("status", {
                        required: "Status is required",
                      })}
                      className="px-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-500 w-full sm:text-sm border-gray-600 bg-gray-800 rounded-md focus:outline-none text-gray-300"
                    >
                      <option value="" disabled>
                        None
                      </option>
                      <option value="completed">Completed</option>
                      <option value="in-progress">In Progress</option>
                    </select>
                    {errors.status && (
                      <p className="text-red-500 text-sm">
                        {errors.status.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col w-full">
                    <label className="leading-loose text-gray-400">
                      Priority
                    </label>
                    <select
                      {...register("priority", {
                        required: "Priority is required",
                      })}
                      className="px-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-500 w-full sm:text-sm border-gray-600 bg-gray-800 rounded-md focus:outline-none text-gray-300"
                    >
                      <option value="" disabled>
                        None
                      </option>
                      <option value="low">Low</option>
                      <option value="high">High</option>
                    </select>
                    {errors.priority && (
                      <p className="text-red-500 text-sm">
                        {errors.priority.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600"
                >
                  {task ? "Update Task" : "Add Task"}
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
};

export default Form;
