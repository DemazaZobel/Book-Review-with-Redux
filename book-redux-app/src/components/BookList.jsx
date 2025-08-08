import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBooks,
  deleteBookAsync,
  updateBookAsync,
  toggleReadAsync
} from '../features/booksSlice';

const BookList = () => {
  const dispatch = useDispatch();
  const {
    items: books,
    loading,
    error,
    deleteLoading,
    deleteError,
    updateLoading,
    updateError,
  } = useSelector(state => state.books);

  const [filter, setFilter] = useState('all');
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAuthor, setEditAuthor] = useState('');

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books.filter(book => {
    if (filter === 'read') return book.read;
    if (filter === 'unread') return !book.read;
    return true;
  });

  const startEditing = (book) => {
    setEditId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditTitle('');
    setEditAuthor('');
  };

  const saveEdit = (id) => {
    if (!editTitle.trim() || !editAuthor.trim()) return;
    dispatch(updateBookAsync({ id, title: editTitle, author: editAuthor }));
    cancelEditing();
  };

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-3">
        {['all', 'read', 'unread'].map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            disabled={filter === type}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === type
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Status Messages */}
      {loading && <p className="text-center text-indigo-300">Loading books...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}
      {!loading && filteredBooks.length === 0 && (
        <p className="text-center text-gray-400 italic">No books found.</p>
      )}

      {/* Book List */}
      <ul className="space-y-5">
        {filteredBooks.map(({ id, title, author, read }) => (
          <li
            key={id}
            className="bg-slate-700 border border-slate-600 p-5 rounded-xl shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            {editId === id ? (
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="bg-slate-600 text-white px-3 py-2 rounded w-full sm:w-1/3"
                  placeholder="Title"
                  disabled={updateLoading}
                />
                <input
                  type="text"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  className="bg-slate-600 text-white px-3 py-2 rounded w-full sm:w-1/3"
                  placeholder="Author"
                  disabled={updateLoading}
                />
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => saveEdit(id)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
                    disabled={updateLoading}
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
                    disabled={updateLoading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row justify-between w-full">
                <div>
                  <h2 className="text-lg font-semibold text-white">{title}</h2>
                  <p className="text-sm text-gray-400 italic">by {author}</p>
                  <span
                    className={`inline-block mt-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      read ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    {read ? 'Read' : 'Unread'}
                  </span>
                </div>

                <div className="flex gap-2 mt-4 sm:mt-0">
                  <button
                    onClick={() => dispatch(toggleReadAsync({ id, title, author, read }))}
                    className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
                  >
                    Mark as {read ? 'Unread' : 'Read'}
                  </button>
                  <button
                    onClick={() => startEditing({ id, title, author })}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteBookAsync(id))}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    {deleteLoading ? 'Deleting...' : 'Remove'}
                  </button>
                </div>
              </div>
            )}
            {(deleteError || updateError) && (
              <p className="text-red-400 text-sm mt-2">{deleteError || updateError}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
