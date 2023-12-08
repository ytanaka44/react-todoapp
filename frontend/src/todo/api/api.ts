import React from "react";
import { TodoState } from "../types/types";

export const getAllTodos = async (): Promise<TodoState[]> => {
  const res = await fetch(`http://localhost:3001/todo`);
  const todos = res.json();
  return todos;
};
