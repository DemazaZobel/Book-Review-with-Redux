import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookAsync } from '../redux/booksSlice';

const BookForm = () => {
  const dispatch = useDispatch();
  const addLoading = useSelector(state => state.books.addLoading);
  const addError = useSelector(state => state.books.addError);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) return;

    dispatch(addBookAsync({ title, author }));
    setTitle('');
    setAuthor('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Book title"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={addLoading}
        />
        <input
          type="text"
          placeholder="Author"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          disabled={addLoading}
        />
      </div>
      <button
        type="submit"
        disabled={addLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {addLoading ? 'Adding...' : 'Add Book'}
      </button>
      {addError && <p className="text-red-500 mt-2">{addError}</p>}
    </form>
  );
};

export default BookForm;
