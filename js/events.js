// ========================================
// SEÇÃO: EVENTOS DO CALENDÁRIO
// ========================================

export let currentMonth = new Date().getMonth();
export let currentYear = new Date().getFullYear();

const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

export function initCalendarEvents() {
  prevMonthBtn.onclick = () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    import('./calendar.js').then(({ renderCalendar }) => {
      renderCalendar();
    });
  };

  nextMonthBtn.onclick = () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    import('./calendar.js').then(({ renderCalendar }) => {
      renderCalendar();
    });
  };
}

// ========================================
// SEÇÃO: EVENTOS DOS MODAIS
// ========================================

export function initModalEvents() {
  // Botão confirmar agendamento
  document.getElementById('confirmBookingBtn').onclick = () => {
    import('./modals.js').then(({ confirmBooking }) => {
      confirmBooking();
    });
  };

  // Botão cancelar agendamento
  document.getElementById('cancelBookingBtn').onclick = () => {
    closeModal('bookingModal');
  };

  // Botão fechar modal de confirmação
  document.getElementById('closeConfirmBtn').onclick = () => {
    closeModal('confirmModal');
  };
}

// ========================================
// SEÇÃO: FUNÇÕES DOS MODAIS
// ========================================

export function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

export function closeModal(id) {
  document.getElementById(id).style.display = 'none';
  if (id === 'bookingModal') {
    document.getElementById('personName').value = '';
    document.getElementById('personPhone').value = '';
  }
}
