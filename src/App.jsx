// src/App.js
import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useBooks } from './hooks/useBooks';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import BookCard from './components/BookCard';
import BookDetailModal from './components/BookDetailModal';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const {
    books,
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
    totalResults,
    availableGenres,
    priceRange,
    itemsPerPage
  } = useBooks();

  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">BookStore</h1>
          </div>
          <p className="text-gray-600 mt-2">Discover your next favorite book</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            className="mb-6"
          />
          
          <div className="lg:hidden mb-6">
            <details className="bg-white rounded-lg shadow-sm border border-gray-200">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500">
                Filters & Sorting
              </summary>
              <div className="border-t border-gray-200">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={updateFilters}
                  onResetFilters={resetFilters}
                  availableGenres={availableGenres}
                  priceRange={priceRange}
                />
              </div>
            </details>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-4">
              <FilterPanel
                filters={filters}
                onFiltersChange={updateFilters}
                onResetFilters={resetFilters}
                availableGenres={availableGenres}
                priceRange={priceRange}
              />
            </div>
          </div>

          {/* Books Grid */}
          <div className="lg:col-span-3">
            {/* Results Summary */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                {loading ? (
                  <span>Loading...</span>
                ) : (
                  <span>
                    {totalResults} book{totalResults !== 1 ? 's' : ''} found
                    {searchTerm && (
                      <span> for "<strong>{searchTerm}</strong>"</span>
                    )}
                  </span>
                )}
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <div className="flex">
                  <div className="text-red-800">
                    <h3 className="text-sm font-medium">Error</h3>
                    <p className="mt-1 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && books.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || filters.genre || filters.inStock !== null
                    ? "Try adjusting your search or filters"
                    : "No books available at the moment"}
                </p>
                {(searchTerm || filters.genre || filters.inStock !== null) && (
                  <button
                    onClick={resetFilters}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}

            {/* Books Grid */}
            {!loading && !error && books.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {books.map((book) => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onViewDetails={handleViewDetails}
                      className="animate-fade-in"
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  totalResults={totalResults}
                  itemsPerPage={itemsPerPage}
                  className="mt-8"
                />
              </>
            )}
          </div>
        </div>
      </main>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 BookStore. Built with React and JSON Server.</p>
            <p className="mt-2 text-sm">
              Discover amazing books and expand your knowledge.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;