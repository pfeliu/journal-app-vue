import { createStore } from 'vuex';
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../../mock-data/test-journal-state';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe('Vuex journal module', () => {
  test('should init state', () => {
    const store = createVuexStore(journalState);

    const { isLoading, entries } = store.state.journal;

    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // Mutations
  test('mutations: should set mutation setEntries', () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    store.commit('journal/setEntries', journalState.entries);

    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });

  test('mutations: should update mutation entry', () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: '-NSBctaJgPDMksz8fEah',
      date: 1627077227978,
      text: 'Hola mundo desde mock data2',
    };

    store.commit('journal/updateEntry', updatedEntry);

    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual(updatedEntry);
  });

  test('mutations: should add and delete entry mutation', () => {
    const store = createVuexStore(journalState);

    store.commit('journal/addEntry', { id: 'CCC-123', text: 'Hello W' });

    let stateEntries = store.state.journal.entries;

    expect(stateEntries.length).toBe(3);

    expect(stateEntries.find((e) => e.id === 'CCC-123')).toBeTruthy();

    store.commit('journal/deleteEntry', 'CCC-123');

    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === 'CCC-123')
    ).toBeFalsy();
  });

  //Getters
  test('getters: getEntriesByTerm getEntryById', () => {
    const store = createVuexStore(journalState);

    const [entry1, entry2] = journalState.entries;

    expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2);
    expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1);

    expect(store.getters['journal/getEntriesByTerm']('segunda')).toEqual([
      entry2,
    ]);

    expect(
      store.getters['journal/getEntryById']('-NSBctaJgPDMksz8fEah')
    ).toEqual(entry1);
  });

  // Actions
  test('actions: loadEntries', async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });

    await store.dispatch('journal/loadEntries');

    expect(store.state.journal.entries.length).toBe(3);
  });

  test('actions: updateEntry', async () => {
    const store = createVuexStore(journalState);

    const updatedEntry = {
      id: '-NSBctaJgPDMksz8fEah',
      date: 1627077227978,
      text: 'Hola mundo desde mock data',
    };

    await store.dispatch('journal/updateEntry', updatedEntry);

    expect(store.state.journal.entries.length).toBe(2);
    expect(
      store.state.journal.entries.find((e) => e.id === updatedEntry.id)
    ).toEqual(updatedEntry);
  });

  test('actins: createEntry deleteEntry', async () => {
    const store = createVuexStore(journalState);

    const newEntry = {
      date: 1627077226978,
      text: 'This is a new entry...',
    };

    const id = await store.dispatch('journal/createEntry', newEntry);

    expect(typeof id).toBe('string');
    expect(store.state.journal.entries.find((e) => e.id === id)).toBeTruthy();

    await store.dispatch('journal/deleteEntry', id);
    expect(store.state.journal.entries.find((e) => e.id === id)).toBeFalsy();
  });
});
