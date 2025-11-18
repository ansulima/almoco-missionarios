// ========================================
// SEÇÃO: FUNÇÕES DE UTILIDADE
// ========================================

export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const options = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('pt-BR', options)
             .replace(/^\w/, c => c.toUpperCase());
}

export function saveBookings(bookings) {
  localStorage.setItem('lunchBookings', JSON.stringify(bookings));
}
