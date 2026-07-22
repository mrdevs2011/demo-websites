// ===========================================================================
// TOAST (QISQA BILDIRISHNOMA) KOMPONENTI
// ===========================================================================

let hideTimer = null;

export function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toastIcon');
  const msg = document.getElementById('toastMsg');

  msg.textContent = message;
  icon.className = type === 'success'
    ? "fa-solid fa-circle-check text-green-400"
    : "fa-solid fa-circle-exclamation text-chili-500";

  toast.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
  toast.classList.add('opacity-100', 'translate-y-0');

  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
    toast.classList.remove('opacity-100', 'translate-y-0');
  }, 3200);
}
