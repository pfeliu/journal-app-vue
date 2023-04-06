import HomeView from '@/views/HomeView.vue';
import { shallowMount } from '@vue/test-utils';

describe('Home view', () => {
  test('should match with snapshot', () => {
    const wrapper = shallowMount(HomeView);
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('should click and redirect', () => {
    const mockRouter = { push: jest.fn() };

    const wrapper = shallowMount(HomeView, {
      global: {
        mocks: { $router: mockRouter },
      },
    });

    wrapper.find('button').trigger('click');

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });
});
