import React from "react";
import { TodoState } from "../types/types";

export const getAllTodos = async (): Promise<TodoState[]> => {
  const res = await fetch(`http://localhost:3001/todo`);
  const todos = res.json();
  return todos;
};

export const fetchAddTodo = async (todo: TodoState): Promise<TodoState> => {
  const res = await fetch(`http://localhost:3001/todo`, {
    method: "post",
    headers: {
      "Content-Type": "application/json", //
    },
    body: JSON.stringify(todo),
  });
  const newTodo = res.json();
  return newTodo;
};

export const updateTodo = async (
  id: string,
  todo: TodoState
): Promise<TodoState> => {
  const res = await fetch(`http://localhost:3001/todo/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json", //
    },
    body: JSON.stringify(todo),
  });
  const newTodo = res.json();
  return newTodo;
};
