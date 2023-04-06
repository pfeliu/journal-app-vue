export default {
  name: 'auth',
  component: () =>
    import(
      /* webpackChunkName: "auth layout" */ '@/modules/auth/layouts/AuthLayout.vue'
    ),
  children: [
    {
      path: '',
      name: 'login',
      component: () =>
        import(
          /* webpackChunkName: "login auth" */ '@/modules/auth/views/Login.vue'
        ),
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import(
          /* webpackChunkName: "register" */ '@/modules/auth/views/Register.vue'
        ),
    },
  ],
};
