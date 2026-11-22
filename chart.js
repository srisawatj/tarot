/* ===== ผังดวงกำเนิด (Birth chart) ===== */
const ZOD = [
 {th:'เมษ', en:'Aries', g:'♈', el:'fire', core:'กล้า ตรง ใจร้อน ชอบเป็นคนเริ่ม พลังเยอะ ไม่ชอบรอ', need:'ได้ลงมือทำและเห็นผลทันที', look:'มั่นใจ กระฉับกระเฉง พูดตรง', style:'ฉับไว กล้าได้กล้าเสีย'},
 {th:'พฤษภ', en:'Taurus', g:'♉', el:'earth', core:'หนักแน่น อดทน รักความสบายและของสวยงาม มั่นคงแต่ดื้อเงียบ', need:'มีความมั่นคงและกิจวัตรที่คุ้นเคย', look:'ใจเย็น อบอุ่น น่าเชื่อถือ', style:'ช้าแต่ชัวร์ เน้นของจริงจับต้องได้'},
 {th:'เมถุน', en:'Gemini', g:'♊', el:'air', core:'ช่างคิด ช่างพูด อยากรู้อยากเห็น ปรับตัวไว เบื่อง่าย', need:'ได้คุย ได้เรียนรู้เรื่องใหม่ๆ', look:'คล่องแคล่ว เป็นมิตร ตลก', style:'ว่องไว หลากหลาย ใช้ไหวพริบ'},
 {th:'กรกฎ', en:'Cancer', g:'♋', el:'water', core:'อ่อนโยน ห่วงใย ผูกพันกับบ้านและครอบครัว อารมณ์ละเอียด', need:'รู้สึกปลอดภัยและเป็นที่รัก', look:'นุ่มนวล เข้าถึงง่าย ขี้เกรงใจ', style:'ใช้ใจนำ ปกป้องคนสำคัญ'},
 {th:'สิงห์', en:'Leo', g:'♌', el:'fire', core:'อบอุ่น ใจกว้าง มีเสน่ห์ ชอบเป็นจุดสนใจ รักศักดิ์ศรี', need:'ได้รับการชื่นชมและได้แสดงตัวตน', look:'สง่า สดใส โดดเด่น', style:'เปิดเผย เต็มที่ มีสีสัน'},
 {th:'กันย์', en:'Virgo', g:'♍', el:'earth', core:'ละเอียด รอบคอบ ชอบช่วยเหลือ เก่งจัดระบบ แต่ติดคิดมาก', need:'ทุกอย่างเป็นระเบียบและมีประโยชน์', look:'สุภาพ เรียบร้อย ดูเก่ง', style:'ประณีต มีแบบแผน ใส่ใจรายละเอียด'},
 {th:'ตุลย์', en:'Libra', g:'♎', el:'air', core:'ประนีประนอม รักความงามและความยุติธรรม เข้าสังคมเก่ง ตัดสินใจยาก', need:'ความสัมพันธ์ที่กลมกลืน ไม่มีความขัดแย้ง', look:'มีมารยาท ดูดี น่าคบ', style:'นุ่มนวล ชั่งน้ำหนัก ทำงานร่วมกับคนอื่น'},
 {th:'พิจิก', en:'Scorpio', g:'♏', el:'water', core:'ลึกซึ้ง มุ่งมั่น ความรู้สึกแรง จริงจัง เก็บความลับเก่ง', need:'ความไว้ใจและความจริงใจแบบเต็มร้อย', look:'นิ่ง ลึกลับ มีพลังดึงดูด', style:'เข้มข้น ทุ่มสุดตัว เจาะลึก'},
 {th:'ธนู', en:'Sagittarius', g:'♐', el:'fire', core:'มองโลกแง่ดี รักอิสระ ชอบเดินทางและเรียนรู้ พูดตรงจนบางทีลืมเบรก', need:'อิสระและการผจญภัย', look:'ร่าเริง เป็นกันเอง กว้างขวาง', style:'มองการณ์ไกล กล้าลอง ไม่ยึดติด'},
 {th:'มังกร', en:'Capricorn', g:'♑', el:'earth', core:'มีเป้าหมาย รับผิดชอบ อดทน ทำงานหนัก ดูจริงจังเกินวัย', need:'ความสำเร็จที่สร้างด้วยมือตัวเอง', look:'สุขุม เป็นผู้ใหญ่ น่านับถือ', style:'มีวินัย วางแผนระยะยาว'},
 {th:'กุมภ์', en:'Aquarius', g:'♒', el:'air', core:'คิดต่าง เป็นตัวของตัวเอง รักเพื่อน สนใจเรื่องส่วนรวม บางทีดูห่างเหิน', need:'พื้นที่ส่วนตัวและการยอมรับในความต่าง', look:'แปลกใหม่ ฉลาด เป็นมิตรแบบเท่ๆ', style:'สร้างสรรค์ ไม่ตามใคร'},
 {th:'มีน', en:'Pisces', g:'♓', el:'water', core:'ช่างฝัน เห็นอกเห็นใจ มีจินตนาการและศิลปะ ใจอ่อน', need:'ความสงบและการเชื่อมโยงทางใจ', look:'อ่อนโยน ฝันๆ เข้าถึงง่าย', style:'ใช้สัญชาตญาณ ยืดหยุ่น เห็นใจผู้อื่น'}
];
const ELEM = {fire:['ไฟ','var(--c-fire)','กระตือรือร้น กล้าลงมือ'], earth:['ดิน','var(--c-earth)','มั่นคง เน้นของจริง'], air:['ลม','var(--c-air)','ใช้ความคิด ชอบสื่อสาร'], water:['น้ำ','var(--c-water)','ใช้ความรู้สึก เข้าใจคน']};
const PLAN = {
  sun:['อาทิตย์','☉','ตัวตนและเป้าหมายชีวิต'], moon:['จันทร์','☽','อารมณ์และความต้องการลึกๆ'],
  mercury:['พุธ','☿','วิธีคิดและการสื่อสาร'], venus:['ศุกร์','♀','ความรักและสิ่งที่ชอบ'],
  mars:['อังคาร','♂','พลังและวิธีลงมือ'], jupiter:['พฤหัส','♃','โชคและการเติบโต'],
  saturn:['เสาร์','♄','บทเรียนและความรับผิดชอบ'], uranus:['มฤตยู','♅','การเปลี่ยนแปลงแบบฉับพลัน'],
  neptune:['เนปจูน','♆','ความฝันและแรงบันดาลใจ'], pluto:['พลูโต','♇','การเปลี่ยนแปลงเชิงลึก']
};
const HOUSE = ['ตัวตน รูปลักษณ์','เงินและของมีค่า','การสื่อสาร พี่น้อง','บ้านและครอบครัว','ความรัก ความสร้างสรรค์','งานประจำ สุขภาพ','คู่ครอง หุ้นส่วน','สิ่งที่แบ่งปัน การเปลี่ยนแปลง','การเรียน การเดินทางไกล','อาชีพ ชื่อเสียง','เพื่อน ความหวัง','จิตใจภายใน การพักผ่อน'];
const PLACES = [
 ['กรุงเทพฯ',13.7563,100.5018,7],['เชียงใหม่',18.7883,98.9853,7],['เชียงราย',19.9105,99.8406,7],['ลำปาง',18.2888,99.4908,7],
 ['พิษณุโลก',16.8211,100.2659,7],['นครสวรรค์',15.7047,100.1372,7],['ขอนแก่น',16.4419,102.836,7],['อุดรธานี',17.4138,102.787,7],
 ['นครราชสีมา',14.9799,102.0978,7],['อุบลราชธานี',15.2287,104.8564,7],['สกลนคร',17.1545,104.1348,7],['อยุธยา',14.3532,100.5689,7],
 ['นนทบุรี',13.8621,100.5144,7],['กาญจนบุรี',14.0228,99.5328,7],['ชลบุรี',13.3611,100.9847,7],['ระยอง',12.6814,101.2816,7],
 ['หัวหิน',12.5684,99.9577,7],['สุราษฎร์ธานี',9.1382,99.3215,7],['นครศรีธรรมราช',8.4304,99.9631,7],['ภูเก็ต',7.8804,98.3923,7],
 ['หาดใหญ่',7.0086,100.4747,7],['เวียงจันทน์',17.9757,102.6331,7],['สิงคโปร์',1.3521,103.8198,8],['กัวลาลัมเปอร์',3.139,101.6869,8],
 ['ฮ่องกง',22.3193,114.1694,8],['โตเกียว',35.6762,139.6503,9],['ลอนดอน',51.5074,-0.1278,0]
];
const SKEY = 'birth_chart_v1';
const sampleBirth = {name:'', date:'1995-08-14', time:'09:30', noTime:false, place:0, lat:13.7563, lon:100.5018, tz:7, sid:false, sample:true};
function loadBirth() { try { const v = JSON.parse(localStorage.getItem(SKEY) || 'null'); return v ? Object.assign({}, sampleBirth, v, {sample:false}) : {...sampleBirth}; } catch (e) { return {...sampleBirth}; } }
function saveBirth(b) { try { localStorage.setItem(SKEY, JSON.stringify(b)); } catch (e) {} }
S.birth = loadBirth();

