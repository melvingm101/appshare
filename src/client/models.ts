export interface InputFieldType {
  name: string;
  type: string;
  placeholder: string;
  labelText: string;
  required: boolean;
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
}
