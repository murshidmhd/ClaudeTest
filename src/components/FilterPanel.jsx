// src/components/FilterPanel.jsx
import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onResetFilters, 
  availableGenres, 
  priceRange,
  className = '' 
}) => {
  const handleGenreChange = (genre) => {
    onFiltersChange({ genre: genre === filters.genre ? '' : genre });
  };

  const handlePriceRangeChange = (field, value) => {
    onFiltersChange({
      priceRange: {
        ...filters.priceRange,
        [field]: parseFloat(value)
      }
    });
  };

  const handleStockStatusChange = (inStock) => {
    onFiltersChange({ inStock: inStock === filters.inStock ? null : inStock });
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" aria-hidden="true" />
          Filters
        </h3>
        <button
          onClick={onResetFilters}
          className="text-sm text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1 flex items-center"
          aria-label="Reset all filters"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </button>
      </div>

      {/* Genre Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Genre</h4>
        <div className="space-y-2">
          {availableGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                filters.genre === genre
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              aria-pressed={filters.genre === genre}
              role="button"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label htmlFor="min-price" className="block text-xs text-gray-600 mb-1">
              Min Price: ${filters.priceRange.min}
            </label>
            <input
              id="min-price"
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.priceRange.min}
              onChange={(e) => handlePriceRangeChange('min', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={`Minimum price: $${filters.priceRange.min}`}
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block text-xs text-gray-600 mb-1">
              Max Price: ${filters.priceRange.max}
            </label>
            <input
              id="max-price"
              type="range"
              min={priceRange.min}
              max={priceRange.max}
              value={filters.priceRange.max}
              onChange={(e) => handlePriceRangeChange('max', e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={`Maximum price: $${filters.priceRange.max}`}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange.min}</span>
            <span>${priceRange.max}</span>
          </div>
        </div>
      </div>

      {/* Stock Status Filter */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">Availability</h4>
        <div className="space-y-2">
          <button
            onClick={() => handleStockStatusChange(true)}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              filters.inStock === true
                ? 'bg-green-100 text-green-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            aria-pressed={filters.inStock === true}
            role="button"
          >
            In Stock
          </button>
          <button
            onClick={() => handleStockStatusChange(false)}
            className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              filters.inStock === false
                ? 'bg-red-100 text-red-700 font-medium'
                : 'text-gray-600 hover:bg-gray-50'
            } focus:outline-none focus:ring-2 focus:ring-primary-500`}
            aria-pressed={filters.inStock === false}
            role="button"
          >
            Out of Stock
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;