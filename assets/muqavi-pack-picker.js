document.addEventListener('change', (e) => {
  const input = e.target;
  if (!(input instanceof HTMLInputElement) || !input.classList.contains('pack-card__input')) return;
  const root = input.closest('.pack-picker');
  if (!root) return;
  root.querySelectorAll('.pack-card--selected').forEach((el) => el.classList.remove('pack-card--selected'));
  const card = input.closest('.pack-card');
  if (card) card.classList.add('pack-card--selected');
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pack-picker').forEach((picker) => {
    const checked = picker.querySelector('.pack-card__input:checked');
    if (checked) {
      const card = checked.closest('.pack-card');
      if (card) card.classList.add('pack-card--selected');
    }
  });
});
