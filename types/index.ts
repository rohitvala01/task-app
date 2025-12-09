// export interface Task {
//   id: string;
//   title: string;
//   completed: boolean;
// }

// export interface Category {
//   id: string;
//   name: string;
//   iconName: string;
//   tasks: Task[];
// }
export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  subtasks: SubTask[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  tasks: Task[];
}
