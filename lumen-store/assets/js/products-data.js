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
  { id: 201, cat: 'poyabzal', name: "Klassik oq krossovka", price: 399000, oldPrice: 520000, img: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop' },
  { id: 202, cat: 'poyabzal', name: "Charm boot poyabzal", price: 459000, oldPrice: null, img: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop' },
  { id: 203, cat: 'poyabzal', name: "Yengil running krossovka", price: 329000, oldPrice: 410000, img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop' },
  { id: 204, cat: 'poyabzal', name: "Klassik loafer", price: 379000, oldPrice: null, img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop' },
  { id: 301, cat: 'aksessuar', name: "Minimalist charm sumka", price: 259000, oldPrice: 320000, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop' },
  { id: 302, cat: 'aksessuar', name: "Klassik uniseks soat", price: 449000, oldPrice: 599000, img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop' },
  { id: 303, cat: 'aksessuar', name: "Charm kamar", price: 99000, oldPrice: null, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop' },
  { id: 304, cat: 'aksessuar', name: "Quyosh ko'zoynagi", price: 139000, oldPrice: 180000, img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop' },
];

App.SIZES = ['S', 'M', 'L', 'XL'];
