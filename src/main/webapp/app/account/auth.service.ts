import axios from '@/shared/config/axios';

export default class AuthService {
  public login(credentials: { username: string; password: string; rememberMe: boolean }): Promise<string> {
    return axios.post('/api/authenticate', credentials).then(res => {
      const token = res.data.id_token;
      if (token) {
        if (credentials.rememberMe) {
          localStorage.setItem('jhi-authenticationToken', token);
          sessionStorage.removeItem('jhi-authenticationToken');
        } else {
          sessionStorage.setItem('jhi-authenticationToken', token);
          localStorage.removeItem('jhi-authenticationToken');
        }
        return token;
      }
      throw new Error('No token received');
    });
  }

  public logout(): void {
    localStorage.removeItem('jhi-authenticationToken');
    sessionStorage.removeItem('jhi-authenticationToken');
  }
}
