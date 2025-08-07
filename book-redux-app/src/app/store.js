import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/books/booksSlice';


// --- Load from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('bookState');
    if (serializedState === null) return undefined;
    return { books: JSON.parse(serializedState) };
  } catch (err) {
    return undefined;
  }
};

// --- Save to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.books);
    localStorage.setItem('bookState', serializedState);
  } catch (err) {
    console.error("Failed to save state", err);
  }
};

const store = configureStore({
  reducer: {
    books: booksReducer,
  },
  preloadedState: loadState(), // <-- Use loaded state on startup
});

// --- Subscribe to store changes and save
store.subscribe(() => {
  saveState(store.getState());
});

export { store };
