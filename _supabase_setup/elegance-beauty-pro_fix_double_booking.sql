-- =============================================================================
-- ELEGANCE BEAUTY PRO — DOUBLE-BOOKING MUAMMOSINI TUZATISH
-- -----------------------------------------------------------------------------
-- Supabase Dashboard -> SQL Editor -> shu faylni yopishtirib "Run" tugmasini
-- bosing (combined_schema.sql'dan KEYIN ishga tushiring, chunki bookings
-- jadvali allaqachon mavjud bo'lishi kerak).
-- =============================================================================

-- 1) Xavfsiz "view": faqat band vaqtlarni tekshirish uchun kerakli ustunlar
--    (mijoz ismi/telefoni kabi shaxsiy ma'lumotlar CHIQARILMAYDI).
--    Bu view "postgres" egasi nomidan ishlaydi, shuning uchun bookings
--    jadvalidagi RLS'ni chetlab o'tib, faqat shu 3 ustunni ko'rsatadi.
create or replace view public.booked_slots as
select master_id, booking_date, booking_time
from public.bookings
where status <> 'cancelled';

-- 2) anon roliga shu view'ni o'qish huquqini beramiz (bookings jadvaliga
--    emas, faqat shu xavfsiz view'ga).
grant select on public.booked_slots to anon;

-- 3) DB darajasida himoya: bitta usta + bitta sana + bitta vaqtga
--    ikkinchi marta yozilishga urinilsa, xatolik beradi (race condition
--    holatida ham, ya'ni ikki kishi bir vaqtda "Tasdiqlash"ni bossa ham).
create unique index if not exists bookings_unique_slot
  on public.bookings (master_id, booking_date, booking_time)
  where status <> 'cancelled';
