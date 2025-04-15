import axios from 'axios';

import { type ITestAttempt } from '@/shared/model/test-attempt.model';

const baseApiUrl = 'api/test-attempts';

export default class TestAttemptService {
  public submit(courseItemId: number, answers: { [key: number]: string[] }): Promise<ITestAttempt> {
    return axios.post('/api/test-attempts', { courseItemId, answers }).then(res => res.data);
  }

  public find(id: number): Promise<ITestAttempt> {
    return new Promise<ITestAttempt>((resolve, reject) => {
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

  public create(entity: ITestAttempt): Promise<ITestAttempt> {
    return new Promise<ITestAttempt>((resolve, reject) => {
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

  public update(entity: ITestAttempt): Promise<ITestAttempt> {
    return new Promise<ITestAttempt>((resolve, reject) => {
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

  public partialUpdate(entity: ITestAttempt): Promise<ITestAttempt> {
    return new Promise<ITestAttempt>((resolve, reject) => {
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
