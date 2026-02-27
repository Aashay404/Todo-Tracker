import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const API = "http://localhost:5000";

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;
    await axios.post(`${API}/tasks`, { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await axios.put(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

 return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
      
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Task Manager
      </h1>

      {/* Input Section */}
      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Add
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 text-sm text-gray-600">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "font-medium text-gray-900" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "font-medium text-gray-900" : ""}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "font-medium text-gray-900" : ""}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <ul className="divide-y divide-gray-200">
        {filteredTasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center py-3 group"
          >
            <span
              onClick={() => toggleTask(task._id)}
              className={`cursor-pointer ${
                task.completed
                  ? "line-through text-gray-400"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </span>

            <button
              onClick={() => deleteTask(task._id)}
              className="text-sm text-red-500 opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="mt-6 text-sm text-gray-500">
        {tasks.filter(t => !t.completed).length} items left
      </div>

    </div>
  </div>
);
}

export default App;