import { type ICourse } from '@/shared/model/course.model';

import { type ItemType } from '@/shared/model/enumerations/item-type.model';
import { type ContentType } from '@/shared/model/enumerations/content-type.model';

export interface ICourseItem {
  id?: number;
  title?: string;
  itemType?: string;
  contentType?: string;
  content?: string;
  passingScore?: number;
  course?: any;
  orderIndex?: number;
  items?: any;
}

export class CourseItem implements ICourseItem {
  constructor(
    public id?: number,
    public title?: string,
    public itemType?: string,
    public contentType?: string,
    public content?: string,
    public passingScore?: number,
    public course?: any,
    public orderIndex?: number,
    public items?: any,
  ) {}
}
