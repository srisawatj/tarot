/* ===== แอพไพ่ทาโรต์ ===== */
const $ = s => document.querySelector(s);
const esc = t => String(t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rnd = n => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; };
const shuffle = arr => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const IC = {
  shuffle:'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
  dice:'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r=".8"/><circle cx="15.5" cy="15.5" r=".8"/><circle cx="12" cy="12" r=".8"/><circle cx="15.5" cy="8.5" r=".8"/><circle cx="8.5" cy="15.5" r=".8"/></svg>',
  spark:'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.2 6.3L21 12l-6.8 2.7L12 21l-2.2-6.3L3 12l6.8-2.7z"/></svg>',
  back:'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
  close:'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  copy:'<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>'
};
const live = t => { const l = $('#live'); if (l) l.textContent = t; };
const ori = r => r ? 'กลับหัว' : 'หัวตั้ง';
const kw = (c, r) => (r ? c.kwR : c.kwU);
const tx = (c, r) => (r ? c.tR : c.tU);

const S = {
  tab: 'read', step: 'setup', spread: SPREADS[1], q: '', useRev: true,
  order: [], picked: [], cards: [], flipped: [], filter: 'all', shuffling: false
};

/* ---------- ประวัติ (localStorage แบบปลอดภัย) ---------- */
const HKEY = 'tarot_history_v1';
function loadHist() { try { return JSON.parse(localStorage.getItem(HKEY) || '[]'); } catch (e) { return []; } }
function saveHist(entry) { try { const h = loadHist(); h.unshift(entry); localStorage.setItem(HKEY, JSON.stringify(h.slice(0, 30))); } catch (e) {} }
function clearHist() { try { localStorage.removeItem(HKEY); } catch (e) {} }

/* ---------- ตัวช่วยแสดงผล ---------- */
function setTab(t) {
  S.tab = t;
  document.querySelectorAll('.tabs button').forEach(b => { const on = b.dataset.t === t; b.classList.toggle('on', on); on ? b.setAttribute('aria-current', 'page') : b.removeAttribute('aria-current'); });
  render();
  window.scrollTo({top: 0});
}
function render() {
  if (S.tab === 'lib') return renderLib();
  if (S.tab === 'hist') return renderHist();
  if (S.tab === 'siam') return renderSiam();
  if (S.tab === 'chart') return renderChart();
  if (S.step === 'setup') return renderSetup();
  if (S.step === 'pick') return renderPick();
  return renderReveal();
}

/* ---------- 1) เลือกผัง ---------- */
function miniHTML(s) {
  const cells = s.pos.map((_, k) => { const x = s.cross === k + 1; return `<i class="${x ? 'x' : ''}" style="grid-area:p${x ? 1 : k + 1}"></i>`; }).join('');
  return `<span class="mini" style="--cols:${s.cols};grid-template-areas:${s.areas.map(a => `'${a}'`).join(' ')}" aria-hidden="true">${cells}</span>`;
}
function renderSetup() {
  $('#app').innerHTML = `
  <h1 class="screen">เปิดไพ่</h1>
  <p class="lead">เลือกผังที่เหมาะกับสิ่งที่อยากรู้ ผังย่อด้านซ้ายคือตำแหน่งไพ่จริงบนโต๊ะ</p>
  <section class="panel">
    <h2>เลือกผังไพ่</h2>
    <div class="spreads" role="group" aria-label="ผังไพ่">
      ${SPREADS.map(s => `
        <button class="spread" data-id="${s.id}" aria-pressed="${s.id === S.spread.id}">
          ${miniHTML(s)}
          <span><b>${s.name}</b><small>${s.sub}</small></span>
          <span class="n">${s.n} ใบ</span>
        </button>`).join('')}
    </div>
    <h2><label for="q">ตั้งคำถามถึงไพ่<small>ไม่กรอกก็ได้</small></label></h2>
    <textarea id="q" rows="2" maxlength="140" placeholder="เช่น งานใหม่ที่กำลังจะเปลี่ยนไปจะเป็นอย่างไร">${esc(S.q)}</textarea>
    <label class="chk"><input type="checkbox" id="rev" ${S.useRev ? 'checked' : ''}> ใช้ไพ่กลับหัวด้วย</label>
    <button class="cta" id="go">${IC.spark}เริ่มสับไพ่</button>
    <p class="note">ตั้งสมาธิกับคำถามสักครู่ แล้วเลือกไพ่ตามสัญชาตญาณ</p>
  </section>`;
  document.querySelectorAll('.spread').forEach(b => b.onclick = () => { S.spread = SPREADS.find(s => s.id === b.dataset.id); renderSetup(); });
  $('#q').oninput = e => S.q = e.target.value;
  $('#rev').onchange = e => S.useRev = e.target.checked;
  $('#go').onclick = startPick;
}

