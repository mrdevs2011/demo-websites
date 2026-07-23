// ===========================================================================
// FORMATLASH YORDAMCHILARI
// ===========================================================================

export function formatSom(amount) {
  // Intl/uz-UZ minglik ajratkichi sifatida NBSP (U+00A0) qaytaradi — bu
  // ko'zga oddiy probelga o'xshasa-da, HTML manbasida boshqacha belgi bo'lib
  // qoladi. Demo va boshqa statik matnlar bilan baytma-bayt bir xil chiqishi
  // uchun oddiy probelga (U+0020) almashtiramiz.
  return amount.toLocaleString('uz-UZ').replace(/\u00A0/g, ' ') + " so'm";
}
