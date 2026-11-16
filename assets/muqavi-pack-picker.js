function syncMajoonPackSelection(input) {
  const root = input.closest('.pack-picker');
  if (!root) return;
  root.querySelectorAll('.pack-card--selected').forEach((el) => el.classList.remove('pack-card--selected'));
  const card = input.closest('.pack-card');
  if (card) card.classList.add('pack-card--selected');

  const variantId = input.dataset.variantId;
  if (variantId) {
    document.querySelectorAll('form[data-type="add-to-cart-form"] .product-variant-id').forEach((field) => {
      field.value = variantId;
      field.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }

  const price = input.dataset.packPrice;
  const compare = input.dataset.packCompare;
  if (!price) return;

  const priceRoot = document.querySelector('[id^="price-"]');
  if (!priceRoot) return;

  const saleEl = priceRoot.querySelector('.price-item--sale');
  const compareEl = priceRoot.querySelector('.price-item--regular s, s.price-item--regular');
  if (saleEl && window.Shopify?.formatMoney) {
    saleEl.textContent = window.Shopify.formatMoney(Number(price), window.theme?.moneyFormat);
  }
  if (compareEl && compare && Number(compare) > Number(price) && window.Shopify?.formatMoney) {
    compareEl.textContent = window.Shopify.formatMoney(Number(compare), window.theme?.moneyFormat);
    priceRoot.querySelector('.price')?.classList.add('price--on-sale');
  }
}

document.addEventListener('change', (e) => {
  const input = e.target;
  if (!(input instanceof HTMLInputElement) || !input.classList.contains('pack-card__input')) return;
  syncMajoonPackSelection(input);
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pack-picker').forEach((picker) => {
    const checked = picker.querySelector('.pack-card__input:checked');
    if (checked) {
      syncMajoonPackSelection(checked);
    }
  });

  const renameBuyNow = () => {
    document
      .querySelectorAll('.muqavi-product .shopify-payment-button__button--unbranded')
      .forEach((btn) => {
        const label = btn.querySelector('[data-testid], span') || btn;
        if (label.textContent && !/buy it now/i.test(label.textContent)) {
          label.textContent = 'BUY IT NOW';
        }
      });
  };
  renameBuyNow();
  document.addEventListener('product-info:loaded', renameBuyNow);
});
