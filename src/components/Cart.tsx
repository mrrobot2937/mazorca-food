'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { X, Plus, Minus, ShoppingBag, Trash2, Clock, MapPin, CreditCard, Sparkles } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { state, updateQuantity, removeItem, getTotalPrice } = useCart();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const total = getTotalPrice();
  const itemCount = state.items.length;

  const handleRemoveItem = async (productId: string) => {
    setIsRemoving(productId);
    await new Promise(resolve => setTimeout(resolve, 300));
    removeItem(productId);
    setIsRemoving(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden transform transition-all duration-500 scale-100">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white p-6 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl animate-pulse delay-1000" />
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShoppingBag className="w-8 h-8" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
                    {itemCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Tu Pedido</h2>
                <p className="text-orange-100 text-sm">¡Delicioso como siempre!</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-100 transition-colors p-2 hover:bg-white/20 rounded-full transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {state.items.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative mb-8">
                <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-yellow-200 rounded-full blur-2xl opacity-30 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-3">Tu carrito está vacío</h3>
              <p className="text-gray-500 text-lg mb-6">¡Agrega algunos productos deliciosos!</p>
              <div className="flex items-center justify-center gap-2 text-orange-500">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">¡Las mejores arepas te esperan!</span>
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div 
                  key={item.product.id} 
                  className={`bg-gradient-to-r from-gray-50 to-orange-50 rounded-2xl p-4 border border-orange-100 transition-all duration-300 ${
                    isRemoving === item.product.id ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 shadow-lg">
                        {item.product.emoji}
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-lg mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-orange-600 text-sm">
                        {formatPrice(item.product.price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">15-20 min</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full transform hover:scale-110"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-orange-100">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.product.id, item.quantity - 1);
                          } else {
                            handleRemoveItem(item.product.id);
                          }
                        }}
                        className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-xl font-bold text-gray-800 min-w-[2.5rem] text-center bg-white px-3 py-2 rounded-lg shadow-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Subtotal</div>
                      <div className="font-bold text-xl bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="p-6 border-t border-orange-100 bg-gradient-to-r from-orange-50 to-yellow-50">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-xl font-semibold text-gray-800">Total</span>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Envío gratuito
                </div>
              </div>
              <div className="text-right">
                <span className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  {formatPrice(total)}
                </span>
                <div className="text-sm text-gray-500">IVA incluido</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-white text-gray-700 py-4 px-6 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 border border-gray-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Seguir Comprando
              </button>
              <button
                onClick={onCheckout}
                className="flex-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-orange-600 hover:via-yellow-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <CreditCard className="w-5 h-5 relative z-10" />
                <span className="relative z-10 ml-2">Realizar Pedido</span>
              </button>
            </div>
            
            {/* Additional Info */}
            <div className="mt-4 p-4 bg-white rounded-xl border border-orange-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-orange-500" />
                <span>Tiempo estimado: <strong>15-20 minutos</strong></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 