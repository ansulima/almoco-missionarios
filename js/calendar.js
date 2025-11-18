// ========================================
// SEÇÃO: RENDERIZAÇÃO DO CALENDÁRIO
// ========================================

import { bookings } from './globals.js';
import { formatDate } from './data.js';
import { currentMonth, currentYear } from './events.js';

const calendarDays = document.getElementById('calendarDays');
const monthYearDisplay = document.getElementById('monthYear');

export function renderCalendar() {
  calendarDays.innerHTML = '';
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const today = new Date();

  const monthName = new Date(currentYear, currentMonth).toLocaleString('pt-BR', { month: 'long' });
  const capitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  monthYearDisplay.textContent = `${capitalized} de ${currentYear}`;

  // Dias vazios
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    empty.classList.add('day', 'other-month');
    calendarDays.appendChild(empty);
  }

  // Dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayEl = document.createElement('div');
    dayEl.classList.add('day');

    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = day;
    dayEl.appendChild(dayNumber);

    if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
      dayEl.classList.add('today');
    }

    if (bookings[dateStr]) {
      dayEl.classList.add('booked');
      const info = document.createElement('div');
      info.className = 'person';
      info.textContent = bookings[dateStr].name;
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancelar';
      cancelBtn.className = 'cancel-btn';
      cancelBtn.onclick = (e) => {
        e.stopPropagation();
        if (confirm(`Cancelar agendamento de ${bookings[dateStr].name} em ${formatDate(dateStr)}?`)) {
          delete bookings[dateStr];
          import('./data.js').then(({ saveBookings }) => {
            saveBookings(bookings);
          });
          renderCalendar();
        }
      };
      dayEl.appendChild(info);
      dayEl.appendChild(cancelBtn);
    }

    dayEl.onclick = () => {
      if (bookings[dateStr]) return;
      window.selectedDate = dateStr;
      document.getElementById('selectedDate').textContent = formatDate(dateStr);
      import('./events.js').then(({ openModal }) => {
        openModal('bookingModal');
      });
    };

    calendarDays.appendChild(dayEl);
  }
}
