// src/hooks/useBooks.js
import { useState, useEffect, useMemo } from 'react';
import { bookService } from '../api/bookService';

export const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    priceRange: { min: 0, max: 100 },
    inStock: null
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  // Fetch all books on component mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookService.getBooks();
        setBooks(data);
      } catch (err) {
        setError('Failed to fetch books. Please try again.');
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filter and search books
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Search by title or author
      const matchesSearch = !searchTerm || 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter by genre
      const matchesGenre = !filters.genre || book.genre === filters.genre;

      // Filter by price range
      const matchesPrice = book.price >= filters.priceRange.min && 
        book.price <= filters.priceRange.max;

      // Filter by stock status
      const matchesStock = filters.inStock === null || book.inStock === filters.inStock;

      return matchesSearch && matchesGenre && matchesPrice && matchesStock;
    });
  }, [books, searchTerm, filters]);

  // Pagination
  const paginatedBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredBooks.slice(startIndex, endIndex);
  }, [filteredBooks, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  // Get unique genres for filter options
  const availableGenres = useMemo(() => {
    return [...new Set(books.map(book => book.genre))].sort();
  }, [books]);

  // Price range for filter
  const priceRange = useMemo(() => {
    if (books.length === 0) return { min: 0, max: 100 };
    const prices = books.map(book => book.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices))
    };
  }, [books]);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const resetFilters = () => {
    setFilters({
      genre: '',
      priceRange: { min: 0, max: 100 },
      inStock: null
    });
    setSearchTerm('');
    setCurrentPage(1);
  };

  return {
    books: paginatedBooks,
    allBooks: books,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    updateFilters,
    resetFilters,
    currentPage,
    setCurrentPage,
    totalPages,
    totalResults: filteredBooks.length,
    availableGenres,
    priceRange,
    itemsPerPage
  };
};

export const useBookDetails = (bookId) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookId) return;

    const fetchBook = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await bookService.getBookById(bookId);
        setBook(data);
      } catch (err) {
        setError('Failed to fetch book details. Please try again.');
        console.error('Error fetching book:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  return { book, loading, error };
};