function computeChart(b) {
  const [y, m, d] = b.date.split('-').map(Number);
  const [hh, mm] = (b.noTime ? '12:00' : b.time).split(':').map(Number);
  const utc = Date.UTC(y, m - 1, d, hh, mm) - b.tz * 3600000;
  const c = ASTRO.chart(utc, b.lat, b.lon);
  const off = b.sid ? ASTRO.ayanamsa(c.year) : 0;
  const adj = l => ASTRO.n360(l - off);
  const pos = {};
  Object.entries(c.bodies).forEach(([k, v]) => pos[k] = {lon: adj(v.lon), retro: v.retro});
  const asc = b.noTime ? null : adj(c.asc), mc = b.noTime ? null : adj(c.mc);
  const ascSign = asc == null ? null : Math.floor(asc / 30);
  Object.values(pos).forEach(p => { p.sign = Math.floor(p.lon / 30); p.deg = p.lon % 30; p.house = ascSign == null ? null : ((p.sign - ascSign + 12) % 12) + 1; });
  return {pos, asc, mc, ascSign};
}
const fmtDeg = d => `${Math.floor(d)}°${String(Math.floor((d % 1) * 60)).padStart(2, '0')}′`;

function wheelSVG(ch) {
  const cx = 160, cy = 160, R1 = 150, R2 = 118, R3 = 64;
  const rot = ch.asc != null ? ch.asc : 0;            // ให้ลัคนาอยู่ซ้ายมือ (ทิศตะวันออก)
  const ang = l => (180 + (l - rot)) * Math.PI / 180;  // ทวนเข็มนาฬิกาเหมือนผังดวงทั่วไป
  const P = (l, r) => [cx + r * Math.cos(ang(l)), cy - r * Math.sin(ang(l))];
  let o = `<circle cx="${cx}" cy="${cy}" r="${R1}" fill="var(--surface)" stroke="var(--line)" stroke-width="2.5"/>`;
  for (let s = 0; s < 12; s++) {
    const a0 = s * 30, a1 = a0 + 30, [x0, y0] = P(a0, R1), [x1, y1] = P(a1, R1), [x2, y2] = P(a1, R2), [x3, y3] = P(a0, R2);
    o += `<path d="M${x0} ${y0}A${R1} ${R1} 0 0 0 ${x1} ${y1}L${x2} ${y2}A${R2} ${R2} 0 0 1 ${x3} ${y3}Z" fill="${ELEM[ZOD[s].el][1]}" stroke="var(--line)" stroke-width="1.5"/>`;
    const [tx, ty] = P(a0 + 15, (R1 + R2) / 2);
    o += `<text x="${tx}" y="${ty}" font-size="17" text-anchor="middle" dominant-baseline="central" fill="var(--ink)" class="glyph">${ZOD[s].g}︎</text>`;
  }
  o += `<circle cx="${cx}" cy="${cy}" r="${R2}" fill="var(--soft)" stroke="var(--line)" stroke-width="1.5"/>`;
  if (ch.asc != null) {
    for (let h = 0; h < 12; h++) { const [x, y] = P((ch.ascSign + h) * 30, R2), [xi, yi] = P((ch.ascSign + h) * 30, R3); o += `<line x1="${x}" y1="${y}" x2="${xi}" y2="${yi}" stroke="var(--mute)" stroke-width="1" stroke-dasharray="3 3"/>`;
      const [hx, hy] = P((ch.ascSign + h) * 30 + 15, R3 + 9); o += `<text x="${hx}" y="${hy}" font-size="9" fill="var(--mute)" text-anchor="middle" dominant-baseline="central">${h + 1}</text>`; }
    const [ax, ay] = P(ch.asc, R1 + 2), [bx, by] = P(ch.asc + 180, R1 + 2);
    o += `<line x1="${ax}" y1="${ay}" x2="${bx}" y2="${by}" stroke="var(--pink-deep)" stroke-width="2.5"/>`;
    const [lx, ly] = P(ch.asc, R1 - 16);
    o += `<rect x="${lx - 15}" y="${ly - 9}" width="30" height="18" rx="9" fill="var(--pink-deep)"/><text x="${lx}" y="${ly}" font-size="10" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="central">ลัคนา</text>`;
  }
  o += `<circle cx="${cx}" cy="${cy}" r="${R3}" fill="var(--surface)" stroke="var(--line)" stroke-width="1.5"/>`;
  // วางดาว เลี่ยงไม่ให้ซ้อนกัน
  const list = Object.entries(ch.pos).map(([k, p]) => ({k, lon: p.lon, d: p.lon})).sort((a, b) => a.lon - b.lon);
  for (let pass = 0; pass < 6; pass++) for (let i = 0; i < list.length; i++) {
    const a = list[i], b = list[(i + 1) % list.length]; let gap = ASTRO.n360(b.d - a.d);
    if (list.length > 1 && gap < 10) { const push = (10 - gap) / 2; a.d -= push; b.d += push; }
  }
  list.forEach(p => {
    const [x, y] = P(p.d, 95), [tx, ty] = P(p.lon, R2), [ux, uy] = P(p.lon, R2 - 8);
    o += `<line x1="${tx}" y1="${ty}" x2="${ux}" y2="${uy}" stroke="var(--ink)" stroke-width="2"/>`;
    o += `<circle cx="${x}" cy="${y}" r="11" fill="var(--surface)" stroke="var(--line)" stroke-width="1.5"/><text x="${x}" y="${y + 1}" font-size="13" text-anchor="middle" dominant-baseline="central" fill="var(--ink)" class="glyph">${PLAN[p.k][1]}︎</text>`;
  });
  const sun = ZOD[ch.pos.sun.sign];
  o += `<text x="${cx}" y="${cy - 10}" font-size="30" text-anchor="middle" dominant-baseline="central" fill="var(--ink)" class="glyph">${sun.g}︎</text><text x="${cx}" y="${cy + 22}" font-size="12" font-weight="700" text-anchor="middle" fill="var(--ink)">ราศี${sun.th}</text>`;
  return `<svg class="wheel" viewBox="0 0 320 320" role="img" aria-label="วงล้อผังดวง ดาวอาทิตย์อยู่ราศี${sun.th}${ch.asc != null ? ' ลัคนาราศี' + ZOD[ch.ascSign].th : ''}">${o}</svg>`;
}

