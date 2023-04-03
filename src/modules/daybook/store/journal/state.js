export default () => ({
  isLoading: true,
  entries: [
    {
      id: new Date().getTime(),
      date: new Date().toDateString(),
      text: 'Aliqua duis magna aliqua reprehenderit aliquip ipsum minim deserunt eiusmod aliqua ex aliqua. Exercitation id labore laborum ex tempor sint dolor incididunt commodo fugiat deserunt consequat sunt proident. Dolor velit tempor et aliqua pariatur.',
      picture: null,
    },
    {
      id: new Date().getTime() + 1000,
      date: new Date().toDateString(),
      text: 'Aliqua duis magna aliqua reprehenderit aliquip ipsum minim deserunt eiusmod aliqua ex aliqua. Exercitation id labore laborum ex tempor sint dolor incididunt commodo fugiat deserunt consequat sunt proident. Dolor velit tempor et aliqua pariatur.',
      picture: null,
    },
    {
      id: new Date().getTime() + 2000,
      date: new Date().toDateString(),
      text: 'Aliqua duis magna aliqua reprehenderit aliquip ipsum minim deserunt eiusmod aliqua ex aliqua. Exercitation id labore laborum ex tempor sint dolor incididunt commodo fugiat deserunt consequat sunt proident. Dolor velit tempor et aliqua pariatur.',
      picture: null,
    },
  ],
});
