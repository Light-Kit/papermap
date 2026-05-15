"use strict";

const sidebar = document.getElementById("corpora");
const main = document.getElementById("main");

async function loadCorpora() {
  const resp = await fetch("/api/corpora");
  const items = await resp.json();
  sidebar.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item.title || item.name;
    li.dataset.name = item.name;
    if (!item.valid) {
      li.classList.add("invalid");
      li.title = item.error || "invalid corpus";
    }
    li.addEventListener("click", () => selectCorpus(li, item));
    sidebar.appendChild(li);
  }
}

async function selectCorpus(li, item) {
  document.querySelectorAll("#corpora li.active").forEach(el => el.classList.remove("active"));
  li.classList.add("active");

  if (!item.valid) {
    main.innerHTML = "";
    const err = document.createElement("div");
    err.className = "error";
    err.textContent = `${item.name}: ${item.error}`;
    main.appendChild(err);
    return;
  }

  main.innerHTML = '<p class="placeholder">Loading…</p>';
  const resp = await fetch(`/api/map/${encodeURIComponent(item.name)}`);
  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    main.innerHTML = "";
    const err = document.createElement("div");
    err.className = "error";
    err.textContent = data.error || `${resp.status} ${resp.statusText}`;
    main.appendChild(err);
    return;
  }
  const data = await resp.json();
  renderMap(item, data);
}

function renderMap(item, data) {
  main.innerHTML = "";

  const header = document.createElement("header");
  const h2 = document.createElement("h2");
  h2.textContent = data.title;
  const stats = document.createElement("span");
  stats.className = "stats";
  stats.textContent =
    `${data.stats.papers} papers · ${data.stats.edges} edges · ` +
    `${data.stats.categories} categories · ${data.stats.relations} relations`;
  header.appendChild(h2);
  header.appendChild(stats);
  main.appendChild(header);

  const dl = document.createElement("a");
  dl.className = "download";
  dl.href = `/download/${encodeURIComponent(item.name)}`;
  dl.textContent = "Download HTML";
  main.appendChild(dl);

  if (data.warnings && data.warnings.length) {
    const wrap = document.createElement("div");
    wrap.className = "warnings";
    wrap.innerHTML = "<strong>Lint warnings</strong>";
    const ul = document.createElement("ul");
    for (const w of data.warnings) {
      const liw = document.createElement("li");
      liw.textContent = w;
      ul.appendChild(liw);
    }
    wrap.appendChild(ul);
    main.appendChild(wrap);
  }

  const det = document.createElement("details");
  const sum = document.createElement("summary");
  sum.textContent = "Raw YAML";
  const pre = document.createElement("pre");
  pre.textContent = data.yaml;
  det.appendChild(sum);
  det.appendChild(pre);
  main.appendChild(det);

  // Inject the figure fragment and let Plotly bind to the <div> inside it.
  const figWrap = document.createElement("div");
  figWrap.innerHTML = data.fragment;
  main.appendChild(figWrap);

  // Re-execute the scripts the fragment contains so Plotly.newPlot runs.
  figWrap.querySelectorAll("script").forEach(orig => {
    const s = document.createElement("script");
    if (orig.src) s.src = orig.src;
    else s.textContent = orig.textContent;
    document.body.appendChild(s);
    document.body.removeChild(s);
  });
}

loadCorpora();
