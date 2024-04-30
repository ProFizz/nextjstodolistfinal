"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./todo";
import AddNewTodo from "./addNewTodo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get("http://localhost:8080/api/v1/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  };

  const onmodif = () => {
    fetchTodos();
  };

  //const alltodos = fetchTodos();
  console.log("this is from api" + todos);
  console.log("This was from ui component");
  return (
    <div className="px-20">
      <AddNewTodo onmodifFunc={onmodif} />
      <ul>
        {todos.map((t) => {
          return (
            <li key={t.id} style={{ padding: "5px 0" }}>
              <Todo todo={t} onmodifFunc={onmodif} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
