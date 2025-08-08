import { createSlice } from '@reduxjs/toolkit';
import API from '../services/api'; // Axios instance

// API Calls using Axios
const fetchBooksAPI = async () => {
  const res = await API.get('/');
  return res.data;
};

const addBookAPI = async (book) => {
  const res = await API.post('/', book);
  return res.data;
};

const updateBookAPI = async (book) => {
  const res = await API.put(`/${book.id}`, book);
  return res.data;
};

const deleteBookAPI = async (id) => {
  await API.delete(`/${id}`);
};

// Thunks
export const fetchBooks = () => async (dispatch) => {
  dispatch(fetchBooksStart());
  try {
    const books = await fetchBooksAPI();
    dispatch(fetchBooksSuccess(books));
  } catch (error) {
    dispatch(fetchBooksFailure(error.response?.data?.message || error.message));
  }
};

export const addBookAsync = (book) => async (dispatch) => {
  dispatch(addBookStart());
  try {
    const newBook = await addBookAPI(book);
    dispatch(addBookSuccess(newBook));
  } catch (error) {
    dispatch(addBookFailure(error.response?.data?.message || error.message));
  }
};

export const updateBookAsync = (book) => async (dispatch) => {
  dispatch(updateBookStart());
  try {
    const updatedBook = await updateBookAPI(book);
    dispatch(updateBookSuccess(updatedBook));
  } catch (error) {
    dispatch(updateBookFailure(error.response?.data?.message || error.message));
  }
};

export const deleteBookAsync = (id) => async (dispatch) => {
  dispatch(deleteBookStart());
  try {
    await deleteBookAPI(id);
    dispatch(deleteBookSuccess(id));
  } catch (error) {
    dispatch(deleteBookFailure(error.response?.data?.message || error.message));
  }
};

export const toggleReadAsync = (book) => async (dispatch) => {
  dispatch(updateBookStart());
  try {
    const updatedBook = await updateBookAPI({ ...book, read: !book.read });
    dispatch(updateBookSuccess(updatedBook));
  } catch (error) {
    dispatch(updateBookFailure(error.response?.data?.message || error.message));
  }
};

// Redux Slice
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
    // Fetch
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

    // Add
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

    // Update
    updateBookStart: (state) => {
      state.updateLoading = true;
      state.updateError = null;
    },
    updateBookSuccess: (state, action) => {
      state.updateLoading = false;
      const index = state.items.findIndex(book => book.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    updateBookFailure: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },

    // Delete
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

// Actions
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
