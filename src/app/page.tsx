'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/contexts/CartContext';
import { ProductCard } from '@/components/ProductCard';
import { Cart } from '@/components/Cart';
import { Checkout } from '@/components/Checkout';
import { products } from '@/data/products';
import { ShoppingBag, Menu, X, Search, Filter, MapPin, Clock, Phone } from 'lucide-react';

function MainContent() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', name: 'Todo', emoji: '🍽️' },
    { id: 'arepas', name: 'Arepas Especiales', emoji: '🫓' },
    { id: 'adiciones', name: 'Adiciones', emoji: '➕' },
    { id: 'bebidas', name: 'Bebidas', emoji: '🥤' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🍽️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Mazorca Food
                </h1>
                <p className="text-base text-gray-600">Comida deliciosa</p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-12">
              <div className="relative w-full">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white/70 border border-orange-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500 text-lg"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-3xl hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ShoppingBag className="w-8 h-8" />
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 rounded-2xl bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

          {/* Mobile Search - Only show when menu is open */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-6">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 bg-white/70 border border-orange-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500 text-lg"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Restaurant Info Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Mazorca Food</h2>
              <p className="text-orange-100">La mejor comida colombiana en tu mesa</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Palmira, Colombia</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Abierto • 20-25 min</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+57 300 123 4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-4 px-8 py-4 rounded-3xl font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg transform scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-orange-200'
                }`}
              >
                <span className="text-2xl">{category.emoji}</span>
                <span className="text-lg">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-3">
              {selectedCategory === 'all' ? 'Todos los productos' : 
               categories.find(c => c.id === selectedCategory)?.name}
            </h3>
            <p className="text-gray-600 text-lg">
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3 px-6 py-3 bg-white/80 border border-orange-200 rounded-2xl text-gray-700 hover:bg-orange-50 transition-colors">
              <Filter className="w-5 h-5" />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No se encontraron productos</h3>
            <p className="text-gray-600 mb-6">Intenta con otros términos de búsqueda o categorías</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
            >
              Ver todos los productos
            </button>
          </div>
        )}
      </main>

      {/* Cart Modal */}
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
