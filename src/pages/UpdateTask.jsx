import React , {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Form } from "../components";

function UpdateTask() {
  const allTasks = useSelector((state) => state.tasks);
  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  useEffect(() => {
    setTask(allTasks?.find((task) => task.id === taskId));
  }, [taskId]);

  return task ? <Form task={task} /> : null;
}

export default UpdateTask;
