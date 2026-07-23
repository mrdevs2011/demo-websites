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
  { id: 5,  cat: 'pizza',  name: "Mol Go'shtli Pitsa",    price: 64000,  icon: "fa-pizza-slice",  desc: "Mol go'shti qiyma, qalampir, piyoz, mozarella" },
  { id: 6,  cat: 'pizza',  name: "Dengiz Mahsulotlari Pitsa", price: 72000, icon: "fa-pizza-slice", desc: "Krevetka, kalmar, mozarella, sarimsoqli sous" },
  { id: 7,  cat: 'pizza',  name: "Vegetarian Pitsa",      price: 49000,  icon: "fa-pizza-slice",  desc: "Qo'ziqorin, bulg'or qalampiri, zaytun, makkajo'xori" },
  { id: 8,  cat: 'burger', name: "Klassik Chizburger",    price: 28000,  icon: "fa-burger",       desc: "Mol go'shti, chedder, salat, pomidor" },
  { id: 9,  cat: 'burger', name: "Dubl Beef Burger",      price: 36000,  icon: "fa-burger",       desc: "Ikki qavat mol go'shti, maxsus sous" },
  { id: 10, cat: 'burger', name: "Tovuq Burger",          price: 26000,  icon: "fa-burger",       desc: "Krispi tovuq filesi, achchiq sous, karam" },
  { id: 11, cat: 'burger', name: "Baliq Burger",          price: 29000,  icon: "fa-burger",       desc: "Panirovka qilingan baliq file, tartar sous" },
  { id: 12, cat: 'burger', name: "BBQ Bekon Burger",      price: 38000,  icon: "fa-burger",       desc: "Mol go'shti, qovurilgan bekon, BBQ sous, chedder" },
  { id: 13, cat: 'burger', name: "Mega Chizburger XL",    price: 42000,  icon: "fa-burger",       desc: "Katta hajmli mol go'shti, uch xil pishloq" },
  { id: 14, cat: 'drinks', name: "Coca-Cola 0.5L",        price: 10000,  icon: "fa-bottle-water", desc: "Sovuq gazlangan ichimlik" },
  { id: 15, cat: 'drinks', name: "Fanta 0.5L",            price: 10000,  icon: "fa-bottle-water", desc: "Apelsinli gazlangan ichimlik" },
  { id: 16, cat: 'drinks', name: "Sprite 0.5L",           price: 10000,  icon: "fa-bottle-water", desc: "Limonli gazlangan ichimlik" },
  { id: 17, cat: 'drinks', name: "Toza Suv 0.5L",         price: 5000,   icon: "fa-glass-water",  desc: "Gazsiz mineral suv" },
  { id: 18, cat: 'drinks', name: "Yangi siqilgan sharbat",price: 18000,  icon: "fa-glass-water",  desc: "Apelsindan tabiiy fresh" },
  { id: 19, cat: 'drinks', name: "Milkshake (shokolad)",  price: 22000,  icon: "fa-mug-hot",      desc: "Shokoladli sut kokteyli, krem bilan" },
  { id: 20, cat: 'drinks', name: "Issiq choy",            price: 8000,   icon: "fa-mug-saucer",   desc: "Qora yoki ko'k choy, limon bilan" },
  { id: 21, cat: 'salads', name: "Sezar Salat (tovuq)",   price: 32000,  icon: "fa-bowl-food",    desc: "Grill tovuq, salat bargi, parmezan, krutonlar" },
  { id: 22, cat: 'salads', name: "Yunon Salati",          price: 28000,  icon: "fa-bowl-food",    desc: "Feta pishloq, zaytun, pomidor, bodring" },
  { id: 23, cat: 'salads', name: "Coleslaw Salat",       price: 15000,  icon: "fa-carrot",       desc: "Karam, sabzi, krem-mayonez sous" },
  { id: 24, cat: 'salads', name: "Sabzavotli Salat",      price: 18000,  icon: "fa-leaf",         desc: "Mavsumiy yangi sabzavotlar, zaytun moyi" },
  { id: 25, cat: 'sets',   name: "Oilaviy Set",           price: 145000, icon: "fa-box",          desc: "2 pitsa + 2 burger + 4 ichimlik" },
  { id: 26, cat: 'sets',   name: "Do'stona Set",          price: 98000,  icon: "fa-box",          desc: "1 pitsa + 2 burger + 2 ichimlik" },
  { id: 27, cat: 'sets',   name: "Yakka Set",             price: 52000,  icon: "fa-box",          desc: "1 burger + kartoshka fri + ichimlik" },
  { id: 28, cat: 'sets',   name: "Biznes Lanch Set",      price: 39000,  icon: "fa-box",          desc: "1 burger + salat + ichimlik (tushlik uchun)" },
  { id: 29, cat: 'sets',   name: "Kompaniya Seti (5 kishi)", price: 210000, icon: "fa-box",       desc: "2 pitsa + 3 burger + 5 ichimlik + desert" },
  { id: 30, cat: 'desserts', name: "Shokoladli Tort",     price: 24000,  icon: "fa-cake-candles", desc: "Yumshoq shokoladli bisküvi, krem bilan" },
  { id: 31, cat: 'desserts', name: "Tiramisu",            price: 26000,  icon: "fa-cake-candles", desc: "Klassik italyan deserti, kofe aromati" },
  { id: 32, cat: 'desserts', name: "Muzqaymoq (3 shar)",  price: 16000,  icon: "fa-ice-cream",    desc: "Vanil, shokolad, qulupnay ta'mlari" },
  { id: 33, cat: 'desserts', name: "Belgiya Vaflisi",     price: 20000,  icon: "fa-cookie",       desc: "Shokolad va mevali sous bilan issiq vafli" },
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

export function getProductsByCategory(cat) {
  return cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
}
