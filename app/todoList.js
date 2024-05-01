"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Todo from "./todo";
import AddNewTodo from "./addNewTodo";
import TodoTable from "./todoTable";

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
  //console.log("this is from api" + todos);
  //console.log("This was from ui component");
  return (
    <div className="overflow-x-auto">
      <AddNewTodo onmodifFunc={onmodif} />
      <TodoTable todos={todos} onmodifFunc={onmodif} />
    </div>
  );
};

export default TodoList;
