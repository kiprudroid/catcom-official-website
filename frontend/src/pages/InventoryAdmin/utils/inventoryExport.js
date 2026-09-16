/* Inventory PDF exports — mirrors attendanceExport.js pattern (HTML + window.print) */

const STATUS_COLORS = {
  pending: { color: "#92400e", bg: "#fef3c7" },
  approved: { color: "#1d4ed8", bg: "#dbeafe" },
  issued: { color: "#6d28d9", bg: "#ede9fe" },
  returned: { color: "#15803d", bg: "#dcfce7" },
  cancelled: { color: "#6b7280", bg: "#f3f4f6" },
  overdue: { color: "#dc2626", bg: "#fee2e2" },
};

const PAYMENT_COLORS = {
  unpaid: { color: "#dc2626", bg: "#fee2e2" },
  partial: { color: "#d97706", bg: "#fef3c7" },
  paid: { color: "#15803d", bg: "#dcfce7" },
  waived: { color: "#6b7280", bg: "#f3f4f6" },
};

const CONDITION_COLORS = {
  new: { color: "#15803d", bg: "#dcfce7" },
  good: { color: "#1d4ed8", bg: "#dbeafe" },
  fair: { color: "#92400e", bg: "#fef3c7" },
  damaged: { color: "#dc2626", bg: "#fee2e2" },
  lost: { color: "#6b7280", bg: "#f3f4f6" },
  disposed: { color: "#6b7280", bg: "#f3f4f6" },
};

const esc = (v) =>
  String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const openPrintWindow = (html) => {
  const win = window.open("", "_blank", "width=1000,height=700");
  if (!win) {
    alert("Please allow popups for this site and try again.");
    return;
  }
  win.document.write(html);
  win.document.close();
  win.onload = () => {
    setTimeout(() => {
      win.focus();
      win.print();
    }, 300);
  };
  setTimeout(() => {
    if (win && !win.closed) {
      win.focus();
      win.print();
    }
  }, 700);
};

const baseStyle = `
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
  body{font-family:'Segoe UI',sans-serif;padding:32px;color:#1c3a3a;margin:0;}
  h1{font-size:20px;font-weight:800;margin:0 0 4px;}
  h2{font-size:15px;font-weight:800;margin:24px 0 8px;color:#1c3a3a;}
  p{font-size:13px;color:#6b7280;margin:0;}
  .summary{display:flex;gap:10px;margin:14px 0 18px;flex-wrap:wrap;}
  .chip{padding:5px 14px;border-radius:8px;font-size:12px;font-weight:700;}
  table{width:100%;border-collapse:collapse;font-size:13px;margin-top:4px;}
  th{background:#1c3a3a;color:white;padding:9px 10px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:.07em;}
  td{padding:8px 10px;border-bottom:1px solid #f3f4f6;vertical-align:top;}
  .footer{margin-top:28px;font-size:11px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:10px;}
  .badge{padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;display:inline-block;}
  .muted{font-size:11px;color:#6b7280;}
`;

