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
  { id: 1, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop",  cat: 'pizza',  name: "Margarita Pitsa",       price: 45000,  icon: "fa-pizza-slice",  desc: "Pomidor sousi, mozarella pishloq, rayhon" },
  { id: 2, img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=600&auto=format&fit=crop",  cat: 'pizza',  name: "Pepperoni Pitsa",       price: 55000,  icon: "fa-pizza-slice",  desc: "Pepperoni kolbasa, mozarella, achchiq sous" },
  { id: 3, img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600&auto=format&fit=crop",  cat: 'pizza',  name: "BBQ Tovuq Pitsa",       price: 58000,  icon: "fa-pizza-slice",  desc: "Grill tovuq go'shti, BBQ sous, bulg'or qalampiri" },
  { id: 4, img: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop",  cat: 'pizza',  name: "4 Pishloq Pitsa",       price: 62000,  icon: "fa-pizza-slice",  desc: "Mozarella, chedder, parmezan, gorgonzola" },
  { id: 5, img: "https://images.unsplash.com/photo-1593504049359-74330189a345?q=80&w=600&auto=format&fit=crop",  cat: 'pizza',  name: "Mol Go'shtli Pitsa",    price: 64000,  icon: "fa-pizza-slice",  desc: "Mol go'shti qiyma, qalampir, piyoz, mozarella" },
  { id: 6, img: "https://images.unsplash.com/photo-1613564834361-9436948817d1?q=80&w=600&auto=format&fit=crop",  cat: 'pizza',  name: "Dengiz Mahsulotlari Pitsa", price: 72000, icon: "fa-pizza-slice", desc: "Krevetka, kalmar, mozarella, sarimsoqli sous" },
  { id: 7, img: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=600&auto=format&fit=crop",  cat: 'pizza',  name: "Vegetarian Pitsa",      price: 49000,  icon: "fa-pizza-slice",  desc: "Qo'ziqorin, bulg'or qalampiri, zaytun, makkajo'xori" },
  { id: 8, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",  cat: 'burger', name: "Klassik Chizburger",    price: 28000,  icon: "fa-burger",       desc: "Mol go'shti, chedder, salat, pomidor" },
  { id: 9, img: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=600&auto=format&fit=crop",  cat: 'burger', name: "Dubl Beef Burger",      price: 36000,  icon: "fa-burger",       desc: "Ikki qavat mol go'shti, maxsus sous" },
  { id: 10, img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=600&auto=format&fit=crop", cat: 'burger', name: "Tovuq Burger",          price: 26000,  icon: "fa-burger",       desc: "Krispi tovuq filesi, achchiq sous, karam" },
  { id: 11, img: "https://images.unsplash.com/photo-1610440042657-612c34d95e9f?q=80&w=600&auto=format&fit=crop", cat: 'burger', name: "Baliq Burger",          price: 29000,  icon: "fa-burger",       desc: "Panirovka qilingan baliq file, tartar sous" },
  { id: 12, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600&auto=format&fit=crop", cat: 'burger', name: "BBQ Bekon Burger",      price: 38000,  icon: "fa-burger",       desc: "Mol go'shti, qovurilgan bekon, BBQ sous, chedder" },
  { id: 13, img: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05?q=80&w=600&auto=format&fit=crop", cat: 'burger', name: "Mega Chizburger XL",    price: 42000,  icon: "fa-burger",       desc: "Katta hajmli mol go'shti, uch xil pishloq" },
  { id: 14, img: "https://images.unsplash.com/photo-1527960392543-80cd0fa46382?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Coca-Cola 0.5L",        price: 10000,  icon: "fa-bottle-water", desc: "Sovuq gazlangan ichimlik" },
  { id: 15, img: "https://images.unsplash.com/photo-1625740822008-e45abf4e01d5?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Fanta 0.5L",            price: 10000,  icon: "fa-bottle-water", desc: "Apelsinli gazlangan ichimlik" },
  { id: 16, img: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Sprite 0.5L",           price: 10000,  icon: "fa-bottle-water", desc: "Limonli gazlangan ichimlik" },
  { id: 17, img: "https://images.unsplash.com/photo-1533007716222-4b465613a984?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Toza Suv 0.5L",         price: 5000,   icon: "fa-glass-water",  desc: "Gazsiz mineral suv" },
  { id: 18, img: "https://images.unsplash.com/photo-1735643434124-f51889fa1f8c?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Yangi siqilgan sharbat",price: 18000,  icon: "fa-glass-water",  desc: "Apelsindan tabiiy fresh" },
  { id: 19, img: "https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Milkshake (shokolad)",  price: 22000,  icon: "fa-mug-hot",      desc: "Shokoladli sut kokteyli, krem bilan" },
  { id: 20, img: "https://images.unsplash.com/photo-1711154319718-24e9aaac4497?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Issiq choy",            price: 8000,   icon: "fa-mug-saucer",   desc: "Qora yoki ko'k choy, limon bilan" },
  { id: 21, img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600&auto=format&fit=crop", cat: 'salads', name: "Sezar Salat (tovuq)",   price: 32000,  icon: "fa-bowl-food",    desc: "Grill tovuq, salat bargi, parmezan, krutonlar" },
  { id: 22, img: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=600&auto=format&fit=crop", cat: 'salads', name: "Yunon Salati",          price: 28000,  icon: "fa-bowl-food",    desc: "Feta pishloq, zaytun, pomidor, bodring" },
  { id: 23, img: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=600&auto=format&fit=crop", cat: 'salads', name: "Coleslaw Salat",       price: 15000,  icon: "fa-carrot",       desc: "Karam, sabzi, krem-mayonez sous" },
  { id: 24, img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop", cat: 'salads', name: "Sabzavotli Salat",      price: 18000,  icon: "fa-leaf",         desc: "Mavsumiy yangi sabzavotlar, zaytun moyi" },
  { id: 25, img: "https://images.unsplash.com/photo-1517434324-1db605ff03c7?q=80&w=600&auto=format&fit=crop", cat: 'sets',   name: "Oilaviy Set",           price: 145000, icon: "fa-box",          desc: "2 pitsa + 2 burger + 4 ichimlik" },
  { id: 26, img: "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=600&auto=format&fit=crop", cat: 'sets',   name: "Do'stona Set",          price: 98000,  icon: "fa-box",          desc: "1 pitsa + 2 burger + 2 ichimlik" },
  { id: 27, img: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?q=80&w=600&auto=format&fit=crop", cat: 'sets',   name: "Yakka Set",             price: 52000,  icon: "fa-box",          desc: "1 burger + kartoshka fri + ichimlik" },
  { id: 28, img: "https://images.unsplash.com/photo-1528279027-68f0d7fce9f1?q=80&w=600&auto=format&fit=crop", cat: 'sets',   name: "Biznes Lanch Set",      price: 39000,  icon: "fa-box",          desc: "1 burger + salat + ichimlik (tushlik uchun)" },
  { id: 29, img: "https://images.unsplash.com/photo-1552604617-eea98aa27234?q=80&w=600&auto=format&fit=crop", cat: 'sets',   name: "Kompaniya Seti (5 kishi)", price: 210000, icon: "fa-box",       desc: "2 pitsa + 3 burger + 5 ichimlik + desert" },
  { id: 30, img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop", cat: 'desserts', name: "Shokoladli Tort",     price: 24000,  icon: "fa-cake-candles", desc: "Yumshoq shokoladli bisküvi, krem bilan" },
  { id: 31, img: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=600&auto=format&fit=crop", cat: 'desserts', name: "Tiramisu",            price: 26000,  icon: "fa-cake-candles", desc: "Klassik italyan deserti, kofe aromati" },
  { id: 32, img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=600&auto=format&fit=crop", cat: 'desserts', name: "Muzqaymoq (3 shar)",  price: 16000,  icon: "fa-ice-cream",    desc: "Vanil, shokolad, qulupnay ta'mlari" },
  { id: 33, img: "https://images.unsplash.com/photo-1558584724-0e4d32ca55a4?q=80&w=600&auto=format&fit=crop", cat: 'desserts', name: "Belgiya Vaflisi",     price: 20000,  icon: "fa-cookie",       desc: "Shokolad va mevali sous bilan issiq vafli" },
  { id: 34, img: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=600&auto=format&fit=crop", cat: 'pizza',  name: "Peperoni Extra Pitsa",  price: 60000,  icon: "fa-pizza-slice",  desc: "Ikki qatlam pepperoni, mozarella, achchiq yog'" },
  { id: 35, img: "https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=600&auto=format&fit=crop", cat: 'pizza',  name: "Truffle Qo'ziqorin Pitsa", price: 68000, icon: "fa-pizza-slice", desc: "Truffle yog'i, qo'ziqorin, parmezan, rayhon" },
  { id: 36, img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=600&auto=format&fit=crop", cat: 'burger', name: "Double Cheese Burger",  price: 40000,  icon: "fa-burger",       desc: "Ikki qavat mol go'shti, ikki xil pishloq" },
  { id: 37, img: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?q=80&w=600&auto=format&fit=crop", cat: 'burger', name: "Jalapeno Burger",       price: 34000,  icon: "fa-burger",       desc: "Achchiq jalapeno, mol go'shti, nacho sous" },
  { id: 38, img: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?q=80&w=600&auto=format&fit=crop", cat: 'burger', name: "Vegetarian Burger",     price: 27000,  icon: "fa-burger",       desc: "Sabzavotli kotlet, avokado, yashil salat" },
  { id: 39, img: "https://images.unsplash.com/photo-1618799805265-4f27cb61ede9?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Limonad (klassik)",     price: 14000,  icon: "fa-glass-water",  desc: "Uy sharoitida tayyorlangan limonli ichimlik" },
  { id: 40, img: "https://images.unsplash.com/photo-1524802020103-aa46eaffcaa2?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Ayran",                 price: 9000,   icon: "fa-glass-water",  desc: "Sovutilgan tabiiy ayran" },
  { id: 41, img: "https://images.unsplash.com/photo-1543253687-c931c8e01820?q=80&w=600&auto=format&fit=crop", cat: 'drinks', name: "Latte (issiq)",         price: 20000,  icon: "fa-mug-hot",      desc: "Espresso va bug'langan sut" },
  { id: 42, img: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=600&auto=format&fit=crop", cat: 'salads', name: "Tabuli Salat",          price: 22000,  icon: "fa-bowl-food",    desc: "Petrushka, bulg'ur, pomidor, limon sousi" },
  { id: 43, img: "https://images.unsplash.com/photo-1646487793655-bbf280273d2f?q=80&w=600&auto=format&fit=crop", cat: 'salads', name: "Krevetkali Salat",      price: 38000,  icon: "fa-shrimp",       desc: "Krevetka, avokado, rukola, sitrus sousi" },
  { id: 44, img: "https://images.unsplash.com/photo-1700760934249-93efbb574d23?q=80&w=600&auto=format&fit=crop", cat: 'sets',   name: "Vegetarian Set",        price: 68000,  icon: "fa-box",          desc: "1 vegetarian pitsa + salat + ichimlik" },
  { id: 45, img: "https://images.unsplash.com/photo-1594179047519-f347310d3322?q=80&w=600&auto=format&fit=crop", cat: 'sets',   name: "Do'stlar Kompaniyasi Seti (3 kishi)", price: 165000, icon: "fa-box", desc: "2 pitsa + 3 burger + 3 ichimlik" },
  { id: 46, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop", cat: 'desserts', name: "Cheesecake",          price: 28000,  icon: "fa-cake-candles", desc: "Nyu-York uslubidagi yumshoq chizkeyk" },
  { id: 47, img: "https://images.unsplash.com/photo-1702896287488-0a83b9baaab9?q=80&w=600&auto=format&fit=crop", cat: 'desserts', name: "Churros (6 dona)",    price: 18000,  icon: "fa-cookie",       desc: "Shokoladli sous bilan qarsildoq churros" },
];

export function getProductById(id) {
  return PRODUCTS.find(p => p.id === Number(id));
}

export function getProductsByCategory(cat) {
  return cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === cat);
}
