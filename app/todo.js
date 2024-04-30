"use client";
import React, { useState } from "react";
import axios from "axios";

const todo = ({ todo, onmodifFunc }) => {
  const [completed, setCompleted] = useState(todo.completed);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);
  //const [editcompleted, seteditCompleted] = useState(todo.completed);
  //console.log("todocompleted status is:" + todo.completed);

  async function handleUpdateStatus() {
    try {
      // Toggle the completed status
      const updatedStatus = !completed;

      // Make the PATCH request
      await axios.patch(`http://localhost:8080/api/v1/todos/${todo.id}`, {
        completed: updatedStatus,
      });

      // Update local state
      setCompleted(updatedStatus);
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error (show a message, etc.)
    }
  }

  async function handleDeleteTodo(id) {
    // Make a DELETE request to delete a todo
    axios
      .delete(`http://localhost:8080/api/v1/todos/${id}`)
      .then(() => {
        // Refresh the todos list
        onmodifFunc();
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  }

  const handleSaveClick = async () => {
    try {
      // Make the PUT request to update the todo
      await axios.put(`http://localhost:8080/api/v1/todos/${todo.id}`, {
        title: updatedTitle,
        completed: completed,
      });

      // Notify the parent component (TodoList.js) about the modification
      onmodifFunc();
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating todo:", error);
      // Handle error (show a message, etc.)
    }
  };

  return (
    <>
      <div className="mx-4 flex mr-20">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleUpdateStatus}
          className="mr-6"
        />
        <div className="flex-grow">{todo.title}</div>

        <button
          onClick={() => handleDeleteTodo(todo.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 border border-blue-700 rounded mr-25"
        >
          Delete
        </button>
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Edit todo
        </button>

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Todo</h3>
            <form method="dialog">
              <label htmlFor="todoTitle" className="block mt-4">
                Todo Title:
                <input
                  type="text"
                  id="todoTitle"
                  placeholder="Enter todo title"
                  className="input input-bordered w-full"
                  // Bind the input value to your state (useState)
                  // Example: value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)}
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
              </label>

              <label htmlFor="completed" className="block mt-4">
                Completed:
                <input
                  type="checkbox"
                  id="completed"
                  // Bind the checkbox value to your state (useState)
                  // Example: checked={completed} onChange={(e) => setCompleted(e.target.checked)}
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
              </label>

              <div className="modal-action mt-4">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSaveClick}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn ml-2"
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default todo;
