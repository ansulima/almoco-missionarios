// ========================================
// SEÇÃO: INICIALIZAÇÃO PRINCIPAL
// ========================================

import { renderCalendar } from './calendar.js';
import { initCalendarEvents, initModalEvents } from './events.js';

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  initCalendarEvents();
  initModalEvents();
  renderCalendar();
});
