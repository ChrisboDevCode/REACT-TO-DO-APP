
export type TodoStatus = true | false;
export interface Todo {
    id:        string;
    description:      string;
    completed: TodoStatus;
    userId?:    number;
    createdAt?: string;
}

