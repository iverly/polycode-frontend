export interface Exercise {
  id: string;
  name: string;
  description: string;
  language: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  modules: Module[];
  exercises: Exercise[];
}
