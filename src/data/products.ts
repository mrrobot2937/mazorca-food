import { Product } from '@/types';

export const products: Product[] = [
    // AREPAS ESPECIALES
    {
        id: 'la-mazorca',
        name: 'La Mazorca',
        description: '🥇 Nuestra original de la casa - Tocineta crocante, maíz tierno, carne desmechada, queso fundido, tomate y lechuga.',
        price: 16900,
        category: 'arepas',
        emoji: '🫓',
        isPopular: true,
        rating: 4.8,
        reviews: 127,
    },
    {
        id: 'la-antioquenita',
        name: 'La Antioqueñita',
        description: 'Inspirada en Antioquia - Carne desmechada, chicharrón crocante, queso derretido, tomate, lechuga y guacamole especial.',
        price: 16900,
        category: 'arepas',
        emoji: '🫓',
        isPopular: true,
        rating: 4.7,
        reviews: 89,
    },
    {
        id: 'la-vallecaucana',
        name: 'La Vallecaucana',
        description: 'Inspirada en el Valle del Cauca - Pollo desmechado, carne desmechada, jamón, queso derretido, lechuga, cebolla, tomate fresco y guacamole especial.',
        price: 17900,
        category: 'arepas',
        emoji: '🫓',
        isNew: true,
        rating: 4.9,
        reviews: 45,
    },
    {
        id: 'choriarepa-deluxe',
        name: 'Choriarepa Deluxe',
        description: 'Un toque criollo irresistible - Chorizo artesanal, maduritos, maíz tierno, queso fundido, tomate, lechuga, cebolla en trozos y tocineta crocante.',
        price: 17500,
        category: 'arepas',
        emoji: '🫓',
        rating: 4.6,
        reviews: 67,
    },
    {
        id: 'verde-tentacion',
        name: 'Verde Tentación',
        description: 'Ideal para vegetarianos - Champiñones salteados, maíz tierno, queso derretido, aguacate, maduritos y tomate en trozos.',
        price: 16900,
        category: 'arepas',
        emoji: '🫓',
        rating: 4.5,
        reviews: 34,
    },
    {
        id: 'areburguer-clasica',
        name: 'Areburguer Clásica',
        description: 'Fusión de sabores en una arepa - Carne tipo hamburguesa, queso fundido, ripio de papa crocante, tocineta, tomate, cebolla asada, lechuga y salsa de la casa.',
        price: 18500,
        category: 'arepas',
        emoji: '🫓',
        rating: 4.7,
        reviews: 78,
    },
    {
        id: 'chicken-burguer-arepa',
        name: 'Chicken Burguer Arepa',
        description: 'Crunchy y jugosa - Pollo apanado, queso derretido, tocineta, maíz tierno, tomate, cebolla, lechuga y salsa de la casa.',
        price: 18500,
        category: 'arepas',
        emoji: '🫓',
        rating: 4.6,
        reviews: 56,
    },

    // ADICIONES
    {
        id: 'nachos-gratinados',
        name: 'Nachos Gratinados',
        description: 'Porción de nachos gratinados con salsas.',
        price: 6000,
        category: 'adiciones',
        emoji: '🧀',
        rating: 4.4,
        reviews: 23,
    },
    {
        id: 'maiz-gratinado',
        name: 'Maíz Gratinado',
        description: 'Maíz gratinado con pollo desmechado.',
        price: 12000,
        category: 'adiciones',
        emoji: '🌽',
        rating: 4.3,
        reviews: 18,
    },

    // BEBIDAS
    {
        id: 'gaseosa-personal',
        name: 'Gaseosa Personal',
        description: 'Gaseosa personal de tu elección.',
        price: 5000,
        category: 'bebidas',
        emoji: '🥤',
        rating: 4.2,
        reviews: 45,
    },
    {
        id: 'jugo-natural',
        name: 'Jugo Natural',
        description: 'Jugo natural fresco de frutas.',
        price: 7000,
        category: 'bebidas',
        emoji: '🍹',
        rating: 4.5,
        reviews: 32,
    },
    {
        id: 'limonada-coco',
        name: 'Limonada de Coco',
        description: 'Refrescante limonada de coco.',
        price: 13000,
        category: 'bebidas',
        emoji: '🥥',
        isPopular: true,
        rating: 4.8,
        reviews: 67,
    },
    {
        id: 'limonada-cereza',
        name: 'Limonada Cereza',
        description: 'Deliciosa limonada de cereza.',
        price: 9000,
        category: 'bebidas',
        emoji: '🍒',
        rating: 4.4,
        reviews: 28,
    },
];

export const getProductsByCategory = (category: Product['category']) => {
    return products.filter(product => product.category === category);
};

export const getPopularProducts = () => {
    return products.filter(product => product.isPopular);
};
