// src/components/BookCard.jsx
import React from 'react';
import { Star, Eye, ShoppingCart } from 'lucide-react';

const StarRating = ({ rating, reviewCount }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <div key={i} className="relative w-4 h-4">
          <Star className="w-4 h-4 text-gray-300 absolute" />
          <div className="overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star key={i} className="w-4 h-4 text-gray-300" />
      );
    }
  }

  return (
    <div className="flex items-center space-x-1">
      <div className="flex" role="img" aria-label={`${rating} out of 5 stars`}>
        {stars}
      </div>
      <span className="text-sm text-gray-600">
        {rating} ({reviewCount} reviews)
      </span>
    </div>
  );
};

const BookCard = ({ book, onViewDetails, className = '' }) => {
  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic would go here
    console.log('Added to cart:', book.title);
  };

  return (
    <div 
      className={`group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${className}`}
      onClick={() => onViewDetails(book)}
      onKeyDown={(e) => handleKeyDown(e, () => onViewDetails(book))}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${book.title} by ${book.author}`}
    >
      {/* Book Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={book.thumbnail}
          alt={`Cover of ${book.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {!book.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold">
              Out of Stock
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(book);
            }}
            className="bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            aria-label={`Quick view ${book.title}`}
          >
            <Eye className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Book Details */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600">by {book.author}</p>
        </div>

        <div className="mb-3">
          <StarRating rating={book.rating} reviewCount={book.reviewCount} />
        </div>

        <div className="mb-3">
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${book.price.toFixed(2)}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!book.inStock}
            className={`p-2 rounded-full transition-all duration-200 ${
              book.inStock
                ? 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } focus:outline-none`}
            aria-label={`Add ${book.title} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>

        {book.inStock && (
          <div className="mt-2 text-xs text-green-600 font-medium">
            ✓ In Stock
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;