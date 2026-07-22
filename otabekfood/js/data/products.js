// ===========================================================================
// MAHSULOTLAR MA'LUMOTLAR MANBAI
// ---------------------------------------------------------------------------
// Demo uchun statik massiv sifatida berilgan. Haqiqiy loyihada bu funksiya
// Supabase'dagi "products" jadvalidan quyidagicha o'qishi mumkin:
//
//   import { supabaseClient } from '../services/supabaseClient.js';
//   export async function fetchProducts() {
//     const { data, error } = await supabaseClient.from('products').select('*');
//     if (error) throw error;
//     return data;
//   }
//
// Hozircha oddiylik uchun statik ro'yxat qaytariladi.
// ===========================================================================

export const PRODUCTS = [
  { id: 1,  cat: 'pizza',  name: "Margarita Pitsa",       price: 45000,  icon: "fa-pizza-slice",  desc: "Pomidor sousi, mozarella pishloq, rayhon" },
  { id: 2,  cat: 'pizza',  name: "Pepperoni Pitsa",       price: 55000,  icon: "fa-pizza-slice",  desc: "Pepperoni kolbasa, mozarella, achchiq sous" },
  { id: 3,  cat: 'pizza',  name: "BBQ Tovuq Pitsa",       price: 58000,  icon: "fa-pizza-slice",  desc: "Grill tovuq go'shti, BBQ sous, bulg'or qalampiri" },
  { id: 4,  cat: 'pizza',  name: "4 Pishloq Pitsa",       price: 62000,  icon: "fa-pizza-slice",  desc: "Mozarella, chedder, parmezan, gorgonzola" },
  { id: 5,  cat: 'burger', name: "Klassik Chizburger",    price: 28000,  icon: "fa-burger",       desc: "Mol go'shti, chedder, salat, pomidor" },
  { id: 6,  cat: 'burger', name: "Dubl Beef Burger",      price: 36000,  icon: "fa-burger",       desc: "Ikki qavat mol go'shti, maxsus sous" },
  { id: 7,  cat: 'burger', name: "Tovuq Burger",          price: 26000,  icon: "fa-burger",       desc: "Krispi tovuq filesi, achchiq sous, karam" },
  { id: 8,  cat: 'burger', name: "Baliq Burger",          price: 29000,  icon: "fa-burger",       desc: "Panirovka qilingan baliq file, tartar sous" },
  { id: 9,  cat: 'drinks', name: "Coca-Cola 0.5L",        price: 10000,  icon: "fa-bottle-water", desc: "Sovuq gazlangan ichimlik" },
  { id: 10, cat: 'drinks', name: "Fanta 0.5L",            price: 10000,  icon: "fa-bottle-water", desc: "Apelsinli gazlangan ichimlik" },
  { id: 11, cat: 'drinks', name: "Toza Suv 0.5L",         price: 5000,   icon: "fa-glass-water",  desc: "Gazsiz mineral suv" },
  { id: 12, cat: 'drinks', name: "Yangi siqilgan sharbat",price: 18000,  icon: "fa-glass-water",  desc: "Apelsindan tabiiy fresh" },
  { id: 13, cat: 'sets',   name: "Oilaviy Set",           price: 145000, icon: "fa-box",          desc: "2 pitsa + 2 burger + 4 ichimlik" },
  { id: 14, cat: 'sets',   name: "Do'stona Set",          price: 98000,  icon: "fa-box",          desc: "1 pitsa + 2 burger + 2 ichimlik" },
  { id: 15, cat: 'sets',   name: "Yakka Set",             price: 52000,  icon: "fa-box",          desc: "1 burger + kartoshka fri + ichimlik" },
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

export function getProductsByCategory(cat) {
  return cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
}
