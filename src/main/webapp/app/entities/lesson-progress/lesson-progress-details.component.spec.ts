import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import LessonProgressDetails from './lesson-progress-details.vue';
import LessonProgressService from './lesson-progress.service';
import AlertService from '@/shared/alert/alert.service';

type LessonProgressDetailsComponentType = InstanceType<typeof LessonProgressDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const lessonProgressSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('LessonProgress Management Detail Component', () => {
    let lessonProgressServiceStub: SinonStubbedInstance<LessonProgressService>;
    let mountOptions: MountingOptions<LessonProgressDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      lessonProgressServiceStub = sinon.createStubInstance<LessonProgressService>(LessonProgressService);

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          lessonProgressService: () => lessonProgressServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        lessonProgressServiceStub.find.resolves(lessonProgressSample);
        route = {
          params: {
            lessonProgressId: `${123}`,
          },
        };
        const wrapper = shallowMount(LessonProgressDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.lessonProgress).toMatchObject(lessonProgressSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        lessonProgressServiceStub.find.resolves(lessonProgressSample);
        const wrapper = shallowMount(LessonProgressDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
