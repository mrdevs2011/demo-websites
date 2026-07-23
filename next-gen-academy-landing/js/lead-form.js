let supabaseClient = null;

try {
  if (window.supabase && SUPABASE_URL.indexOf('YOUR_PROJECT_ID') === -1) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
} catch (e) {
  console.warn('Supabase mijozi ishga tushmadi:', e);
}

/**
 * Telegram bot orqali adminga yangi ariza haqida xabar yuboradi.
 * TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID sozlanmagan bo'lsa, jim o'tkazib
 * yuboriladi (xatolik tashlamaydi, forma yuborilishiga xalaqit bermaydi).
 */
async function notifyTelegramLead({ full_name, phone, course }) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn('Telegram sozlanmagan: bildirishnoma yuborilmadi.');
    return;
  }

  const text =
    `🎓 <b>YANGI ARIZA!</b>\n\n` +
    `👤 <b>Ism-familiya:</b> ${full_name}\n` +
    `📞 <b>Telefon:</b> ${phone}\n` +
    `📚 <b>Kurs:</b> ${course}`;

  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
    });
    const result = await res.json();
    if (!result.ok) console.warn('Telegram xabari yuborilmadi:', result.description);
  } catch (err) {
    console.warn("Telegram API bilan bog'lanishda xatolik:", err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const leadForm = document.getElementById('leadForm');
  const leadStatus = document.getElementById('leadStatus');
  const leadSubmitBtn = document.getElementById('leadSubmitBtn');

  if (!leadForm) return;

  function showStatus(message, isError) {
    leadStatus.textContent = message;
    leadStatus.classList.remove('hidden', 'text-emerald-600', 'text-red-600');
    leadStatus.classList.add(isError ? 'text-red-600' : 'text-emerald-600');
  }

  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const full_name = document.getElementById('leadName').value.trim();
    const phone = document.getElementById('leadPhone').value.trim();
    const course = document.getElementById('leadCourse').value;

    if (!full_name || !phone || !course) {
      showStatus("Iltimos, barcha maydonlarni to'ldiring.", true);
      return;
    }

    leadSubmitBtn.disabled = true;
    const originalText = leadSubmitBtn.innerHTML;
    leadSubmitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Yuborilmoqda...';

    try {
      if (!supabaseClient) {
        throw new Error('Supabase ulanmagan. js/supabase-config.js faylida SUPABASE_URL va SUPABASE_ANON_KEY qiymatlarini kiriting.');
      }

      // README'dagi edu_leads sxemasi bilan bir xil ustun nomlari:
      // full_name, phone, course (avval student_name/course_name yuborilib,
      // "not null" ustunlar bo'sh qolgani uchun insert doim xato berardi).
      const { error } = await supabaseClient
        .from('edu_leads')
        .insert([{ full_name, phone, course }]);

      if (error) throw error;

      await notifyTelegramLead({ full_name, phone, course });

      showStatus("Rahmat! Arizangiz qabul qilindi. Tez orada siz bilan bog'lanamiz.", false);
      leadForm.reset();

    } catch (err) {
      console.error('Supabase xatosi:', err);
      showStatus('Xatolik yuz berdi: ' + err.message, true);
    } finally {
      leadSubmitBtn.disabled = false;
      leadSubmitBtn.innerHTML = originalText;
    }
  });
});
