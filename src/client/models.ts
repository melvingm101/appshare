export interface InputFieldType {
  name: string;
  type: string;
  placeholder: string;
  labelText: string;
  required: boolean;
}

interface Author {
  id: number;
  name: string;
  photoUrl: string | null | undefined;
  points: number;
  tagline: string;
}

export interface CurrentProject {
  id: number;
  title: string;
  description: string;
  projectUrl: string | null;
  tags: any[];
  banner: string | null;
  views: number;
  likes: any[];
  _count: any;
  author: Author;
}
