// src/api/bookService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const bookService = {
  // Get all books with optional search and filter parameters
  getBooks: async (params = {}) => {
    try {
      const response = await api.get('/books', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },

  // Get a single book by ID
  getBookById: async (id) => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching book ${id}:`, error);
      throw error;
    }
  },

  // Search books by title or author
  searchBooks: async (query) => {
    try {
      const response = await api.get('/books', {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching books:', error);
      throw error;
    }
  },

  // Get books with pagination
  getBooksWithPagination: async (page = 1, limit = 12) => {
    try {
      const response = await api.get('/books', {
        params: {
          _page: page,
          _limit: limit
        }
      });
      
      // JSON Server sends total count in headers
      const totalCount = response.headers['x-total-count'];
      
      return {
        books: response.data,
        totalCount: parseInt(totalCount, 10),
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page
      };
    } catch (error) {
      console.error('Error fetching paginated books:', error);
      throw error;
    }
  }
};

export default bookService;