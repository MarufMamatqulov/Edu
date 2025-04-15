import AuthService from './auth.service';

export default class LoginService {
  private readonly emit: (event: string, ...args: any[]) => void;
  private authService: AuthService;

  constructor({ emit }: { emit: (event: string, ...args: any[]) => void }) {
    this.emit = emit;
    this.authService = new AuthService();
  }

  public openLogin(): void {
    this.emit('bv::show::modal', 'login-page');
  }

  public hideLogin(): void {
    this.emit('bv::hide::modal', 'login-page');
  }

  public login(credentials: { username: string; password: string; rememberMe: boolean }): Promise<void> {
    return this.authService.login(credentials).then(() => {
      this.hideLogin();
    });
  }

  public logout(): void {
    this.authService.logout();
  }
}
