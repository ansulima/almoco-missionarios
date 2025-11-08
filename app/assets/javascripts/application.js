// app/javascript/application.js
document.addEventListener("DOMContentLoaded", function () {
  const scheduleModal = new bootstrap.Modal(document.getElementById('scheduleModal'));
  const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));

  let selectedDate = null;

  // Abrir modal ao clicar em "Agendar"
  document.querySelectorAll('.schedule-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      selectedDate = this.getAttribute('data-date');
      document.getElementById('modalDate').textContent = selectedDate;
      scheduleModal.show();
    });
  });

  // Confirmar agendamento
  document.getElementById('confirmBtn').addEventListener('click', function () {
    const name = document.getElementById('nameInput').value.trim();
    const phone = document.getElementById('phoneInput').value.trim();

    if (!name || !phone) {
      alert("Preencha nome e telefone!");
      return;
    }

    fetch('/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name=csrf-token]').content
      },
      body: JSON.stringify({
        scheduling: { date: selectedDate, name: name, phone: phone }
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        scheduleModal.hide();
        document.getElementById('confirmBody').innerHTML = `
          <p><strong>Nome:</strong> ${data.scheduling.name}</p>
          <p><strong>Data:</strong> ${data.scheduling.date}</p>
          <p><strong>Telefone:</strong> ${data.scheduling.phone}</p>
        `;
        confirmModal.show();
        setTimeout(() => location.reload(), 2000); // Recarrega após 2s
      } else {
        alert("Erro: " + data.errors.join(', '));
      }
    });
  });
});