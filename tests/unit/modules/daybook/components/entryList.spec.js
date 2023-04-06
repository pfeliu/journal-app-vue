import { createStore } from 'vuex';
// import { getEntriesByTerm } from '@/modules/daybook/store/journal/getters';
import { journalState } from '../../../mock-data/test-journal-state';
import { shallowMount } from '@vue/test-utils';
import EntryList from '@/modules/daybook/components/EntryList.vue';
import journal from '@/modules/daybook/store/journal';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe('Entry List', () => {
  /* const journalMockModule = {
    namespaced: true,
    getters: {
      // getEntriesByTerm: jest.fn(),
      getEntriesByTerm,
    },
    state: () => ({
      isLoading: false,
      entries: journalState.entries,
    }),
  };

  const store = createStore({
    modules: {
      journal: { ...journalMockModule },
    },
  }); */

  const store = createVuexStore(journalState);

  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test('should call entries by term', () => {
    expect(wrapper.findAll('entry-stub').length).toBe(2);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should call getEntriesByTerm and filter', async () => {
    const input = wrapper.find('input');
    await input.setValue('segunda');

    expect(wrapper.findAll('entry-stub').length).toBe(1);
  });

  test('should bottom redirect to root', () => {
    wrapper.find('button').trigger('click');

    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: { id: 'new' },
    });
  });
});
