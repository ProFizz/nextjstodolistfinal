"use client";
import React, { useState } from "react";
import axios from "axios";

const todo = ({ todo, onmodifFunc }) => {
  const [completed, setCompleted] = useState(todo.completed);
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 border border-blue-700 rounded mr-2">
          Edit
        </button>
        <button
          onClick={() => handleDeleteTodo(todo.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold px-4 border border-blue-700 rounded mr-25"
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default todo;
