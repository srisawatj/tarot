/* ===== คำนวณตำแหน่งดาว (วิธีของ Paul Schlyter, แม่นราว 1-2 ลิปดา ใช้ได้ช่วงปี 1900-2100) ===== */
const ASTRO = (() => {
  const R = Math.PI / 180, D = 180 / Math.PI;
  const n360 = x => ((x % 360) + 360) % 360;
  const sin = x => Math.sin(x * R), cos = x => Math.cos(x * R);
  const EL = {
    sun:     d => ({N:0, i:0, w:282.9404 + 4.70935e-5*d, a:1, e:0.016709 - 1.151e-9*d, M:356.0470 + 0.9856002585*d}),
    moon:    d => ({N:125.1228 - 0.0529538083*d, i:5.1454, w:318.0634 + 0.1643573223*d, a:60.2666, e:0.0549, M:115.3654 + 13.0649929509*d}),
    mercury: d => ({N:48.3313 + 3.24587e-5*d, i:7.0047 + 5e-8*d, w:29.1241 + 1.01444e-5*d, a:0.387098, e:0.205635 + 5.59e-10*d, M:168.6562 + 4.0923344368*d}),
    venus:   d => ({N:76.6799 + 2.4659e-5*d, i:3.3946 + 2.75e-8*d, w:54.891 + 1.38374e-5*d, a:0.72333, e:0.006773 - 1.302e-9*d, M:48.0052 + 1.6021302244*d}),
    mars:    d => ({N:49.5574 + 2.11081e-5*d, i:1.8497 - 1.78e-8*d, w:286.5016 + 2.92961e-5*d, a:1.523688, e:0.093405 + 2.516e-9*d, M:18.6021 + 0.5240207766*d}),
    jupiter: d => ({N:100.4542 + 2.76854e-5*d, i:1.303 - 1.557e-7*d, w:273.8777 + 1.64505e-5*d, a:5.20256, e:0.048498 + 4.469e-9*d, M:19.895 + 0.0830853001*d}),
    saturn:  d => ({N:113.6634 + 2.3898e-5*d, i:2.4886 - 1.081e-7*d, w:339.3939 + 2.97661e-5*d, a:9.55475, e:0.055546 - 9.499e-9*d, M:316.967 + 0.0334442282*d}),
    uranus:  d => ({N:74.0005 + 1.3978e-5*d, i:0.7733 + 1.9e-8*d, w:96.6612 + 3.0565e-5*d, a:19.18171 - 1.55e-8*d, e:0.047318 + 7.45e-9*d, M:142.5905 + 0.011725806*d}),
    neptune: d => ({N:131.7806 + 3.0173e-5*d, i:1.77 - 2.55e-7*d, w:272.8461 - 6.027e-6*d, a:30.05826 + 3.313e-8*d, e:0.008606 + 2.15e-9*d, M:260.2471 + 0.005995147*d})
  };
  function orbit(o) {
    const M = n360(o.M);
    let E = M + o.e * D * sin(M) * (1 + o.e * cos(M));
    for (let k = 0; k < 8; k++) E = E - (E - o.e * D * sin(E) - M) / (1 - o.e * cos(E));
    const xv = o.a * (cos(E) - o.e), yv = o.a * Math.sqrt(1 - o.e * o.e) * sin(E);
    const v = Math.atan2(yv, xv) * D, r = Math.hypot(xv, yv);
    const x = r * (cos(o.N) * cos(v + o.w) - sin(o.N) * sin(v + o.w) * cos(o.i));
    const y = r * (sin(o.N) * cos(v + o.w) + cos(o.N) * sin(v + o.w) * cos(o.i));
    const z = r * sin(v + o.w) * sin(o.i);
    return {lon: n360(Math.atan2(y, x) * D), lat: Math.atan2(z, Math.hypot(x, y)) * D, r};
  }
  function sunPos(d) { const s = orbit(EL.sun(d)); return {lon: s.lon, r: s.r}; }
  function moonLon(d) {
    const m = EL.moon(d), s = EL.sun(d), o = orbit(m);
    const Ms = n360(s.M), Mm = n360(m.M), Ls = n360(s.M + s.w), Lm = n360(m.M + m.w + m.N);
    const Dd = Lm - Ls, F = Lm - m.N;
    return n360(o.lon - 1.274*sin(Mm - 2*Dd) + 0.658*sin(2*Dd) - 0.186*sin(Ms) - 0.059*sin(2*Mm - 2*Dd)
      - 0.057*sin(Mm - 2*Dd + Ms) + 0.053*sin(Mm + 2*Dd) + 0.046*sin(2*Dd - Ms) + 0.041*sin(Mm - Ms)
      - 0.035*sin(Dd) - 0.031*sin(Mm + Ms) - 0.015*sin(2*F - 2*Dd) + 0.011*sin(Mm - 4*Dd));
  }
  function helio(p, d) {
    if (p === 'pluto') {
      const S = 50.03 + 0.033459652*d, P = 238.95 + 0.003968789*d;
      const lon = 238.9508 + 0.00400703*d - 19.799*sin(P) + 19.848*cos(P) + 0.897*sin(2*P) - 4.956*cos(2*P)
        + 0.61*sin(3*P) + 1.211*cos(3*P) - 0.341*sin(4*P) - 0.19*cos(4*P) + 0.128*sin(5*P) - 0.034*cos(5*P)
        - 0.038*sin(6*P) + 0.031*cos(6*P) + 0.02*sin(S - P) - 0.01*cos(S - P);
      const lat = -3.9082 - 5.453*sin(P) - 14.975*cos(P) + 3.527*sin(2*P) + 1.673*cos(2*P) - 1.051*sin(3*P)
        + 0.328*cos(3*P) + 0.179*sin(4*P) - 0.292*cos(4*P) + 0.019*sin(5*P) + 0.1*cos(5*P) - 0.031*sin(6*P) - 0.026*cos(6*P) + 0.011*cos(S - P);
      const r = 40.72 + 6.68*sin(P) + 6.9*cos(P) - 1.18*sin(2*P) - 0.03*cos(2*P) + 0.15*sin(3*P) - 0.14*cos(3*P);
      return {lon: n360(lon), lat, r};
    }
    const h = orbit(EL[p](d));
    const Mj = n360(EL.jupiter(d).M), Ms = n360(EL.saturn(d).M), Mu = n360(EL.uranus(d).M);
    if (p === 'jupiter') h.lon += -0.332*sin(2*Mj - 5*Ms - 67.6) - 0.056*sin(2*Mj - 2*Ms + 21) + 0.042*sin(3*Mj - 5*Ms + 21)
      - 0.036*sin(Mj - 2*Ms) + 0.022*cos(Mj - Ms) + 0.023*sin(2*Mj - 3*Ms + 52) - 0.016*sin(Mj - 5*Ms - 69);
    if (p === 'saturn') h.lon += 0.812*sin(2*Mj - 5*Ms - 67.6) - 0.229*cos(2*Mj - 4*Ms - 2) + 0.119*sin(Mj - 2*Ms - 3)
      + 0.046*sin(2*Mj - 6*Ms - 69) + 0.014*sin(Mj - 3*Ms + 32);
    if (p === 'uranus') h.lon += 0.04*sin(Ms - 2*Mu + 6) + 0.035*sin(Ms - 3*Mu + 33) - 0.015*sin(Mj - Mu + 20);
    return h;
  }
  function geoLon(p, d) {
    if (p === 'sun') return sunPos(d).lon;
    if (p === 'moon') return moonLon(d);
    const h = helio(p, d), s = sunPos(d);
    const x = h.r * cos(h.lon) * cos(h.lat) + s.r * cos(s.lon);
    const y = h.r * sin(h.lon) * cos(h.lat) + s.r * sin(s.lon);
    return n360(Math.atan2(y, x) * D);
  }
  const BODIES = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
  /* utcMs = เวลา UTC เป็นมิลลิวินาที, lat/lon เป็นองศา (ตะวันออกเป็นบวก) */
  function chart(utcMs, lat, lon) {
    const jd = utcMs / 86400000 + 2440587.5, d = jd - 2451543.5;
    const out = {};
    BODIES.forEach(b => {
      const l = geoLon(b, d), l2 = geoLon(b, d + 0.5);
      let mv = l2 - l; if (mv > 180) mv -= 360; if (mv < -180) mv += 360;
      out[b] = {lon: l, retro: b !== 'sun' && b !== 'moon' && mv < 0};
    });
    const eps = 23.4393 - 3.563e-7 * d;
    const T = (jd - 2451545) / 36525;
    const gmst = n360(280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T);
    const ramc = n360(gmst + lon);
    const asc = n360(Math.atan2(cos(ramc), -(sin(ramc) * cos(eps) + Math.tan(lat * R) * sin(eps))) * D);
    const mc = n360(Math.atan2(sin(ramc), cos(ramc) * cos(eps)) * D);
    return {bodies: out, asc, mc, eps, ramc, year: 2000 + d / 365.25};
  }
  /* อายนางศ์ลาหิรี (โดยประมาณ) สำหรับระบบนิรายนะแบบไทย/อินเดีย */
  const ayanamsa = year => 23.853 + (year - 2000) * 0.013969;
  return {chart, ayanamsa, n360, BODIES};
})();