function startPick() {
  S.order = shuffle(DECK.map((_, i) => i));
  S.picked = []; S.cards = []; S.flipped = []; S.step = 'pick';
  render(); doShuffleAnim();
}

/* ---------- ผังไพ่ (board) ---------- */
function slotLabel(i) {
  const c = S.cards[i], p = S.spread.pos[i][0];
  return S.flipped[i] ? `ใบที่ ${i + 1} ${p}: ${c.card.name} ${ori(c.rev)} แตะเพื่อดูรายละเอียด` : `ใบที่ ${i + 1} ${p}: ยังไม่เปิด แตะเพื่อเปิดไพ่`;
}
function boardHTML(mode) {
  const sp = S.spread;
  const slots = sp.pos.map((p, i) => {
    const filled = i < S.picked.length;
    const c = S.cards[i];
    const isCross = sp.cross === i + 1;               // ไพ่ใบที่ 2 ของเซลติกครอสวางพาดทับ
    const area = isCross ? 'p1' : 'p' + (i + 1);
    const flipped = mode === 'reveal' && S.flipped[i];
    let inner = '';
    if (filled && mode === 'reveal') {
      inner = `<div class="c3d ${flipped ? 'fl' : ''}" data-i="${i}" role="button" tabindex="0" aria-label="${slotLabel(i)}">
        <div class="face back"></div>
        <div class="face front"><img src="${c.card.img}" alt="${esc(c.card.name)}" class="${c.rev ? 'rv' : ''}"></div></div>`;
    } else if (filled) {
      inner = `<div class="c3d"><div class="face back"></div></div>`;
    } else {
      inner = `<div class="empty"></div>`;
    }
    const tilt = (((i * 53) % 7) - 3) * 0.5;
    return `<div class="slot ${isCross ? 'cross' : ''} ${filled ? 'has' : ''}" style="grid-area:${area};--i:${i};--tilt:${tilt}deg">
      <div class="cw" ${filled && mode === 'pick' ? `data-un="${i}" role="button" tabindex="0" aria-label="ยกเลิกไพ่ใบที่ ${i + 1}"` : ''}>${inner}<i class="badge">${i + 1}</i></div>
      ${sp.compact ? '' : `<div class="plabel">${p[0]}</div>`}</div>`;
  }).join('');
  const deal = mode === 'reveal' && S.deal; if (deal) S.deal = false;
  return `<div class="mat"><div class="board ${deal ? 'deal' : ''}" style="--cols:${sp.cols};--maxcw:${sp.maxcw}px;grid-template-areas:${sp.areas.map(a => `'${a}'`).join(' ')}">${slots}</div>
  ${sp.compact ? `<ol class="legend">${sp.pos.map((p, i) => `<li><b>${i + 1}</b> ${p[0]}</li>`).join('')}</ol>` : ''}</div>`;
}

