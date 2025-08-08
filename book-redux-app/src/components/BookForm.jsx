import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBookAsync } from '../features/booksSlice';

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-xl font-semibold text-indigo-300 text-center">
        Add a New Book
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Book title"
          className="flex-1 rounded-md px-4 py-2 bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={addLoading}
        />
        <input
          type="text"
          placeholder="Author"
          className="flex-1 rounded-md px-4 py-2 bg-slate-700 text-white placeholder-gray-400 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          disabled={addLoading}
        />
      </div>

      <button
        type="submit"
        disabled={addLoading}
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition disabled:opacity-60"
      >
        {addLoading ? 'Adding...' : '➕ Add Book'}
      </button>

      {addError && (
        <div className="bg-red-800/30 text-red-400 px-4 py-2 rounded text-sm text-center">
          {addError}
        </div>
      )}
    </form>
  );
};

export default BookForm;
