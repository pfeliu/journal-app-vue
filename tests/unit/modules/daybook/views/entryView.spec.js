import { createStore } from 'vuex';
import { journalState } from '../../../mock-data/test-journal-state';
import { shallowMount } from '@vue/test-utils';
import journal from '@/modules/daybook/store/journal';
import EntryView from '@/modules/daybook/views/EntryView.vue';
import Swal from 'sweetalert2';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

const store = createVuexStore(journalState);
store.dispatch = jest.fn();

const mockRouter = {
  push: jest.fn(),
};

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe('Entry View', () => {
  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: '-MfKM6PrX3s9QqURdLx5',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test('should get out user when id not match', () => {
    // eslint-disable-next-line no-unused-vars
    const wrapper = shallowMount(EntryView, {
      props: {
        id: 'Id no exist',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });

  test('should show entry correctly', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test('should delete entry and exit', async (done) => {
    Swal.fire.mockReturnValueOnce(await Promise.resolve({ isConfirmed: true }));
    wrapper.find('.btn-danger').trigger('click');

    expect(Swal.fire).toHaveBeenCalledWith({
      title: 'Are you sure?',
      text: 'It is not possible revert this action',
      showDenyButton: true,
      confirmButtonText: 'Yes, I am sure',
    });

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        'journal/deleteEntry',
        '-MfKM6PrX3s9QqURdLx5'
      );
      expect(mockRouter.push).toHaveBeenCalled();
      done();
    }, 1);
  });
});
