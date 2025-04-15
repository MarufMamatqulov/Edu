import axios from 'axios';

import { type ILessonProgress } from '@/shared/model/lesson-progress.model';

import type { ICourseProgress } from '@/shared/model/course.model';
const baseApiUrl = 'api/lesson-progresses';

export default class LessonProgressService {
  public getProgress(courseId: string): Promise<ICourseProgress[]> {
    return axios.get<ICourseProgress[]>(`/api/courses/${courseId}/progress`).then(response => response.data);
  }

  public markViewed(courseId: number, itemId: number): Promise<void> {
    return axios.post(`/api/lesson-progress/mark-viewed`, { courseId, itemId });
  }

  public find(id: number): Promise<ILessonProgress> {
    return new Promise<ILessonProgress>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
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

  public create(entity: ILessonProgress): Promise<ILessonProgress> {
    return new Promise<ILessonProgress>((resolve, reject) => {
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

  public update(entity: ILessonProgress): Promise<ILessonProgress> {
    return new Promise<ILessonProgress>((resolve, reject) => {
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

  public partialUpdate(entity: ILessonProgress): Promise<ILessonProgress> {
    return new Promise<ILessonProgress>((resolve, reject) => {
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
}
