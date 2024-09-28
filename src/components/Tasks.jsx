import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "../components";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.tasks);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);

  const searchInputHandler = (e) => {
    setSearchQuery(e.target.value);
    filterTasks(e.target.value);
  };

  const filterTasks = (query) => {
    if (!query) {
      setFilteredTasks([]); // Clear the filtered tasks if no query
    } else {
      const filtered = tasks.filter((task) =>
        task.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredTasks(filtered);
    }
  };

  const addButtonHandler = () => {
    navigate("/add");
  };

  const tasksToDisplay = searchQuery ? filteredTasks : tasks;

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#111827] text-white">
        <div
          className="mx-3 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] w-full 
           md:w-[80%] lg:w-[70%] border-[1px] border-gray-800 relative"
        >
          {/* Heading and Serch Bar */}
          <section>
            <h1 className="font-bold text-center text-2xl md:text-3xl">
              Task Manager
            </h1>
            <div className="my-5 flex flex-col gap-4">
              <div className="flex bg-white rounded-md overflow-hidden p-0.5 relative">
                <input
                  type="text"
                  placeholder="Search Task"
                  className="w-full px-3 py-1 border-none text-black outline-none"
                  value={searchQuery}
                  onChange={searchInputHandler}
                />
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl">Your Tasks</h2>
              <button
                onClick={addButtonHandler}
                className="bg-blue-800 hover:bg-blue-950 disabled:bg-blue-700 px-6 py-2 text-sm text-white rounded-md font-bold mx-2"
              >
                Add Task
              </button>
            </div>
          </section>

          {/* All Tasks */}
          <section>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {tasksToDisplay?.length === 0 ? (
                <div className="m-5">No Tasks to display</div>
              ) : (
                tasksToDisplay.map((task) => <Card key={task.id} task={task} />)
              )}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

export default Tasks;
