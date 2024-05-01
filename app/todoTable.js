// components/TodoTable.js
"use client";
import React, { useState } from "react";
import axios from "axios";
import Todo from "./todo.js";

const TodoTable = ({ todos, onmodifFunc }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((t) => (
            <tr key={t.id}>
              <Todo todo={t} onmodifFunc={onmodifFunc} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoTable;
