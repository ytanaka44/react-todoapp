import React from "react";
import { AddTodoState, TodoState } from "../types/types";
import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../auth/firebase";

export const getAllTodos = async (userId: string): Promise<TodoState[]> => {
  try {
    const q = query(collection(db, `users/${userId}/todos`));
    const querySnapshot = await getDocs(q);
    const todos = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as TodoState;
    });
    return todos;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e; // エラーをスローする
  }
};

export const getTodoById = async (
  userId: string,
  todoId: string
): Promise<TodoState> => {
  try {
    const docRef = doc(db, `users/${userId}/todos`, todoId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as TodoState;
    } else {
      throw new Error("Todo not found");
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    throw e;
  }
};

export const addTodo = async (
  todo: AddTodoState,
  userId: string
): Promise<TodoState> => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/todos`), todo);
    return { ...todo, id: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // エラーをスローする
  }
};

export const updateTodo = async (
  todoId: string,
  todo: TodoState,
  userId: string
) => {
  try {
    const docRef = doc(db, `users/${userId}/todos`, todoId);
    const updatedData = {
      title: todo.title,
      description: todo.description,
      done: todo.done,
      important: todo.important,
      date: todo.date,
      createdAt: todo.createdAt,
    };
    await updateDoc(docRef, updatedData);
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

export const deleteTodo = async (todoId: string, userId: string) => {
  try {
    const docRef = doc(db, `users/${userId}/todos`, todoId);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};
