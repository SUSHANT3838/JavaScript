(function () {
	function clampMin(value, min) {
		return value < min ? min : value;
	}

	function escapeHtml(text) {
		return String(text)
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#039;');
	}

	function getQtyInput(itemEl) {
		return itemEl ? itemEl.querySelector('.qty-input') : null;
	}

	function getUnitPrice(itemEl) {
		if (!itemEl) return 0;
		const fromData = parseFloat(itemEl.dataset.price);
		if (!Number.isNaN(fromData) && fromData > 0) return fromData;
		const unitPriceEl = itemEl.querySelector('.unit-price');
		const fromText = parseFloat(unitPriceEl ? unitPriceEl.textContent : '0');
		return Number.isNaN(fromText) ? 0 : fromText;
	}

	function getProductName(itemEl) {
		if (!itemEl) return '';
		if (itemEl.dataset.name) return itemEl.dataset.name;
		const h2 = itemEl.querySelector('h2');
		return h2 ? h2.textContent.trim() : '';
	}

	function syncTotal(itemEl) {
		const input = getQtyInput(itemEl);
		const totalEl = itemEl ? itemEl.querySelector('.total-price') : null;
		if (!input || !totalEl) return;
		const qty = clampMin(parseInt(input.value, 10) || 1, 1);
		const unit = getUnitPrice(itemEl);
		totalEl.textContent = String(unit * qty);
	}

	function syncMinusButton(itemEl, qty) {
		const minusBtn = itemEl ? itemEl.querySelector('[data-qty="minus"]') : null;
		if (minusBtn) minusBtn.disabled = qty <= 1;
	}

	function openReceiptWindow(details) {
		const w = window.open('', '_blank', 'noopener,noreferrer');
		if (!w) {
			alert('Popup blocked. Please allow popups to open the receipt.');
			return;
		}

		const now = new Date();
		const dateStr = now.toLocaleString();
		const safeName = escapeHtml(details.productName);
		const receiptNo = Math.floor(Math.random() * 90000 + 10000);

		w.document.open();
		w.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Receipt - Ranjit-ColdDrink-Shop</title>
	<style>
		*{ box-sizing: border-box; font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; }
		body{ margin: 20px; color: #111; }
		.top{ display:flex; justify-content: space-between; gap: 16px; align-items: flex-start; flex-wrap: wrap; }
		h1{ margin: 0 0 6px; font-size: 22px; }
		.muted{ color: #555; font-size: 12px; }
		.box{ border: 1px solid #ddd; padding: 12px; border-radius: 10px; }
		.grid{ display:grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
		label{ display:block; font-size: 12px; color:#444; margin-bottom: 4px; }
		input, textarea{ width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 8px; }
		textarea{ min-height: 64px; resize: vertical; }
		table{ width: 100%; border-collapse: collapse; margin-top: 12px; }
		th, td{ border-bottom: 1px solid #eee; padding: 10px 6px; text-align: left; }
		th{ font-size: 12px; color: #444; }
		.right{ text-align: right; }
		.total{ font-weight: 700; font-size: 16px; }
		.actions{ margin-top: 14px; display:flex; gap: 10px; flex-wrap: wrap; }
		button{ padding: 10px 14px; border-radius: 10px; border: 1px solid #333; background: #111; color: #fff; cursor: pointer; }
		button.secondary{ background: #fff; color: #111; }
		.hint{ margin-top: 8px; font-size: 12px; color: #555; }
		@media (max-width: 640px){ .grid{ grid-template-columns: 1fr; } }
		@media print{ .actions, .hint{ display:none; } body{ margin: 0; } .box{ border: none; padding: 0; } }
	</style>
</head>
<body>
	<div class="top">
		<div>
			<h1>Ranjit-ColdDrink-Shop</h1>
			<div class="muted">Receipt generated: ${escapeHtml(dateStr)}</div>
		</div>
		<div class="box" style="min-width:240px;">
			<div class="muted">Receipt No (editable)</div>
			<div contenteditable="true" style="font-weight:700; padding-top:4px;">#${receiptNo}</div>
		</div>
	</div>

	<div class="grid">
		<div class="box">
			<label>Customer Name (editable)</label>
			<input type="text" placeholder="Enter customer name" />
			<div style="height:8px"></div>
			<label>Phone (editable)</label>
			<input type="text" placeholder="Enter phone" />
		</div>
		<div class="box">
			<label>Address (editable)</label>
			<textarea placeholder="Enter address"></textarea>
		</div>
	</div>

	<div class="box" style="margin-top: 12px;">
		<table>
			<thead>
				<tr>
					<th>Item</th>
					<th class="right">Unit Price</th>
					<th class="right">Qty</th>
					<th class="right">Line Total</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td contenteditable="true">${safeName}</td>
					<td class="right" contenteditable="true">Rs ${details.unitPrice}</td>
					<td class="right" contenteditable="true">${details.qty}</td>
					<td class="right" contenteditable="true">Rs ${details.total}</td>
				</tr>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3" class="right total">Grand Total</td>
					<td class="right total">Rs ${details.total}</td>
				</tr>
			</tfoot>
		</table>

		<div class="actions">
			<button onclick="window.print()">Print</button>
			<button class="secondary" onclick="window.close()">Close</button>
		</div>
		<div class="hint">Tip: Edit customer details before printing.</div>
	</div>
</body>
</html>`);
		w.document.close();
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
			syncTotal(itemEl);
		});

		productGrid.addEventListener('click', function (e) {
			const buyBtn = e.target.closest('.buy-now');
			if (buyBtn) {
				const itemEl = buyBtn.closest('.item');
				if (!itemEl) return;
				const input = getQtyInput(itemEl);
				const qty = clampMin(parseInt(input && input.value, 10) || 1, 1);
				const unitPrice = getUnitPrice(itemEl);
				const productName = getProductName(itemEl);
				openReceiptWindow({
					productName,
					unitPrice,
					qty,
					total: unitPrice * qty,
				});
				return;
			}

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
			syncTotal(itemEl);
		});
	});
})();
