import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBooks,
  toggleRead, // If you want to keep toggle read locally
  deleteBookAsync,
  updateBookAsync,
} from '../redux/booksSlice';

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
    <div>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter('all')}
          disabled={filter === 'all'}
          className={`px-4 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('read')}
          disabled={filter === 'read'}
          className={`px-4 py-1 rounded ${filter === 'read' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
        >
          Read
        </button>
        <button
          onClick={() => setFilter('unread')}
          disabled={filter === 'unread'}
          className={`px-4 py-1 rounded ${filter === 'unread' ? 'bg-red-600 text-white' : 'bg-gray-200'}`}
        >
          Unread
        </button>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && filteredBooks.length === 0 && <p className="text-center text-gray-500">No books found.</p>}

      <ul className="space-y-4">
        {filteredBooks.map(({ id, title, author, read }) => (
          <li
            key={id}
            className="bg-gray-50 p-4 rounded border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between"
          >
            {editId === id ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border rounded px-2 py-1 w-full sm:w-1/3"
                  disabled={updateLoading}
                />
                <input
                  type="text"
                  value={editAuthor}
                  onChange={(e) => setEditAuthor(e.target.value)}
                  className="border rounded px-2 py-1 w-full sm:w-1/3"
                  disabled={updateLoading}
                />
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => saveEdit(id)}
                    disabled={updateLoading}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    disabled={updateLoading}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
                {updateError && <p className="text-red-500 mt-2">{updateError}</p>}
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                <div>
                  <strong className="text-lg">{title}</strong> by <span className="italic">{author}</span>
                  <span className={`ml-2 text-sm font-medium ${read ? 'text-green-600' : 'text-red-600'}`}>
                    ({read ? 'Read' : 'Unread'})
                  </span>
                </div>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  {/* Optionally implement toggleRead if your backend supports it */}
                  {/* <button
                    onClick={() => dispatch(toggleRead(id))}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Toggle Read
                  </button> */}
                  <button
                    onClick={() => startEditing({ id, title, author })}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    disabled={deleteLoading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(deleteBookAsync(id))}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    disabled={deleteLoading}
                  >
                    
                    {deleteLoading ? 'Deleting...' : 'Remove'}
                    </button>
                  </div>
                  {deleteError && <p className="text-red-500 mt-2">{deleteError}</p>}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
};
  
  export default BookList;
  