/* =========================================================================
   products-data.js
   -------------------------------------------------------------------------
   Namunaviy mahsulotlar ro'yxati. Real loyihada bu massiv o'rniga
   Supabase'dagi "products" jadvalidan fetch qilish mumkin, masalan:

     const { data } = await App.supabase.from('products').select('*');
     App.PRODUCTS = data;

   Hozircha frontend mustaqil ishlashi uchun statik ro'yxat qo'yilgan.
   ========================================================================= */

window.App = window.App || {};

App.PRODUCTS = [
  { id: 101, cat: 'kiyim', name: "Oversize xlopok futbolka", price: 129000, oldPrice: 189000, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
  { id: 102, cat: 'kiyim', name: "Klassik denim kurtka", price: 349000, oldPrice: 459000, img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=800&auto=format&fit=crop' },
  { id: 103, cat: 'kiyim', name: "Bo'yinbog'li trikotaj sviter", price: 219000, oldPrice: null, img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop' },
  { id: 104, cat: 'kiyim', name: "Yengil bomber kurtka", price: 289000, oldPrice: 379000, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop' },
  { id: 105, cat: 'kiyim', name: "Klassik oq ko'ylak", price: 175000, oldPrice: null, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop' },
  { id: 106, cat: 'kiyim', name: "Sport shim (jogger)", price: 165000, oldPrice: 210000, img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop' },
  { id: 107, cat: 'kiyim', name: "Bazaviy xlopok futbolka", price: 99000, oldPrice: 139000, img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
  { id: 108, cat: 'kiyim', name: "Casual denim kurtka", price: 329000, oldPrice: null, img: 'https://images.unsplash.com/photo-1551537482-f2075a1d41f2?q=80&w=800&auto=format&fit=crop' },
  { id: 109, cat: 'kiyim', name: "Yumshoq trikotaj kardigan", price: 235000, oldPrice: 299000, img: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop' },
  { id: 110, cat: 'kiyim', name: "Shaharcha bomber kurtka", price: 305000, oldPrice: null, img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop' },
  { id: 111, cat: 'kiyim', name: "Ofis uslubidagi ko'ylak", price: 189000, oldPrice: 245000, img: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop' },
  { id: 112, cat: 'kiyim', name: "Sport kostyum shim", price: 149000, oldPrice: null, img: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=800&auto=format&fit=crop' },
  { id: 201, cat: 'poyabzal', name: "Klassik oq krossovka", price: 399000, oldPrice: 520000, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop' },
  { id: 202, cat: 'poyabzal', name: "Charm boot poyabzal", price: 459000, oldPrice: null, img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop' },
  { id: 203, cat: 'poyabzal', name: "Yengil running krossovka", price: 329000, oldPrice: 410000, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' },
  { id: 204, cat: 'poyabzal', name: "Klassik loafer", price: 379000, oldPrice: null, img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop' },
  { id: 205, cat: 'poyabzal', name: "Kundalik oq krossovka", price: 359000, oldPrice: null, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop' },
  { id: 206, cat: 'poyabzal', name: "Premium charm boot", price: 499000, oldPrice: 620000, img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop' },
  { id: 207, cat: 'poyabzal', name: "Trenirovka uchun krossovka", price: 349000, oldPrice: null, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' },
  { id: 208, cat: 'poyabzal', name: "Ofis loafer", price: 399000, oldPrice: 469000, img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop' },
  { id: 301, cat: 'aksessuar', name: "Minimalist charm sumka", price: 259000, oldPrice: 320000, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop' },
  { id: 302, cat: 'aksessuar', name: "Klassik uniseks soat", price: 449000, oldPrice: 599000, img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop' },
  { id: 303, cat: 'aksessuar', name: "Charm kamar", price: 99000, oldPrice: null, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop' },
  { id: 304, cat: 'aksessuar', name: "Quyosh ko'zoynagi", price: 139000, oldPrice: 180000, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop' },
  { id: 305, cat: 'aksessuar', name: "Kundalik charm sumka", price: 229000, oldPrice: null, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop' },
  { id: 306, cat: 'aksessuar', name: "Sport uslubidagi soat", price: 389000, oldPrice: 469000, img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop' },
  { id: 307, cat: 'aksessuar', name: "Yupqa charm kamar", price: 89000, oldPrice: null, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop' },
  { id: 308, cat: 'aksessuar', name: "Klassik quyosh ko'zoynagi", price: 149000, oldPrice: null, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop' },
  { id: 309, cat: 'aksessuar', name: "Charm hamyon (erkaklar)", price: 119000, oldPrice: 155000, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop' },
  { id: 310, cat: 'aksessuar', name: "Ipak ro'mol", price: 89000, oldPrice: null, img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=800&auto=format&fit=crop' },

  { id: 401, cat: 'sport', name: "Yugurish uchun sport kostyum", price: 279000, oldPrice: 349000, img: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=800&auto=format&fit=crop' },
  { id: 402, cat: 'sport', name: "Fitnes uchun leggins", price: 145000, oldPrice: null, img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop' },
  { id: 403, cat: 'sport', name: "Sport uchun tank-top", price: 89000, oldPrice: 119000, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=800&auto=format&fit=crop' },
  { id: 404, cat: 'sport', name: "Yoga kilimchasi", price: 165000, oldPrice: null, img: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop' },
  { id: 405, cat: 'sport', name: "Trenirovka uchun krossovka Pro", price: 419000, oldPrice: 520000, img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop' },
  { id: 406, cat: 'sport', name: "Sport ryukzagi", price: 199000, oldPrice: 249000, img: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?q=80&w=800&auto=format&fit=crop' },
  { id: 407, cat: 'sport', name: "Kompression sport shim", price: 135000, oldPrice: null, img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop' },
  { id: 408, cat: 'sport', name: "Sport bandana va peshonaband", price: 45000, oldPrice: null, img: 'https://images.unsplash.com/photo-1457449205106-d0aad138e99b?q=80&w=800&auto=format&fit=crop' },

  { id: 501, cat: 'uy-tovarlari', name: "Bambuk choy stakan seti (4 ta)", price: 189000, oldPrice: 230000, img: 'https://images.unsplash.com/photo-1516600164266-f3b8166ae679?q=80&w=800&auto=format&fit=crop' },
  { id: 502, cat: 'uy-tovarlari', name: "Aromatik shamlar to'plami", price: 99000, oldPrice: null, img: 'https://images.unsplash.com/photo-1643122966676-29e8597257f7?q=80&w=800&auto=format&fit=crop' },
  { id: 503, cat: 'uy-tovarlari', name: "Yumshoq pled (150x200)", price: 249000, oldPrice: 299000, img: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?q=80&w=800&auto=format&fit=crop' },
  { id: 504, cat: 'uy-tovarlari', name: "Keramik krujka seti (2 ta)", price: 79000, oldPrice: null, img: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop' },
  { id: 505, cat: 'uy-tovarlari', name: "Dekorativ yostiq g'ilofi", price: 65000, oldPrice: 89000, img: 'https://images.unsplash.com/photo-1570786240066-c0d753711cfe?q=80&w=800&auto=format&fit=crop' },
  { id: 506, cat: 'uy-tovarlari', name: "Bezakli devor soati", price: 175000, oldPrice: null, img: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?q=80&w=800&auto=format&fit=crop' },
];

App.SIZES = ['S', 'M', 'L', 'XL'];
