(function () {
	function clampMin(value, min) {
		return value < min ? min : value;
	}

	function getQtyInput(itemEl) {
		return itemEl ? itemEl.querySelector('.qty-input') : null;
	}

	function syncMinusButton(itemEl, qty) {
		const minusBtn = itemEl ? itemEl.querySelector('[data-qty="minus"]') : null;
		if (minusBtn) minusBtn.disabled = qty <= 1;
	}

	document.addEventListener('DOMContentLoaded', function () {
		const productGrid = document.querySelector('.product');
		if (!productGrid) return;

		// Initialize minus buttons based on default quantities
		productGrid.querySelectorAll('.item').forEach(function (itemEl) {
			const input = getQtyInput(itemEl);
			const qty = clampMin(parseInt(input && input.value, 10) || 1, 1);
			if (input) input.value = String(qty);
			syncMinusButton(itemEl, qty);
		});

		productGrid.addEventListener('click', function (e) {
			const btn = e.target.closest('.qty-btn');
			if (!btn) return;

			const itemEl = btn.closest('.item');
			const input = getQtyInput(itemEl);
			if (!itemEl || !input) return;

			let qty = clampMin(parseInt(input.value, 10) || 1, 1);
			if (btn.dataset.qty === 'plus') qty += 1;
			if (btn.dataset.qty === 'minus') qty -= 1;
			qty = clampMin(qty, 1);

			input.value = String(qty);
			syncMinusButton(itemEl, qty);
		});
	});
})();