/* ---------- 2) เลือกไพ่จากสำรับ ---------- */
function renderPick() {
  const sp = S.spread, n = sp.n, k = S.picked.length;
  $('#app').innerHTML = `
  <section class="panel">
    <div class="stepbar"><button class="link" id="back">${IC.back}เปลี่ยนผัง</button></div>
    <h1 class="screen">${sp.name}</h1>
    ${S.q ? `<p class="qshow">“${esc(S.q)}”</p>` : ''}
    <h2>เลือกไพ่ <b>${n}</b> ใบ <small aria-live="polite">เลือกแล้ว ${k}/${n}</small></h2>
    ${boardHTML('pick')}
    <div class="actions">
      <button id="shf">${IC.shuffle}สับไพ่ใหม่</button>
      <button id="auto" ${k >= n ? 'disabled' : ''}>${IC.dice}สุ่มให้ที่เหลือ</button>
      <button id="clr" ${k === 0 ? 'disabled' : ''}>ล้างที่เลือก</button>
    </div>
    <button class="cta" id="open" ${k < n ? 'disabled' : ''}>${k < n ? `เลือกอีก ${n - k} ใบ` : `${IC.spark}เปิดไพ่`}</button>
    <p class="note">แตะไพ่ในสำรับเพื่อเลือก แตะไพ่ที่เลือกในผังอีกครั้งเพื่อยกเลิก</p>
    <div class="deck ${S.shuffling ? 'shf' : ''}" id="deck">
      ${S.order.map((di, idx) => {
        const pi = S.picked.indexOf(idx);
        return `<button class="pick ${pi >= 0 ? 'used' : ''}" data-x="${idx}" style="--d:${(idx * 37) % 9 * 40}ms" aria-label="ไพ่ใบที่ ${idx + 1}${pi >= 0 ? ' เลือกแล้วเป็นลำดับ ' + (pi + 1) + ' แตะเพื่อยกเลิก' : ''}" aria-pressed="${pi >= 0}">${pi >= 0 ? `<i>${pi + 1}</i>` : ''}</button>`;
      }).join('')}
    </div>
  </section>`;
  $('#back').onclick = () => { S.step = 'setup'; render(); };
  $('#shf').onclick = () => { S.order = shuffle(S.order); S.picked = []; S.cards = []; renderPick(); doShuffleAnim(); };
  $('#auto').onclick = () => { autoPick(); };
  $('#clr').onclick = () => { S.picked = []; S.cards = []; renderPick(); };
  $('#open').onclick = () => { S.step = 'reveal'; S.deal = true; S.flipped = S.picked.map(() => false); render(); window.scrollTo({top: 0, behavior: 'smooth'}); };
  document.querySelectorAll('.pick').forEach(b => b.onclick = () => pickCard(+b.dataset.x));
  document.querySelectorAll('[data-un]').forEach(b => b.onclick = () => unpick(+b.dataset.un));
}
function makeCard(idx) { return {card: DECK[S.order[idx]], rev: S.useRev ? rnd(2) === 1 : false}; }
function pickCard(idx) {
  const at = S.picked.indexOf(idx);
  if (at >= 0) return unpick(at);
  if (S.picked.length >= S.spread.n) return;
  S.picked.push(idx); S.cards.push(makeCard(idx));
  renderPick(); live(`เลือกแล้ว ${S.picked.length} จาก ${S.spread.n} ใบ`);
}
function unpick(i) { S.picked.splice(i, 1); S.cards.splice(i, 1); renderPick(); }
function autoPick() {
  const free = S.order.map((_, i) => i).filter(i => !S.picked.includes(i));
  const pool = shuffle(free);
  while (S.picked.length < S.spread.n) { const x = pool.pop(); S.picked.push(x); S.cards.push(makeCard(x)); }
  renderPick();
}
function doShuffleAnim() {
  const d = $('#deck'); if (!d) return;
  d.classList.add('shf'); setTimeout(() => d.classList.remove('shf'), 1100);
}

