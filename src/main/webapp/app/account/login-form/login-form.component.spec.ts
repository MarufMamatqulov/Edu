import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import axios from 'axios';
import sinon from 'sinon';
import { type RouteLocation } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';

import LoginService from '../login.service';
import AccountService from '../account.service';
import LoginForm from './login-form.vue';
import { useStore } from '@/store';

type LoginFormComponentType = InstanceType<typeof LoginForm>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();
vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const pinia = createTestingPinia();

const store = useStore();

const axiosStub = {
  get: sinon.stub(axios, 'get'),
  post: sinon.stub(axios, 'post'),
};

describe('LoginForm Component', () => {
  let loginForm: LoginFormComponentType;

  beforeEach(() => {
    route = {};
    axiosStub.get.resolves({});
    axiosStub.post.reset();

    const loginService = new LoginService({ emit: vitest.fn() });

    const globalOptions: MountingOptions<LoginFormComponentType>['global'] = {
      stubs: {
        'b-alert': true,
        'b-button': true,
        'b-form': true,
        'b-form-input': true,
        'b-form-group': true,
        'b-form-checkbox': true,
        'b-link': true,
      },
      plugins: [pinia],
      provide: {
        loginService,
        accountService: new AccountService(store),
      },
    };
    const wrapper = shallowMount(LoginForm, { global: globalOptions });

    loginForm = wrapper.vm;
  });

  it('should not store token if authentication is KO', async () => {
    // GIVEN
    loginForm.login = 'login';
    loginForm.password = 'pwd';
    loginForm.rememberMe = true;
    axiosStub.post.rejects();

    // WHEN
    loginForm.doLogin();
    await loginForm.$nextTick();

    // THEN
    expect(
      axiosStub.post.calledWith('/api/authenticate', {
        username: 'login',
        password: 'pwd',
        rememberMe: true,
      }),
    ).toBeTruthy();
    await loginForm.$nextTick();
    expect(loginForm.authenticationError).toBeTruthy();
  });

  it('should store token if authentication is OK', async () => {
    // GIVEN
    loginForm.login = 'login';
    loginForm.password = 'pwd';
    loginForm.rememberMe = true;
    const jwtSecret = 'jwt-secret';
    axiosStub.post.resolves({ headers: { authorization: `Bearer ${jwtSecret}` } });

    // WHEN
    loginForm.doLogin();
    await loginForm.$nextTick();

    // THEN
    expect(
      axiosStub.post.calledWith('/api/authenticate', {
        username: 'login',
        password: 'pwd',
        rememberMe: true,
      }),
    ).toBeTruthy();

    expect(loginForm.authenticationError).toBeFalsy();
    expect(localStorage.getItem('jhi-authenticationToken')).toEqual(jwtSecret);
  });

  it('should store token if authentication is OK in session', async () => {
    // GIVEN
    loginForm.login = 'login';
    loginForm.password = 'pwd';
    loginForm.rememberMe = false;
    const jwtSecret = 'jwt-secret';
    axiosStub.post.resolves({ headers: { authorization: `Bearer ${jwtSecret}` } });

    // WHEN
    loginForm.doLogin();
    await loginForm.$nextTick();

    // THEN
    expect(
      axiosStub.post.calledWith('/api/authenticate', {
        username: 'login',
        password: 'pwd',
        rememberMe: false,
      }),
    ).toBeTruthy();

    expect(loginForm.authenticationError).toBeFalsy();
    expect(sessionStorage.getItem('jhi-authenticationToken')).toEqual(jwtSecret);
  });
});
