export interface TodoState {
  id: string;
  title: string;
  description: string;
  done: boolean;
  important: boolean;
  date: string;
  createdAt: string;
}

export interface AddTodoState {
  title: string;
  description: string;
  done: boolean;
  important: boolean;
  date: string;
  createdAt: string;
}