/* ---------- 3) เปิดไพ่ + คำทำนาย ---------- */
function renderReveal() {
  const sp = S.spread, all = S.flipped.every(Boolean), left = S.flipped.filter(f => !f).length;
  $('#app').innerHTML = `
  <section class="panel">
    <div class="stepbar"><button class="link" id="back">${IC.back}เลือกไพ่ใหม่</button></div>
    <h1 class="screen">${sp.name}</h1>
    ${S.q ? `<p class="qshow">“${esc(S.q)}”</p>` : ''}
    <h2>${all ? 'ไพ่ของคุณ' : 'แตะไพ่เพื่อเปิดทีละใบ'}</h2>
    ${boardHTML('reveal')}
    ${all ? '' : `<button class="cta" id="all">${IC.spark}เปิดไพ่ที่เหลือทั้งหมด (${left} ใบ)</button>`}
  </section>
  ${all ? resultHTML(S.cards, sp, S.q) : ''}`;
  $('#back').onclick = () => { S.step = 'pick'; render(); };
  document.querySelectorAll('.c3d').forEach(el => el.onclick = () => {
    const i = +el.dataset.i;
    if (!S.flipped[i]) flipCard(i); else openModal(S.cards[i].card, S.cards[i].rev);
  });
  if ($('#all')) $('#all').onclick = () => {
    S.flipped.forEach((f, i) => { if (!f) setTimeout(() => flipCard(i, true), i * 160); });
    setTimeout(finishReveal, S.flipped.length * 160 + 700);
  };
  bindResult();
}
function flipCard(i, silent) {
  S.flipped[i] = true;
  const el = document.querySelector(`.c3d[data-i="${i}"]`);
  if (el) { el.classList.add('fl'); el.setAttribute('aria-label', slotLabel(i)); }
  live(slotLabel(i));
  if (!silent && S.flipped.every(Boolean)) setTimeout(finishReveal, 650);
}
let savedKey = '';
function finishReveal() {
  S.flipped = S.flipped.map(() => true);
  const key = S.picked.join(',') + '|' + S.cards.map(c => c.rev).join('');
  if (key !== savedKey) {
    savedKey = key;
    saveHist({t: Date.now(), sp: S.spread.id, q: S.q, c: S.cards.map(c => [c.card.id, c.rev ? 1 : 0])});
  }
  renderReveal();
  setTimeout(() => { const r = $('#result'); if (r) r.scrollIntoView({behavior: 'smooth', block: 'start'}); }, 150);
}

