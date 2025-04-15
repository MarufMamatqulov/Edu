import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { ICourseItem } from '@/shared/model/course-item.model';

const baseApiUrl = 'api/course-items';

export default class CourseItemService {
  public find(id: string | number): Promise<ICourseItem> {
    return axios.get(`/api/course-items/${id}`).then(res => res.data);
  }

  public findAllByCourse(courseId: number): Promise<ICourseItem[]> {
    return axios.get<ICourseItem[]>(`api/courses/${courseId}/items`).then(response => response.data);
  }

  public retrieve(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: ICourseItem): Promise<ICourseItem> {
    return new Promise<ICourseItem>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: ICourseItem): Promise<ICourseItem> {
    return new Promise<ICourseItem>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public partialUpdate(entity: ICourseItem): Promise<ICourseItem> {
    return new Promise<ICourseItem>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public addLesson(courseId: string | number, formData: FormData): Promise<ICourseItem> {
    return axios.post(`/api/courses/${courseId}/lessons`, formData).then(res => res.data);
  }

  public uploadLesson(courseId: number, formData: FormData): Promise<ICourseItem> {
    return new Promise<ICourseItem>((resolve, reject) => {
      axios
        .post(`/api/courses/${courseId}/lessons`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res: AxiosResponse<ICourseItem>) => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
