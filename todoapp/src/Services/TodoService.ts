import { TodoDto } from "../Dtos/TodoDto";

const API_URL = "https://localhost:44315/api/Todo";

export async function getTodos(): Promise<TodoDto[]> {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch todo List");
  return response.json();
}

export async function addTodo(todo: TodoDto): Promise<void> {
  const response = await fetch(API_URL, {
    method: "Post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  if (!response.ok) throw new Error("Failed to add todo");
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "Delete",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
}

export async function editTodo(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
  });
  if (!response.ok) throw new Error("Failed to edit todo");
}