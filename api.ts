import { ITask } from "./types/tasks";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    console.log(`Fetching from: ${baseUrl}/tasks`); // Debugging log

    const res = await fetch(`${baseUrl}/tasks`, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`Error fetching tasks: ${res.status} - ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
};



export const addTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const newTodo = await res.json();
  return newTodo;
}

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const res = await fetch(`${baseUrl}/tasks/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  })
  const updatedTodo = await res.json();
  return updatedTodo;
}

export const deleteTodo = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'DELETE',
  })
}