// ─── Inventory (Ledger) PDF ───
export const exportInventoryPDF = (items, groupName, stats) => {
  const totalQty = items.reduce((s, it) => s + Number(it.quantity_total || 0), 0);
  const totalAvail = items.reduce((s, it) => s + Number(it.quantity_available || 0), 0);
  const totalValue = stats?.total_value ?? items.reduce((s, it) => s + Number(it.acquisition_cost || 0) * Number(it.quantity_total || 0), 0);
  const low = items.filter((it) => Number(it.quantity_available) <= 2 && Number(it.quantity_available) > 0).length;
  const out = items.filter((it) => Number(it.quantity_available) === 0).length;

  const rows = items
    .map((it, i) => {
      const cc = CONDITION_COLORS[it.condition] || { color: "#374151", bg: "#f3f4f6" };
      return `<tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
      <td>${i + 1}</td>
      <td><strong>${esc(it.name)}</strong>${it.description ? `<div class="muted">${esc(it.description)}</div>` : ""}</td>
      <td style="text-align:center;${Number(it.quantity_available) <= 2 ? "color:#dc2626;font-weight:700" : ""}">${esc(it.quantity_available)} / ${esc(it.quantity_total)}</td>
      <td>${esc(it.unit)}</td>
      <td><span class="badge" style="background:${cc.bg};color:${cc.color}">${esc(it.condition)}</span></td>
      <td style="text-align:center">${it.is_bookable ? '<span style="color:#15803d;font-weight:700">✓ Yes</span>' : "—"}</td>
      <td style="text-align:right">${Number(it.unit_cost) ? `KES ${Number(it.unit_cost).toLocaleString()}` : "—"}</td>
      <td style="text-align:right">${Number(it.acquisition_cost) ? `KES ${Number(it.acquisition_cost).toLocaleString()}` : "—"}</td>
    </tr>`;
    })
    .join("");

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${esc(groupName)} — Inventory Ledger</title>
<style>${baseStyle}</style></head><body>
<h1>${esc(groupName) || "Group"} — Inventory Ledger</h1>
<p>Date: <strong>${new Date().toLocaleDateString("en-KE", { dateStyle: "long" })}</strong> &nbsp;·&nbsp; Items: <strong>${items.length}</strong></p>
<div class="summary">
  <span class="chip" style="background:#dbeafe;color:#1d4ed8">Items: ${items.length}</span>
  <span class="chip" style="background:#dcfce7;color:#15803d">Available: ${totalAvail} / ${totalQty}</span>
  <span class="chip" style="background:#f3f4f6;color:#374151">Value: KES ${Number(totalValue).toLocaleString()}</span>
  <span class="chip" style="background:${out ? "#fee2e2" : "#f3f4f6"};color:${out ? "#dc2626" : "#374151"}">${out} out · ${low} low</span>
</div>
<table><thead><tr><th>#</th><th>Item</th><th>Qty (avail/total)</th><th>Unit</th><th>Condition</th><th>Bookable</th><th>Unit Cost</th><th>Acq. Cost</th></tr></thead>
<tbody>${rows || `<tr><td colspan="8" style="text-align:center;color:#9ca3af;padding:24px">No items</td></tr>`}</tbody></table>
<div class="footer">JKUAT CATCOM Inventory · Generated: ${new Date().toLocaleString()}</div>
</body></html>`;
  openPrintWindow(html);
};

// ─── Bookings PDF ───
export const exportBookingsPDF = (bookings, groupName, stats) => {
  const pending = bookings.filter((b) => b.status === "pending").length;
  const approved = bookings.filter((b) => b.status === "approved").length;
  const issued = bookings.filter((b) => b.status === "issued").length;
  const returned = bookings.filter((b) => b.status === "returned").length;
  const overdue = bookings.filter((b) => b.status === "overdue" || b.is_overdue).length;

  const rows = bookings
    .map((b, i) => {
      const sc = STATUS_COLORS[b.status] || PAYMENT_COLORS.unpaid;
      const pc = PAYMENT_COLORS[b.payment_status] || { color: "#6b7280", bg: "#f3f4f6" };
      return `<tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
      <td>${i + 1}</td>
      <td><strong>${esc(b.item_name || b.item_id)}</strong>${b.item_category ? `<div class="muted">${esc(b.item_category)}</div>` : ""}</td>
      <td>${esc(b.booked_by_name)}<div class="muted">${esc(b.booked_by_phone || "")} ${esc(b.borrower_type || "")}</div>${b.booked_by_email ? `<div class="muted">${esc(b.booked_by_email)}</div>` : ""}</td>
      <td style="text-align:center">${esc(b.quantity)}</td>
      <td>${esc(String(b.booking_date).slice(0, 10))} → ${esc(String(b.return_due_date).slice(0, 10))}${b.return_date ? `<div style="color:#059669;font-size:11px">returned ${esc(String(b.return_date).slice(0, 10))}</div>` : ""}${b.is_overdue ? `<div style="color:#dc2626;font-weight:700;font-size:11px">OVERDUE</div>` : ""}</td>
      <td style="text-align:right">KES ${Number(b.amount_paid).toLocaleString()} / ${Number(b.total_cost).toLocaleString()}<div class="muted">unit ${Number(b.unit_cost).toLocaleString()}</div></td>
      <td><span class="badge" style="background:${sc.bg};color:${sc.color}">${esc(b.status)}</span></td>
      <td><span class="badge" style="background:${pc.bg};color:${pc.color}">${esc(b.payment_status)}</span></td>
    </tr>`;
    })
    .join("");

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${esc(groupName)} — Bookings Report</title>
<style>${baseStyle}</style></head><body>
<h1>${esc(groupName) || "Group"} — Bookings</h1>
<p>Date: <strong>${new Date().toLocaleDateString("en-KE", { dateStyle: "long" })}</strong> &nbsp;·&nbsp; Bookings: <strong>${bookings.length}</strong></p>
<div class="summary">
  <span class="chip" style="background:#fef3c7;color:#92400e">Pending: ${pending}</span>
  <span class="chip" style="background:#dbeafe;color:#1d4ed8">Approved: ${approved}</span>
  <span class="chip" style="background:#ede9fe;color:#6d28d9">Issued: ${issued}</span>
  <span class="chip" style="background:#dcfce7;color:#15803d">Returned: ${returned}</span>
  <span class="chip" style="background:#fee2e2;color:#dc2626">Overdue: ${overdue}</span>
</div>
<table><thead><tr><th>#</th><th>Item</th><th>Borrower</th><th>Qty</th><th>Dates</th><th>Cost (paid/total)</th><th>Status</th><th>Payment</th></tr></thead>
<tbody>${rows || `<tr><td colspan="8" style="text-align:center;color:#9ca3af;padding:24px">No bookings</td></tr>`}</tbody></table>
<div class="footer">JKUAT CATCOM Inventory · Generated: ${new Date().toLocaleString()}</div>
</body></html>`;
  openPrintWindow(html);
};

