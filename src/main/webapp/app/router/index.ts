import { createRouter as createVueRouter, createWebHistory } from 'vue-router';
import LessonView from '@/entities/course-item/lesson-view.vue';
import TestView from '@/entities/course-item/test-view.vue';
const Home = () => import('@/core/home/home.vue');
const Error = () => import('@/core/error/error.vue');
import account from '@/router/account';
import admin from '@/router/admin';
import entities from '@/router/entities';
import pages from '@/router/pages';

export const createRouter = () =>
  createVueRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/course/:courseId/items',
        name: 'CourseItems',
        component: () => import('@/entities/course-item/course-items.vue'),
      },
      {
        path: '/course/:courseId/view-items',
        name: 'CourseItemsView',
        component: () => import('@/entities/course-item/course-items-view.vue'),
      },
      {
        path: '/course/:courseId/lesson/:itemId',
        name: 'LessonView',
        component: LessonView,
      },
      {
        path: '/entity/course/:courseId/add-lesson',
        name: 'AddLesson',
        component: () => import('@/entities/course/add-lesson.vue'),
        meta: { authorities: ['ROLE_ADMIN'] },
      },
      {
        path: '/entity/course/:courseId/add-test',
        name: 'AddTest',
        component: () => import('@/entities/course/add-test.vue'),
        meta: { authorities: ['ROLE_ADMIN'] },
      },
      {
        path: '/entity/test-attempt/:courseItemId',
        name: 'TestAttempt',
        component: () => import('@/entities/test-attempt/test-attempt.vue'),
        meta: { authorities: ['ROLE_USER'] },
      },
      {
        path: '/course/:courseId/test/:itemId',
        name: 'TestView',
        component: TestView,
      },
      {
        path: '/forbidden',
        name: 'Forbidden',
        component: Error,
        meta: { error403: true },
      },
      {
        path: '/not-found',
        name: 'NotFound',
        component: Error,
        meta: { error404: true },
      },
      ...account,
      ...admin,
      entities, // The route for /course/:courseId/items is now handled by entities.ts
      ...pages,
    ],
  });

const router = createRouter();

router.beforeResolve(async (to, from, next) => {
  if (!to.matched.length) {
    next({ path: '/not-found' });
    return;
  }
  next();
});

export default router;
