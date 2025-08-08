import React from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 flex items-center justify-center p-6">
      <div className="bg-slate-800 rounded-2xl shadow-xl w-full max-w-4xl p-8 space-y-6 border border-slate-700">
        <h1 className="text-3xl font-extrabold text-center text-indigo-400">
          📚 MyBookShelf
        </h1>
        <BookForm />
        <BookList />
      </div>
    </div>
  );
}

export default App;
