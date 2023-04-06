import { shallowMount } from '@vue/test-utils';
import AboutView from '@/views/AboutView.vue';

describe('About View ', () => {
  let wrapper;

  wrapper = shallowMount(AboutView);

  test('should render About view', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
