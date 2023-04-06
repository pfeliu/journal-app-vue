import Fab from '@/modules/daybook/components/Fab.vue';
import { shallowMount } from '@vue/test-utils';

describe('Fab component', () => {
  test('should render default icon', () => {
    const wrapper = shallowMount(Fab);
    const iTag = wrapper.find('i');

    expect(iTag.classes('fa-plus')).toBeTruthy();
  });

  test('should render icon by params fa-circle', () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: 'fa-circle',
      },
    });

    const iTag = wrapper.find('i');

    expect(iTag.classes('fa-circle')).toBeTruthy();
  });

  test('should emit click event', () => {
    const wrapper = shallowMount(Fab);

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted('on:click')).toHaveLength(1);
  });
});
