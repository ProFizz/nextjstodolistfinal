"use client";
import React, { useState } from "react";
import axios from "axios";

const AddNewTodo = ({ onmodifFunc }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  async function handleAddTodo() {
    console.log("handle add todo is executed with todo value: " + newTodoTitle);
    axios
      .post("http://localhost:8080/api/v1/todos", { title: newTodoTitle })
      .then(() => {
        // Refresh the todos list
        onmodifFunc();
        setNewTodoTitle("");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
      });
  }
  return (
    <form onSubmit={handleAddTodo} className="flex px-20">
      <input
        type="text"
        id="addTodo"
        placeholder="Enter a new todo"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        className="border rounded flex-grow"
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Todo
      </button>
    </form>
  );
};

export default AddNewTodo;
