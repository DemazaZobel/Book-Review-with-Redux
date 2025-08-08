// seed.js
import Book from "./models/book.js";
import { db } from "./config/db.js";

const seedBooks = async () => {
  try {
    await db.sync({ force: true }); // Reset tables (optional)

    const books = [
      { title: "The Great Gatsby", author: "F. Scott Fitzgerald", read: true },
      { title: "To Kill a Mockingbird", author: "Harper Lee", read: true },
      { title: "1984", author: "George Orwell", read: false },
      { title: "Pride and Prejudice", author: "Jane Austen", read: true },
      { title: "The Hobbit", author: "J.R.R. Tolkien", read: false },
      { title: "Moby-Dick", author: "Herman Melville", read: false },
      { title: "The Catcher in the Rye", author: "J.D. Salinger", read: false },
      { title: "War and Peace", author: "Leo Tolstoy", read: false },
      { title: "Brave New World", author: "Aldous Huxley", read: true },
      { title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", read: false },
      { title: "Crime and Punishment", author: "Fyodor Dostoevsky", read: true },
      { title: "Anna Karenina", author: "Leo Tolstoy", read: true },
      { title: "The Alchemist", author: "Paulo Coelho", read: true },
      { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", read: true },
      { title: "The Lord of the Rings", author: "J.R.R. Tolkien", read: false },
      { title: "Jane Eyre", author: "Charlotte Brontë", read: false },
      { title: "The Chronicles of Narnia", author: "C.S. Lewis", read: true },
      { title: "A Tale of Two Cities", author: "Charles Dickens", read: false },
      { title: "The Kite Runner", author: "Khaled Hosseini", read: true },
      { title: "One Hundred Years of Solitude", author: "Gabriel García Márquez", read: false },
    ];

    await Book.bulkCreate(books);
    console.log("✅ Successfully seeded books!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding books:", error);
    process.exit(1);
  }
};

seedBooks();
