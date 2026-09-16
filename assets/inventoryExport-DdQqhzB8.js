const w={pending:{color:"#92400e",bg:"#fef3c7"},approved:{color:"#1d4ed8",bg:"#dbeafe"},issued:{color:"#6d28d9",bg:"#ede9fe"},returned:{color:"#15803d",bg:"#dcfce7"},cancelled:{color:"#6b7280",bg:"#f3f4f6"},overdue:{color:"#dc2626",bg:"#fee2e2"}},_={unpaid:{color:"#dc2626",bg:"#fee2e2"},partial:{color:"#d97706",bg:"#fef3c7"},paid:{color:"#15803d",bg:"#dcfce7"},waived:{color:"#6b7280",bg:"#f3f4f6"}},N={new:{color:"#15803d",bg:"#dcfce7"},good:{color:"#1d4ed8",bg:"#dbeafe"},fair:{color:"#92400e",bg:"#fef3c7"},damaged:{color:"#dc2626",bg:"#fee2e2"},lost:{color:"#6b7280",bg:"#f3f4f6"},disposed:{color:"#6b7280",bg:"#f3f4f6"}},e=a=>String(a??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),x=a=>{const n=window.open("","_blank","width=1000,height=700");if(!n){alert("Please allow popups for this site and try again.");return}n.document.write(a),n.document.close(),n.onload=()=>{setTimeout(()=>{n.focus(),n.print()},300)},setTimeout(()=>{n&&!n.closed&&(n.focus(),n.print())},700)},S=`
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
`,D=(a,n,f)=>{const i=a.reduce((t,s)=>t+Number(s.quantity_total||0),0),p=a.reduce((t,s)=>t+Number(s.quantity_available||0),0),g=(f==null?void 0:f.total_value)??a.reduce((t,s)=>t+Number(s.acquisition_cost||0)*Number(s.quantity_total||0),0),l=a.filter(t=>Number(t.quantity_available)<=2&&Number(t.quantity_available)>0).length,d=a.filter(t=>Number(t.quantity_available)===0).length,h=a.map((t,s)=>{const u=N[t.condition]||{color:"#374151",bg:"#f3f4f6"};return`<tr style="background:${s%2===0?"#fff":"#f9fafb"}">
      <td>${s+1}</td>
      <td><strong>${e(t.name)}</strong>${t.description?`<div class="muted">${e(t.description)}</div>`:""}</td>
      <td style="text-align:center;${Number(t.quantity_available)<=2?"color:#dc2626;font-weight:700":""}">${e(t.quantity_available)} / ${e(t.quantity_total)}</td>
      <td>${e(t.unit)}</td>
      <td><span class="badge" style="background:${u.bg};color:${u.color}">${e(t.condition)}</span></td>
      <td style="text-align:center">${t.is_bookable?'<span style="color:#15803d;font-weight:700">✓ Yes</span>':"—"}</td>
      <td style="text-align:right">${Number(t.unit_cost)?`KES ${Number(t.unit_cost).toLocaleString()}`:"—"}</td>
      <td style="text-align:right">${Number(t.acquisition_cost)?`KES ${Number(t.acquisition_cost).toLocaleString()}`:"—"}</td>
    </tr>`}).join(""),r=`<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${e(n)} — Inventory Ledger</title>
<style>${S}</style></head><body>
<h1>${e(n)||"Group"} — Inventory Ledger</h1>
<p>Date: <strong>${new Date().toLocaleDateString("en-KE",{dateStyle:"long"})}</strong> &nbsp;·&nbsp; Items: <strong>${a.length}</strong></p>
<div class="summary">
  <span class="chip" style="background:#dbeafe;color:#1d4ed8">Items: ${a.length}</span>
  <span class="chip" style="background:#dcfce7;color:#15803d">Available: ${p} / ${i}</span>
  <span class="chip" style="background:#f3f4f6;color:#374151">Value: KES ${Number(g).toLocaleString()}</span>
  <span class="chip" style="background:${d?"#fee2e2":"#f3f4f6"};color:${d?"#dc2626":"#374151"}">${d} out · ${l} low</span>
</div>
<table><thead><tr><th>#</th><th>Item</th><th>Qty (avail/total)</th><th>Unit</th><th>Condition</th><th>Bookable</th><th>Unit Cost</th><th>Acq. Cost</th></tr></thead>
<tbody>${h||'<tr><td colspan="8" style="text-align:center;color:#9ca3af;padding:24px">No items</td></tr>'}</tbody></table>
<div class="footer">JKUAT CATCOM Inventory · Generated: ${new Date().toLocaleString()}</div>
</body></html>`;x(r)},L=(a,n,f)=>{const i=a.filter(t=>t.status==="pending").length,p=a.filter(t=>t.status==="approved").length,g=a.filter(t=>t.status==="issued").length,l=a.filter(t=>t.status==="returned").length,d=a.filter(t=>t.status==="overdue"||t.is_overdue).length,h=a.map((t,s)=>{const u=w[t.status]||_.unpaid,c=_[t.payment_status]||{color:"#6b7280",bg:"#f3f4f6"};return`<tr style="background:${s%2===0?"#fff":"#f9fafb"}">
      <td>${s+1}</td>
      <td><strong>${e(t.item_name||t.item_id)}</strong>${t.item_category?`<div class="muted">${e(t.item_category)}</div>`:""}</td>
      <td>${e(t.booked_by_name)}<div class="muted">${e(t.booked_by_phone||"")} ${e(t.borrower_type||"")}</div>${t.booked_by_email?`<div class="muted">${e(t.booked_by_email)}</div>`:""}</td>
      <td style="text-align:center">${e(t.quantity)}</td>
      <td>${e(String(t.booking_date).slice(0,10))} → ${e(String(t.return_due_date).slice(0,10))}${t.return_date?`<div style="color:#059669;font-size:11px">returned ${e(String(t.return_date).slice(0,10))}</div>`:""}${t.is_overdue?'<div style="color:#dc2626;font-weight:700;font-size:11px">OVERDUE</div>':""}</td>
      <td style="text-align:right">KES ${Number(t.amount_paid).toLocaleString()} / ${Number(t.total_cost).toLocaleString()}<div class="muted">unit ${Number(t.unit_cost).toLocaleString()}</div></td>
      <td><span class="badge" style="background:${u.bg};color:${u.color}">${e(t.status)}</span></td>
      <td><span class="badge" style="background:${c.bg};color:${c.color}">${e(t.payment_status)}</span></td>
    </tr>`}).join(""),r=`<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>${e(n)} — Bookings Report</title>
<style>${S}</style></head><body>
<h1>${e(n)||"Group"} — Bookings</h1>
<p>Date: <strong>${new Date().toLocaleDateString("en-KE",{dateStyle:"long"})}</strong> &nbsp;·&nbsp; Bookings: <strong>${a.length}</strong></p>
<div class="summary">
  <span class="chip" style="background:#fef3c7;color:#92400e">Pending: ${i}</span>
  <span class="chip" style="background:#dbeafe;color:#1d4ed8">Approved: ${p}</span>
  <span class="chip" style="background:#ede9fe;color:#6d28d9">Issued: ${g}</span>
  <span class="chip" style="background:#dcfce7;color:#15803d">Returned: ${l}</span>
  <span class="chip" style="background:#fee2e2;color:#dc2626">Overdue: ${d}</span>
</div>
<table><thead><tr><th>#</th><th>Item</th><th>Borrower</th><th>Qty</th><th>Dates</th><th>Cost (paid/total)</th><th>Status</th><th>Payment</th></tr></thead>
<tbody>${h||'<tr><td colspan="8" style="text-align:center;color:#9ca3af;padding:24px">No bookings</td></tr>'}</tbody></table>
<div class="footer">JKUAT CATCOM Inventory · Generated: ${new Date().toLocaleString()}</div>
</body></html>`;x(r)},I=({groups:a,itemsByGroup:n,bookingsByGroup:f,includeInventory:i,includeBookings:p})=>{const g=a.map(c=>c.name).join(", "),l=a.length===1?a[0].name:`${a.length} Groups`,d=Object.values(n).flat(),h=Object.values(f).flat(),r=a.length>1;let t="";if(i){const c=d.map((o,$)=>{var y;const b=N[o.condition]||{color:"#374151",bg:"#f3f4f6"};return`<tr style="background:${$%2===0?"#fff":"#f9fafb"}">
        <td>${$+1}</td>
        ${r?`<td><strong>${e(o.group_name||o.group_type||"")}</strong><div class="muted">${e(((y=a.find(v=>String(v.id)===String(o.group_id)))==null?void 0:y.name)||"")}</div></td>`:""}
        <td><strong>${e(o.name)}</strong>${o.description?`<div class="muted">${e(o.description)}</div>`:""}</td>
        <td style="text-align:center">${e(o.quantity_available)} / ${e(o.quantity_total)}</td>
        <td>${e(o.unit)}</td>
        <td><span class="badge" style="background:${b.bg};color:${b.color}">${e(o.condition)}</span></td>
        <td style="text-align:center">${o.is_bookable?"✓":"—"}</td>
        <td style="text-align:right">${Number(o.unit_cost)?`KES ${Number(o.unit_cost).toLocaleString()}`:"—"}</td>
        </tr>`}).join(""),m=r?"<th>Group</th>":"";t=`
    <h2>Inventory Ledger ${r?`— ${e(l)}`:""}</h2>
    <p style="margin:0 0 8px;color:#6b7280;font-size:12px">${d.length} items across ${a.length} group(s) · Groups: ${e(g)}</p>
    <table><thead><tr><th>#</th>${m}<th>Item</th><th>Qty</th><th>Unit</th><th>Condition</th><th>Bookable</th><th>Unit Cost</th></tr></thead>
    <tbody>${c||`<tr><td colspan="${r?8:7}" style="text-align:center;color:#9ca3af;padding:24px">No items</td></tr>`}</tbody></table>`}let s="";if(p){const c=h.map((o,$)=>{var k;const b=w[o.status]||{color:"#6b7280",bg:"#f3f4f6"},y=_[o.payment_status]||{color:"#6b7280",bg:"#f3f4f6"},v=((k=a.find(C=>String(C.id)===String(o.group_id)))==null?void 0:k.name)||o.item_category||"";return`<tr style="background:${$%2===0?"#fff":"#f9fafb"}">
        <td>${$+1}</td>
        ${r?`<td>${e(v)}</td>`:""}
        <td><strong>${e(o.item_name||o.item_id)}</strong></td>
        <td>${e(o.booked_by_name)}<div class="muted">${e(o.booked_by_phone||"")}</div></td>
        <td style="text-align:center">${e(o.quantity)}</td>
        <td>${e(String(o.booking_date).slice(0,10))} → ${e(String(o.return_due_date).slice(0,10))}${o.return_date?`<div style="color:#059669;font-size:11px">ret ${e(String(o.return_date).slice(0,10))}</div>`:""}</td>
        <td style="text-align:right">KES ${Number(o.amount_paid).toLocaleString()} / ${Number(o.total_cost).toLocaleString()}</td>
        <td><span class="badge" style="background:${b.bg};color:${b.color}">${e(o.status)}</span></td>
        <td><span class="badge" style="background:${y.bg};color:${y.color}">${e(o.payment_status)}</span></td>
        </tr>`}).join(""),m=r?"<th>Group</th>":"";s=`
    <h2>Bookings ${r?`— ${e(l)}`:""}</h2>
    <p style="margin:0 0 8px;color:#6b7280;font-size:12px">${h.length} bookings across ${a.length} group(s) · Groups: ${e(g)}</p>
    <table><thead><tr><th>#</th>${m}<th>Item</th><th>Borrower</th><th>Qty</th><th>Dates</th><th>Cost</th><th>Status</th><th>Payment</th></tr></thead>
    <tbody>${c||`<tr><td colspan="${r?9:8}" style="text-align:center;color:#9ca3af;padding:24px">No bookings</td></tr>`}</tbody></table>`}const u=`<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>Inventory Report — ${e(l)}</title>
<style>${S}
@media print {.page-break{page-break-before:always;}}
</style></head><body>
<h1>JKUAT CATCOM — Inventory Report</h1>
<p><strong>${e(l)}</strong> · ${e(g)} &nbsp;·&nbsp; Date: <strong>${new Date().toLocaleDateString("en-KE",{dateStyle:"long"})}</strong></p>
<div class="summary">
  ${i?`<span class="chip" style="background:#dbeafe;color:#1d4ed8">Inventory: ${d.length} items</span>`:""}
  ${p?`<span class="chip" style="background:#dcfce7;color:#15803d">Bookings: ${h.length}</span>`:""}
  <span class="chip" style="background:#f3f4f6;color:#374151">${a.length} group(s)</span>
</div>
${t}
${i&&p?'<div class="page-break"></div>':""}
${s}
<div class="footer">JKUAT CATCOM Inventory · Generated: ${new Date().toLocaleString()}</div>
</body></html>`;x(u)};export{L as a,I as b,D as e};
