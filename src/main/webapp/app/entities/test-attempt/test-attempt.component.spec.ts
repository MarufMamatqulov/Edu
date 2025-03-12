import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import TestAttempt from './test-attempt.vue';
import TestAttemptService from './test-attempt.service';
import AlertService from '@/shared/alert/alert.service';

type TestAttemptComponentType = InstanceType<typeof TestAttempt>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('TestAttempt Management Component', () => {
    let testAttemptServiceStub: SinonStubbedInstance<TestAttemptService>;
    let mountOptions: MountingOptions<TestAttemptComponentType>['global'];

    beforeEach(() => {
      testAttemptServiceStub = sinon.createStubInstance<TestAttemptService>(TestAttemptService);
      testAttemptServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        i18n: { t: vitest.fn() } as any,
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          testAttemptService: () => testAttemptServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        testAttemptServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(TestAttempt, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(testAttemptServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.testAttempts[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: TestAttemptComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(TestAttempt, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        testAttemptServiceStub.retrieve.reset();
        testAttemptServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        testAttemptServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeTestAttempt();
        await comp.$nextTick(); // clear components

        // THEN
        expect(testAttemptServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(testAttemptServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