// ─── Superadmin combined export ───
export const exportSuperAdminPDF = ({ groups, itemsByGroup, bookingsByGroup, includeInventory, includeBookings }) => {
  const groupNames = groups.map((g) => g.name).join(", ");
  const titleGroups = groups.length === 1 ? groups[0].name : `${groups.length} Groups`;
  const allItems = Object.values(itemsByGroup).flat();
  const allBookings = Object.values(bookingsByGroup).flat();

  // Inventory section (with Group column when multi-group)
  const multi = groups.length > 1;
  let inventorySection = "";
  if (includeInventory) {
    const rows = allItems
      .map((it, i) => {
        const cc = CONDITION_COLORS[it.condition] || { color: "#374151", bg: "#f3f4f6" };
        return `<tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
        <td>${i + 1}</td>
        ${multi ? `<td><strong>${esc(it.group_name || it.group_type || "")}</strong><div class="muted">${esc(groups.find((g) => String(g.id) === String(it.group_id))?.name || "")}</div></td>` : ""}
        <td><strong>${esc(it.name)}</strong>${it.description ? `<div class="muted">${esc(it.description)}</div>` : ""}</td>
        <td style="text-align:center">${esc(it.quantity_available)} / ${esc(it.quantity_total)}</td>
        <td>${esc(it.unit)}</td>
        <td><span class="badge" style="background:${cc.bg};color:${cc.color}">${esc(it.condition)}</span></td>
        <td style="text-align:center">${it.is_bookable ? "✓" : "—"}</td>
        <td style="text-align:right">${Number(it.unit_cost) ? `KES ${Number(it.unit_cost).toLocaleString()}` : "—"}</td>
        </tr>`;
      })
      .join("");

    const headGroup = multi ? "<th>Group</th>" : "";
    inventorySection = `
    <h2>Inventory Ledger ${multi ? `— ${esc(titleGroups)}` : ""}</h2>
    <p style="margin:0 0 8px;color:#6b7280;font-size:12px">${allItems.length} items across ${groups.length} group(s) · Groups: ${esc(groupNames)}</p>
    <table><thead><tr><th>#</th>${headGroup}<th>Item</th><th>Qty</th><th>Unit</th><th>Condition</th><th>Bookable</th><th>Unit Cost</th></tr></thead>
    <tbody>${rows || `<tr><td colspan="${multi ? 8 : 7}" style="text-align:center;color:#9ca3af;padding:24px">No items</td></tr>`}</tbody></table>`;
  }

  let bookingsSection = "";
  if (includeBookings) {
    const rows = allBookings
      .map((b, i) => {
        const sc = STATUS_COLORS[b.status] || { color: "#6b7280", bg: "#f3f4f6" };
        const pc = PAYMENT_COLORS[b.payment_status] || { color: "#6b7280", bg: "#f3f4f6" };
        const gName = groups.find((g) => String(g.id) === String(b.group_id))?.name || b.item_category || "";
        return `<tr style="background:${i % 2 === 0 ? "#fff" : "#f9fafb"}">
        <td>${i + 1}</td>
        ${multi ? `<td>${esc(gName)}</td>` : ""}
        <td><strong>${esc(b.item_name || b.item_id)}</strong></td>
        <td>${esc(b.booked_by_name)}<div class="muted">${esc(b.booked_by_phone || "")}</div></td>
        <td style="text-align:center">${esc(b.quantity)}</td>
        <td>${esc(String(b.booking_date).slice(0, 10))} → ${esc(String(b.return_due_date).slice(0, 10))}${b.return_date ? `<div style="color:#059669;font-size:11px">ret ${esc(String(b.return_date).slice(0, 10))}</div>` : ""}</td>
        <td style="text-align:right">KES ${Number(b.amount_paid).toLocaleString()} / ${Number(b.total_cost).toLocaleString()}</td>
        <td><span class="badge" style="background:${sc.bg};color:${sc.color}">${esc(b.status)}</span></td>
        <td><span class="badge" style="background:${pc.bg};color:${pc.color}">${esc(b.payment_status)}</span></td>
        </tr>`;
      })
      .join("");
    const headGroup = multi ? "<th>Group</th>" : "";
    bookingsSection = `
    <h2>Bookings ${multi ? `— ${esc(titleGroups)}` : ""}</h2>
    <p style="margin:0 0 8px;color:#6b7280;font-size:12px">${allBookings.length} bookings across ${groups.length} group(s) · Groups: ${esc(groupNames)}</p>
    <table><thead><tr><th>#</th>${headGroup}<th>Item</th><th>Borrower</th><th>Qty</th><th>Dates</th><th>Cost</th><th>Status</th><th>Payment</th></tr></thead>
    <tbody>${rows || `<tr><td colspan="${multi ? 9 : 8}" style="text-align:center;color:#9ca3af;padding:24px">No bookings</td></tr>`}</tbody></table>`;
  }

  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>Inventory Report — ${esc(titleGroups)}</title>
<style>${baseStyle}
@media print {.page-break{page-break-before:always;}}
</style></head><body>
<h1>JKUAT CATCOM — Inventory Report</h1>
<p><strong>${esc(titleGroups)}</strong> · ${esc(groupNames)} &nbsp;·&nbsp; Date: <strong>${new Date().toLocaleDateString("en-KE", { dateStyle: "long" })}</strong></p>
<div class="summary">
  ${includeInventory ? `<span class="chip" style="background:#dbeafe;color:#1d4ed8">Inventory: ${allItems.length} items</span>` : ""}
  ${includeBookings ? `<span class="chip" style="background:#dcfce7;color:#15803d">Bookings: ${allBookings.length}</span>` : ""}
  <span class="chip" style="background:#f3f4f6;color:#374151">${groups.length} group(s)</span>
</div>
${inventorySection}
${includeInventory && includeBookings ? `<div class="page-break"></div>` : ""}
${bookingsSection}
<div class="footer">JKUAT CATCOM Inventory · Generated: ${new Date().toLocaleString()}</div>
</body></html>`;
  openPrintWindow(html);
};
