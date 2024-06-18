import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isImportant: false,
  });
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleCheckbox = (e) => {
    const { name, checked } = e.target;
    setForm({
      ...form,
      [name]: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date().toISOString();

    setTasks((tasks) => [...tasks, { ...form, createdAt: now, isDone: false }]);

    setForm({
      name: "",
      description: "",
      isImportant: false,
    });
  };

  const moveUpTask = (index) => {
    if (index > 0) {
      const currentTasks = [...tasks];
      [currentTasks[index], currentTasks[index - 1]] = [
        currentTasks[index - 1],
        currentTasks[index],
      ];
      setTasks(currentTasks);
    }
  };

  const moveDownTask = (index) => {
    if (index < tasks.length - 1) {
      const currentTasks = [...tasks];
      [currentTasks[index], currentTasks[index + 1]] = [
        currentTasks[index + 1],
        currentTasks[index],
      ];
      setTasks(currentTasks);
    }
  };

  const doneTask = (index) => {
    setTasks((tasks) => tasks.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <div className="container mx-auto">
        <h1 className="mb-4 text-4xl text-center mx-auto max-w-sm font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Todo
        </h1>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-5">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={(e) => handleInputChange(e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Todo Name"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              name="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Description"
              required
              value={form.description}
              onChange={(e) => handleInputChange(e)}
            ></textarea>
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                name="isImportant"
                checked={form.isImportant}
                onChange={(e) => handleCheckbox(e)}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              />
            </div>
            <label
              htmlFor="isImportant"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Important
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>

        <ul className="max-w-sm mx-auto divide-y divide-gray-200 dark:divide-gray-700 my-5">
          {tasks.map((task, index) => (
            <li key={index} className="pb-3 sm:pb-4">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium flex gap-2 my-2 text-gray-900 truncate dark:text-white">
                    {task.name}
                    {task.isImportant ? (
                      <span>
                        <svg
                          className="w-5 fill-red-600"
                          clipRule="evenodd"
                          fillRule="evenodd"
                          strokeLinejoin="round"
                          strokeMiterlimit="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="m12.002 21.534c5.518 0 9.998-4.48 9.998-9.998s-4.48-9.997-9.998-9.997c-5.517 0-9.997 4.479-9.997 9.997s4.48 9.998 9.997 9.998zm0-1.5c-4.69 0-8.497-3.808-8.497-8.498s3.807-8.497 8.497-8.497 8.498 3.807 8.498 8.497-3.808 8.498-8.498 8.498zm0-6.5c-.414 0-.75-.336-.75-.75v-5.5c0-.414.336-.75.75-.75s.75.336.75.75v5.5c0 .414-.336.75-.75.75zm-.002 3c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"
                            fillRule="nonzero"
                          />
                        </svg>
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {task.description}
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
                  <button
                    onClick={() => moveUpTask(index)}
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Up
                  </button>
                  <button
                    onClick={() => moveDownTask(index)}
                    className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  >
                    Down
                  </button>
                  <button
                    onClick={() => doneTask(index)}
                    className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
