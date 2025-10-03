// src/components/BookDetailModal.jsx
import React, { useEffect } from 'react';
import { X, Star, ShoppingCart, Heart, Share2 } from 'lucide-react';

const StarRating = ({ rating, reviewCount, size = 'sm' }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const starSize = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className={`${starSize} fill-yellow-400 text-yellow-400`} />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className={`relative ${starSize}`}>
          <Star className={`${starSize} text-gray-300 absolute`} />
          <div className="overflow-hidden w-1/2">
            <Star className={`${starSize} fill-yellow-400 text-yellow-400`} />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star key={i} className={`${starSize} text-gray-300`} />
      );
    }
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex" role="img" aria-label={`${rating} out of 5 stars`}>
        {stars}
      </div>
      <span className={`text-gray-600 ${size === 'lg' ? 'text-base' : 'text-sm'}`}>
        {rating} ({reviewCount} reviews)
      </span>
    </div>
  );
};

const BookDetailModal = ({ book, isOpen, onClose }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', book.title);
    // Add to cart logic here
  };

  const handleAddToFavorites = () => {
    console.log('Added to favorites:', book.title);
    // Add to favorites logic here
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: book.title,
        text: `Check out "${book.title}" by ${book.author}`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`"${book.title}" by ${book.author} - ${window.location.href}`);
    }
  };

  if (!isOpen || !book) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 modal-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-title"
      aria-describedby="book-description"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="book-title" className="text-2xl font-bold text-gray-900">
            Book Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Book Image */}
            <div className="flex justify-center">
              <div className="relative max-w-sm">
                <img
                  src={book.thumbnail}
                  alt={`Cover of ${book.title}`}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                {!book.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                    <span className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">
                  by {book.author}
                </p>
                <StarRating rating={book.rating} reviewCount={book.reviewCount} size="lg" />
              </div>

              <div>
                <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                  {book.genre}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p id="book-description" className="text-gray-700 leading-relaxed">
                  {book.description}
                </p>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${book.price.toFixed(2)}
                  </span>
                  <div className={`text-sm font-medium ${
                    book.inStock ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {book.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!book.inStock}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
                      book.inStock
                        ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    } focus:outline-none`}
                    aria-label={`Add ${book.title} to cart`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleAddToFavorites}
                    className="p-3 border border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                    aria-label={`Add ${book.title} to favorites`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-3 border border-gray-300 text-gray-600 hover:text-primary-600 hover:border-primary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                    aria-label={`Share ${book.title}`}
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Book Information</h4>
                <dl className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Author:</dt>
                    <dd className="text-gray-900 font-medium">{book.author}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Genre:</dt>
                    <dd className="text-gray-900">{book.genre}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Rating:</dt>
                    <dd className="text-gray-900">{book.rating}/5.0</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Reviews:</dt>
                    <dd className="text-gray-900">{book.reviewCount} reviews</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Status:</dt>
                    <dd className={book.inStock ? 'text-green-600' : 'text-red-600'}>
                      {book.inStock ? 'In Stock' : 'Out of Stock'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailModal;