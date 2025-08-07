import React from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">📚 Book Library</h1>
        <BookForm />
        <BookList />
      </div>
    </div>
  );
}

export default App;
