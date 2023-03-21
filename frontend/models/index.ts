export interface User {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  auth?: any;
}

export interface Task {
  id?: number;
  title?: string;
  description?: string;
  dueDate?: string;
  piority?: number;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;
}
