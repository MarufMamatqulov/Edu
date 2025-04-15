import axios from 'axios';
import type { ICourse } from '@/shared/model/course.model'; // Use type-only import

export default class CourseService {
  public findAll(): Promise<ICourse[]> {
    return axios.get<ICourse[]>('api/courses').then(response => response.data);
  }

  public find(id: number): Promise<ICourse> {
    return axios.get<ICourse>(`api/courses/${id}`).then(response => response.data);
  }

  public retrieve(): Promise<any> {
    return axios.get('api/courses');
  }

  public create(course: ICourse): Promise<ICourse> {
    return axios.post<ICourse>('api/courses', course).then(response => response.data);
  }

  public getItems(courseId: string): Promise<any> {
    return axios.get(`/api/courses/${courseId}/items`).then(response => response.data);
  }

  public getProgress(courseId: string): Promise<any> {
    return axios.get(`/api/courses/${courseId}/progress`).then(response => response.data);
  }
}
