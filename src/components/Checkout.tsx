'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { X, MapPin, Clock, User, Phone, CheckCircle } from 'lucide-react';
import { CustomerInfo, OrderType, Order } from '@/types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete?: (order: Order) => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ isOpen, onClose, onOrderComplete }) => {
  const { state, clearCart, getTotalPrice } = useCart();
  const [orderType, setOrderType] = useState<OrderType>('mesa');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    tableNumber: '',
    address: '',
    deliveryInstructions: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const total = getTotalPrice();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = {
      id: `ORD-${Date.now()}`,
      items: state.items,
      customerInfo,
      orderType,
      total,
      status: 'pending' as const,
      createdAt: new Date(),
      estimatedTime: orderType === 'mesa' ? '15-20 minutos' : '30-45 minutos',
    };

    setOrderComplete(true);
    setIsSubmitting(false);

    // Clear cart after 3 seconds
    setTimeout(() => {
      clearCart();
      onOrderComplete?.(order);
      onClose();
      setOrderComplete(false);
    }, 3000);
  };

  const isFormValid = () => {
    if (orderType === 'mesa') {
      return customerInfo.name && customerInfo.phone && customerInfo.tableNumber;
    } else {
      return customerInfo.name && customerInfo.phone && customerInfo.address;
    }
  };

  if (!isOpen) return null;

  if (orderComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Pedido Confirmado!</h2>
            <p className="text-gray-600 text-lg">
              Tu pedido ha sido recibido y está siendo preparado.
            </p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-6 mb-6">
            <p className="text-lg text-orange-800 font-semibold">
              <Clock className="w-5 h-5 inline mr-2" />
              Tiempo estimado: {orderType === 'mesa' ? '15-20 minutos' : '30-45 minutos'}
            </p>
          </div>
          <div className="animate-pulse">
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 sm:p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold">Completar Pedido</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/20 rounded-full"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* Order Type Selection */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Tipo de Pedido</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => setOrderType('mesa')}
                  className={`p-4 sm:p-6 rounded-2xl border-2 transition-all ${
                    orderType === 'mesa'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" />
                  <div className="font-semibold text-base sm:text-lg">Para Mesa</div>
                  <div className="text-xs sm:text-sm opacity-75">Comer en el restaurante</div>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType('domicilio')}
                  className={`p-4 sm:p-6 rounded-2xl border-2 transition-all ${
                    orderType === 'domicilio'
                      ? 'border-orange-500 bg-orange-50 text-orange-700'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                  }`}
                >
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3" />
                  <div className="font-semibold text-base sm:text-lg">Domicilio</div>
                  <div className="text-xs sm:text-sm opacity-75">Envío a tu dirección</div>
                </button>
              </div>
            </div>

            {/* Customer Information */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Información Personal</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Tu número de teléfono"
                  />
                </div>
              </div>

              {orderType === 'mesa' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Número de Mesa *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerInfo.tableNumber}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, tableNumber: e.target.value })}
                    className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Ej: Mesa 5"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Dirección de Entrega *
                    </label>
                    <textarea
                      required
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Dirección completa"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instrucciones de Entrega
                    </label>
                    <textarea
                      value={customerInfo.deliveryInstructions}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, deliveryInstructions: e.target.value })}
                      className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Instrucciones adicionales para la entrega"
                      rows={2}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Resumen del Pedido</h3>
              <div className="space-y-2 sm:space-y-3">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-center py-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm sm:text-base">{item.product.name}</div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {item.quantity} x {formatPrice(item.product.price)}
                      </div>
                    </div>
                    <div className="font-semibold text-orange-600 text-base sm:text-lg">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 sm:pt-4 mt-3 sm:mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-semibold text-gray-800">Total</span>
                    <span className="text-2xl sm:text-3xl font-bold text-orange-600">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer - Fixed */}
        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <button
            type="submit"
            disabled={!isFormValid() || isSubmitting}
            className={`w-full py-3 sm:py-4 px-6 rounded-2xl font-bold text-white transition-all duration-300 ${
              isFormValid() && !isSubmitting
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              <span className="text-sm sm:text-base">Confirmar Pedido - {formatPrice(total)}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}; 