/* ---------- สรุปคำทำนาย ---------- */
function summaryParas(cards, sp, q) {
  const n = cards.length, P = [];
  const major = cards.filter(c => c.card.arcana === 'major').length;
  const revN = cards.filter(c => c.rev).length;
  const minors = cards.filter(c => c.card.arcana === 'minor');
  const cnt = {}; minors.forEach(c => cnt[c.card.suit] = (cnt[c.card.suit] || 0) + 1);
  const top = Object.entries(cnt).sort((a, b) => b[1] - a[1])[0];
  if (q) P.push(`สำหรับคำถาม “${q}” ไพ่ชุดนี้สะท้อนภาพดังนี้`);
  if (n === 1) {
    const c = cards[0];
    P.push(`ไพ่ ${c.card.name} (${ori(c.rev)}) พูดถึง ${kw(c.card, c.rev)} — ${tx(c.card, c.rev)}`);
    P.push(c.card.arcana === 'major' ? 'เป็นไพ่ใหญ่ แสดงว่าเรื่องนี้มีน้ำหนักและเป็นบทเรียนสำคัญของช่วงนี้' : `เป็นไพ่ชุด${SUITS[c.card.suit].th} เกี่ยวกับ${SUITS[c.card.suit].theme}`);
    return P;
  }
  if (major / n >= 0.4) P.push(`มีไพ่ใหญ่ ${major} จาก ${n} ใบ แสดงว่าเรื่องนี้เกี่ยวพันกับจุดเปลี่ยนและบทเรียนสำคัญ ไม่ใช่เรื่องผ่านๆ`);
  else if (major === 0) P.push('ไม่มีไพ่ใหญ่เลย เรื่องนี้เป็นเรื่องในชีวิตประจำวัน คุณมีอำนาจปรับเปลี่ยนด้วยการกระทำของตัวเอง');
  if (top && top[1] >= 2 && top[1] / minors.length >= 0.5) P.push(`ไพ่ชุด${SUITS[top[0]].th} (ธาตุ${SUITS[top[0]].el}) เด่นที่สุด จึงเน้นเรื่อง${SUITS[top[0]].theme}`);
  if (revN === 0) P.push('ไพ่หัวตั้งทั้งหมด พลังงานไหลออกด้านนอกอย่างตรงไปตรงมา');
  else if (revN / n >= 0.5) P.push(`ไพ่กลับหัว ${revN} ใบ สะท้อนว่ามีอะไรติดขัด ถูกกดไว้ หรือยังต้องทบทวนภายใน`);
  sp.keys.forEach(([i, lab]) => {
    const c = cards[i]; if (!c) return;
    P.push(`ตำแหน่ง “${lab}” ได้ไพ่ ${c.card.name} (${ori(c.rev)}) เน้น ${kw(c.card, c.rev)}`);
  });
  if (sp.adv != null && cards[sp.adv]) {
    const c = cards[sp.adv];
    P.push(`ข้อแนะนำสรุป: ${tx(c.card, c.rev)}`);
  }
  return P;
}
function resultHTML(cards, sp, q) {
  const paras = summaryParas(cards, sp, q);
  return `<section class="slip" id="result">
    <h2>คำทำนาย</h2>
    <div class="sum">${paras.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <h3>รายละเอียดแต่ละใบ</h3>
    ${cards.map((c, i) => `
      <article class="detail" data-i="${i}" style="--sc:var(--${c.card.suit || 'major'})">
        <img src="${c.card.img}" alt="${esc(c.card.name)}" class="${c.rev ? 'rv' : ''}">
        <div>
          <div class="pos">ใบที่ ${i + 1} ${sp.pos[i][0]}<small>${sp.pos[i][1]}</small></div>
          <h4>${esc(c.card.name)} <small>${esc(c.card.en)}</small></h4>
          <span class="tag ${c.rev ? 'rvt' : ''}">${ori(c.rev)}</span>
          <p class="kw">${kw(c.card, c.rev)}</p>
          <p>${tx(c.card, c.rev)}</p>
        </div>
      </article>`).join('')}
    <div class="actions">
      <button id="copy">${IC.copy}คัดลอกผล</button>
      <button id="again" class="cta2">${IC.spark}เปิดไพ่ใหม่</button>
    </div>
    <p class="note">การอ่านไพ่เป็นการตีความเชิงสัญลักษณ์เพื่อความบันเทิงและการสะท้อนใจ ไม่ใช่การรับรองอนาคต ใช้ประกอบการคิด และตัดสินใจจากข้อมูลจริงของคุณ</p>
  </section>`;
}
function bindResult() {
  document.querySelectorAll('.detail img').forEach(im => im.onclick = () => { const i = +im.closest('.detail').dataset.i; openModal(S.cards[i].card, S.cards[i].rev); });
  if ($('#again')) $('#again').onclick = () => { S.step = 'setup'; S.q = ''; savedKey = ''; render(); window.scrollTo({top: 0}); };
  if ($('#copy')) $('#copy').onclick = () => copyText(plainText(S.cards, S.spread, S.q), $('#copy'));
}
function plainText(cards, sp, q) {
  let t = `🔮 ผลเปิดไพ่ทาโรต์ — ${sp.name}\n`;
  if (q) t += `คำถาม: ${q}\n`;
  t += '\n' + cards.map((c, i) => `${i + 1}. ${sp.pos[i][0]}: ${c.card.name} (${ori(c.rev)})\n   ${kw(c.card, c.rev)}\n   ${tx(c.card, c.rev)}`).join('\n\n');
  t += '\n\nสรุป:\n' + summaryParas(cards, sp, q).join('\n');
  return t;
}
function copyText(t, btn) {
  const done = ok => { const o = btn.innerHTML; btn.textContent = ok ? 'คัดลอกแล้ว' : 'คัดลอกไม่ได้'; setTimeout(() => btn.innerHTML = o, 1500); };
  try { navigator.clipboard.writeText(t).then(() => done(true), () => fallback()); } catch (e) { fallback(); }
  function fallback() {
    try { const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); const ok = document.execCommand('copy'); a.remove(); done(ok); } catch (e) { done(false); }
  }
}

