// ── Simple Site Search ──────────────────────────────────────────────────────
// Maps keywords to the page they live on.

const searchIndex = [
  { keywords: ["sphinx", "water", "erosion", "egypt", "monument", "egyptian"],                 page: "indexTopics.html" },
  { keywords: ["giza", "chamber", "plateau", "radar", "pyramid", "pyramids", "sealed"], page: "index.html" },
  { keywords: ["gobekli", "tepe", "carvings", "turkey", "megalith", "neolithic"],        page: "index.html" },
  { keywords: ["amazon", "lidar", "jungle", "south america", "pre-columbian"],            page: "index.html" },
  { keywords: ["sumerian", "tablet", "cuneiform", "mesopotamia", "flood", "antediluvian", "kings"], page: "index.html" },
  { keywords: ["richat", "sahara", "eye of the sahara", "atlantis", "africa"],            page: "indexTopics.html" },
  { keywords: ["hawara", "labyrinth", "amenemhat", "herodotus", "underground"],           page: "indexTopics.html" },
  { keywords: ["enoch", "book of enoch", "noah", "watchers", "apocrypha"],               page: "indexTopics.html" },
  { keywords: ["gunung", "padang", "indonesia", "27000", "oldest"],                       page: "indexTopics.html" },
  { keywords: ["deluge", "ice age", "younger dryas", "biblical"],                        page: "indexTopics.html" },
  { keywords: ["plato", "timaeus", "critias", "lost civilization"],                       page: "indexTopics.html" },
  { keywords: ["dead sea scrolls", "scrolls", "qumran", "hebrew", "jewish"],             page: "indexTopics.html" },
  { keywords: ["about", "mission", "contact", "founded", "platform", "journalism"],      page: "indexAbout.html" },
];

// ── 1. Handle the search form submit ────────────────────────────────────────
const form = document.getElementById("searchForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("searchBox").value.trim().toLowerCase();
    if (!query) return;

    // Find the first page in which keywords match the query
    const match = searchIndex.find(entry =>
      entry.keywords.some(k => k.includes(query) || query.includes(k))
    );

    const destination = match ? match.page : "index.html";
    window.location.href = destination + "?q=" + encodeURIComponent(query);
  });
}

// ── 2. On page load, highlight any matches in the page ──────────────────
const params = new URLSearchParams(window.location.search);
const query  = params.get("q");

if (query) {
  // Inject a simple highlight style
  const style = document.createElement("style");
  style.textContent = "mark { background: #f8d47085; color: #1a1008; border-radius: .5rem; padding: 0 .5rem; }";
  document.head.appendChild(style);

  // Reads all text inside <main> and highlights matches in the page
  const main = document.querySelector("main");
  if (main) {
    const re = new RegExp("(" + query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");

    function highlight(node) {
      if (node.nodeType === 3 && re.test(node.textContent)) {
        const span = document.createElement("span");
        span.innerHTML = node.textContent.replace(re, "<mark>$1</mark>");
        node.replaceWith(span);
      } else if (node.nodeType === 1 && node.tagName !== "SCRIPT" && node.tagName !== "STYLE") {
        Array.from(node.childNodes).forEach(highlight);
      }
    }

    highlight(main);

    // Scroll to the first highlighted word
    const first = document.querySelector("mark");
    if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

// ── 3. Click anywhere to clear highlights ───────────────────────────────────
if (query) {
  document.addEventListener("click", function clearHighlights() {
    document.querySelectorAll("mark").forEach(mark => {
      mark.replaceWith(document.createTextNode(mark.textContent));
    });
    document.removeEventListener("click", clearHighlights);
  });
}
