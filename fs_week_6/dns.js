!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Disaster Risk Console — Prototype</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
<style>
  :root{
    --bg: #10161a;
    --panel: #182027;
    --panel-raised: #1f2932;
    --border: #2c3944;
    --border-soft: #223038;
    --text: #e7edf0;
    --text-dim: #97a7b0;
    --text-faint: #63737c;
    --accent: #5aa0c9;
    --accent-soft: rgba(90,160,201,0.14);
    --low: #4f9d6e;
    --low-soft: rgba(79,157,110,0.14);
    --med: #d9a441;
    --med-soft: rgba(217,164,65,0.14);
    --high: #c15b4a;
    --high-soft: rgba(193,91,74,0.16);
    --font-head: 'Space Grotesk', 'IBM Plex Sans', sans-serif;
    --font-body: 'IBM Plex Sans', -apple-system, sans-serif;
    --font-data: 'IBM Plex Mono', monospace;
  }
  @media (prefers-color-scheme: light){
    :root:not([data-theme="dark"]){
      --bg: #f2f1ec;
      --panel: #ffffff;
      --panel-raised: #fbfaf6;
      --border: #d9d6cb;
      --border-soft: #e5e2d8;
      --text: #1b211f;
      --text-dim: #5b615d;
      --text-faint: #8b9089;
      --accent: #2f6f8f;
      --accent-soft: rgba(47,111,143,0.10);
      --low: #3f7d54;
      --low-soft: rgba(63,125,84,0.12);
      --med: #a9781e;
      --med-soft: rgba(169,120,30,0.12);
      --high: #a13f2f;
      --high-soft: rgba(161,63,47,0.12);
    }
  }
  :root[data-theme="light"]{
    --bg: #f2f1ec;
    --panel: #ffffff;
    --panel-raised: #fbfaf6;
    --border: #d9d6cb;
    --border-soft: #e5e2d8;
    --text: #1b211f;
    --text-dim: #5b615d;
    --text-faint: #8b9089;
    --accent: #2f6f8f;
    --accent-soft: rgba(47,111,143,0.10);
    --low: #3f7d54;
    --low-soft: rgba(63,125,84,0.12);
    --med: #a9781e;
    --med-soft: rgba(169,120,30,0.12);
    --high: #a13f2f;
    --high-soft: rgba(161,63,47,0.12);
  }
  *{box-sizing:border-box;}
  body{
    margin:0;
    background:var(--bg);
    color:var(--text);
    font-family:var(--font-body);
    line-height:1.5;
    -webkit-font-smoothing:antialiased;
  }
  .wrap{max-width:1180px;margin:0 auto;padding:28px 20px 60px;}
 
  header.top{
    display:flex;justify-content:space-between;align-items:flex-end;
    gap:16px;flex-wrap:wrap;
    padding-bottom:22px;margin-bottom:26px;
    border-bottom:1px solid var(--border);
  }
  .brand{display:flex;gap:12px;align-items:center;}
  .brand-mark{
    width:38px;height:38px;border-radius:8px;
    background:var(--accent-soft);border:1px solid var(--border);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;
  }
  .brand-mark svg{width:20px;height:20px;}
  h1{font-family:var(--font-head);font-size:1.5rem;font-weight:600;margin:0;letter-spacing:-0.01em;}
  .sub{color:var(--text-dim);font-size:0.88rem;margin-top:2px;}
  .status-line{
    font-family:var(--font-data);font-size:0.75rem;color:var(--text-faint);
    display:flex;gap:14px;align-items:center;flex-wrap:wrap;
  }
  .dot{width:6px;height:6px;border-radius:50%;background:var(--low);display:inline-block;margin-right:6px;box-shadow:0 0 0 3px var(--low-soft);}
 
  .grid{display:grid;grid-template-columns: 1fr 1.15fr;gap:20px;align-items:start;}
  @media (max-width:860px){ .grid{grid-template-columns:1fr;} }
 
  .panel{
    background:var(--panel);
    border:1px solid var(--border);
    border-radius:10px;
    padding:22px;
  }
  .panel + .panel{margin-top:20px;}
  .panel-title{
    font-family:var(--font-head);font-size:1rem;font-weight:600;margin:0 0 4px;
  }
  .panel-desc{color:var(--text-dim);font-size:0.83rem;margin:0 0 18px;}
 
  label{display:block;font-size:0.78rem;color:var(--text-dim);margin-bottom:6px;font-weight:500;}
  .field{margin-bottom:16px;}
  select, input[type=number]{
    width:100%;background:var(--panel-raised);border:1px solid var(--border);color:var(--text);
    padding:9px 11px;border-radius:7px;font-family:var(--font-body);font-size:0.9rem;
  }
  select:focus, input:focus, button:focus, .seg button:focus{outline:2px solid var(--accent);outline-offset:1px;}
  .seg{display:flex;border:1px solid var(--border);border-radius:7px;overflow:hidden;}
  .seg button{
    flex:1;background:var(--panel-raised);color:var(--text-dim);border:none;
    padding:9px 6px;font-size:0.82rem;font-family:var(--font-body);cursor:pointer;
    border-right:1px solid var(--border);
  }
  .seg button:last-child{border-right:none;}
  .seg button.active{background:var(--accent-soft);color:var(--accent);font-weight:600;}
 
  .slider-row{display:flex;align-items:center;gap:12px;}
  input[type=range]{flex:1;accent-color:var(--accent);}
  .slider-val{
    font-family:var(--font-data);font-weight:600;font-size:0.95rem;
    width:22px;text-align:center;
  }
 
  .row2{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
 
  .btn-primary{
    width:100%;background:var(--accent);color:#0d1417;border:none;
    padding:12px;border-radius:7px;font-family:var(--font-head);font-weight:600;font-size:0.92rem;
    cursor:pointer;margin-top:6px;
  }
  .btn-primary:hover{filter:brightness(1.08);}
  .btn-ghost{
    background:transparent;border:1px solid var(--border);color:var(--text-dim);
    padding:8px 12px;border-radius:7px;font-size:0.78rem;cursor:pointer;font-family:var(--font-body);
  }
  .btn-ghost:hover{border-color:var(--accent);color:var(--accent);}
 
  /* Result / dashboard side */
  .risk-banner{
    border-radius:9px;padding:20px;display:flex;justify-content:space-between;align-items:center;
    gap:14px;border:1px solid var(--border);background:var(--panel-raised);
  }
  .risk-banner.low{background:var(--low-soft);border-color:var(--low);}
  .risk-banner.medium{background:var(--med-soft);border-color:var(--med);}
  .risk-banner.high{background:var(--high-soft);border-color:var(--high);}
  .risk-label-sm{font-size:0.72rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-dim);margin-bottom:4px;}
  .risk-value{font-family:var(--font-head);font-size:1.7rem;font-weight:700;}
  .risk-banner.low .risk-value{color:var(--low);}
  .risk-banner.medium .risk-value{color:var(--med);}
  .risk-banner.high .risk-value{color:var(--high);}
  .priority-pill{
    font-family:var(--font-data);font-size:0.8rem;font-weight:600;padding:7px 14px;border-radius:20px;
    border:1px solid currentColor;white-space:nowrap;
  }
  .risk-banner.low .priority-pill{color:var(--low);}
  .risk-banner.medium .priority-pill{color:var(--med);}
  .risk-banner.high .priority-pill{color:var(--high);}
 
  .placeholder{
    text-align:center;padding:40px 20px;color:var(--text-faint);font-size:0.88rem;
    border:1px dashed var(--border);border-radius:9px;
  }
 
  .trace{margin-top:18px;}
  .trace-title{font-size:0.78rem;color:var(--text-dim);margin-bottom:10px;font-weight:600;}
  .trace-item{
    display:flex;justify-content:space-between;font-family:var(--font-data);font-size:0.8rem;
    padding:7px 0;border-bottom:1px solid var(--border-soft);color:var(--text-dim);
  }
  .trace-item:last-child{border-bottom:none;font-weight:600;color:var(--text);}
  .trace-item span:last-child{color:var(--text);}
 
  .score-bar-track{
    height:8px;border-radius:5px;background:var(--panel-raised);border:1px solid var(--border);
    overflow:hidden;margin-top:14px;
  }
  .score-bar-fill{height:100%;border-radius:5px;transition:width .4s ease;}
 
  table{width:100%;border-collapse:collapse;font-size:0.82rem;}
  th{
    text-align:left;color:var(--text-faint);font-weight:500;font-size:0.72rem;text-transform:uppercase;
    letter-spacing:0.04em;padding:8px 10px;border-bottom:1px solid var(--border);
  }
  td{padding:9px 10px;border-bottom:1px solid var(--border-soft);color:var(--text-dim);}
  tr:last-child td{border-bottom:none;}
  .badge{
    font-family:var(--font-data);font-size:0.72rem;font-weight:600;padding:3px 9px;border-radius:12px;display:inline-block;
  }
  .badge.low{color:var(--low);background:var(--low-soft);}
  .badge.medium{color:var(--med);background:var(--med-soft);}
  .badge.high{color:var(--high);background:var(--high-soft);}
 
  .empty-log{color:var(--text-faint);font-size:0.85rem;text-align:center;padding:26px 0;}
 
  .stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px;}
  .stat{
    background:var(--panel-raised);border:1px solid var(--border);border-radius:8px;padding:12px 14px;
  }
  .stat-num{font-family:var(--font-head);font-size:1.4rem;font-weight:700;}
  .stat-lab{font-size:0.7rem;color:var(--text-faint);text-transform:uppercase;letter-spacing:0.04em;margin-top:2px;}
  @media (max-width:600px){ .stat-row{grid-template-columns:repeat(2,1fr);} }
 
  .footnote{
    color:var(--text-faint);font-size:0.75rem;margin-top:26px;padding-top:16px;border-top:1px solid var(--border);
    line-height:1.6;
  }
  .theme-toggle{
    background:transparent;border:1px solid var(--border);color:var(--text-dim);
    padding:7px 10px;border-radius:7px;cursor:pointer;font-size:0.78rem;font-family:var(--font-body);
  }
 
  .module-tag{
    display:inline-block;font-family:var(--font-data);font-size:0.68rem;color:var(--accent);
    background:var(--accent-soft);padding:2px 7px;border-radius:5px;margin-right:6px;margin-bottom:6px;
  }
