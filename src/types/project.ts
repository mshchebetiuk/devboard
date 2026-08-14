export interface ProjectOption {
  id: number;
  name: string;
}

export interface Project {
  readonly id: number;
  name: string;
  description: string;
  progress: number;
}
