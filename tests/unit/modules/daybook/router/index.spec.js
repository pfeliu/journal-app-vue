import daybookRouter from '@/modules/daybook/router';

describe('Router', () => {
  test('should router have a config', async () => {
    expect(daybookRouter).toMatchObject({
      name: 'daybook',
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: 'no-entry',
          component: expect.any(Function),
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });

    // expect((await daybookRouter.children[0].component()).default.name).toBe(
    //   'NoEntrySelected'
    // );
    // expect((await daybookRouter.children[1].component()).default.name).toBe(
    //   'EntryView'
    // );

    const promisesRoutes = [];
    daybookRouter.children.forEach((child) =>
      promisesRoutes.push(child.component())
    );

    const routes = (await Promise.all(promisesRoutes)).map(
      (r) => r.default.name
    );

    expect(routes).toContain('EntryView');
    expect(routes).toContain('NoEntrySelected');
  });

  test('should return id', () => {
    const route = {
      params: {
        id: '123',
      },
    };

    // expect(daybookRouter.children[1].props(route)).toEqual({ id: '123' });

    const entryRoute = daybookRouter.children.find(
      (route) => route.name === 'entry'
    );

    expect(entryRoute.props(route)).toEqual({ id: '123' });
  });
});
