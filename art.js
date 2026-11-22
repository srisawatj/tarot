/* ===== ลายไพ่ชุด "ขนมหวาน" วาดเองทั้งสำรับ (SVG) ===== */
const ART = (() => {
  const INK = '#3A2C4D';
  const PAL = {
    major:  {bg:'#FFE69C', deep:'#F2B33D', dot:'#FFF4CC'},
    wands:  {bg:'#FFD2BE', deep:'#F08A5D', dot:'#FFE9DF'},
    cups:   {bg:'#CBE6FF', deep:'#5DA9E9', dot:'#E6F3FF'},
    swords: {bg:'#E2D7FF', deep:'#9A85E0', dot:'#F1ECFF'},
    pents:  {bg:'#CDF1DF', deep:'#4FB98A', dot:'#E7F9F0'}
  };
  const EMO = {wands:'🌿', cups:'🧋', swords:'🗡️', pents:'🪙'};
  const COURT = ['🐣', '🐴', '👸', '🤴'];   // เพจ อัศวิน ราชินี ราชา
  const MAJ = [
    ['🐥','คนเดินทาง'],['🪄','นักมายากล'],['🌙','สตรีนักบวช'],['🌸','จักรพรรดินี'],['👑','จักรพรรดิ'],
    ['🔔','พระสังฆราช'],['💞','คู่รัก'],['🚀','รถศึก'],['🦁','พลัง'],['🏮','ฤๅษี'],['🎡','กงล้อ'],
    ['⚖️','ยุติธรรม'],['🙃','คนห้อยหัว'],['🦋','ความเปลี่ยนแปลง'],['🍵','พอดี'],['😈','ปีศาจ'],
    ['⚡','หอคอย'],['⭐','ดวงดาว'],['🌕','ดวงจันทร์'],['🌞','ดวงอาทิตย์'],['📯','การตื่นรู้'],['🌍','โลก']
  ];
  const ROMAN = ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'];
  const RANK_S = ['A','2','3','4','5','6','7','8','9','10','P','N','Q','K'];
  const EF = `font-family="'Apple Color Emoji','Segoe UI Emoji','Noto Color Emoji',sans-serif"`;
  const TF = `font-family="'Mali','Leelawadee UI','Thonburi','Noto Sans Thai',sans-serif"`;
  const uri = s => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);
  const emoji = (e, x, y, s) => `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" dominant-baseline="central" ${EF}>${e}</text>`;

  function dots(p, seed) {
    let o = '';
    for (let k = 0; k < 9; k++) {
      const x = 12 + ((seed * 37 + k * 53) % 96), y = 30 + ((seed * 19 + k * 71) % 130);
      o += k % 3 ? `<circle cx="${x}" cy="${y}" r="${1.4 + (k % 2)}" fill="${p.dot}"/>`
                 : `<path d="M${x} ${y - 4}l1.2 2.8 2.8 1.2-2.8 1.2-1.2 2.8-1.2-2.8-2.8-1.2 2.8-1.2z" fill="${p.dot}"/>`;
    }
    return o;
  }
  function frame(p, seed, top, body, label) {
    const fs = label.length > 11 ? 9.5 : 11;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200">
<rect width="120" height="200" rx="12" fill="#fff"/>
<rect x="5" y="5" width="110" height="190" rx="9" fill="${p.bg}"/>
${dots(p, seed)}
<rect x="40" y="11" width="40" height="17" rx="8.5" fill="#fff"/>
<text x="60" y="20" font-size="10" font-weight="700" fill="${INK}" text-anchor="middle" dominant-baseline="central" ${TF}>${top}</text>
${body}
<rect x="12" y="166" width="96" height="22" rx="11" fill="#fff"/>
<text x="60" y="177.5" font-size="${fs}" font-weight="700" fill="${INK}" text-anchor="middle" dominant-baseline="central" ${TF}>${label}</text>
</svg>`;
  }
  function halo(p, e) {
    return `<circle cx="60" cy="94" r="38" fill="#fff" opacity=".75"/><circle cx="60" cy="94" r="44" fill="none" stroke="${p.deep}" stroke-width="1.5" stroke-dasharray="2 5" stroke-linecap="round"/>
<ellipse cx="44" cy="112" rx="5" ry="3" fill="#FF9BB5" opacity=".55"/><ellipse cx="76" cy="112" rx="5" ry="3" fill="#FF9BB5" opacity=".55"/>${emoji(e, 60, 92, 46)}`;
  }
  function pips(e, n) {
    if (n === 1) return `<circle cx="60" cy="94" r="36" fill="#fff" opacity=".75"/>${emoji(e, 60, 94, 48)}`;
    const cols = n <= 3 ? 1 : n === 9 ? 3 : 2, rows = Math.ceil(n / cols);
    const top = 40, bot = 152, h = (bot - top) / rows, s = Math.min(28, h * 0.82);
    let o = '';
    for (let k = 0; k < n; k++) {
      const r = Math.floor(k / cols), inRow = Math.min(cols, n - r * cols), c = k % cols;
      const x = 60 + (c - (inRow - 1) / 2) * (cols === 3 ? 30 : 36);
      o += emoji(e, x, top + h * (r + 0.5), s);
    }
    return o;
  }
  function court(p, e, ce) {
    return `<circle cx="60" cy="92" r="36" fill="#fff" opacity=".75"/>${emoji(ce, 60, 90, 44)}
<circle cx="86" cy="122" r="14" fill="#fff" stroke="${p.deep}" stroke-width="1.5"/>${emoji(e, 86, 122, 16)}`;
  }
  function cardSVG(c, i) {
    if (c.arcana === 'major') {
      const p = PAL.major, m = MAJ[c.num];
      return frame(p, i, ROMAN[c.num], halo(p, m[0]), c.name.replace(/^ไพ่ใบที่ \d+ /, ''));
    }
    const p = PAL[c.suit], e = EMO[c.suit], n = c.num;
    const body = n <= 10 ? pips(e, n) : court(p, e, COURT[n - 11]);
    return frame(p, i, RANK_S[n - 1], body, c.name);
  }
  const back = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200">
<defs><pattern id="s" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.3" fill="#fff" opacity=".7"/><path d="M15 11l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1z" fill="#fff" opacity=".8"/></pattern></defs>
<rect width="120" height="200" rx="12" fill="#fff"/><rect x="5" y="5" width="110" height="190" rx="9" fill="#B9A3F5"/>
<rect x="5" y="5" width="110" height="190" rx="9" fill="url(#s)"/>
<rect x="12" y="12" width="96" height="176" rx="7" fill="none" stroke="#fff" stroke-width="1.6" stroke-dasharray="1 4" stroke-linecap="round"/>
<circle cx="60" cy="100" r="30" fill="#FFE69C"/><circle cx="72" cy="91" r="26" fill="#B9A3F5"/>
<circle cx="50" cy="104" r="2.2" fill="#3A2C4D"/><path d="M45 112q4 3 8 0" stroke="#3A2C4D" stroke-width="1.8" fill="none" stroke-linecap="round"/>
<ellipse cx="42" cy="110" rx="3.5" ry="2" fill="#FF9BB5"/>
<path d="M88 66l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2z" fill="#FFE69C"/><path d="M34 138l1.4 3 3 1.4-3 1.4-1.4 3-1.4-3-3-1.4 3-1.4z" fill="#FFE69C"/>
</svg>`;
  function apply() {
    /* หน้าไพ่ใช้ภาพจาก Free Printable Tarot Deck ของ onyourjourney.co.uk (ใช้ส่วนตัว) ส่วนหลังไพ่วาดเอง */
    document.documentElement.style.setProperty('--back', `url("${uri(back)}")`);
  }
  return {apply, MAJ};
})();
ART.apply();