</style>
</head>
<body>
<div class="wrap">
 
  <header class="top">
    <div class="brand">
      <div class="brand-mark">
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.6"><path d="M12 2 3 7v6c0 5 4 8.5 9 9 5-.5 9-4 9-9V7l-9-5Z"/><path d="M9 12.5 11 14.5 15.5 9.5"/></svg>
      </div>
      <div>
        <h1>Disaster Risk Console</h1>
        <div class="sub">AI/ML decision-support prototype — Modules 1–6 case study</div>
      </div>
    </div>
    <div style="display:flex;gap:10px;align-items:center;">
      <div class="status-line"><span><span class="dot"></span>model: rule-based decision tree</span></div>
      <button class="theme-toggle" id="themeToggle" type="button">Toggle theme</button>
    </div>
  </header>
 
  <div class="grid">
    <!-- LEFT: INPUT -->
    <div>
      <div class="panel">
        <div class="panel-title">Disaster entry</div>
        <p class="panel-desc">Enter available field indicators. The model classifies risk and suggests a response priority — a human decision-maker reviews before action.</p>
 
        <div class="field">
          <label for="dtype">Disaster type</label>
          <select id="dtype">
            <option>Flood</option>
            <option>Cyclone</option>
            <option>Earthquake</option>
            <option>Landslide</option>
            <option>Fire</option>
            <option>Industrial incident</option>
          </select>
        </div>
 
        <div class="field">
          <label for="location">Location / area</label>
          <select id="location">
            <option>Area A</option>
            <option>Area B</option>
            <option>Area C</option>
            <option>Area D</option>
          </select>
        </div>
 
        <div class="field">
          <label>Severity <span style="color:var(--text-faint)">(1 – low, 5 – critical)</span></label>
          <div class="slider-row">
            <input type="range" id="severity" min="1" max="5" value="3" step="1">
            <div class="slider-val" id="severityVal">3</div>
          </div>
        </div>
 
        <div class="field">
          <label>Rainfall / environmental indicator</label>
          <div class="seg" id="rainfallSeg">
            <button data-v="Low" class="active">Low</button>
            <button data-v="Medium">Medium</button>
            <button data-v="High">High</button>
          </div>
        </div>
 
        <div class="row2">
          <div class="field">
            <label for="population">Affected population (est.)</label>
            <input type="number" id="population" value="250" min="0" step="10">
          </div>
          <div class="field">
            <label>Resource availability</label>
            <div class="seg" id="resourceSeg">
              <button data-v="High">High</button>
              <button data-v="Medium" class="active">Medium</button>
              <button data-v="Low">Low</button>
            </div>
          </div>
        </div>
 
        <button class="btn-primary" id="predictBtn" type="button">Predict risk &amp; add to dashboard</button>
      </div>
 
      <div class="panel">
        <div class="panel-title">Applied modules</div>
        <p class="panel-desc" style="margin-bottom:10px;">Where this prototype connects to Modules 1–6.</p>
        <span class="module-tag">M1 · agent &amp; decision support</span>
        <span class="module-tag">M2 · priority search</span>
        <span class="module-tag">M3 · rule representation</span>
        <span class="module-tag">M4 · classification</span>
        <span class="module-tag">M5 · evaluation</span>
        <span class="module-tag">M6 · responsible use</span>
      </div>
    </div>
 
    <!-- RIGHT: RESULT + DASHBOARD -->
    <div>
      <div class="panel" id="resultPanel">
        <div class="panel-title">Prediction result</div>
        <p class="panel-desc">Educational prototype output — not an official emergency instruction.</p>
        <div id="resultArea">
          <div class="placeholder">Enter disaster details and run a prediction to see the risk classification here.</div>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-title">Incident dashboard</div>
        <p class="panel-desc">All predictions in this session.</p>
        <div class="stat-row">
          <div class="stat"><div class="stat-num" id="statTotal">0</div><div class="stat-lab">Logged</div></div>
          <div class="stat"><div class="stat-num" style="color:var(--low)" id="statLow">0</div><div class="stat-lab">Low</div></div>
          <div class="stat"><div class="stat-num" style="color:var(--med)" id="statMed">0</div><div class="stat-lab">Medium</div></div>
          <div class="stat"><div class="stat-num" style="color:var(--high)" id="statHigh">0</div><div class="stat-lab">High</div></div>
        </div>
        <div id="logArea">
          <div class="empty-log">No incidents logged yet this session.</div>
        </div>
        <div style="margin-top:14px;display:flex;justify-content:flex-end;">
          <button class="btn-ghost" id="clearLog" type="button">Clear log</button>
        </div>
      </div>
 
      <div class="panel">
        <div class="panel-title">Model reference: sample training data</div>
        <p class="panel-desc">Small labeled dataset used to shape the decision rules (Section 11.1 of the case study), with a basic evaluation check.</p>
        <table>
          <thead><tr><th>Disaster</th><th>Severity</th><th>Affected</th><th>Resources</th><th>Actual</th><th>Predicted</th></tr></thead>
          <tbody id="sampleBody"></tbody>
        </table>
        <div class="footnote" id="evalNote"></div>
      </div>
    </div>
  </div>
 
  <div class="footnote">
    Prototype built for an undergraduate AI/ML case study on disaster management. Risk levels use a transparent, weighted rule-based
    stand-in for a trained Decision Tree classifier so the reasoning stays inspectable. Not validated for real emergency use — human
    authorities remain responsible for all decisions.
  </div>
 
