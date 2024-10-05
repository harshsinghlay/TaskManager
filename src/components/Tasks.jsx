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
      setFilteredTasks([]);
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
      <div
        className="w-full h-screen flex justify-center text-white overflow-hidden sm:items-center sm:py-6 "
        style={{
          background:
            "linear-gradient(180.2deg, rgb(30, 33, 48) 6.8%, rgb(74, 98, 110) 131%)",
        }}
      >
        <div
          className="relative divide-y divide-gray-800 bg-[#111827] p-5 h-full w-full sm:shadow-lg sm:shadow-[#6286d1] sm:h-[90%] sm:my-5 sm:mx-3 sm:rounded-xl  md:mx-auto  
           md:w-[80%] lg:w-[70%] "
        >
          {/* Heading and Serch Bar */}
          <section>
            <h1 className="font-bold text-center text-2xl heading-color md:text-3xl text-[#91c9ec] font-semibold"
            >
              TaskMate
            </h1>
            <div className="my-5 flex flex-col gap-4 bg-gray-50 rounded-md">
              <div className="flex rounded-md overflow-hidden p-0.5 relative">
                <input
                  type="text"
                  placeholder="Search Task"
                  className="w-full px-3 py-1 border-none text-black outline-none bg-gray-50"
                  value={searchQuery}
                  onChange={searchInputHandler}
                />
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <h2 className="text-xl">Your Tasks</h2>
              <button
                onClick={addButtonHandler}
                className="bg-blue-800 hover:bg-blue-950 disabled:bg-blue-700 px-6 py-2 text-sm text-white rounded-md font-bold mx-2 shadow-blue-300 shadow-sm"
              >
                Add Task
              </button>
            </div>
          </section>

          {/* All Tasks */}
          <section className="overflow-y-auto max-h-[80%] custom-scrollbar px-2 sm:max-h-[70%] ">
            <main className="space-y-4 py-2">
              {tasksToDisplay?.length === 0 ? (
                <div className="m-5">No Tasks to display</div>
              ) : (
                tasksToDisplay.map((task) => <Card key={task.id} task={task} />)
              )}
            </main>
          </section>
        </div>
      </div>
    </>
  );
}

export default Tasks;
