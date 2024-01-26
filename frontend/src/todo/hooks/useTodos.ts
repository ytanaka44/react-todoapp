import { useEffect, useState } from "react";
import { getAllTodos } from "../api/api";
import { TodoState } from "../types";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoState[]>([]);

  const fetchTodos = async () => {
    const todos = await getAllTodos();
    setTodos(todos);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, setTodos, fetchTodos };
};
