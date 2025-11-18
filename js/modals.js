// ========================================
// SEÇÃO: LÓGICA DOS MODAIS
// ========================================

import { bookings } from './globals.js';
import { formatDate, saveBookings } from './data.js';
import { openModal, closeModal, currentMonth, currentYear } from './events.js';

export function confirmBooking() {
  const name = document.getElementById('personName').value.trim();
  const phone = document.getElementById('personPhone').value.trim();
  
  if (!name || !phone) {
    alert('Por favor, preencha nome e telefone.');
    return;
  }

  bookings[window.selectedDate] = { name, phone };
  saveBookings(bookings);

  document.getElementById('confirmDate').textContent = formatDate(window.selectedDate);
  document.getElementById('confirmName').textContent = name;
  document.getElementById('confirmPhone').textContent = phone;

  closeModal('bookingModal');
  openModal('confirmModal');
  
  // Re-render calendar
  import('./calendar.js').then(({ renderCalendar }) => {
    renderCalendar();
  });
}