</div>
 
<script>
(function(){
  var state = { rainfall: 'Low', resource: 'Medium' };
  var log = [];
 
  // ---- Theme toggle ----
  var themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', function(){
    var root = document.documentElement;
    var current = root.getAttribute('data-theme');
    if(current === 'dark'){ root.setAttribute('data-theme','light'); }
    else if(current === 'light'){ root.removeAttribute('data-theme'); }
    else { root.setAttribute('data-theme','dark'); }
  });
 
  // ---- Segmented controls ----
  function wireSeg(id, key){
    var el = document.getElementById(id);
    el.querySelectorAll('button').forEach(function(btn){
      btn.addEventListener('click', function(){
        el.querySelectorAll('button').forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        state[key] = btn.getAttribute('data-v');
      });
    });
  }
  wireSeg('rainfallSeg','rainfall');
  wireSeg('resourceSeg','resource');
 
  var sev = document.getElementById('severity');
  var sevVal = document.getElementById('severityVal');
  sev.addEventListener('input', function(){ sevVal.textContent = sev.value; });
 
  // ---- Core rule-based classifier (transparent stand-in for a trained Decision Tree) ----
  function classify(input){
    var trace = [];
    var score = input.severity * 2;
    trace.push({ label: 'Severity (' + input.severity + ' × 2)', val: '+' + (input.severity*2) });
 
    var resPts = input.resources === 'Low' ? 2 : (input.resources === 'Medium' ? 1 : 0);
    if(resPts>0) trace.push({ label: 'Resource availability: ' + input.resources, val: '+' + resPts });
    score += resPts;
 
    var popPts = input.population >= 500 ? 2 : (input.population >= 200 ? 1 : 0);
    if(popPts>0) trace.push({ label: 'Affected population: ' + input.population, val: '+' + popPts });
    score += popPts;
 
    var rainPts = input.rainfall === 'High' ? 1 : 0;
    if(rainPts>0) trace.push({ label: 'Rainfall indicator: High', val: '+1' });
    score += rainPts;
 
    var risk, priority;
    if(score >= 10){ risk = 'High'; priority = 'Immediate Response'; }
    else if(score >= 6){ risk = 'Medium'; priority = 'Prepare'; }
    else { risk = 'Low'; priority = 'Monitor'; }
 
    return { score: score, trace: trace, risk: risk, priority: priority };
  }
 
  // ---- Predict & log ----
  document.getElementById('predictBtn').addEventListener('click', function(){
    var input = {
      type: document.getElementById('dtype').value,
      location: document.getElementById('location').value,
      severity: parseInt(sev.value,10),
      rainfall: state.rainfall,
      resources: state.resource,
      population: parseInt(document.getElementById('population').value,10) || 0
    };
    var result = classify(input);
    renderResult(input, result);
    log.unshift(Object.assign({}, input, result, { t: new Date() }));
    renderLog();
  });
 
  function riskClass(r){ return r.toLowerCase(); }
 
  function renderResult(input, result){
    var area = document.getElementById('resultArea');
    var maxScore = 15;
    var pct = Math.min(100, Math.round(result.score/maxScore*100));
    var color = result.risk === 'High' ? 'var(--high)' : (result.risk === 'Medium' ? 'var(--med)' : 'var(--low)');
 
    var traceHtml = result.trace.map(function(t){
      return '<div class="trace-item"><span>'+t.label+'</span><span>'+t.val+'</span></div>';
    }).join('');
    traceHtml += '<div class="trace-item"><span>Total weighted score</span><span>'+result.score+' / '+maxScore+'</span></div>';
 
    area.innerHTML =
      '<div class="risk-banner '+riskClass(result.risk)+'">' +
        '<div><div class="risk-label-sm">'+input.type+' · '+input.location+'</div><div class="risk-value">'+result.risk+' Risk</div></div>' +
        '<div class="priority-pill">'+result.priority+'</div>' +
      '</div>' +
      '<div class="score-bar-track"><div class="score-bar-fill" style="width:'+pct+'%;background:'+color+';"></div></div>' +
      '<div class="trace"><div class="trace-title">Decision path</div>'+traceHtml+'</div>';
  }
 
  function renderLog(){
    var body = document.getElementById('logArea');
    document.getElementById('statTotal').textContent = log.length;
    document.getElementById('statLow').textContent = log.filter(function(l){return l.risk==='Low';}).length;
    document.getElementById('statMed').textContent = log.filter(function(l){return l.risk==='Medium';}).length;
    document.getElementById('statHigh').textContent = log.filter(function(l){return l.risk==='High';}).length;
 
    if(log.length === 0){
      body.innerHTML = '<div class="empty-log">No incidents logged yet this session.</div>';
      return;
    }
    var rows = log.map(function(l){
      return '<tr><td>'+l.type+'</td><td>'+l.location+'</td><td>'+l.severity+'</td><td>'+l.population+'</td>' +
        '<td><span class="badge '+riskClass(l.risk)+'">'+l.risk+'</span></td><td>'+l.priority+'</td></tr>';
    }).join('');
    body.innerHTML =
      '<table><thead><tr><th>Disaster</th><th>Area</th><th>Sev.</th><th>Affected</th><th>Risk</th><th>Priority</th></tr></thead>' +
      '<tbody>'+rows+'</tbody></table>';
  }
 
  document.getElementById('clearLog').addEventListener('click', function(){
    log = [];
    renderLog();
  });
 
  // ---- Sample training data + basic evaluation (Section 11.1 / 11.3) ----
  var samples = [
    { type:'Flood', severity:5, population:800, resources:'Low', rainfall:'High', actual:'High' },
    { type:'Cyclone', severity:4, population:500, resources:'Medium', rainfall:'High', actual:'High' },
    { type:'Flood', severity:2, population:100, resources:'High', rainfall:'Low', actual:'Low' },
    { type:'Landslide', severity:3, population:250, resources:'Medium', rainfall:'Medium', actual:'Medium' }
  ];
  var correct = 0;
  var sampleRows = samples.map(function(s){
    var r = classify(s);
    if(r.risk === s.actual) correct++;
    var match = r.risk === s.actual;
    return '<tr><td>'+s.type+'</td><td>'+s.severity+'</td><td>'+s.population+'</td><td>'+s.resources+'</td>' +
      '<td><span class="badge '+s.actual.toLowerCase()+'">'+s.actual+'</span></td>' +
      '<td><span class="badge '+r.risk.toLowerCase()+'">'+r.risk+'</span> '+(match?'':'⚠') +'</td></tr>';
  }).join('');
  document.getElementById('sampleBody').innerHTML = sampleRows;
  document.getElementById('evalNote').innerHTML =
    'Accuracy on this sample set: <strong style="color:var(--text)">' + correct + ' / ' + samples.length +
    '</strong>. A real deployment would use a much larger, validated dataset and a formally trained model rather than fixed weights.';
 
  // Render initial empty log stats
  renderLog();
})();
</script>
</body>
</html>