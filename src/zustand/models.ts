export interface LoggedInUser {
  id: number;
  name: string;
  photoUrl: string;
  points: number;
  tagline: string;
}

export interface AppshareProject {
  id: number;
  title: string;
  description: string;
  projectUrl: string | null;
  tags: any[];
  banner: string | null;
  views: number;
  likes: any[];
  _count: any;
}
