// src/redux/booksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const API_BASE_URL = 'http://localhost:5000/api/books';

// API calls
const fetchBooksAPI = async () => {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch books');
  return await res.json();
};

const addBookAPI = async (book) => {
  const res = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to add book');
  return await res.json();
};

const updateBookAPI = async (book) => {
  const res = await fetch(`${API_BASE_URL}/${book.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });
  if (!res.ok) throw new Error('Failed to update book');
  return await res.json();
};

const deleteBookAPI = async (id) => {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete book');
};

export const fetchBooks = () => async (dispatch) => {
  dispatch(fetchBooksStart());
  try {
    const books = await fetchBooksAPI();
    dispatch(fetchBooksSuccess(books));
  } catch (error) {
    dispatch(fetchBooksFailure(error.message));
  }
};

export const addBookAsync = (book) => async (dispatch) => {
  dispatch(addBookStart());
  try {
    const newBook = await addBookAPI(book);
    dispatch(addBookSuccess(newBook));
  } catch (error) {
    dispatch(addBookFailure(error.message));
  }
};

export const updateBookAsync = (book) => async (dispatch) => {
  dispatch(updateBookStart());
  try {
    const updatedBook = await updateBookAPI(book);
    dispatch(updateBookSuccess(updatedBook));
  } catch (error) {
    dispatch(updateBookFailure(error.message));
  }
};

export const deleteBookAsync = (id) => async (dispatch) => {
  dispatch(deleteBookStart());
  try {
    await deleteBookAPI(id);
    dispatch(deleteBookSuccess(id));
  } catch (error) {
    dispatch(deleteBookFailure(error.message));
  }
};

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    loading: false,
    error: null,

    addLoading: false,
    addError: null,

    updateLoading: false,
    updateError: null,

    deleteLoading: false,
    deleteError: null,
  },
  reducers: {
    fetchBooksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addBookStart: (state) => {
      state.addLoading = true;
      state.addError = null;
    },
    addBookSuccess: (state, action) => {
      state.addLoading = false;
      state.items.push(action.payload);
    },
    addBookFailure: (state, action) => {
      state.addLoading = false;
      state.addError = action.payload;
    },

    updateBookStart: (state) => {
      state.updateLoading = true;
      state.updateError = null;
    },
    updateBookSuccess: (state, action) => {
      state.updateLoading = false;
      const index = state.items.findIndex(book => book.id === action.payload.id);
      if (index !== -1) state.items[index] = action.payload;
    },
    updateBookFailure: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },

    deleteBookStart: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
    },
    deleteBookSuccess: (state, action) => {
      state.deleteLoading = false;
      state.items = state.items.filter(book => book.id !== action.payload);
    },
    deleteBookFailure: (state, action) => {
      state.deleteLoading = false;
      state.deleteError = action.payload;
    },
  },
});

export const {
  fetchBooksStart,
  fetchBooksSuccess,
  fetchBooksFailure,

  addBookStart,
  addBookSuccess,
  addBookFailure,

  updateBookStart,
  updateBookSuccess,
  updateBookFailure,

  deleteBookStart,
  deleteBookSuccess,
  deleteBookFailure,
} = booksSlice.actions;

export default booksSlice.reducer;
