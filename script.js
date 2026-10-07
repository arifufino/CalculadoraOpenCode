const form = document.querySelector('#grade-form');
const firstGrade = document.querySelector('#first-grade');
const secondGrade = document.querySelector('#second-grade');
const result = document.querySelector('#result');

function showResult(message, detail, status) {
  result.className = `result ${status}`;
  result.innerHTML = `<strong>${message}</strong>${detail}`;
  result.hidden = false;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [firstGrade, secondGrade];
  let valid = true;

  fields.forEach((field) => {
    const value = field.value.trim() === '' ? NaN : Number(field.value);
    const isValid = Number.isFinite(value) && value >= 0 && value <= 20;
    field.setAttribute('aria-invalid', String(!isValid));
    if (!isValid) valid = false;
  });

  if (!valid) {
    showResult('Revisa tus notas', 'Ingresa un valor entre 0 y 20 en cada aporte.', 'error');
    const invalidField = fields.find((field) => field.getAttribute('aria-invalid') === 'true');
    invalidField.focus();
    return;
  }

  const accumulated = Number(firstGrade.value) + Number(secondGrade.value);
  const total = Number(accumulated.toFixed(2));

  if (total >= 28) {
    showResult('Aprobado', `Tu nota acumulada es ${total}/40. ¡Buen trabajo!`, 'approved');
  } else if (total >= 18) {
    const needed = Math.max(24, 48 - total);
    showResult('Debe rendir examen de recuperación', `Tu nota acumulada es ${total}/40. Necesitas mínimo ${Number(needed.toFixed(2))}/40 para aprobar.`, 'recovery');
  } else {
    showResult('Reprobado', `Tu nota acumulada es ${total}/40.`, 'failed');
  }
});

form.addEventListener('reset', () => {
  result.hidden = true;
  result.textContent = '';
  [firstGrade, secondGrade].forEach((field) => field.removeAttribute('aria-invalid'));
});

[firstGrade, secondGrade].forEach((field) => {
  field.addEventListener('input', () => field.removeAttribute('aria-invalid'));
});