function renderChart() {
  const b = S.birth, ch = computeChart(b);
  const big = [['sun', 'ราศีอาทิตย์', 'ตัวตนหลัก', z => z.core],
               ['moon', 'ราศีจันทร์', 'ด้านอารมณ์', z => `คุณรู้สึกปลอดภัยเมื่อ${z.need} ข้างในเป็นคน${z.core.split(' ').slice(0, 2).join(' ')}`]];
  const elCount = {fire: 0, earth: 0, air: 0, water: 0};
  ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'].forEach(k => elCount[ZOD[ch.pos[k].sign].el]++);
  if (ch.asc != null) elCount[ZOD[ch.ascSign].el]++;
  const tot = Object.values(elCount).reduce((a, c) => a + c, 0);
  const domEl = Object.entries(elCount).sort((a, c) => c[1] - a[1])[0][0];
  $('#app').innerHTML = `
  <h1 class="screen">ผังดวงกำเนิด</h1>
  <p class="lead">ใส่วัน เวลา และสถานที่เกิด ระบบจะคำนวณตำแหน่งดาวจริง ณ วินาทีที่คุณเกิด</p>
  <form class="panel bform" id="bf">
    <div class="field wide"><label for="bn">ชื่อเล่น <small>ไม่กรอกก็ได้</small></label><input id="bn" type="text" maxlength="30" value="${esc(b.name)}" placeholder="เช่น น้องมะลิ"></div>
    <div class="field"><label for="bd">วันเกิด</label><input id="bd" type="date" required min="1900-01-01" max="2099-12-31" value="${b.date}"></div>
    <div class="field"><label for="bt">เวลาเกิด</label><input id="bt" type="time" value="${b.time}" ${b.noTime ? 'disabled' : ''}></div>
    <label class="chk wide"><input type="checkbox" id="bnt" ${b.noTime ? 'checked' : ''}> ไม่ทราบเวลาเกิด (ข้ามลัคนาและเรือน)</label>
    <div class="field wide"><label for="bp">สถานที่เกิด</label><select id="bp">${PLACES.map((p, i) => `<option value="${i}" ${+b.place === i ? 'selected' : ''}>${p[0]}</option>`).join('')}<option value="-1" ${+b.place === -1 ? 'selected' : ''}>กำหนดพิกัดเอง…</option></select></div>
    <div class="coords wide" ${+b.place === -1 ? '' : 'hidden'} id="bc">
      <div class="field"><label for="blat">ละติจูด</label><input id="blat" type="number" step="0.0001" min="-66" max="66" value="${b.lat}"></div>
      <div class="field"><label for="blon">ลองจิจูด</label><input id="blon" type="number" step="0.0001" min="-180" max="180" value="${b.lon}"></div>
      <div class="field"><label for="btz">เขตเวลา (UTC+)</label><input id="btz" type="number" step="0.5" min="-12" max="14" value="${b.tz}"></div>
    </div>
    <div class="seg wide" role="group" aria-label="ระบบจักรราศี">
      <button type="button" data-sid="0" aria-pressed="${!b.sid}">แบบสากล</button>
      <button type="button" data-sid="1" aria-pressed="${!!b.sid}">แบบไทย (นิรายนะ)</button>
    </div>
    <button class="cta wide" type="submit">${IC.spark}คำนวณผังดวง</button>
  </form>

  <section class="slip chartout" id="cres">
    ${b.sample ? '<p class="sampletag">ตัวอย่าง: ผังของคนที่เกิด 14 ส.ค. 2538 เวลา 09:30 น. ที่กรุงเทพฯ ใส่ข้อมูลของคุณด้านบนแล้วกดคำนวณ</p>' : ''}
    <h2>${b.name ? esc(b.name) + ' ' : ''}<small>${new Date(b.date + 'T00:00').toLocaleDateString('th-TH', {dateStyle: 'long'})}${b.noTime ? '' : ' · ' + b.time + ' น.'} · ${+b.place === -1 ? 'พิกัดที่กำหนด' : PLACES[b.place][0]} · ${b.sid ? 'ระบบไทย' : 'ระบบสากล'}</small></h2>
    <div class="wheelwrap">${wheelSVG(ch)}</div>
    <div class="big3">
      ${big.map(([k, t, s, f]) => { const z = ZOD[ch.pos[k].sign]; return `<div class="b3"><span class="g" aria-hidden="true">${z.g}︎</span><small>${t}</small><b>${z.th}</b><em>${s}</em><p>${f(z)}</p></div>`; }).join('')}
      ${ch.asc != null ? (() => { const z = ZOD[ch.ascSign]; return `<div class="b3"><span class="g" aria-hidden="true">${z.g}︎</span><small>ลัคนา</small><b>${z.th}</b><em>ภาพที่คนอื่นเห็น</em><p>คนแรกพบมักเห็นคุณ${z.look}</p></div>`; })()
        : `<div class="b3 off"><small>ลัคนา</small><b>ไม่ทราบ</b><p>ต้องรู้เวลาเกิดจึงคำนวณลัคนาได้</p></div>`}
    </div>
    <h3>สมดุลธาตุ</h3>
    <div class="elbar" role="img" aria-label="${Object.entries(elCount).map(([k, v]) => `ธาตุ${ELEM[k][0]} ${v}`).join(' ')}">
      ${Object.entries(elCount).filter(([, v]) => v).map(([k, v]) => `<span style="flex:${v};background:${ELEM[k][1]}">${ELEM[k][0]} ${v}</span>`).join('')}
    </div>
    <p>ธาตุ${ELEM[domEl][0]}เด่นที่สุด คุณจึงเป็นคน${ELEM[domEl][2]}${Object.entries(elCount).filter(([, v]) => v === 0).map(([k]) => ` ส่วนธาตุ${ELEM[k][0]}ยังน้อย ลองฝึก${ELEM[k][2]}เพิ่ม`).join('')}</p>
    <h3>ตำแหน่งดาว</h3>
    <div class="ptable"><table>
      <thead><tr><th>ดาว</th><th>ราศี</th><th class="n">องศา</th>${ch.asc != null ? '<th class="n">เรือน</th>' : ''}</tr></thead>
      <tbody>${ASTRO.BODIES.map(k => { const p = ch.pos[k], z = ZOD[p.sign]; return `<tr><td><span class="glyph" aria-hidden="true">${PLAN[k][1]}︎</span> ${PLAN[k][0]}${p.retro ? ' <abbr title="ดาวถอยหลัง">R</abbr>' : ''}</td><td>${z.g}︎ ${z.th}</td><td class="n">${fmtDeg(p.deg)}</td>${ch.asc != null ? `<td class="n">${p.house}</td>` : ''}</tr>`; }).join('')}
      ${ch.asc != null ? `<tr class="asc"><td>ลัคนา</td><td>${ZOD[ch.ascSign].g}︎ ${ZOD[ch.ascSign].th}</td><td class="n">${fmtDeg(ch.asc % 30)}</td><td class="n">1</td></tr><tr><td>กลางฟ้า (MC)</td><td>${ZOD[Math.floor(ch.mc / 30)].th}</td><td class="n">${fmtDeg(ch.mc % 30)}</td><td class="n">–</td></tr>` : ''}</tbody>
    </table></div>
    <h3>อ่านดวงทีละดาว</h3>
    <div class="reads">${['mercury', 'venus', 'mars', 'jupiter', 'saturn'].map(k => { const p = ch.pos[k], z = ZOD[p.sign]; return `<p><b>${PLAN[k][0]}ในราศี${z.th}</b>${p.house ? ` · เรือน ${p.house} (${HOUSE[p.house - 1]})` : ''}<br>${PLAN[k][2]}ของคุณเป็นแบบ${z.style}${p.retro ? ' ดาวดวงนี้ถอยหลังตอนคุณเกิด เรื่องนี้จึงมักคิดทบทวนข้างในก่อนแสดงออก' : ''}</p>`; }).join('')}</div>
    <div class="actions"><button id="ccopy">${IC.copy}คัดลอกผังดวง</button></div>
    <p class="note">คำนวณตำแหน่งดาวด้วยสูตรดาราศาสตร์ (คลาดเคลื่อนราว 1-2 ลิปดา) แบ่งเรือนแบบราศีเต็ม ระบบไทยใช้อายนางศ์ลาหิรีโดยประมาณ เวลาออมแสงต้องปรับเขตเวลาเอง การตีความเพื่อความบันเทิงและการรู้จักตัวเอง</p>
  </section>`;
  bindChart(ch);
}
function readForm() {
  const b = {...S.birth, sample: false};
  b.name = $('#bn').value.trim(); b.date = $('#bd').value || b.date; b.time = $('#bt').value || '12:00';
  b.noTime = $('#bnt').checked; b.place = +$('#bp').value;
  if (b.place >= 0) { const p = PLACES[b.place]; b.lat = p[1]; b.lon = p[2]; b.tz = p[3]; }
  else { b.lat = +$('#blat').value || 0; b.lon = +$('#blon').value || 0; b.tz = +$('#btz').value || 0; }
  return b;
}
function bindChart(ch) {
  $('#bnt').onchange = e => { $('#bt').disabled = e.target.checked; };
  $('#bp').onchange = e => { $('#bc').hidden = +e.target.value !== -1; };
  document.querySelectorAll('.seg button').forEach(x => x.onclick = () => { document.querySelectorAll('.seg button').forEach(y => y.setAttribute('aria-pressed', y === x)); S.birth.sid = x.dataset.sid === '1'; });
  $('#bf').onsubmit = e => {
    e.preventDefault();
    const b = readForm(); b.sid = !!S.birth.sid;
    const yr = +b.date.slice(0, 4); if (!(yr >= 1900 && yr <= 2099)) { live('ใส่ปีเกิด ค.ศ. ระหว่าง 1900 ถึง 2099'); return; }
    S.birth = b; saveBirth(b); renderChart();
    setTimeout(() => { const r = $('#cres'); if (r) r.scrollIntoView({behavior: 'smooth', block: 'start'}); }, 80);
  };
  $('#ccopy').onclick = () => {
    const b = S.birth;
    let t = `✨ ผังดวงกำเนิด${b.name ? ' ' + b.name : ''}\n${b.date}${b.noTime ? '' : ' ' + b.time} (${b.sid ? 'ระบบไทย' : 'ระบบสากล'})\n`;
    t += ASTRO.BODIES.map(k => { const p = ch.pos[k]; return `${PLAN[k][0]}: ราศี${ZOD[p.sign].th} ${fmtDeg(p.deg)}${p.retro ? ' (R)' : ''}${p.house ? ' เรือน ' + p.house : ''}`; }).join('\n');
    if (ch.asc != null) t += `\nลัคนา: ราศี${ZOD[ch.ascSign].th} ${fmtDeg(ch.asc % 30)}`;
    copyText(t, $('#ccopy'));
  };
}

/* เริ่มแอป */
render();
