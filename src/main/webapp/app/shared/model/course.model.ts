import type { IUser } from '@/shared/model/user.model.ts';

export interface ICourse {
  id?: number;
  title?: string;
  description?: string;
  author?: any;
}

export interface ICourseItem {
  id?: number;
  title?: string;
  itemType?: string;
  contentType?: string;
  content?: string;
  passingScore?: number;
  course?: ICourse;
  orderIndex?: number;
}

export interface ICourseProgress {
  id?: number;
  completedItems?: number;
  isCompleted?: boolean;
  student?: any;
  course?: ICourse;
}

export class Course implements ICourse {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string | null,
    public author?: IUser | null,
  ) {}
}
