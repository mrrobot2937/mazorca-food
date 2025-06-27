export interface Product {
    id: string;
    name: string;
    description: string;
    ingredients: string;
    price: number;
    category: 'arepas' | 'adiciones' | 'bebidas';
    emoji: string;
    isPopular?: boolean;
    isNew?: boolean;
    rating: number;
    reviews: number;
    image?: string;
}

export interface CartItem {
    product: Product;
    quantity: number;
    specialInstructions?: string;
}

export interface CustomerInfo {
    name: string;
    phone: string;
    tableNumber?: string;
    address?: string;
    deliveryInstructions?: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    customerInfo: CustomerInfo;
    orderType: 'mesa' | 'domicilio';
    total: number;
    status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';
    createdAt: Date;
    estimatedTime?: string;
}

export type OrderType = 'mesa' | 'domicilio'; 