import { useEffect, useState } from "react";
import { getAllTodos } from "../api/api";
import { TodoState } from "../types/types";
import { useAuthContext } from "../../auth/AuthContext";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoState[]>([]);
  const { user, isLoading } = useAuthContext();

  const fetchTodos = async () => {
    if (user) {
      const todos = await getAllTodos(user.uid);
      setTodos(todos);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      fetchTodos();
    }
  }, [isLoading]);

  return { todos, setTodos, fetchTodos };
};
