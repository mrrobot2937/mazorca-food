'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { Plus, Minus, ShoppingCart, Heart, Clock, TrendingUp, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem, getItemQuantity, updateQuantity, removeItem } = useCart();
  const quantity = getItemQuantity(product.id);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-orange-200 transform hover:-translate-y-2 w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Section */}
      <div className="relative h-80 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 left-8 w-32 h-32 bg-orange-300 rounded-full blur-3xl" />
          <div className="absolute bottom-8 right-8 w-28 h-28 bg-yellow-300 rounded-full blur-3xl" />
        </div>
        
        {/* Main Product Emoji */}
        <div className={`text-8xl transition-all duration-500 ${isHovered ? 'scale-110 rotate-2' : 'scale-100'}`}>
          {product.emoji}
        </div>
        
        {/* Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-3">
          {product.isPopular && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              <TrendingUp className="w-4 h-4" />
              Popular
            </div>
          )}
          {product.isNew && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              <Sparkles className="w-4 h-4" />
              Nuevo
            </div>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500 text-white shadow-lg scale-110' 
              : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500 shadow-md'
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Info Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 transform transition-transform duration-300 ${
          isHovered ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="flex items-center justify-center text-white">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5" />
              <span className="text-base font-medium">15-20 min</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-8">
        <div className="mb-6">
          <h3 className="font-bold text-gray-800 text-2xl mb-3 group-hover:text-orange-600 transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              {formatPrice(product.price)}
            </span>
          </div>
          
          {quantity > 0 ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-xl font-bold text-gray-800 min-w-[3rem] text-center bg-gray-50 px-4 py-2 rounded-xl shadow-sm">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 transition-all duration-300 flex items-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Agregar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}; 