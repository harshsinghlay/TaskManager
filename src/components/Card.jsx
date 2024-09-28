import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeTask } from "../redux/features/taskSlice";

function Card({ task }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const editButtonHandler = () => {
    navigate(`/update/${task.id}`);
  };

  const deleteButtonHandler = () => {
    dispatch(removeTask(task.id));
  };

  return (
    <div className="w-full overflow-hidden bg-gray-800 rounded-xl py-3 px-3 flex flex-col gap-1 sm:gap-2 sm:flex-row sm:justify-between">
      {/* Card Title and Desc */}
      <section className="w-full md:max-w-[60%]">
        <h1 className="text-xl font-semibold line-clamp-1">
          {task?.title && task.title}
        </h1>
        <p className="text-gray-300 my-2 line-clamp-1">
          {task?.desc && task.desc}
        </p>
      </section>

      {/* Card Status and Buttons */}
      <section className="w-full md:min-w-fit md:max-w-[40%] flex justify-between sm:justify-center  items-center gap-4 md:gap-6 text-sm">
        <span
          className={`px-3 py-1 rounded-full ${
            task.status === "completed"
              ? "bg-green-700 text-nowrap"
              : "bg-[#f76606] text-nowrap"
          }`}
        >
          {task?.status && task.status}
        </span>
        <span className="text-nowrap ">
          {new Date(task.end).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <div className="text-xl flex gap-2 md:gap-4">
          <span>
            <IoMdStar className={task.priority === "low" && "text-gray-800"} />
          </span>
          <span>
            <button onClick={editButtonHandler}>
              <FaEdit />
            </button>
          </span>
          <span>
            <button onClick={deleteButtonHandler}>
              <MdDelete />
            </button>
          </span>
        </div>
      </section>
    </div>
  );
}

export default Card;
