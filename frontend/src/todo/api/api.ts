import { TodoState } from "../types";

export const getAllTodos = async (): Promise<TodoState[]> => {
  const res = await fetch(`http://localhost:3001/todo`);
  const todos = res.json();
  return todos;
};

export const getTodoById = async (id: string): Promise<TodoState> => {
  const res = await fetch(`http://localhost:3001/todo/${id}`);
  const todo = await res.json();
  return todo;
};

export const addTodo = async (todo: TodoState): Promise<TodoState> => {
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

export const updateTodo = async (id: string, todo: TodoState) => {
  await fetch(`http://localhost:3001/todo/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json", //
    },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = async (id: string) => {
  await fetch(`http://localhost:3001/todo/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json", //
    },
  });
};