/* ---------- คลังไพ่ ---------- */
function renderLib() {
  const f = S.filter;
  const chips = [['all', 'ทั้งหมด'], ['major', 'ไพ่ใหญ่'], ...Object.entries(SUITS).map(([k, v]) => [k, v.th])];
  const list = DECK.filter(c => f === 'all' || (f === 'major' ? c.arcana === 'major' : c.suit === f));
  $('#app').innerHTML = `<h1 class="screen">คลังไพ่</h1><p class="lead">ไพ่ครบ 78 ใบ ภาพจากสำรับพิมพ์ฟรีของ On Your Journey (onyourjourney.co.uk) แตะเพื่ออ่านความหมายหัวตั้งและกลับหัว</p><section class="panel">
    <div class="chips">${chips.map(([k, l]) => `<button class="${k === f ? 'on' : ''}" data-f="${k}" aria-pressed="${k === f}">${l}</button>`).join('')}</div>
    <div class="lib">${list.map(c => `<button class="lc" data-id="${c.id}"><img loading="lazy" src="${c.img}" alt="${esc(c.name)}"><span>${esc(c.name)}</span></button>`).join('')}</div></section>`;
  document.querySelectorAll('.chips button').forEach(b => b.onclick = () => { S.filter = b.dataset.f; renderLib(); });
  document.querySelectorAll('.lc').forEach(b => b.onclick = () => openModal(DECK.find(c => c.id === b.dataset.id), null));
}

/* ---------- ประวัติ ---------- */
function renderHist() {
  const h = loadHist();
  $('#app').innerHTML = `<h1 class="screen">ประวัติ</h1><section class="panel">
    ${h.length ? h.map((e, i) => {
      const sp = SPREADS.find(s => s.id === e.sp) || SPREADS[0];
      return `<button class="hrow" data-i="${i}"><b>${sp.name}</b><small>${new Date(e.t).toLocaleString('th-TH', {dateStyle: 'medium', timeStyle: 'short'})}</small>
      ${e.q ? `<em>“${esc(e.q)}”</em>` : ''}<span>${e.c.map(([id, r]) => { const c = DECK.find(d => d.id === id); return c ? c.name + (r ? ' (กลับหัว)' : '') : ''; }).join(', ')}</span></button>`;
    }).join('') + `<button class="link" id="hc">ล้างประวัติ</button>` : '<p class="lead">ยังไม่มีการเปิดไพ่ เปิดไพ่ครั้งแรก แล้วผลจะถูกเก็บไว้ที่นี่ (เก็บในเบราว์เซอร์นี้เท่านั้น)</p>'}</section>`;
  document.querySelectorAll('.hrow').forEach(b => b.onclick = () => {
    const e = h[+b.dataset.i], sp = SPREADS.find(s => s.id === e.sp); if (!sp) return;
    S.spread = sp; S.q = e.q || '';
    S.cards = e.c.map(([id, r]) => ({card: DECK.find(d => d.id === id), rev: !!r}));
    S.picked = S.cards.map((_, i) => i); S.flipped = S.cards.map(() => true);
    savedKey = S.picked.join(',') + '|' + S.cards.map(c => c.rev).join('');
    S.step = 'reveal'; setTab('read');
  });
  if ($('#hc')) $('#hc').onclick = () => { clearHist(); renderHist(); };
}

/* ---------- หน้าต่างรายละเอียดไพ่ ---------- */
let lastFocus = null;
function closeModal() { const m = $('#modal'); m.classList.remove('show'); if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) {} }
function openModal(c, rev) {
  const m = $('#modal'); lastFocus = document.activeElement;
  const blk = (label, kws, t, hi) => `<div class="mb ${hi ? 'hi' : ''}"><h5>${label}</h5><p class="kw">${kws}</p><p>${t}</p></div>`;
  m.innerHTML = `<div class="mc"><button class="x" aria-label="ปิด">${IC.close}</button>
    <img src="${c.img}" alt="${esc(c.name)}" class="${rev ? 'rv' : ''}">
    <h3>${esc(c.name)}</h3><p class="en">${esc(c.en)}<br>${c.suit ? 'ชุด' + SUITS[c.suit].th + ' ธาตุ' + SUITS[c.suit].el : 'ไพ่ใหญ่'}</p>
    ${blk('หัวตั้ง', c.kwU, c.tU, rev === false)}${blk('กลับหัว', c.kwR, c.tR, rev === true)}</div>`;
  m.classList.add('show');
  const xb = m.querySelector('.x'); if (xb) xb.focus();
  m.onclick = e => { if (e.target === m || e.target.closest('.x')) closeModal(); };
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && $('#modal').classList.contains('show')) return closeModal();
  const t = e.target;
  if ((e.key === 'Enter' || e.key === ' ') && t.getAttribute && t.getAttribute('role') === 'button') { e.preventDefault(); t.click(); }
});

document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => setTab(b.dataset.t));

