const STRIPE_LINKS = {
  monthly: "",
  annual: "",
  pensioner: "",
  founding: ""
};

const PARKS = [
  {
    id: "labrador-broadwater",
    name: "Labrador Broadwater Dog Exercise Area",
    suburb: "Labrador",
    state: "QLD",
    postcode: "4215",
    council: "Gold Coast",
    size: "large",
    hectares: 3.2,
    safeDogCapacity: 28,
    setting: "coastal",
    fenced: "partial",
    distanceKm: { Labrador: 0.8, Southport: 4.0, "Palm Beach": 29, Robina: 21, "Burleigh Heads": 25, Helensvale: 12, "Varsity Lakes": 23, Coolangatta: 37 },
    beach: true,
    tide: true,
    councilRules: true,
    greyNomad: true,
    caravan: true,
    accessible: true,
    easyParking: true,
    cafe: true,
    waterBowl: true,
    smallDog: false,
    bigDog: true,
    reactive: false,
    puppy: true,
    senior: true,
    water: true,
    shade: true,
    toilets: true,
    bins: true,
    lighting: false,
    quiet: "medium",
    best: ["big dogs", "grey nomads", "beach walks", "travellers", "dogs needing room"],
    warnings: ["check tides", "check council signage", "partial fencing", "can be busy"],
    prompt: "Check local council signage and official off-leash rules before letting a dog off lead."
  },
  {
    id: "southport-small",
    name: "Southport Small Fenced Dog Park",
    suburb: "Southport",
    state: "QLD",
    postcode: "4215",
    council: "Gold Coast",
    size: "small",
    hectares: 0.45,
    safeDogCapacity: 8,
    setting: "suburban",
    fenced: "full",
    distanceKm: { Labrador: 4.2, Southport: 0.7, "Palm Beach": 26, Robina: 18, "Burleigh Heads": 22, Helensvale: 14, "Varsity Lakes": 20, Coolangatta: 34 },
    beach: false,
    tide: false,
    councilRules: true,
    greyNomad: false,
    caravan: false,
    accessible: true,
    easyParking: true,
    cafe: true,
    waterBowl: true,
    smallDog: true,
    bigDog: false,
    reactive: true,
    puppy: true,
    senior: true,
    water: true,
    shade: true,
    toilets: false,
    bins: true,
    lighting: false,
    quiet: "quiet",
    best: ["small dogs", "nervous dogs", "puppies", "senior dogs", "short visits"],
    warnings: ["limited running room", "not ideal for large high-energy dogs"],
    prompt: "Check signs for local rules, hours and dog control requirements."
  },
  {
    id: "palm-beach",
    name: "Palm Beach Off-Leash Beach Area",
    suburb: "Palm Beach",
    state: "QLD",
    postcode: "4221",
    council: "Gold Coast",
    size: "huge",
    hectares: 6.5,
    safeDogCapacity: 45,
    setting: "beach",
    fenced: "none",
    distanceKm: { Labrador: 29, Southport: 26, "Palm Beach": 0.6, Robina: 11, "Burleigh Heads": 6, Helensvale: 31, "Varsity Lakes": 8, Coolangatta: 13 },
    beach: true,
    tide: true,
    councilRules: true,
    greyNomad: true,
    caravan: true,
    accessible: false,
    easyParking: true,
    cafe: true,
    waterBowl: false,
    smallDog: false,
    bigDog: true,
    reactive: false,
    puppy: false,
    senior: false,
    water: false,
    shade: false,
    toilets: true,
    bins: true,
    lighting: false,
    quiet: "busy",
    best: ["big dogs", "running", "beach dogs", "travellers", "grey nomads"],
    warnings: ["no fencing", "check tide", "check off-leash hours", "sand can get hot"],
    prompt: "Beach rules can change by location and time. Check official council signage before use."
  },
  {
    id: "robina-enclosed",
    name: "Robina Enclosed Dog Park",
    suburb: "Robina",
    state: "QLD",
    postcode: "4226",
    council: "Gold Coast",
    size: "medium",
    hectares: 1.1,
    safeDogCapacity: 16,
    setting: "suburban",
    fenced: "full",
    distanceKm: { Labrador: 21, Southport: 18, "Palm Beach": 11, Robina: 1.0, "Burleigh Heads": 9, Helensvale: 24, "Varsity Lakes": 5, Coolangatta: 23 },
    beach: false,
    tide: false,
    councilRules: true,
    greyNomad: false,
    caravan: false,
    accessible: true,
    easyParking: true,
    cafe: false,
    waterBowl: true,
    smallDog: true,
    bigDog: true,
    reactive: true,
    puppy: true,
    senior: true,
    water: true,
    shade: true,
    toilets: false,
    bins: true,
    lighting: false,
    quiet: "medium",
    best: ["secure visits", "training", "mixed-size dogs", "small dogs"],
    warnings: ["can be busy after work", "monitor mixed-size play"],
    prompt: "Check local park signs and follow dog control rules."
  },
  {
    id: "burleigh-open",
    name: "Burleigh Heads Open Run Dog Area",
    suburb: "Burleigh Heads",
    state: "QLD",
    postcode: "4220",
    council: "Gold Coast",
    size: "huge",
    hectares: 4.4,
    safeDogCapacity: 34,
    setting: "coastal",
    fenced: "partial",
    distanceKm: { Labrador: 25, Southport: 22, "Palm Beach": 6, Robina: 9, "Burleigh Heads": 0.8, Helensvale: 28, "Varsity Lakes": 8, Coolangatta: 19 },
    beach: true,
    tide: true,
    councilRules: true,
    greyNomad: true,
    caravan: true,
    accessible: false,
    easyParking: true,
    cafe: true,
    waterBowl: true,
    smallDog: false,
    bigDog: true,
    reactive: false,
    puppy: false,
    senior: false,
    water: true,
    shade: false,
    toilets: true,
    bins: true,
    lighting: false,
    quiet: "busy",
    best: ["large dogs", "running", "travellers", "beach users"],
    warnings: ["tourist area", "partial fencing", "check tides", "check council signs"],
    prompt: "Check official signage, especially near beach access and tourist areas."
  },
  {
    id: "helensvale-family",
    name: "Helensvale Family Dog Park",
    suburb: "Helensvale",
    state: "QLD",
    postcode: "4212",
    council: "Gold Coast",
    size: "large",
    hectares: 2.6,
    safeDogCapacity: 26,
    setting: "suburban",
    fenced: "full",
    distanceKm: { Labrador: 12, Southport: 14, "Palm Beach": 31, Robina: 24, "Burleigh Heads": 28, Helensvale: 0.9, "Varsity Lakes": 26, Coolangatta: 43 },
    beach: false,
    tide: false,
    councilRules: true,
    greyNomad: true,
    caravan: true,
    accessible: true,
    easyParking: true,
    cafe: false,
    waterBowl: true,
    smallDog: true,
    bigDog: true,
    reactive: true,
    puppy: true,
    senior: true,
    water: true,
    shade: true,
    toilets: true,
    bins: true,
    lighting: true,
    quiet: "medium",
    best: ["families", "big dogs", "small dogs", "travellers", "secure visits"],
    warnings: ["shared spaces need supervision", "separate small and large dogs where needed"],
    prompt: "Check signs before use and supervise interactions."
  },
  {
    id: "varsity-quiet",
    name: "Varsity Lakes Quiet Dog Park",
    suburb: "Varsity Lakes",
    state: "QLD",
    postcode: "4227",
    council: "Gold Coast",
    size: "medium",
    hectares: 1.4,
    safeDogCapacity: 18,
    setting: "suburban",
    fenced: "full",
    distanceKm: { Labrador: 23, Southport: 20, "Palm Beach": 8, Robina: 5, "Burleigh Heads": 8, Helensvale: 26, "Varsity Lakes": 0.9, Coolangatta: 20 },
    beach: false,
    tide: false,
    councilRules: true,
    greyNomad: false,
    caravan: false,
    accessible: true,
    easyParking: true,
    cafe: true,
    waterBowl: true,
    smallDog: true,
    bigDog: false,
    reactive: true,
    puppy: true,
    senior: true,
    water: true,
    shade: true,
    toilets: false,
    bins: true,
    lighting: false,
    quiet: "quiet",
    best: ["reactive dogs", "training", "small dogs", "senior dogs"],
    warnings: ["still supervise reactive dogs", "avoid peak times"],
    prompt: "Check posted signs and keep dogs under effective control."
  },
  {
    id: "coolangatta-coastal",
    name: "Coolangatta Coastal Dog Stop",
    suburb: "Coolangatta",
    state: "QLD",
    postcode: "4225",
    council: "Gold Coast",
    size: "large",
    hectares: 2.9,
    safeDogCapacity: 24,
    setting: "coastal",
    fenced: "none",
    distanceKm: { Labrador: 37, Southport: 34, "Palm Beach": 13, Robina: 23, "Burleigh Heads": 19, Helensvale: 43, "Varsity Lakes": 20, Coolangatta: 0.8 },
    beach: true,
    tide: true,
    councilRules: true,
    greyNomad: true,
    caravan: true,
    accessible: false,
    easyParking: true,
    cafe: true,
    waterBowl: false,
    smallDog: false,
    bigDog: true,
    reactive: false,
    puppy: false,
    senior: false,
    water: false,
    shade: false,
    toilets: true,
    bins: true,
    lighting: false,
    quiet: "busy",
    best: ["beach dogs", "travellers", "grey nomads", "big dogs"],
    warnings: ["no fencing", "beach heat", "check tide", "check council rules"],
    prompt: "Confirm official off-leash areas before entering beach zones."
  }
];

const FILTERS = [
  ["beach", "Beach"],
  ["tide", "Tide check"],
  ["councilRules", "Council-rule prompt"],
  ["smallDog", "Small dog area"],
  ["bigDog", "Big dog friendly"],
  ["reactive", "Reactive dog friendly"],
  ["puppy", "Puppy friendly"],
  ["senior", "Senior dog friendly"],
  ["greyNomad", "Grey nomad friendly"],
  ["caravan", "Caravan parking"],
  ["accessible", "Accessible parking"],
  ["easyParking", "Easy parking"],
  ["cafe", "Nearby café"],
  ["waterBowl", "Water bowls"],
  ["water", "Tap water"],
  ["shade", "Shade"],
  ["toilets", "Toilets"],
  ["bins", "Bins"],
  ["lighting", "Lighting"],
  ["quiet", "Quiet/lower crowding"]
];

const PLANS = [
  { id: "free", name: "Free", price: "$0", period: "", desc: "Park search, basic dog profile and safety prompts." },
  { id: "monthly", name: "Premium Monthly", price: "$12.99", period: "/month", desc: "Compatibility, check-ins, alerts and reports." },
  { id: "annual", name: "Premium Annual", price: "$119", period: "/year", desc: "Annual access with savings." },
  { id: "pensioner", name: "Pensioner Annual", price: "$83", period: "/year", desc: "30% annual pensioner discount." },
  { id: "founding", name: "Founding Member", price: "$79", period: "/year", desc: "Launch offer for early supporters." }
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const safe = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
const norm = (value) => String(value ?? "").toLowerCase().trim();

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

let dogs = load("genevieve_dogs", [
  { id: "dog_molly", name: "Molly", breed: "Kelpie", size: "large", ageGroup: "adult", energy: 8, social: 8, reactive: 2, space: 6, notes: "High energy, friendly with space.", bestMate: "Bruno", checkedIn: false },
  { id: "dog_bruno", name: "Bruno", breed: "Staffy", size: "medium", ageGroup: "adult", energy: 6, social: 5, reactive: 5, space: 12, notes: "Needs careful introductions.", bestMate: "Molly", checkedIn: false }
]);
let reports = load("genevieve_reports", []);
let alerts = load("genevieve_alerts", []);
let predictions = load("genevieve_predictions", []);
let audit = load("genevieve_audit", []);
let subscription = load("genevieve_subscription", { plan: "free", status: "inactive" });
let sortMode = "default";

function addAudit(action, detail) {
  audit.unshift({ id: `audit_${Date.now()}`, action, detail, time: new Date().toISOString() });
  save("genevieve_audit", audit);
  renderAudit();
}

function sync() {
  save("genevieve_dogs", dogs);
  save("genevieve_reports", reports);
  save("genevieve_alerts", alerts);
  save("genevieve_predictions", predictions);
  save("genevieve_subscription", subscription);
}

function distanceFor(park) {
  const origin = $("#origin") ? $("#origin").value : "Labrador";
  return Number(park.distanceKm[origin] ?? 999);
}

function spaceRatio(park) {
  return Number((park.hectares / Math.max(1, park.safeDogCapacity)).toFixed(3));
}

function matchParks() {
  const query = norm($("#parkSearch").value);
  const size = $("#parkSize").value;
  const fenced = $("#parkFence").value;
  const setting = $("#parkSetting").value;
  const maxDistance = Number($("#maxDistance").value);
  const enabled = {};
  FILTERS.forEach(([key]) => {
    const node = document.querySelector(`[data-filter="${key}"]`);
    enabled[key] = Boolean(node && node.checked);
  });

  let matched = PARKS.filter((park) => {
    const text = norm([park.name, park.suburb, park.state, park.postcode, park.council, park.size, park.setting, park.fenced, ...park.best, ...park.warnings, park.prompt, park.cafe ? "cafe coffee" : "", park.waterBowl ? "water bowl" : ""].join(" "));
    if (query && !text.includes(query)) return false;
    if (distanceFor(park) > maxDistance) return false;
    if (size !== "any" && park.size !== size) return false;
    if (fenced !== "any" && park.fenced !== fenced) return false;
    if (setting !== "any" && park.setting !== setting) return false;
    for (const [key] of FILTERS) {
      if (enabled[key]) {
        if (key === "quiet") {
          if (!["quiet", "medium"].includes(park.quiet)) return false;
        } else if (!park[key]) {
          return false;
        }
      }
    }
    return true;
  });

  if (sortMode === "distance") matched = matched.sort((a, b) => distanceFor(a) - distanceFor(b));
  if (sortMode === "capacity") matched = matched.sort((a, b) => spaceRatio(b) - spaceRatio(a));
  return matched;
}

function renderParks() {
  const parks = matchParks();
  $("#parkCount").textContent = parks.length;
  $("#parkResults").innerHTML = parks.map((park) => `
    <article class="card park-card">
      <h3>${safe(park.name)}</h3>
      <p><b>${safe(park.suburb)}, ${safe(park.state)} ${safe(park.postcode)}</b> • ${safe(park.council)} Council • ${safe(park.setting)}</p>
      <div class="chips">
        <span class="chip">${safe(park.size)}</span>
        <span class="chip">${safe(park.fenced)} fencing</span>
        <span class="chip">${distanceFor(park)} km away</span>
        <span class="chip">${park.hectares} ha</span>
        <span class="chip">capacity ${park.safeDogCapacity} dogs</span>
        <span class="chip">space ratio ${spaceRatio(park)} ha/dog</span>
        ${park.beach ? '<span class="chip">beach</span>' : ''}
        ${park.tide ? '<span class="chip">tide check</span>' : ''}
        ${park.greyNomad ? '<span class="chip">grey nomad</span>' : ''}
        ${park.caravan ? '<span class="chip">caravan parking</span>' : ''}
        ${park.cafe ? '<span class="chip">nearby café</span>' : ''}
        ${park.waterBowl ? '<span class="chip">water bowls</span>' : ''}
        ${park.water ? '<span class="chip">tap water</span>' : ''}
        ${park.shade ? '<span class="chip">shade</span>' : ''}
      </div>
      <div class="grid two">
        <div>
          <h4>Best for</h4>
          <ul>${park.best.map((item) => `<li>${safe(item)}</li>`).join("")}</ul>
        </div>
        <div>
          <h4>Check first</h4>
          <ul>${park.warnings.map((item) => `<li>${safe(item)}</li>`).join("")}</ul>
        </div>
      </div>
      <p class="note">${safe(park.prompt)}</p>
      <p class="warning">Demo park record. Replace with verified council/open data before commercial public launch.</p>
    </article>
  `).join("") || `<div class="empty">No matches. Try fewer filters or search Labrador QLD, beach, grey nomad, big dog, small dog, fenced, water, café or shade.</div>`;
}

function answerQuestion(question, parks) {
  const q = norm(question);
  const names = parks.slice(0, 4).map((park) => park.name).join(", ") || "none yet";
  if (!q) return "Ask about Labrador QLD, beaches, tide checks, cafés, council rules, grey nomads, big dogs, small dogs, puppies, senior dogs or reactive dogs.";
  if (q.includes("labrador")) return `For Labrador QLD, use the Labrador/Broadwater option and add filters for beach, tide, big dog, grey nomad, water, shade, café or parking. Matches: ${names}.`;
  if (q.includes("grey") || q.includes("caravan") || q.includes("travel")) return `For grey nomads, choose grey-nomad friendly, caravan parking, easy parking, toilets, water bowls, cafés, shade and council-rule prompts. Matches: ${names}.`;
  if (q.includes("cafe") || q.includes("coffee")) return `For cafés, use the Nearby café toggle and check parking/water access. Matches: ${names}.`;
  if (q.includes("water bowl") || q.includes("water")) return `For water, use Water bowls and Tap water filters. Matches: ${names}.`;
  if (q.includes("big") || q.includes("large") || q.includes("huge")) return `For big dogs, choose large or huge parks, compare capacity and space ratio, then check fencing, heat, crowding and exits. Matches: ${names}.`;
  if (q.includes("small") || q.includes("little")) return `For small dogs, choose small-dog areas, full fencing and quieter spaces. Matches: ${names}.`;
  if (q.includes("reactive") || q.includes("nervous") || q.includes("anxious")) return `For reactive dogs, prioritise full fencing, quiet ratings, wide exits and avoid busy open beaches. Matches: ${names}.`;
  if (q.includes("beach") || q.includes("tide")) return `For beaches, check tide, heat on sand, off-leash hours and council signs. Matches: ${names}.`;
  if (q.includes("distance") || q.includes("near")) return `Use maximum distance and Sort by distance. Matches: ${names}.`;
  if (q.includes("council") || q.includes("rules")) return "Council rules vary by location and time. The app can prompt, but users must check official council signage before use.";
  return `Found ${parks.length} matching option${parks.length === 1 ? "" : "s"}. Try Labrador QLD, beach, tide, grey nomad, caravan, café, water bowl, big dog, small dog, reactive dog, fenced, water, shade or quiet.`;
}

function renderDogs() {
  $("#dogList").innerHTML = dogs.map((dog) => `
    <article class="card dog-card">
      <h3>${safe(dog.name)}</h3>
      <p>${safe(dog.breed)} • ${safe(dog.size)} • ${safe(dog.ageGroup)}</p>
      <div class="chips">
        <span class="chip">Energy ${dog.energy}/10</span>
        <span class="chip">Social ${dog.social}/10</span>
        <span class="chip">Reactive ${dog.reactive}/10</span>
        <span class="chip">Space ${dog.space || 8} m</span>
      </div>
      ${dog.notes ? `<p class="note">${safe(dog.notes)}</p>` : ""}
      <p class="${dog.checkedIn ? "result green" : "result yellow"}">${dog.checkedIn ? "Checked in" : "Not checked in"}</p>
      <button data-edit-dog="${safe(dog.id)}">Edit</button>
      <button data-delete-dog="${safe(dog.id)}" class="danger">Delete</button>
    </article>
  `).join("") || `<div class="empty">No dogs yet.</div>`;

  $("#checkinList").innerHTML = dogs.map((dog) => `
    <article class="card dog-card">
      <h3>${safe(dog.name)}</h3>
      <p>${safe(dog.breed)} • ${safe(dog.size)}</p>
      <p class="${dog.checkedIn ? "result green" : "result yellow"}">${dog.checkedIn ? "Checked in" : "Not checked in"}</p>
      <button data-checkin="${safe(dog.id)}">${dog.checkedIn ? "Check out" : "Check in"}</button>
    </article>
  `).join("") || `<div class="empty">Add a dog profile first.</div>`;

  const options = dogs.map((dog) => `<option value="${safe(dog.id)}">${safe(dog.name)}</option>`).join("");
  ["#dogA", "#dogB", "#alertDog"].forEach((id) => {
    const node = $(id);
    if (node) node.innerHTML = options;
  });
}

function scoreCompatibility(a, b, environment) {
  let score = 80 + (a.social * 3) + (b.social * 3) - (a.reactive * 6) - (b.reactive * 6) - (Math.abs(a.energy - b.energy) * 4);
  const spaceRisk = Math.max(Number(a.space || 8), Number(b.space || 8));
  if (spaceRisk > 10) score -= 8;
  if (spaceRisk > 15) score -= 12;
  if (environment.crowding === "busy") score -= 8;
  if (environment.crowding === "crowded") score -= 16;
  if (environment.weather === "hot") score -= 12;
  if (environment.weather === "storm") score -= 18;
  if (environment.fenced === "none") score -= 8;
  if (a.size !== b.size) score -= 4;
  score = Math.max(0, Math.min(100, Math.round(score)));
  let level = "green";
  let action = "Proceed with supervision.";
  if (score < 80) { level = "yellow"; action = "Watch carefully."; }
  if (score < 60) { level = "amber"; action = "Caution. Add distance or supervision."; }
  if (score < 40) { level = "red"; action = "Stop or separate dogs."; }
  if (score < 20) { level = "black"; action = "Critical. Seek immediate help."; }
  return { score, level, action, spaceRisk };
}

function renderCompatibility() {
  $("#compatResults").innerHTML = predictions.map((prediction) => `
    <div class="result ${safe(prediction.level)}">
      <b>${safe(prediction.dogA)}</b> + <b>${safe(prediction.dogB)}</b><br>
      ${prediction.score}% — ${safe(prediction.action)}<br>
      Personal space index: ${prediction.spaceRisk || 8} m<br>
      <small>${new Date(prediction.createdAt).toLocaleString()}</small>
    </div>
  `).join("") || `<div class="empty">Run a compatibility check to see results.</div>`;
}

function renderAlerts() {
  $("#spaceAlerts").innerHTML = alerts.map((alert) => `
    <div class="result ${safe(alert.status)}">
      <b>${safe(alert.dog)}</b><br>
      ${safe(alert.message)}<br>
      <small>${new Date(alert.createdAt).toLocaleString()}</small>
    </div>
  `).join("") || `<div class="empty">No active space alerts.</div>`;
}

function renderReports() {
  $("#reportList").innerHTML = reports.map((report) => `
    <article class="card report-card">
      <h3>${safe(report.title)}</h3>
      <p>${safe(report.category)} • ${safe(report.location)}</p>
      <p class="result ${safe(report.level)}">${safe(report.level)} — ${safe(report.status)}</p>
      <p>${safe(report.notes)}</p>
      <button data-close-report="${safe(report.id)}">Close report</button>
    </article>
  `).join("") || `<div class="empty">No reports yet.</div>`;
}

function renderPlans() {
  $("#plansList").innerHTML = PLANS.map((plan) => {
    const link = STRIPE_LINKS[plan.id] || "";
    return `
      <article class="card">
        <h3>${safe(plan.name)}</h3>
        <div class="price">${safe(plan.price)}<small>${safe(plan.period)}</small></div>
        <p>${safe(plan.desc)}</p>
        <button data-plan="${safe(plan.id)}">${link ? "Subscribe" : "Demo select"}</button>
      </article>
    `;
  }).join("");
}

function renderAudit() {
  $("#auditList").innerHTML = audit.map((item) => `
    <div class="card">
      <b>${safe(item.action)}</b>
      <p>${safe(item.detail)}</p>
      <small>${new Date(item.time).toLocaleString()}</small>
    </div>
  `).join("") || `<div class="empty">No audit events yet.</div>`;
}

function renderAll() {
  renderParks();
  renderDogs();
  renderCompatibility();
  renderAlerts();
  renderReports();
  renderPlans();
  renderAudit();
}

function clearDogForm() {
  $("#dogForm").reset();
  $("#dogEditId").value = "";
}

function setup() {
  $("#parkToggles").innerHTML = FILTERS.map(([key, label]) => `
    <label class="toggle"><input type="checkbox" data-filter="${safe(key)}"> ${safe(label)}</label>
  `).join("");

  $$(".tabs button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".tabs button").forEach((item) => item.classList.remove("active"));
      $$(".screen").forEach((screen) => screen.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });

  $$("[data-quick]").forEach((button) => {
    button.addEventListener("click", () => {
      $("#parkSearch").value = button.dataset.quick;
      renderParks();
    });
  });

  ["#parkSearch", "#parkSize", "#parkFence", "#parkSetting", "#origin", "#maxDistance"].forEach((selector) => {
    $(selector).addEventListener("input", renderParks);
    $(selector).addEventListener("change", renderParks);
  });

  $("#parkToggles").addEventListener("change", renderParks);

  $("#sortDistance").addEventListener("click", () => { sortMode = "distance"; renderParks(); });
  $("#sortCapacity").addEventListener("click", () => { sortMode = "capacity"; renderParks(); });

  $("#resetSearch").addEventListener("click", () => {
    $("#parkSearch").value = "";
    $("#maxDistance").value = "999";
    $("#parkSize").value = "any";
    $("#parkFence").value = "any";
    $("#parkSetting").value = "any";
    sortMode = "default";
    $$("[data-filter]").forEach((item) => { item.checked = false; });
    renderParks();
  });

  $("#askForm").addEventListener("submit", (event) => {
    event.preventDefault();
    $("#askAnswer").textContent = answerQuestion($("#askText").value, matchParks());
  });

  $("#clearDogForm").addEventListener("click", clearDogForm);

  $("#dogForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = form.get("id");
    const dog = {
      id: id || `dog_${Date.now()}`,
      name: String(form.get("name") || "").trim(),
      breed: String(form.get("breed") || "").trim(),
      size: form.get("size"),
      ageGroup: form.get("ageGroup"),
      energy: Number(form.get("energy")),
      social: Number(form.get("social")),
      reactive: Number(form.get("reactive")),
      space: Number(form.get("space")),
      notes: String(form.get("notes") || "").trim(),
      bestMate: String(form.get("bestMate") || "").trim(),
      weightKg: String(form.get("weightKg") || "").trim(),
      microchip: String(form.get("microchip") || "").trim(),
      vaccination: String(form.get("vaccination") || "Unknown").trim(),
      desexed: String(form.get("desexed") || "Unknown").trim(),
      heatRisk: String(form.get("heatRisk") || "Normal").trim(),
      emergencyContact: String(form.get("emergencyContact") || "").trim(),
      notSocialToday: Boolean(form.get("notSocialToday")),
      checkedIn: false
    };
    const duplicate = dogs.find((item) => norm(item.name) === norm(dog.name) && item.id !== dog.id);
    if (duplicate) {
      dog.id = duplicate.id;
      dog.checkedIn = duplicate.checkedIn;
      dogs = dogs.map((item) => item.id === duplicate.id ? dog : item);
      addAudit("Duplicate dog updated", dog.name);
    } else if (id) {
      const existing = dogs.find((item) => item.id === id);
      dog.checkedIn = existing ? existing.checkedIn : false;
      dogs = dogs.map((item) => item.id === id ? dog : item);
      addAudit("Dog profile edited", dog.name);
    } else {
      dogs.unshift(dog);
      addAudit("Dog profile created", dog.name);
    }
    sync();
    clearDogForm();
    renderAll();
  });

  document.body.addEventListener("click", (event) => {
    const checkId = event.target.getAttribute("data-checkin");
    if (checkId) {
      dogs = dogs.map((dog) => dog.id === checkId ? { ...dog, checkedIn: !dog.checkedIn } : dog);
      const dog = dogs.find((item) => item.id === checkId);
      sync();
      addAudit(dog.checkedIn ? "Dog checked in" : "Dog checked out", dog.name);
      renderAll();
    }

    const editId = event.target.getAttribute("data-edit-dog");
    if (editId) {
      const dog = dogs.find((item) => item.id === editId);
      if (dog) {
        $("#dogEditId").value = dog.id;
        const form = $("#dogForm");
        form.name.value = dog.name;
        form.breed.value = dog.breed;
        form.size.value = dog.size;
        form.ageGroup.value = dog.ageGroup;
        form.energy.value = dog.energy;
        form.social.value = dog.social;
        form.reactive.value = dog.reactive;
        form.space.value = dog.space || 8;
        form.notes.value = dog.notes || "";
        if (form.bestMate) form.bestMate.value = dog.bestMate || "";
        if (form.weightKg) form.weightKg.value = dog.weightKg || "";
        if (form.microchip) form.microchip.value = dog.microchip || "";
        if (form.vaccination) form.vaccination.value = dog.vaccination || "Unknown";
        if (form.desexed) form.desexed.value = dog.desexed || "Unknown";
        if (form.heatRisk) form.heatRisk.value = dog.heatRisk || "Normal";
        if (form.emergencyContact) form.emergencyContact.value = dog.emergencyContact || "";
        if (form.notSocialToday) form.notSocialToday.checked = Boolean(dog.notSocialToday);
        document.querySelector('[data-tab="dogs"]').click();
      }
    }

    const deleteId = event.target.getAttribute("data-delete-dog");
    if (deleteId) {
      const dog = dogs.find((item) => item.id === deleteId);
      if (dog && confirm(`Delete ${dog.name}?`)) {
        dogs = dogs.filter((item) => item.id !== deleteId);
        sync();
        addAudit("Dog profile deleted", dog.name);
        renderAll();
      }
    }

    const reportId = event.target.getAttribute("data-close-report");
    if (reportId) {
      reports = reports.map((report) => report.id === reportId ? { ...report, status: "closed" } : report);
      sync();
      addAudit("Report closed", reportId);
      renderAll();
    }

    const planId = event.target.getAttribute("data-plan");
    if (planId) {
      const link = STRIPE_LINKS[planId];
      if (link) {
        window.location.href = link;
      } else {
        subscription = { plan: planId, status: planId === "free" ? "inactive" : "active" };
        sync();
        addAudit("Plan selected", planId);
        alert(`Demo selected: ${planId}. Add Stripe Payment Links in app.js before taking real payments.`);
      }
    }
  });

  $("#compatForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const dogA = dogs.find((dog) => dog.id === form.get("dogA"));
    const dogB = dogs.find((dog) => dog.id === form.get("dogB"));
    if (!dogA || !dogB || dogA.id === dogB.id) {
      alert("Choose two different dogs.");
      return;
    }
    const environment = { crowding: form.get("crowding"), weather: form.get("weather"), fenced: form.get("fenced") };
    const result = scoreCompatibility(dogA, dogB, environment);
    predictions.unshift({
      id: `prediction_${Date.now()}`,
      dogA: dogA.name,
      dogB: dogB.name,
      createdAt: new Date().toISOString(),
      environment,
      ...result
    });
    sync();
    addAudit("Compatibility checked", `${dogA.name} + ${dogB.name}: ${result.level}`);
    renderAll();
  });

  $("#alertForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const dog = dogs.find((item) => item.id === form.get("dog"));
    const alert = {
      id: `alert_${Date.now()}`,
      dog: dog ? dog.name : "Dog",
      status: form.get("status"),
      message: form.get("message") || "Please give this dog space.",
      createdAt: new Date().toISOString()
    };
    alerts.unshift(alert);
    sync();
    addAudit("Space alert created", `${alert.dog}: ${alert.status}`);
    event.currentTarget.reset();
    renderAll();
  });

  $("#reportForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const report = {
      id: `report_${Date.now()}`,
      level: form.get("level"),
      category: form.get("category"),
      location: form.get("location"),
      title: form.get("title"),
      notes: form.get("notes"),
      status: "open",
      createdAt: new Date().toISOString()
    };
    reports.unshift(report);
    sync();
    addAudit("Safety report created", report.title);
    event.currentTarget.reset();
    renderAll();
  });

  $("#exportData").addEventListener("click", () => {
    const payload = { dogs, reports, alerts, predictions, audit, subscription, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "genevieve-dogpark-local-data.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  $("#clearDemo").addEventListener("click", () => {
    if (confirm("Clear local demo data on this device?")) {
      localStorage.clear();
      location.reload();
    }
  });

  renderAll();
}

document.addEventListener("DOMContentLoaded", setup);


/* GENEVIEVE_LAST_COMPONENTS_MODULE */

function getImportedParks() {
  return load("genevieve_imported_parks", []);
}

function saveImportedParks(parks) {
  save("genevieve_imported_parks", parks);
}

function allParks() {
  return PARKS.concat(getImportedParks());
}

const originalMatchParks = matchParks;
matchParks = function() {
  const query = norm($("#parkSearch").value);
  const size = $("#parkSize").value;
  const fenced = $("#parkFence").value;
  const setting = $("#parkSetting").value;
  const maxDistance = Number($("#maxDistance").value);
  const enabled = {};
  FILTERS.forEach(([key]) => {
    const node = document.querySelector(`[data-filter="${key}"]`);
    enabled[key] = Boolean(node && node.checked);
  });

  let matched = allParks().filter((park) => {
    const text = norm([park.name, park.suburb, park.state, park.postcode, park.council, park.size, park.setting, park.fenced, ...(park.best || []), ...(park.warnings || []), park.prompt, park.cafe ? "cafe coffee" : "", park.waterBowl ? "water bowl" : ""].join(" "));
    if (query && !text.includes(query)) return false;
    if (distanceFor(park) > maxDistance) return false;
    if (size !== "any" && park.size !== size) return false;
    if (fenced !== "any" && park.fenced !== fenced) return false;
    if (setting !== "any" && park.setting !== setting) return false;
    for (const [key] of FILTERS) {
      if (enabled[key]) {
        if (key === "quiet") {
          if (!["quiet", "medium"].includes(park.quiet)) return false;
        } else if (!park[key]) {
          return false;
        }
      }
    }
    return true;
  });

  if (sortMode === "distance") matched = matched.sort((a, b) => distanceFor(a) - distanceFor(b));
  if (sortMode === "capacity") matched = matched.sort((a, b) => spaceRatio(b) - spaceRatio(a));
  return matched;
};

function renderLiveStatus() {
  const node = $("#liveStatus");
  if (!node) return;
  const config = load("genevieve_live_config", {});
  const hasBackend = Boolean(config.backendUrl && config.publicKey);
  const hasStripe = Boolean(config.stripeMonthly || config.stripeAnnual);
  node.innerHTML = `
    <div class="config-row"><b>Backend:</b> ${hasBackend ? "Configured locally" : "Not connected yet"}</div>
    <div class="config-row"><b>Payments:</b> ${hasStripe ? "Payment links saved locally" : "Payment links not added yet"}</div>
    <div class="config-row"><b>Maps:</b> ${safe(config.mapProvider || "Apple/Google map links available")}</div>
    <p class="small-muted">This saves setup values only in this browser until you connect a real backend.</p>
  `;
}

function renderMapLinks() {
  const node = $("#mapLinks");
  if (!node) return;
  const origin = $("#origin") ? $("#origin").value : "Labrador";
  node.innerHTML = allParks().slice(0, 8).map((park) => {
    const q = encodeURIComponent(`${park.name} ${park.suburb} ${park.state}`);
    return `
      <div class="config-row">
        <b>${safe(park.name)}</b><br>
        ${distanceFor(park)} km from ${safe(origin)}<br>
        <a href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank">Open Google Maps</a>
        &nbsp; | &nbsp;
        <a href="https://maps.apple.com/?q=${q}" target="_blank">Open Apple Maps</a>
      </div>
    `;
  }).join("");
}

function csvToObjects(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (cell || row.length) {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      }
      if (char === "\r" && next === "\n") i++;
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }

  const headers = (rows.shift() || []).map((h) => norm(h).replace(/\s+/g, "_"));
  return rows.filter((r) => r.some(Boolean)).map((r, index) => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = r[i] || ""; });
    return {
      id: obj.id || `imported_${Date.now()}_${index}`,
      name: obj.name || "Imported Dog Park",
      suburb: obj.suburb || "",
      state: obj.state || "QLD",
      postcode: obj.postcode || "",
      council: obj.council || "",
      size: obj.size || "medium",
      hectares: Number(obj.hectares || 1),
      safeDogCapacity: Number(obj.safe_dog_capacity || obj.capacity || 10),
      setting: obj.setting || "suburban",
      fenced: obj.fenced || "full",
      distanceKm: {
        Labrador: Number(obj.distance_from_labrador_km || 999),
        Southport: Number(obj.distance_from_southport_km || 999),
        "Palm Beach": Number(obj.distance_from_palm_beach_km || 999),
        Robina: Number(obj.distance_from_robina_km || 999),
        "Burleigh Heads": Number(obj.distance_from_burleigh_heads_km || 999),
        Helensvale: Number(obj.distance_from_helensvale_km || 999),
        "Varsity Lakes": Number(obj.distance_from_varsity_lakes_km || 999),
        Coolangatta: Number(obj.distance_from_coolangatta_km || 999)
      },
      beach: norm(obj.beach) === "yes" || norm(obj.beach) === "true",
      tide: norm(obj.tide) === "yes" || norm(obj.tide) === "true",
      councilRules: true,
      greyNomad: norm(obj.grey_nomad) === "yes" || norm(obj.grey_nomad) === "true",
      caravan: norm(obj.caravan) === "yes" || norm(obj.caravan) === "true",
      accessible: norm(obj.accessible) === "yes" || norm(obj.accessible) === "true",
      easyParking: norm(obj.easy_parking) === "yes" || norm(obj.easy_parking) === "true",
      cafe: norm(obj.cafe) === "yes" || norm(obj.cafe) === "true",
      waterBowl: norm(obj.water_bowl) === "yes" || norm(obj.water_bowl) === "true",
      smallDog: norm(obj.small_dog) === "yes" || norm(obj.small_dog) === "true",
      bigDog: norm(obj.big_dog) === "yes" || norm(obj.big_dog) === "true",
      reactive: norm(obj.reactive_friendly) === "yes" || norm(obj.reactive_friendly) === "true",
      puppy: norm(obj.puppy) === "yes" || norm(obj.puppy) === "true",
      senior: norm(obj.senior) === "yes" || norm(obj.senior) === "true",
      water: norm(obj.water) === "yes" || norm(obj.water) === "true",
      shade: norm(obj.shade) === "yes" || norm(obj.shade) === "true",
      toilets: norm(obj.toilets) === "yes" || norm(obj.toilets) === "true",
      bins: norm(obj.bins) === "yes" || norm(obj.bins) === "true",
      lighting: norm(obj.lighting) === "yes" || norm(obj.lighting) === "true",
      quiet: obj.quiet || "medium",
      best: (obj.best_for || "").split("|").filter(Boolean),
      warnings: (obj.warnings || "").split("|").filter(Boolean),
      prompt: obj.prompt || "Check official council signage before use."
    };
  });
}

function renderImportedParks() {
  const node = $("#importedParkList");
  if (!node) return;
  const parks = getImportedParks();
  node.innerHTML = parks.map((park) => `
    <div class="config-row">
      <b>${safe(park.name)}</b><br>
      ${safe(park.suburb)} ${safe(park.postcode)} • ${safe(park.size)} • ${safe(park.fenced)}
    </div>
  `).join("") || `<div class="empty">No imported parks yet.</div>`;
}

function setupLastComponents() {
  renderLiveStatus();
  renderMapLinks();
  renderImportedParks();

  const form = $("#liveConfigForm");
  if (form) {
    const existing = load("genevieve_live_config", {});
    form.backendUrl.value = existing.backendUrl || "";
    form.publicKey.value = existing.publicKey || "";
    form.mapProvider.value = existing.mapProvider || "Apple Maps link";
    form.stripeMonthly.value = existing.stripeMonthly || "";
    form.stripeAnnual.value = existing.stripeAnnual || "";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const config = {
        backendUrl: data.get("backendUrl"),
        publicKey: data.get("publicKey"),
        mapProvider: data.get("mapProvider"),
        stripeMonthly: data.get("stripeMonthly"),
        stripeAnnual: data.get("stripeAnnual"),
        savedAt: new Date().toISOString()
      };
      save("genevieve_live_config", config);
      addAudit("Live setup saved", "Backend/maps/payments values saved locally");
      renderLiveStatus();
      alert("Live setup saved locally. Do not paste private secret keys into public frontend files.");
    });
  }

  const getLocation = $("#getLocation");
  if (getLocation) {
    getLocation.addEventListener("click", () => {
      const out = $("#locationResult");
      if (!navigator.geolocation) {
        out.textContent = "This browser does not support geolocation.";
        return;
      }
      out.textContent = "Requesting location...";
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          out.textContent = `Latitude ${pos.coords.latitude.toFixed(5)}, longitude ${pos.coords.longitude.toFixed(5)}. Accuracy ${Math.round(pos.coords.accuracy)} m.`;
          addAudit("GPS tested", out.textContent);
        },
        (err) => {
          out.textContent = `Location permission failed: ${err.message}`;
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  const csvInput = $("#csvImport");
  if (csvInput) {
    csvInput.addEventListener("change", async () => {
      const file = csvInput.files[0];
      if (!file) return;
      const text = await file.text();
      const imported = csvToObjects(text);
      const existing = getImportedParks();
      saveImportedParks(existing.concat(imported));
      $("#csvImportResult").textContent = `Imported ${imported.length} park record${imported.length === 1 ? "" : "s"}.`;
      addAudit("Council data imported", `${imported.length} records from ${file.name}`);
      renderImportedParks();
      renderParks();
      renderMapLinks();
    });
  }

  const clearImported = $("#clearImportedParks");
  if (clearImported) {
    clearImported.addEventListener("click", () => {
      if (confirm("Clear imported park records from this device?")) {
        saveImportedParks([]);
        addAudit("Imported parks cleared", "Local imported records removed");
        renderImportedParks();
        renderParks();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", setupLastComponents);


/* GENEVIEVE_LOCKED_ALERT_SYSTEM_MODULE */

const ALERT_COLOURS_LOCKED = {
  green: { label: "GREEN", name: "Kelly Green", hex: "#00a651", meaning: "safe / low risk" },
  yellow: { label: "YELLOW", name: "Sunburst Yellow", hex: "#ffe100", meaning: "monitor / ask first" },
  amber: { label: "AMBER", name: "Amber", hex: "#ff9500", meaning: "increasing risk" },
  red: { label: "RED", name: "Fire Red", hex: "#f10b0b", meaning: "immediate action / danger" },
  black: { label: "BLACK", name: "Official Emergency Black", hex: "#000000", meaning: "official emergency only" }
};

function alertLevelFromRisk(risk, officialEmergency = false) {
  if (officialEmergency) return { level: "black", width: 100, label: "BLACK", action: "Official emergency. Follow emergency services. Call 000 if life-threatening." };
  if (risk >= 75) return { level: "red", width: Math.min(100, risk), label: "RED", action: "Immediate action. Create distance, redirect, separate or leave." };
  if (risk >= 50) return { level: "amber", width: risk, label: "AMBER", action: "Increasing risk. Give space and slow the interaction down." };
  if (risk >= 25) return { level: "yellow", width: risk, label: "YELLOW", action: "Monitor. Ask first and watch body language." };
  return { level: "green", width: Math.max(8, risk), label: "GREEN", action: "Low risk. Continue supervising." };
}

function barClassFor(level) {
  if (level === "green") return "g";
  if (level === "yellow") return "y";
  if (level === "amber") return "a";
  if (level === "red") return "r";
  if (level === "black") return "k";
  return "g";
}

function scoreClassFor(level) {
  if (level === "yellow") return "score y";
  if (level === "amber") return "score amberScore";
  if (level === "red") return "score r";
  if (level === "black") return "score blackScore";
  return "score";
}

function alertBarHtml(risk, officialEmergency = false) {
  const alert = alertLevelFromRisk(risk, officialEmergency);
  return `
    <div class="row">
      <b>${safe(alert.label)} — ${safe(ALERT_COLOURS_LOCKED[alert.level].name)}</b>
      <span class="${scoreClassFor(alert.level)}">${safe(alert.label)}</span>
    </div>
    <div class="barWrap"><div class="bar ${barClassFor(alert.level)}" style="width:${alert.width}%"></div></div>
    <div class="riskLabel">${alert.width}% risk line — ${safe(alert.action)}</div>
  `;
}

function loadInteractionRules() {
  return load("genevieve_interaction_rules", []);
}

function saveInteractionRules(rules) {
  save("genevieve_interaction_rules", rules);
}

function calculateInteractionRuleAlert(rule) {
  let risk = 10;
  let reasons = [];

  if (rule.mateAtPark) {
    risk = Math.max(risk, 8);
    reasons.push("Mate at park / friendly match = GREEN when both owners approve.");
  }

  if (rule.reactiveNearby) {
    risk = Math.max(risk, 58);
    reasons.push("Reactive dog nearby = AMBER warning without panic.");
  }

  const redTriggers = [
    ["dogOnHeat", "Dog on heat"],
    ["fullyIntact", "Fully intact / not castrated"],
    ["reactiveToday", "Reactive today"],
    ["skateboarder", "Reactive to skateboarder"],
    ["mobilityTrigger", "Reactive to pram / wheelchair / mobility aid"]
  ];

  redTriggers.forEach(([key, label]) => {
    if (rule[key]) {
      risk = Math.max(risk, 90);
      reasons.push(`${label} = RED immediate action.`);
    }
  });

  if (!reasons.length) {
    reasons.push("No high-risk trigger selected = GREEN.");
  }

  return { risk, reasons, alert: alertLevelFromRisk(risk) };
}

function renderInteractionRules() {
  const node = $("#interactionRuleList");
  if (!node) return;

  const rules = loadInteractionRules();
  node.innerHTML = rules.map((rule) => {
    const result = calculateInteractionRuleAlert(rule);
    return `
      <article class="result ${safe(result.alert.level)}">
        <div class="row">
          <div>
            <b>${safe(rule.dogName)}</b><br>
            <small>${safe(rule.soundMode)} • ${safe(rule.sensitivity)}</small>
          </div>
          <span class="${scoreClassFor(result.alert.level)}">${safe(result.alert.label)}</span>
        </div>
        <div class="barWrap"><div class="bar ${barClassFor(result.alert.level)}" style="width:${result.alert.width}%"></div></div>
        <p>${safe(result.alert.action)}</p>
        <ul>${result.reasons.map((reason) => `<li>${safe(reason)}</li>`).join("")}</ul>
        <button data-delete-rule="${safe(rule.id)}" class="danger">Delete rule</button>
      </article>
    `;
  }).join("") || `<div class="empty">No custom interaction rules yet.</div>`;
}

function patchDogSelectsForRules() {
  const ruleDog = $("#ruleDog");
  if (!ruleDog) return;
  ruleDog.innerHTML = dogs.map((dog) => `<option value="${safe(dog.id)}">${safe(dog.name)}</option>`).join("");
}

const previousRenderDogsForRules = renderDogs;
renderDogs = function() {
  previousRenderDogsForRules();
  patchDogSelectsForRules();
};

const previousRenderCompatibility = renderCompatibility;
renderCompatibility = function() {
  const node = $("#compatResults");
  if (!node) return;
  node.innerHTML = predictions.map((prediction) => {
    const risk = Math.max(0, Math.min(100, 100 - Number(prediction.score || 0)));
    const alert = alertLevelFromRisk(risk);
    return `
      <div class="result ${safe(alert.level)}">
        <b>${safe(prediction.dogA)}</b> + <b>${safe(prediction.dogB)}</b><br>
        Compatibility: ${prediction.score}%<br>
        ${alertBarHtml(risk)}
        Personal space index: ${prediction.spaceRisk || 8} m<br>
        <small>${new Date(prediction.createdAt).toLocaleString()}</small>
      </div>
    `;
  }).join("") || `<div class="empty">Run a compatibility check to see the Kelly Green to Fire Red risk line.</div>`;
};

function setupLockedAlertSystem() {
  patchDogSelectsForRules();
  renderInteractionRules();

  const form = $("#interactionRuleForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const dog = dogs.find((item) => item.id === data.get("dog"));
      const rule = {
        id: `rule_${Date.now()}`,
        dogId: data.get("dog"),
        dogName: dog ? dog.name : "Dog",
        dogOnHeat: Boolean(data.get("dogOnHeat")),
        fullyIntact: Boolean(data.get("fullyIntact")),
        reactiveToday: Boolean(data.get("reactiveToday")),
        mateAtPark: Boolean(data.get("mateAtPark")),
        reactiveNearby: Boolean(data.get("reactiveNearby")),
        skateboarder: Boolean(data.get("skateboarder")),
        mobilityTrigger: Boolean(data.get("mobilityTrigger")),
        soundMode: data.get("soundMode"),
        sensitivity: data.get("sensitivity"),
        unsureMode: data.get("unsureMode"),
        createdAt: new Date().toISOString()
      };

      const existing = loadInteractionRules();
      saveInteractionRules([rule].concat(existing));
      const result = calculateInteractionRuleAlert(rule);
      addAudit("Interaction alert rule saved", `${rule.dogName}: ${result.alert.label}`);
      form.reset();
      renderInteractionRules();
      alert(`${result.alert.label}: ${result.alert.action}`);
    });
  }

  document.body.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-delete-rule");
    if (id) {
      const rules = loadInteractionRules();
      const rule = rules.find((item) => item.id === id);
      saveInteractionRules(rules.filter((item) => item.id !== id));
      addAudit("Interaction alert rule deleted", rule ? rule.dogName : id);
      renderInteractionRules();
    }
  });

  renderAll();
}

document.addEventListener("DOMContentLoaded", setupLockedAlertSystem);


/* GENEVIEVE_MODULE15_HANDOVER_ENGINE */

function loadOwnerMessages() {
  return load("genevieve_owner_messages", []);
}

function saveOwnerMessages(messages) {
  save("genevieve_owner_messages", messages);
}

function addOwnerMessage(type, message, level = "green") {
  const messages = loadOwnerMessages();
  messages.unshift({
    id: `msg_${Date.now()}`,
    type,
    message,
    level,
    park: $("#currentParkSelect") ? $("#currentParkSelect").value : "",
    time: new Date().toISOString()
  });
  saveOwnerMessages(messages.slice(0, 50));
}

function loadLostFound() {
  return load("genevieve_lost_found", []);
}

function saveLostFound(items) {
  save("genevieve_lost_found", items);
}

function currentParkName() {
  const select = $("#currentParkSelect");
  return select ? select.value : (PARKS[0] ? PARKS[0].name : "Dog park");
}

function allDogOptionsHtml() {
  return dogs.map((dog) => `<option value="${safe(dog.id)}">${safe(dog.name)}</option>`).join("");
}

function allParkOptionsHtml() {
  return allParks().map((park) => `<option value="${safe(park.name)}">${safe(park.name)} — ${safe(park.suburb || "")}</option>`).join("");
}

function checkedInDogs() {
  return dogs.filter((dog) => dog.checkedIn);
}

function findBestMateFor(dog) {
  const bestMate = norm(dog.bestMate || "");
  if (!bestMate) return null;
  return checkedInDogs().find((item) => item.id !== dog.id && norm(item.name) === bestMate);
}

function bestMateMessageFor(dog) {
  if (!dog.bestMate) {
    return {
      level: "yellow",
      title: `${dog.name} has no best mate saved`,
      body: "Add a best mate name on the dog profile to use this alert.",
      cls: "yellow"
    };
  }
  const mate = findBestMateFor(dog);
  if (mate) {
    return {
      level: "green",
      title: `${dog.name}'s best mate ${mate.name} is here`,
      body: "GREEN: friendly mate alert. Owners still approve the interaction.",
      cls: "mateHere"
    };
  }
  return {
    level: "yellow",
    title: `${dog.name}'s best mate ${dog.bestMate} isn't here`,
    body: "YELLOW: no mate match found at this park right now.",
    cls: "mateMissing"
  };
}

function renderHomeDashboard() {
  const summary = $("#homeParkSummary");
  if (summary) {
    const nowDogs = checkedInDogs();
    const park = currentParkName();
    summary.innerHTML = `
      <div class="status">
        <div class="row"><b>${safe(park)}</b><span class="score">${nowDogs.length}</span></div>
        <div class="chips">
          <span class="moduleBadge">Dogs now: ${nowDogs.length}</span>
          <span class="moduleBadge">Park search ready</span>
          <span class="moduleBadge">Best-mate alerts ready</span>
          <span class="moduleBadge">Check-in/out ready</span>
        </div>
      </div>
    `;
  }

  const dogsNow = $("#homeDogsNow");
  if (dogsNow) dogsNow.textContent = `${checkedInDogs().length} dog${checkedInDogs().length === 1 ? "" : "s"} checked in. Tap to search/open dogs.`;

  const spaces = $("#homeSpacesLeft");
  if (spaces) {
    const park = allParks().find((item) => item.name === currentParkName()) || allParks()[0];
    const capacity = park ? Number(park.safeDogCapacity || 0) : 0;
    const left = Math.max(0, capacity - checkedInDogs().length);
    spaces.textContent = `${left} estimated spaces left from ${capacity || "unknown"} demo capacity.`;
  }

  const risk = $("#homeRiskBar");
  if (risk) {
    const dogCount = checkedInDogs().length;
    const reactiveCount = checkedInDogs().filter((d) => Number(d.reactive || 0) >= 6).length;
    const riskScore = Math.min(95, dogCount * 7 + reactiveCount * 20);
    risk.innerHTML = alertBarHtml(riskScore);
  }

  const feed = $("#ownerMessageFeed");
  if (feed) {
    const messages = loadOwnerMessages();
    feed.innerHTML = messages.map((msg) => `
      <div class="timelineItem ${safe(msg.level)}">
        <b>${safe(msg.type)}</b><br>
        ${safe(msg.message)}<br>
        <small>${new Date(msg.time).toLocaleString()}</small>
      </div>
    `).join("") || `<div class="empty">No owner messages yet. Use I'm here, I've left or Check In + Alert Owners.</div>`;
  }
}

function renderBestMateStatus() {
  const panel = $("#bestMateStatusPanel");
  if (!panel) return;
  panel.innerHTML = dogs.map((dog) => {
    const msg = bestMateMessageFor(dog);
    return `
      <div class="result ${safe(msg.cls)}">
        <b>${safe(msg.title)}</b><br>
        ${safe(msg.body)}
      </div>
    `;
  }).join("") || `<div class="empty">Add a dog profile to see best-mate status.</div>`;
}

function renderCheckedInSearch() {
  const node = $("#checkedInSearchResults");
  if (!node) return;
  const q = norm($("#checkedInDogSearch") ? $("#checkedInDogSearch").value : "");
  const results = checkedInDogs().filter((dog) => {
    const text = norm([dog.name, dog.breed, dog.size, dog.ageGroup, dog.notes, dog.bestMate, dog.reactive >= 6 ? "reactive" : "", dog.size].join(" "));
    return !q || text.includes(q);
  });
  node.innerHTML = results.map((dog) => {
    const mate = bestMateMessageFor(dog);
    return `
      <div class="config-row ${q ? "searchHighlight" : ""}">
        <b>${safe(dog.name)}</b> — ${safe(dog.size)} ${safe(dog.breed || "")}<br>
        Reactive ${dog.reactive}/10 • Best mate: ${safe(dog.bestMate || "not set")}<br>
        <span class="moduleBadge">${safe(mate.title)}</span>
      </div>
    `;
  }).join("") || `<div class="empty">No checked-in dogs match that search.</div>`;
}

function renderPlannerControls() {
  const dogSelect = $("#plannerDog");
  if (dogSelect) dogSelect.innerHTML = allDogOptionsHtml();
  const parkSelect = $("#plannerPark");
  if (parkSelect) parkSelect.innerHTML = allParkOptionsHtml();
}

function renderCheckinControls() {
  const parkSelect = $("#currentParkSelect");
  if (parkSelect && !parkSelect.innerHTML.trim()) parkSelect.innerHTML = allParkOptionsHtml();
}

function renderModuleMapResults() {
  const node = $("#moduleMapResults");
  if (!node) return;
  const q = norm($("#moduleMapSearch") ? $("#moduleMapSearch").value : "");
  const parks = allParks().filter((park) => {
    const text = norm([park.name, park.suburb, park.postcode, park.setting, park.beach ? "beach dog beaches" : "", park.greyNomad ? "traveller grey nomad" : "", "dog park"].join(" "));
    return !q || text.includes(q);
  });
  node.innerHTML = parks.slice(0, 10).map((park) => {
    const mapQ = encodeURIComponent(`${park.name} ${park.suburb} ${park.state}`);
    return `
      <div class="config-row">
        <b>${safe(park.name)}</b><br>
        ${safe(park.suburb)} ${safe(park.postcode)} • ${safe(park.setting)} • ${safe(park.fenced)} fencing<br>
        <a href="https://www.google.com/maps/search/?api=1&query=${mapQ}" target="_blank">Open Google Maps</a>
        &nbsp; | &nbsp;
        <a href="https://maps.apple.com/?q=${mapQ}" target="_blank">Open Apple Maps</a>
      </div>
    `;
  }).join("") || `<div class="empty">No map results. Try dog park, dogs checked in, traveller, beach, Labrador.</div>`;
}

function renderGreyNomadResults() {
  const node = $("#greyNomadResults");
  if (!node) return;
  const parks = allParks().filter((park) => park.greyNomad || park.caravan || park.cafe || park.toilets);
  node.innerHTML = parks.map((park) => `
    <div class="config-row">
      <b>${safe(park.name)}</b><br>
      ${park.caravan ? "Caravan parking • " : ""}${park.easyParking ? "Easy parking • " : ""}${park.toilets ? "Toilets • " : ""}${park.cafe ? "Café • " : ""}${park.waterBowl ? "Water bowls" : ""}
    </div>
  `).join("") || `<div class="empty">No grey nomad friendly parks found.</div>`;
}

function renderLostFound() {
  const node = $("#lostFoundList");
  if (!node) return;
  const items = loadLostFound();
  node.innerHTML = items.map((item) => `
    <article class="result ${safe(item.urgency)}">
      <b>${safe(item.type)}: ${safe(item.dog)}</b><br>
      ${safe(item.location)}<br>
      ${safe(item.notes)}<br>
      <small>${new Date(item.createdAt).toLocaleString()}</small>
    </article>
  `).join("") || `<div class="empty">No lost/found alerts yet.</div>`;
}

const previousRenderDogsForModule15 = renderDogs;
renderDogs = function() {
  previousRenderDogsForModule15();
  renderPlannerControls();
  renderCheckinControls();
  renderBestMateStatus();
  renderCheckedInSearch();
  renderHomeDashboard();
};

const previousRenderParksForModule15 = renderParks;
renderParks = function() {
  previousRenderParksForModule15();
  renderPlannerControls();
  renderCheckinControls();
  renderModuleMapResults();
  renderGreyNomadResults();
  renderHomeDashboard();
};

const previousRenderAllForModule15 = renderAll;
renderAll = function() {
  previousRenderAllForModule15();
  renderPlannerControls();
  renderCheckinControls();
  renderBestMateStatus();
  renderCheckedInSearch();
  renderModuleMapResults();
  renderGreyNomadResults();
  renderLostFound();
  renderHomeDashboard();
};

function setupModule15Handover() {
  renderAll();

  document.body.addEventListener("click", (event) => {
    const go = event.target.getAttribute("data-go");
    if (go) {
      const tab = document.querySelector(`[data-tab="${go}"]`);
      if (tab) tab.click();
    }

    const mapFilter = event.target.getAttribute("data-map-filter");
    if (mapFilter) {
      const input = $("#moduleMapSearch");
      if (input) {
        input.value = mapFilter;
        renderModuleMapResults();
      }
    }
  });

  const checkedSearch = $("#checkedInDogSearch");
  if (checkedSearch) checkedSearch.addEventListener("input", renderCheckedInSearch);

  const mapSearch = $("#moduleMapSearch");
  if (mapSearch) mapSearch.addEventListener("input", renderModuleMapResults);

  const currentPark = $("#currentParkSelect");
  if (currentPark) currentPark.addEventListener("change", () => {
    addOwnerMessage("Park changed", `Current park set to ${currentParkName()}`, "green");
    renderHomeDashboard();
  });

  const here = $("#announceHere");
  if (here) here.addEventListener("click", () => {
    addOwnerMessage("I'm here", `Owner has arrived at ${currentParkName()}.`, "green");
    addAudit("Owner arrived", currentParkName());
    renderHomeDashboard();
  });

  const left = $("#announceLeft");
  if (left) left.addEventListener("click", () => {
    addOwnerMessage("I've left", `Owner has left ${currentParkName()}.`, "yellow");
    addAudit("Owner left", currentParkName());
    renderHomeDashboard();
  });

  const plannerForm = $("#plannerForm");
  if (plannerForm) plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(plannerForm);
    const dog = dogs.find((item) => item.id === data.get("dog"));
    const parkName = data.get("park");
    const dogName = dog ? dog.name : "Dog";
    const mate = dog ? bestMateMessageFor(dog) : null;
    const checks = [];
    if (data.get("checkBestMate")) checks.push(mate ? mate.title : "Best mate check selected");
    if (data.get("needsQuiet")) checks.push("Quiet / low crowding preferred");
    if (data.get("beachTide")) checks.push("Beach/tide prompt required");
    if (data.get("greyNomad")) checks.push("Grey nomad / caravan needs");
    $("#plannerResult").innerHTML = `
      <div class="result green">
        <b>Visit plan created</b><br>
        ${safe(dogName)} → ${safe(parkName)}<br>
        Arrival: ${safe(data.get("time"))}<br>
        ${checks.map((c) => `<span class="moduleBadge">${safe(c)}</span>`).join(" ")}
      </div>
    `;
    addOwnerMessage("Visit planned", `${dogName} planned for ${parkName}`, "green");
    addAudit("Visit plan created", `${dogName} → ${parkName}`);
    renderHomeDashboard();
  });

  const lostFoundForm = $("#lostFoundForm");
  if (lostFoundForm) lostFoundForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(lostFoundForm);
    const item = {
      id: `lost_${Date.now()}`,
      type: data.get("type"),
      dog: data.get("dog"),
      location: data.get("location"),
      urgency: data.get("urgency"),
      notes: data.get("notes"),
      createdAt: new Date().toISOString()
    };
    const items = loadLostFound();
    saveLostFound([item].concat(items));
    addOwnerMessage(item.type, `${item.dog} — ${item.location}`, item.urgency);
    addAudit("Lost/Found alert created", `${item.type}: ${item.dog}`);
    lostFoundForm.reset();
    renderLostFound();
    renderHomeDashboard();
  });

  const greyBtn = $("#greyNomadSearch");
  if (greyBtn) greyBtn.addEventListener("click", () => {
    $("#parkSearch").value = "grey nomad caravan cafe";
    document.querySelector('[data-filter="greyNomad"]')?.click();
    renderParks();
    renderGreyNomadResults();
  });

  const settingsForm = $("#moduleSettingsForm");
  if (settingsForm) settingsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(settingsForm);
    const settings = {
      defaultAlertMode: data.get("defaultAlertMode"),
      defaultSearch: data.get("defaultSearch"),
      showMateAlerts: Boolean(data.get("showMateAlerts")),
      showReactiveAlerts: Boolean(data.get("showReactiveAlerts")),
      showCouncilPrompts: Boolean(data.get("showCouncilPrompts")),
      savedAt: new Date().toISOString()
    };
    save("genevieve_module15_settings", settings);
    $("#settingsResult").innerHTML = `
      <div class="result green">
        <b>Settings saved</b><br>
        ${safe(settings.defaultAlertMode)}<br>
        Default search: ${safe(settings.defaultSearch)}
      </div>
    `;
    addAudit("Module 15 settings saved", settings.defaultSearch);
  });

  renderAll();
}

document.addEventListener("DOMContentLoaded", setupModule15Handover);


/* GENEVIEVE_MOBILE_PRO_LAYOUT_MODULE */

function setupMobileProfessionalLayout() {
  document.body.addEventListener("click", (event) => {
    const tabButton = event.target.closest(".tabs button");
    if (tabButton) {
      setTimeout(() => {
        tabButton.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        const guide = document.querySelector(".mobileScreenGuide");
        if (guide && window.innerWidth < 700) {
          guide.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 30);
    }

    const quickGo = event.target.getAttribute("data-go");
    if (quickGo) {
      const target = document.querySelector(`[data-tab="${quickGo}"]`);
      if (target) {
        target.click();
        setTimeout(() => target.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" }), 50);
      }
    }
  });

  // Improve long mobile screens by placing key result sections near their forms after submission.
  ["plannerForm", "askForm", "compatForm", "alertForm", "lostFoundForm", "reportForm"].forEach((id) => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener("submit", () => {
      setTimeout(() => {
        const active = document.querySelector(".screen.active");
        const answer = active ? active.querySelector(".answer, .result, #plannerResult, #compatResults, #spaceAlerts, #lostFoundList, #reportList") : null;
        if (answer && window.innerWidth < 700) {
          answer.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 120);
    });
  });
}

document.addEventListener("DOMContentLoaded", setupMobileProfessionalLayout);


/* GENEVIEVE_CLEAN_SECTIONS_GREEN_PATCH */
function selectedParkSearchModeClean() {
  const checked = document.querySelector('input[name="parkSearchMode"]:checked');
  return checked ? checked.value : "all";
}
const previousMatchParksCleanSections = matchParks;
matchParks = function() {
  let matched = previousMatchParksCleanSections();
  const mode = selectedParkSearchModeClean();
  if (mode === "standard") matched = matched.filter((park) => !park.beach && !park.greyNomad);
  if (mode === "quiet") matched = matched.filter((park) => park.reactive || park.quiet === "quiet");
  if (mode === "beach") matched = matched.filter((park) => park.beach || park.tide || park.setting === "beach");
  if (mode === "grey") matched = matched.filter((park) => park.greyNomad || park.caravan || park.easyParking);
  return matched;
};
function activeGreyFiltersClean() {
  return Array.from(document.querySelectorAll("[data-grey-filter]")).filter((item) => item.checked).map((item) => item.getAttribute("data-grey-filter"));
}
renderGreyNomadResults = function() {
  const node = $("#greyNomadResults");
  if (!node) return;
  const filters = activeGreyFiltersClean();
  let parks = allParks().filter((park) => park.greyNomad || park.caravan || park.easyParking || park.toilets || park.cafe);
  if (filters.length) parks = parks.filter((park) => filters.every((filter) => Boolean(park[filter])));
  node.innerHTML = parks.map((park) => `
    <article class="config-row">
      <h3>${safe(park.name)}</h3>
      <p>${safe(park.suburb)} ${safe(park.postcode)} • ${safe(park.size)} • ${safe(park.fenced)} fencing</p>
      <div class="chips">
        ${park.caravan ? '<span class="chip">Caravan parking</span>' : ''}
        ${park.easyParking ? '<span class="chip">Easy parking</span>' : ''}
        ${park.toilets ? '<span class="chip">Toilets</span>' : ''}
        ${park.cafe ? '<span class="chip">Café</span>' : ''}
        ${park.waterBowl ? '<span class="chip">Water bowls</span>' : ''}
        ${park.shade ? '<span class="chip">Shade</span>' : ''}
        ${park.beach ? '<span class="chip">Beach / tide prompt</span>' : ''}
      </div>
      <p class="note">${safe(park.prompt || "Check council signage before use.")}</p>
    </article>
  `).join("") || `<div class="empty">No traveller-friendly parks match those needs. Untick one traveller need and try again.</div>`;
};
function setupCleanSectionsGreenPatch() {
  document.querySelectorAll('input[name="parkSearchMode"]').forEach((item) => item.addEventListener("change", renderParks));
  document.querySelectorAll("[data-grey-filter]").forEach((item) => item.addEventListener("change", renderGreyNomadResults));
  const clearPark = $("#clearParkSearch");
  if (clearPark) clearPark.addEventListener("click", () => {
    if ($("#parkSearch")) $("#parkSearch").value = "";
    if ($("#maxDistance")) $("#maxDistance").value = "999";
    if ($("#parkSize")) $("#parkSize").value = "any";
    if ($("#parkFence")) $("#parkFence").value = "any";
    if ($("#parkSetting")) $("#parkSetting").value = "any";
    const all = document.querySelector('input[name="parkSearchMode"][value="all"]');
    if (all) all.checked = true;
    document.querySelectorAll("[data-filter]").forEach((item) => item.checked = false);
    sortMode = "default";
    renderParks();
  });
  const clearGrey = $("#clearGreyFilters");
  if (clearGrey) clearGrey.addEventListener("click", () => {
    document.querySelectorAll("[data-grey-filter]").forEach((item) => {
      item.checked = ["caravan", "easyParking", "toilets", "cafe", "waterBowl", "shade"].includes(item.getAttribute("data-grey-filter"));
    });
    renderGreyNomadResults();
  });
  const simpleDeletes = {
    deleteDogsOnly: ["genevieve_dogs", "dog profiles"],
    deleteOwnerMessagesOnly: ["genevieve_owner_messages", "owner messages"]
  };
  Object.entries(simpleDeletes).forEach(([buttonId, [key, label]]) => {
    const button = document.getElementById(buttonId);
    if (button) button.addEventListener("click", () => {
      if (confirm(`Delete ${label} from this device?`)) {
        localStorage.removeItem(key);
        location.reload();
      }
    });
  });
  const deleteAlerts = $("#deleteAlertsOnly");
  if (deleteAlerts) deleteAlerts.addEventListener("click", () => {
    if (confirm("Delete alerts and interaction rules from this device?")) {
      localStorage.removeItem("genevieve_alerts");
      localStorage.removeItem("genevieve_interaction_rules");
      location.reload();
    }
  });
  const deleteReports = $("#deleteReportsOnly");
  if (deleteReports) deleteReports.addEventListener("click", () => {
    if (confirm("Delete reports, incidents and lost/found alerts from this device?")) {
      localStorage.removeItem("genevieve_reports");
      localStorage.removeItem("genevieve_lost_found");
      location.reload();
    }
  });
  const deleteAll = $("#deleteAllUserInfo");
  if (deleteAll) deleteAll.addEventListener("click", () => {
    if (confirm("Delete ALL local user information from this device?")) {
      localStorage.clear();
      location.reload();
    }
  });
  renderParks();
  renderGreyNomadResults();
}
document.addEventListener("DOMContentLoaded", setupCleanSectionsGreenPatch);


/* GENEVIEVE_COUNCIL_ETIQUETTE_MODULE */
function loadEtiquetteLogs() {
  return load("genevieve_etiquette_logs", []);
}
function saveEtiquetteLogs(items) {
  save("genevieve_etiquette_logs", items);
}
function renderBreakDogOptions() {
  const select = $("#breakDog");
  if (!select) return;
  select.innerHTML = dogs.map((dog) => `<option value="${safe(dog.id)}">${safe(dog.name)}</option>`).join("");
}
function etiquetteLevelAction(level, sign) {
  if (level === "green") {
    return {
      className: "green",
      message: `GREEN: ${sign}. Your dog appears comfortable. Keep supervising and allow rest/water breaks.`
    };
  }
  if (level === "amber") {
    return {
      className: "amber",
      message: `AMBER: ${sign}. Give your dog space, slow the interaction and watch closely.`
    };
  }
  return {
    className: "red",
    message: `RED: ${sign}. Your dog may need a break. Create distance, leash/reset if safe, move to shade/water or leave the park.`
  };
}
function addEtiquetteLog(type, level, text) {
  const logs = loadEtiquetteLogs();
  logs.unshift({
    id: `etiq_${Date.now()}`,
    type,
    level,
    text,
    time: new Date().toISOString()
  });
  saveEtiquetteLogs(logs.slice(0, 50));
}
function renderEtiquetteLogs() {
  const node = $("#etiquetteLog");
  if (!node) return;
  const logs = loadEtiquetteLogs();
  node.innerHTML = logs.map((log) => `
    <article class="config-row etiquetteLogItem ${safe(log.level)}">
      <b>${safe(log.type)}</b><br>
      ${safe(log.text)}<br>
      <small>${new Date(log.time).toLocaleString()}</small>
      <br><button data-delete-etiquette="${safe(log.id)}" class="danger" type="button">Delete this note</button>
    </article>
  `).join("") || `<div class="empty">No etiquette logs yet.</div>`;
}
const previousRenderDogsCouncilEtiquette = renderDogs;
renderDogs = function() {
  previousRenderDogsCouncilEtiquette();
  renderBreakDogOptions();
};
function setupCouncilEtiquetteModule() {
  renderBreakDogOptions();
  renderEtiquetteLogs();

  document.body.addEventListener("click", (event) => {
    const signButton = event.target.closest("[data-body-sign]");
    if (signButton) {
      const sign = signButton.getAttribute("data-body-sign");
      const level = signButton.getAttribute("data-level") || "yellow";
      const action = etiquetteLevelAction(level, sign);
      const result = $("#etiquettePromptResult");
      if (result) {
        result.className = `result ${action.className}`;
        result.textContent = action.message;
      }
      addEtiquetteLog("Body language prompt", level, action.message);
      addOwnerMessage("Dog etiquette prompt", action.message, level === "green" ? "green" : level);
      addAudit("Council etiquette prompt", `${level}: ${sign}`);
      renderEtiquetteLogs();
      renderHomeDashboard();
    }

    const deleteId = event.target.getAttribute("data-delete-etiquette");
    if (deleteId) {
      const logs = loadEtiquetteLogs();
      saveEtiquetteLogs(logs.filter((item) => item.id !== deleteId));
      renderEtiquetteLogs();
    }
  });

  const wants = $("#dogWantsHere");
  if (wants) wants.addEventListener("click", () => {
    const msg = "GREEN: Dog appears comfortable. Continue supervising, reward calm behaviour and allow water/sniff breaks.";
    $("#etiquettePromptResult").className = "result green";
    $("#etiquettePromptResult").textContent = msg;
    addEtiquetteLog("Dog wants to be here", "green", msg);
    addOwnerMessage("My dog wants to be here", msg, "green");
    renderEtiquetteLogs();
    renderHomeDashboard();
  });

  const needs = $("#dogNeedsBreak");
  if (needs) needs.addEventListener("click", () => {
    const msg = "RED: My dog needs a break. Please give us space while we reset, move to shade/water or leave.";
    $("#etiquettePromptResult").className = "result red";
    $("#etiquettePromptResult").textContent = msg;
    addEtiquetteLog("Dog needs a break", "red", msg);
    addOwnerMessage("My dog needs a break", msg, "red");
    renderEtiquetteLogs();
    renderHomeDashboard();
  });

  const help = $("#helpReadDog");
  if (help) help.addEventListener("click", () => {
    const msg = "Check body posture, tail, eye contact, play style, recall, breaks, water seeking and whether the dog is avoiding or fixating.";
    $("#etiquettePromptResult").className = "answer";
    $("#etiquettePromptResult").textContent = msg;
    addEtiquetteLog("Help reading dog", "yellow", msg);
    renderEtiquetteLogs();
  });

  const form = $("#breakActionForm");
  if (form) form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const dog = dogs.find((item) => item.id === data.get("dog"));
    const dogName = dog ? dog.name : "Dog";
    const msg = `${dogName}: ${data.get("concern")} → action taken: ${data.get("action")}.`;
    $("#etiquettePromptResult").className = "result amber";
    $("#etiquettePromptResult").textContent = `AMBER: ${msg}`;
    addEtiquetteLog("Break-time action", "amber", msg);
    addOwnerMessage("Break-time action", msg, "amber");
    addAudit("Break-time action logged", msg);
    form.reset();
    renderEtiquetteLogs();
    renderHomeDashboard();
  });
}
document.addEventListener("DOMContentLoaded", setupCouncilEtiquetteModule);


/* GENEVIEVE_PREVENTATIVE_RISK_ENGINE_MODULE */
function loadHazards(){return load("genevieve_hazard_flags",[])}
function saveHazards(items){save("genevieve_hazard_flags",items)}
function loadPreventativeAudit(){return load("genevieve_preventative_audit",[])}
function savePreventativeAudit(items){save("genevieve_preventative_audit",items)}
function addPreventativeAudit(type,detail,level="green"){const items=loadPreventativeAudit();items.unshift({id:`pa_${Date.now()}`,type,detail,level,time:new Date().toISOString()});savePreventativeAudit(items.slice(0,200));addAudit(type,detail)}
function optionParksHtml(){return allParks().map((park)=>`<option value="${safe(park.id||park.name)}">${safe(park.name)} — ${safe(park.suburb||"")}</option>`).join("")}
function findParkByAny(value){return allParks().find((park)=>(park.id||park.name)===value||park.name===value)||allParks()[0]}
function fillRiskSelects(){["#suitabilityDog","#emergencyDog"].forEach((selector)=>{const node=$(selector);if(node)node.innerHTML=dogs.map((dog)=>`<option value="${safe(dog.id)}">${safe(dog.name)}</option>`).join("")});["#suitabilityPark","#hazardPark"].forEach((selector)=>{const node=$(selector);if(node)node.innerHTML=optionParksHtml()})}
function activeHazardsForPark(park){const now=Date.now();return loadHazards().filter((h)=>h.parkName===park.name&&Number(h.expiresAt)>now)}
function heatRiskScore(temp,dog,noShade,noWater){let score=0;const t=Number(temp||0);if(t>=28)score+=15;if(t>=32)score+=25;if(t>=36)score+=35;if(noShade)score+=12;if(noWater)score+=12;if((dog.heatRisk||"").includes("Brachycephalic"))score+=18;if((dog.heatRisk||"").includes("Senior"))score+=14;if((dog.heatRisk||"").includes("Thick"))score+=10;return score}
function suitabilityLevelFromScore(score){if(score>=80)return{level:"red",label:"Red",action:"Not suitable right now. Choose a quieter/safer park or wait."};if(score>=55)return{level:"amber",label:"Amber",action:"Use caution. Park state does not suit this dog well right now."};if(score>=30)return{level:"yellow",label:"Yellow",action:"Monitor. Ask first, keep distance and reassess."};return{level:"green",label:"Green",action:"Suitable with normal supervision."}}
function runSuitability(dog,park,state){const capacityRatio=Number(state.currentDogs)/Math.max(1,Number(state.capacity));let score=5;const reasons=[];if(capacityRatio>=.75){score+=28;reasons.push(`Park is busy: ${state.currentDogs}/${state.capacity}.`)}if(capacityRatio>=.9){score+=20;reasons.push("Park is close to capacity.")}if(Number(dog.reactive||0)>=5){score+=16;reasons.push(`${dog.name} is reactive-${dog.reactive}.`)}if(Number(dog.reactive||0)>=5&&String(state.gate).includes("Single congested")){score+=26;reasons.push(`${dog.name} may dislike crowded gates; this park has a single congested gate.`)}if(dog.notSocialToday){score+=18;reasons.push(`${dog.name} is marked not social today / needs space.`)}if(state.noFencing||park.fenced==="none"){score+=14;reasons.push("No fencing / recall must be strong.")}if(state.noWater||!park.water)reasons.push("Pack water.");if(state.noShade||!park.shade)reasons.push("Plan shade/rest breaks.");const hazards=activeHazardsForPark(park);if(hazards.length){score+=hazards.length*14;reasons.push(`${hazards.length} active hazard flag(s) for this park.`)}const heat=heatRiskScore(state.temperature,dog,state.noShade,state.noWater);if(heat>=30)reasons.push("Heat warning: use the seven-second back-of-hand pavement check and avoid hot surfaces.");score+=heat;const level=suitabilityLevelFromScore(Math.min(100,score));const prep=[];if(state.noWater||!park.water)prep.push("pack water");if(state.noShade||!park.shade)prep.push("plan shade/rest");if(state.noFencing||park.fenced==="none")prep.push("keep recall sharp");if(heat>=30)prep.push("avoid hot pavement");if(!reasons.length)reasons.push("No major mismatch detected.");return{score:Math.min(100,Math.round(score)),...level,reasons,prep,quieter:Number(state.currentDogs)>=Number(state.capacity)*.7?"Quieter after 4pm or outside peak times.":"Current crowding looks manageable."}}
function renderAnonymousSpaceFlags(){const node=$("#anonymousSpaceFlags");if(!node)return;const checkedIn=dogs.filter((dog)=>dog.checkedIn);const needsSpace=checkedIn.filter((dog)=>dog.notSocialToday||Number(dog.reactive||0)>=6).length;node.innerHTML=`<div class="status"><b>Respect-the-flag privacy layer</b><br>${needsSpace} dog${needsSpace===1?"":"s"} here today have asked for space.<p class="small-muted">This is anonymous. Individual dog identity/location stays private and opt-in.</p></div>`}
function renderHazards(){const node=$("#hazardList");if(!node)return;const now=Date.now();const hazards=loadHazards();node.innerHTML=hazards.map((h)=>{const expired=Number(h.expiresAt)<=now;return`<article class="config-row ${expired?"hazardExpired":""}"><b>${safe(h.hazard)}</b> — ${safe(h.parkName)}<br>${safe(h.notes||"")}<br><small>${expired?"Expired":"Expires"}: ${new Date(Number(h.expiresAt)).toLocaleString()}</small><br><button data-delete-hazard="${safe(h.id)}" class="danger" type="button">Delete hazard</button></article>`}).join("")||`<div class="empty">No hazard flags yet.</div>`}
function renderEmergencyAudit(){const node=$("#emergencyAudit");if(!node)return;const items=loadPreventativeAudit().filter((x)=>["Emergency summary viewed","Lost dog broadcast","Alone timer started","Alone timer cleared"].includes(x.type));node.innerHTML=items.map((item)=>`<div class="config-row"><b>${safe(item.type)}</b><br>${safe(item.detail)}<br><small>${new Date(item.time).toLocaleString()}</small></div>`).join("")||`<div class="empty">No emergency audit entries yet.</div>`}
function showEmergencySummary(){const dog=dogs.find((d)=>d.id===($("#emergencyDog")?$("#emergencyDog").value:""))||dogs[0];const node=$("#emergencySummary");if(!dog||!node)return;node.innerHTML=`<div class="medicalSummary"><h3>${safe(dog.name)}</h3><p><b>Breed:</b> ${safe(dog.breed||"Unknown")}<br><b>Weight:</b> ${safe(dog.weightKg||"Unknown")} kg<br><b>Microchip:</b> ${safe(dog.microchip||"Unknown")}<br><b>Vaccination:</b> ${safe(dog.vaccination||"Unknown")}<br><b>Desexed:</b> ${safe(dog.desexed||"Unknown")}<br><b>Heat risk:</b> ${safe(dog.heatRisk||"Normal")}<br><b>Emergency contact:</b> ${safe(dog.emergencyContact||"Not set")}<br><b>Notes:</b> ${safe(dog.notes||"")}</p></div>`;addPreventativeAudit("Emergency summary viewed",dog.name,"red");renderEmergencyAudit()}
function renderAloneTimer(){const node=$("#aloneTimerStatus");if(!node)return;const timer=load("genevieve_alone_timer",null);if(!timer){node.className="answer";node.textContent="No timer active.";return}const remaining=Number(timer.expiresAt)-Date.now();if(remaining<=0){node.className="answer timerExpired";node.textContent=`Timer expired. In a live version, emergency contact would be pinged: ${timer.contact||"not set"}.`}else{node.className="answer timerActive";node.textContent=`Timer active. ${Math.ceil(remaining/60000)} minute(s) remaining.`}}
function setupPreventativeRiskEngine(){fillRiskSelects();renderAnonymousSpaceFlags();renderHazards();renderEmergencyAudit();renderAloneTimer();setInterval(renderAloneTimer,30000);const form=$("#suitabilityForm");if(form)form.addEventListener("submit",(event)=>{event.preventDefault();const data=new FormData(form);const dog=dogs.find((d)=>d.id===data.get("dog"))||dogs[0];const park=findParkByAny(data.get("park"));const state={currentDogs:Number(data.get("currentDogs")),capacity:Number(data.get("capacity")),gate:data.get("gate"),temperature:Number(data.get("temperature")),noShade:Boolean(data.get("noShade")),noWater:Boolean(data.get("noWater")),noFencing:Boolean(data.get("noFencing"))};const result=runSuitability(dog,park,state);const node=$("#suitabilityResult");node.className=`result ${result.level} suitabilityCard`;node.innerHTML=`<b>${result.label} for ${safe(dog.name)}: ${safe(result.action)}</b><br>Risk score: ${result.score}/100<br><div class="barWrap"><div class="bar ${barClassFor(result.level)}" style="width:${result.score}%"></div></div><ul>${result.reasons.map((r)=>`<li>${safe(r)}</li>`).join("")}</ul><p><b>Prep notes:</b> ${result.prep.length?result.prep.map(safe).join(", "):"normal supervision"}.</p><p><b>Timing:</b> ${safe(result.quieter)}</p><button id="ackSuitabilityAlert" type="button">Acknowledge suitability alert</button>`;addPreventativeAudit("Suitability rating",`${result.label} for ${dog.name} at ${park.name}: ${result.score}/100`,result.level);renderAnonymousSpaceFlags()});document.body.addEventListener("click",(event)=>{if(event.target.id==="ackSuitabilityAlert"){addPreventativeAudit("Alert acknowledgement","Suitability alert acknowledged by user","green");alert("Acknowledged and logged.")}const hazardId=event.target.getAttribute("data-delete-hazard");if(hazardId){saveHazards(loadHazards().filter((h)=>h.id!==hazardId));renderHazards()}});const hazardForm=$("#hazardForm");if(hazardForm)hazardForm.addEventListener("submit",(event)=>{event.preventDefault();const data=new FormData(hazardForm);const park=findParkByAny(data.get("park"));const hours=Number(data.get("expiry"));const hazard={id:`haz_${Date.now()}`,parkName:park.name,hazard:data.get("hazard"),notes:data.get("notes"),createdAt:Date.now(),expiresAt:Date.now()+hours*60*60*1000};const hazards=loadHazards();hazards.unshift(hazard);saveHazards(hazards);addPreventativeAudit("Hazard report",`${hazard.hazard} at ${hazard.parkName}`,"amber");hazardForm.reset();fillRiskSelects();renderHazards()});const showSummary=$("#showEmergencySummary");if(showSummary)showSummary.addEventListener("click",showEmergencySummary);const lost=$("#lostDogBroadcast");if(lost)lost.addEventListener("click",()=>{const dog=dogs.find((d)=>d.id===($("#emergencyDog")?$("#emergencyDog").value:""))||dogs[0];if(!dog)return;const msg=`Lost dog broadcast prepared for ${dog.name}. Microchip: ${dog.microchip||"unknown"}. Last known park: ${typeof currentParkName==="function"?currentParkName():"unknown"}.`;addOwnerMessage("Lost dog broadcast",msg,"red");addPreventativeAudit("Lost dog broadcast",msg,"red");alert(msg);renderHomeDashboard()});const vet=$("#openVetSearch");if(vet)vet.addEventListener("click",()=>{const area=($("#vetArea")?$("#vetArea").value:"")||"near me";const q=encodeURIComponent(`after hours emergency vet ${area}`);const node=$("#vetLinks");if(node){node.innerHTML=`<div class="config-row"><a href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank">Open emergency vet search in Google Maps</a></div>`}addPreventativeAudit("Emergency vet search",area,"red");renderEmergencyAudit()});const startTimer=$("#startAloneTimer");if(startTimer)startTimer.addEventListener("click",()=>{const mins=Number($("#aloneTimerMinutes").value||20);const contact=dogs.find((d)=>d.emergencyContact)?.emergencyContact||"emergency contact not set";save("genevieve_alone_timer",{startedAt:Date.now(),expiresAt:Date.now()+mins*60000,contact});addPreventativeAudit("Alone timer started",`${mins} minutes. Contact: ${contact}`,"amber");renderAloneTimer();renderEmergencyAudit()});const clearTimer=$("#clearAloneTimer");if(clearTimer)clearTimer.addEventListener("click",()=>{localStorage.removeItem("genevieve_alone_timer");addPreventativeAudit("Alone timer cleared","User checked out safely","green");renderAloneTimer();renderEmergencyAudit()});const mapping=$("#saveDomainMapping");if(mapping)mapping.addEventListener("click",()=>{const value=$("#domainMapping").value;save("genevieve_domain_mapping",{value,savedAt:new Date().toISOString()});$("#mappingResult").textContent=`Saved mapping note: ${value}`;addPreventativeAudit("Standards mapping saved",value,"green")});const ackAll=$("#acknowledgeVisibleAlerts");if(ackAll)ackAll.addEventListener("click",()=>{addPreventativeAudit("Alert acknowledgement","Visible alerts acknowledged from governance panel","green");alert("Acknowledgement logged.")});const exportAudit=$("#exportAuditEvidence");if(exportAudit)exportAudit.addEventListener("click",()=>{const payload={audit,preventativeAudit:loadPreventativeAudit(),hazards:loadHazards(),exportedAt:new Date().toISOString()};const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="genevieve-audit-evidence.json";a.click();URL.revokeObjectURL(a.href)})}
document.addEventListener("DOMContentLoaded",setupPreventativeRiskEngine);


/* GENEVIEVE_AUSTRALIAN_GUIDELINES_MODULE */
function loadAustralianAudit() {
  return load("genevieve_australian_guideline_audit", []);
}
function saveAustralianAudit(items) {
  save("genevieve_australian_guideline_audit", items);
}
function addAustralianAudit(type, detail, level = "green") {
  const items = loadAustralianAudit();
  items.unshift({ id: `au_${Date.now()}`, type, detail, level, time: new Date().toISOString() });
  saveAustralianAudit(items.slice(0, 250));
  if (typeof addAudit === "function") addAudit(type, detail);
}
function firstFilledControl(data) {
  const order = ["elimination", "substitution", "isolation", "engineering", "administrative", "ppe"];
  return order.find((key) => String(data.get(key) || "").trim().length > 0) || "none";
}
function controlsRiskClass(first) {
  if (["elimination", "substitution", "isolation", "engineering"].includes(first)) return "green";
  if (first === "administrative") return "warn";
  if (first === "ppe" || first === "none") return "red";
  return "warn";
}
function setupAustralianGuidelinesModule() {
  const controlsForm = document.getElementById("controlsForm");
  if (controlsForm) controlsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(controlsForm);
    const first = firstFilledControl(data);
    const cls = controlsRiskClass(first);
    const result = document.getElementById("controlsResult");
    const warning = cls === "red" ? "Higher-order controls were not documented. Do not rely on PPE/admin-only controls without justification." : cls === "warn" ? "Administrative control is the first documented control. Consider whether elimination, substitution, isolation or engineering is reasonably practicable." : "Higher-order controls have been considered.";
    result.className = `result ${cls === "green" ? "green" : cls === "red" ? "red" : "amber"} controlPlan ${cls}`;
    result.innerHTML = `
      <b>Control plan: ${safe(data.get("hazard"))}</b><br>
      First documented control: ${safe(first)}<br>
      ${safe(warning)}
      <ul>
        <li><b>Elimination:</b> ${safe(data.get("elimination") || "not documented")}</li>
        <li><b>Substitution:</b> ${safe(data.get("substitution") || "not documented")}</li>
        <li><b>Isolation:</b> ${safe(data.get("isolation") || "not documented")}</li>
        <li><b>Engineering:</b> ${safe(data.get("engineering") || "not documented")}</li>
        <li><b>Administrative:</b> ${safe(data.get("administrative") || "not documented")}</li>
        <li><b>PPE:</b> ${safe(data.get("ppe") || "not documented")}</li>
      </ul>
    `;
    addAustralianAudit("Hierarchy of controls plan", `${data.get("hazard")} — first control: ${first}`, cls === "green" ? "green" : cls === "red" ? "red" : "amber");
  });

  const incidentForm = document.getElementById("incidentClockForm");
  if (incidentForm) incidentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(incidentForm);
    const type = String(data.get("incidentType") || "");
    const loc = data.get("location") || "location not entered";
    const out = document.getElementById("incidentClockResult");
    let level = "yellow";
    let prompts = ["Record time, location, what happened, witnesses and action taken.", "Use official council/regulator/emergency channels where required."];
    if (type.includes("Death") || type.includes("life-threatening")) {
      level = "red";
      prompts.unshift("Call 000 immediately if life is at risk.");
      prompts.push("Preserve the scene where safe and lawful.");
    } else if (type.includes("seriously") || type.includes("WHS")) {
      level = "red";
      prompts.push("If this is a staff/contractor/business incident, check WHS notifiable incident obligations immediately and preserve the site where required.");
    } else if (type.includes("Dangerous")) {
      level = "amber";
      prompts.push("Report the hazard to council/park operator and add a hazard flag with expiry/review time.");
    } else if (type.includes("Dog bite")) {
      level = "amber";
      prompts.push("Seek medical/veterinary care where needed and follow local council reporting requirements.");
    }
    out.className = `result ${level}`;
    out.innerHTML = `<b>${safe(type)}</b><br>${safe(loc)}<ul>${prompts.map((p) => `<li>${safe(p)}</li>`).join("")}</ul><button id="ackIncidentPrompt" type="button">Acknowledge reporting prompt</button>`;
    addAustralianAudit("Incident reporting prompt", `${type} at ${loc}`, level);
  });

  const five = document.getElementById("fiveDomainsForm");
  if (five) five.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(five);
    const domains = ["nutrition", "environment", "health", "behaviour", "mental"];
    const done = domains.filter((d) => data.get(d)).length;
    const out = document.getElementById("fiveDomainsResult");
    const level = done === 5 ? "green" : done >= 3 ? "amber" : "red";
    out.className = `result ${level}`;
    out.innerHTML = `<b>Five Domains check: ${done}/5 completed</b><br>${done === 5 ? "All welfare domains considered." : "Check remaining welfare domains before relying on the recommendation."}`;
    addAustralianAudit("Five Domains welfare check", `${done}/5 domains considered`, level);
  });

  document.body.addEventListener("click", (event) => {
    if (event.target.id === "ackIncidentPrompt") {
      addAustralianAudit("Incident prompt acknowledged", "User acknowledged incident reporting prompt", "green");
      alert("Acknowledgement logged.");
    }
  });

  const stale = document.getElementById("markOfflineMode");
  if (stale) stale.addEventListener("click", () => {
    save("genevieve_data_status", { stale: true, time: new Date().toISOString() });
    const out = document.getElementById("offlineStatus");
    out.className = "answer staleWarning";
    out.textContent = "Data marked stale/offline. Use cached emergency details and verify live conditions before acting.";
    addAustralianAudit("Offline/fail-safe mode", "Data marked stale/offline", "amber");
  });
  const clear = document.getElementById("clearOfflineMode");
  if (clear) clear.addEventListener("click", () => {
    localStorage.removeItem("genevieve_data_status");
    const out = document.getElementById("offlineStatus");
    out.className = "answer";
    out.textContent = "Live/static data status is normal.";
    addAustralianAudit("Offline/fail-safe mode", "Stale/offline warning cleared", "green");
  });
  const exportAu = document.getElementById("exportAustralianEvidence");
  if (exportAu) exportAu.addEventListener("click", () => {
    const payload = {
      australianGuidelineAudit: loadAustralianAudit(),
      preventativeAudit: typeof loadPreventativeAudit === "function" ? loadPreventativeAudit() : [],
      hazardFlags: typeof loadHazards === "function" ? loadHazards() : [],
      domainMapping: load("genevieve_domain_mapping", null),
      exportedAt: new Date().toISOString(),
      languageGuardrail: "Genevieve supports safer decisions; humans decide. Do not market as preventing accidents."
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "genevieve-australian-guideline-evidence.json";
    a.click();
    URL.revokeObjectURL(a.href);
  });
}
document.addEventListener("DOMContentLoaded", setupAustralianGuidelinesModule);


/* GENEVIEVE_CALM_GOV_TM_LAYOUT_MODULE */
(function () {
  function getDogList() {
    try { return typeof dogs !== "undefined" ? dogs : []; } catch (_) { return []; }
  }
  function getParkList() {
    try {
      if (typeof allParks === "function") return allParks();
      if (typeof PARKS !== "undefined") return PARKS;
      return [];
    } catch (_) { return []; }
  }
  function safeText(value) {
    try { return typeof safe === "function" ? safe(value) : String(value ?? "").replace(/[&<>"']/g, ""); } catch (_) { return String(value ?? ""); }
  }
  function tabGoCalm(targetName) {
    const target = document.querySelector(`[data-tab="${targetName}"]`);
    if (target) target.click();
  }
  function levelClass(score) {
    if (score >= 80) return "red";
    if (score >= 55) return "amber";
    if (score >= 30) return "yellow";
    return "green";
  }
  function levelLabel(level) {
    return level === "green" ? "Green" : level === "yellow" ? "Yellow" : level === "red" ? "Red" : "Amber";
  }
  function barClass(level) {
    return level === "green" ? "g" : level === "yellow" ? "y" : level === "red" ? "r" : "a";
  }
  function fillCalmSelects() {
    const dogsList = getDogList();
    const parksList = getParkList();
    const dogOptions = dogsList.map((dog) => `<option value="${safeText(dog.id)}">${safeText(dog.name)}</option>`).join("");
    const parkOptions = parksList.map((park, i) => `<option value="${safeText(park.id || park.name || i)}">${safeText(park.name || "Park")} — ${safeText(park.suburb || "")}</option>`).join("");
    ["suitabilityDog", "emergencyDog", "breakDog"].forEach((id) => {
      const node = document.getElementById(id);
      if (node && !node.innerHTML.trim()) node.innerHTML = dogOptions;
    });
    ["suitabilityPark", "hazardPark"].forEach((id) => {
      const node = document.getElementById(id);
      if (node && !node.innerHTML.trim()) node.innerHTML = parkOptions;
    });
  }
  function findDog(id) {
    return getDogList().find((dog) => String(dog.id) === String(id)) || getDogList()[0] || { name: "Dog", reactive: 5 };
  }
  function findPark(id) {
    return getParkList().find((park, i) => String(park.id || park.name || i) === String(id)) || getParkList()[0] || { name: "This park", fenced: "unknown" };
  }
  function setAnswer(id, html, level) {
    const node = document.getElementById(id);
    if (!node) return;
    node.className = `todayAnswer ${level || "amber"}`;
    node.innerHTML = html;
  }
  function runCalmSuitability(form) {
    const data = new FormData(form);
    const dog = findDog(data.get("dog"));
    const park = findPark(data.get("park"));
    const currentDogs = Number(data.get("currentDogs") || 0);
    const capacity = Math.max(1, Number(data.get("capacity") || 35));
    const temperature = Number(data.get("temperature") || 0);
    const gate = String(data.get("gate") || "");
    const noShade = Boolean(data.get("noShade"));
    const noWater = Boolean(data.get("noWater"));
    const noFencing = Boolean(data.get("noFencing"));
    let score = 8;
    const reasons = [];
    const ratio = currentDogs / capacity;
    if (ratio >= .75) { score += 28; reasons.push(`Park is busy right now: ${currentDogs}/${capacity}.`); }
    if (ratio >= .9) { score += 18; reasons.push("Park is close to capacity."); }
    if (Number(dog.reactive || 0) >= 5) { score += 16; reasons.push(`${dog.name} is reactive-${dog.reactive}.`); }
    if (Number(dog.reactive || 0) >= 5 && gate.includes("Single congested")) { score += 26; reasons.push("Single congested gate may be difficult for this dog."); }
    if (dog.notSocialToday) { score += 18; reasons.push(`${dog.name} is marked not social today / needs space.`); }
    if (temperature >= 28) { score += 10; reasons.push("Heat check: use the seven-second back-of-hand pavement test."); }
    if (temperature >= 32) score += 15;
    if (noShade) { score += 10; reasons.push("Poor shade: plan rest breaks."); }
    if (noWater) { score += 10; reasons.push("No water: pack water."); }
    if (noFencing) { score += 12; reasons.push("No fencing: keep recall sharp."); }
    if (!reasons.length) reasons.push("No major mismatch detected.");
    score = Math.min(100, Math.round(score));
    const level = levelClass(score);
    const label = levelLabel(level);
    const title = `<b>${label} for ${safeText(dog.name)}: ${level === "green" ? "suitable with normal supervision" : level === "yellow" ? "monitor and ask first" : level === "amber" ? "use caution before entering" : "choose a safer option right now"}</b>`;
    const answerHtml = `${title}<br>${safeText(park.name)} • ${score}/100 risk line. ${ratio >= .7 ? "Quieter after 4pm or outside peak times." : "Crowding looks manageable."}`;
    setAnswer("suitabilityAnswerTop", answerHtml, level);
    setAnswer("todayAnswer", answerHtml, level);
    const result = document.getElementById("suitabilityResult");
    if (result) {
      result.className = `result ${level} suitabilityCard`;
      result.innerHTML = `${title}<br>
        <div class="barWrap"><div class="bar ${barClass(level)}" style="width:${score}%"></div></div>
        <ul>${reasons.map((r) => `<li>${safeText(r)}</li>`).join("")}</ul>
        <p><b>Prep notes:</b> ${noWater ? "pack water, " : ""}${noShade ? "plan shade/rest, " : ""}${noFencing ? "keep recall sharp, " : ""}Genevieve assists; humans decide.</p>
        <button id="ackSuitabilityAlert" type="button">Acknowledge suitability alert</button>`;
    }
    try {
      if (typeof addAudit === "function") addAudit("Suitability rating", `${label} for ${dog.name} at ${park.name}: ${score}/100`);
    } catch (_) {}
  }

  function patchParkCards() {
    document.querySelectorAll("#parkList .card, #parkList article, .park-card").forEach((card) => {
      if (card.dataset.calmWrapped) return;
      const title = card.querySelector("h3, h2, b");
      if (!title || card.querySelector(".calmParkDetails")) return;
      const summaryText = title.textContent.trim() || "Park details";
      const details = document.createElement("details");
      details.className = "calmParkDetails";
      const summary = document.createElement("summary");
      summary.textContent = summaryText;
      details.appendChild(summary);
      while (card.firstChild) details.appendChild(card.firstChild);
      card.appendChild(details);
      card.dataset.calmWrapped = "true";
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    fillCalmSelects();
    document.body.addEventListener("click", (event) => {
      const go = event.target.getAttribute("data-go");
      if (go) {
        tabGoCalm(go);
        setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 40);
      }
      if (event.target.id === "ackSuitabilityAlert") {
        try { if (typeof addAudit === "function") addAudit("Alert acknowledgement", "Suitability alert acknowledged by user"); } catch (_) {}
        alert("Acknowledged and logged.");
      }
    });
    const suitabilityForm = document.getElementById("suitabilityForm");
    if (suitabilityForm) {
      suitabilityForm.addEventListener("submit", (event) => {
        event.preventDefault();
        runCalmSuitability(suitabilityForm);
      });
    }
    setTimeout(fillCalmSelects, 300);
    setTimeout(patchParkCards, 500);
    const observer = new MutationObserver(() => patchParkCards());
    const list = document.getElementById("parkList");
    if (list) observer.observe(list, { childList: true, subtree: true });
  });
})();


/* GENEVIEVE_DOGPARK_RESET_ALERTS_MODULE */
(function () {
  function dogNameToReset() {
    const input = document.getElementById("resetDogName");
    return (input && input.value ? input.value : "Bruno").trim().toLowerCase();
  }

  function resetStatus(message, good = true) {
    const node = document.getElementById("alertResetStatus");
    if (node) {
      node.className = good ? "answer alertResetStatusGood" : "answer";
      node.textContent = message;
    }
    const today = document.getElementById("todayAnswer");
    if (today && good) {
      today.className = "todayAnswer green";
      today.innerHTML = `<b>Alerts reset.</b><br>${safe(message)}`;
    }
  }

  function getOwnerMessages() {
    try { return loadOwnerMessages(); } catch (_) { return load("genevieve_owner_messages", []); }
  }

  function saveOwnerMessagesSafe(items) {
    try { saveOwnerMessages(items); } catch (_) { save("genevieve_owner_messages", items); }
  }

  function refreshAfterReset() {
    try { sync(); } catch (_) {
      try {
        save("genevieve_alerts", alerts);
        save("genevieve_audit", audit);
      } catch (e) {}
    }
    try { renderAlerts(); } catch (_) {}
    try { renderInteractionRules(); } catch (_) {}
    try { renderAll(); } catch (_) {}
    try { renderHomeDashboard(); } catch (_) {}
  }

  window.genevieveResetAllDogParkAlerts = function () {
    const oldAlertCount = Array.isArray(alerts) ? alerts.length : 0;
    alerts = [];
    save("genevieve_alerts", []);
    save("genevieve_interaction_rules", []);
    localStorage.removeItem("genevieve_alone_timer");
    try { saveOwnerMessagesSafe([]); } catch (_) { localStorage.removeItem("genevieve_owner_messages"); }
    try { addAudit("Alerts reset", "All active alerts, owner messages and interaction rules cleared"); } catch (_) {}
    refreshAfterReset();
    resetStatus(`All active alerts cleared. Removed ${oldAlertCount} space alert(s) and all interaction rules.`);
  };

  window.genevieveResetAlertsForDog = function (name) {
    const target = String(name || dogNameToReset()).trim().toLowerCase();
    if (!target) return;

    const beforeAlerts = Array.isArray(alerts) ? alerts.length : 0;
    alerts = (Array.isArray(alerts) ? alerts : []).filter((item) => String(item.dog || "").toLowerCase() !== target);
    save("genevieve_alerts", alerts);

    const rules = (typeof loadInteractionRules === "function" ? loadInteractionRules() : load("genevieve_interaction_rules", []));
    const nextRules = rules.filter((rule) => String(rule.dogName || "").toLowerCase() !== target);
    if (typeof saveInteractionRules === "function") saveInteractionRules(nextRules);
    else save("genevieve_interaction_rules", nextRules);

    const clearMessages = document.getElementById("resetAlsoMessages");
    if (!clearMessages || clearMessages.checked) {
      const messages = getOwnerMessages();
      const nextMessages = messages.filter((msg) => {
        const joined = `${msg.title || ""} ${msg.message || ""} ${msg.level || ""}`.toLowerCase();
        return !joined.includes(target);
      });
      saveOwnerMessagesSafe(nextMessages);
    }

    const removedAlerts = beforeAlerts - alerts.length;
    const removedRules = rules.length - nextRules.length;
    try { addAudit("Dog alerts reset", `${target}: removed ${removedAlerts} alert(s), ${removedRules} interaction rule(s)`); } catch (_) {}
    refreshAfterReset();
    resetStatus(`Reset complete for ${target}. Removed ${removedAlerts} alert(s) and ${removedRules} interaction rule(s).`);
  };

  // Replace old renderAlerts with one that includes a delete button on every active alert.
  if (typeof renderAlerts === "function") {
    renderAlerts = function () {
      const node = document.getElementById("spaceAlerts");
      if (!node) return;
      node.innerHTML = (Array.isArray(alerts) ? alerts : []).map((alert) => `
        <div class="result ${safe(alert.status)}">
          <b>${safe(alert.dog)}</b><br>
          ${safe(alert.message)}<br>
          <small>${new Date(alert.createdAt).toLocaleString()}</small>
          <div class="alertResetRow">
            <button data-delete-space-alert="${safe(alert.id)}" class="danger" type="button">Clear this alert</button>
          </div>
        </div>
      `).join("") || `<div class="empty">No active space alerts.</div>`;
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    const named = document.getElementById("resetNamedDogAlerts");
    if (named) named.addEventListener("click", function () {
      genevieveResetAlertsForDog(dogNameToReset());
    });

    const all = document.getElementById("resetAllActiveAlerts");
    if (all) all.addEventListener("click", function () {
      if (confirm("Reset ALL active alerts and interaction rules? Dog profiles and reports will stay.")) {
        genevieveResetAllDogParkAlerts();
      }
    });

    const quick = document.getElementById("quickResetAlerts");
    if (quick) quick.addEventListener("click", function () {
      if (confirm("Reset all active alerts and start again? Dog profiles stay.")) {
        genevieveResetAllDogParkAlerts();
      }
    });

    const governance = document.getElementById("resetAlertsFromGovernance");
    if (governance) governance.addEventListener("click", function () {
      if (confirm("Reset active alerts and interaction rules? Dog profiles stay.")) {
        genevieveResetAllDogParkAlerts();
      }
    });

    document.body.addEventListener("click", function (event) {
      const id = event.target.getAttribute("data-delete-space-alert");
      if (!id) return;
      alerts = (Array.isArray(alerts) ? alerts : []).filter((item) => item.id !== id);
      save("genevieve_alerts", alerts);
      try { addAudit("Space alert cleared", id); } catch (_) {}
      refreshAfterReset();
      resetStatus("That one alert was cleared.");
    });

    refreshAfterReset();
  });
})();


/* GENEVIEVE_DOGPARK_SIMPLE_TOGGLES_MODULE */
(function () {
  const CHECKIN_KEY = "genevieve_dog_checkins";
  const BESTMATE_KEY = "genevieve_best_mate_status";
  const CHECK_AUDIT_KEY = "genevieve_checkin_audit";
  const COMFORT_KEY = "genevieve_comfort_settings";

  function getCheckins() { return load(CHECKIN_KEY, []); }
  function saveCheckins(items) { save(CHECKIN_KEY, items); }
  function getBestMates() { return load(BESTMATE_KEY, []); }
  function saveBestMates(items) { save(BESTMATE_KEY, items); }
  function getCheckAudit() { return load(CHECK_AUDIT_KEY, []); }
  function saveCheckAudit(items) { save(CHECK_AUDIT_KEY, items); }

  function currentDogsList() {
    try { return Array.isArray(dogs) ? dogs : []; } catch (_) { return []; }
  }
  function currentParksList() {
    try {
      if (typeof allParks === "function") return allParks();
      if (Array.isArray(parks)) return parks;
      return [];
    } catch (_) { return []; }
  }
  function dogById(id) {
    return currentDogsList().find((dog) => String(dog.id) === String(id)) || currentDogsList()[0] || null;
  }
  function parkById(id) {
    return currentParksList().find((park, idx) => String(park.id || park.name || idx) === String(id)) || currentParksList()[0] || null;
  }
  function dogOptions() {
    return currentDogsList().map((dog) => `<option value="${safe(dog.id)}">${safe(dog.name)}</option>`).join("");
  }
  function parkOptions() {
    return currentParksList().map((park, idx) => `<option value="${safe(park.id || park.name || idx)}">${safe(park.name || "Park")}</option>`).join("");
  }
  function addCheckAudit(type, detail, level = "green") {
    const items = getCheckAudit();
    items.unshift({ id: `check_${Date.now()}`, type, detail, level, time: new Date().toISOString() });
    saveCheckAudit(items.slice(0, 100));
    try { addAudit(type, detail); } catch (_) {}
  }
  function ownerMessage(title, message, level = "green") {
    try { addOwnerMessage(title, message, level); } catch (_) {}
  }
  function fillCheckinSelects() {
    ["checkDogSelect", "bestMateDogSelect", "quickDogSelect"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.innerHTML = dogOptions();
    });
    ["checkParkSelect", "quickParkSelect"].forEach((id) => {
      const node = document.getElementById(id);
      if (node) node.innerHTML = parkOptions();
    });
    const bestMateInput = document.getElementById("bestMateNameInput");
    const dog = dogById(document.getElementById("bestMateDogSelect")?.value);
    if (bestMateInput && dog && !bestMateInput.value) bestMateInput.value = dog.bestMate || "";
  }
  function socialLevelFromState(state, opts = {}) {
    const text = String(state || "").toLowerCase();
    if (opts.reactiveToday || opts.onHeat || text.includes("red")) return "red";
    if (opts.needsSpace || opts.gateSensitive || text.includes("amber")) return "amber";
    if (text.includes("yellow")) return "yellow";
    return "green";
  }
  function checkInDog(dogId, parkId, state = "Green - social today", opts = {}) {
    const dog = dogById(dogId);
    const park = parkById(parkId);
    if (!dog) return;
    const level = socialLevelFromState(state, opts);
    const items = getCheckins().filter((item) => item.dogId !== dog.id);
    const checkin = {
      id: `ci_${Date.now()}`,
      dogId: dog.id,
      dogName: dog.name,
      parkId: park ? (park.id || park.name || "") : "",
      parkName: park ? park.name : "Current park",
      state,
      level,
      opts,
      arrivedAt: new Date().toISOString()
    };
    items.unshift(checkin);
    saveCheckins(items);

    dog.checkedIn = true;
    dog.notSocialToday = level === "red" || Boolean(opts.needsSpace);
    if (opts.reactiveToday) dog.reactive = Math.max(Number(dog.reactive || 0), 7);
    try { save("genevieve_dogs", dogs); } catch (_) {}

    if (level === "red" || level === "amber") {
      try {
        alerts.unshift({
          id: `alert_${Date.now()}`,
          dog: dog.name,
          status: level,
          message: level === "red" ? "Needs space / not social today." : "Needs extra space and careful greetings.",
          createdAt: new Date().toISOString()
        });
        save("genevieve_alerts", alerts);
      } catch (_) {}
    }

    ownerMessage(`${dog.name} arrived`, `${dog.name} has checked in at ${checkin.parkName}. Status: ${state}.`, level);
    addCheckAudit("Dog checked in", `${dog.name} at ${checkin.parkName}: ${state}`, level);
    setQuickStatus(`${dog.name} is checked in. ${state}.`, level);
    refreshCheckinUI();
  }
  function checkOutDog(dogId) {
    const dog = dogById(dogId);
    if (!dog) return;
    const before = getCheckins();
    const remaining = before.filter((item) => item.dogId !== dog.id);
    saveCheckins(remaining);
    dog.checkedIn = false;
    dog.notSocialToday = false;
    try { save("genevieve_dogs", dogs); } catch (_) {}

    // Clear that dog's active alerts and best mate record.
    try {
      alerts = alerts.filter((item) => String(item.dog || "").toLowerCase() !== String(dog.name || "").toLowerCase());
      save("genevieve_alerts", alerts);
    } catch (_) {}
    saveBestMates(getBestMates().filter((item) => item.dogId !== dog.id));

    ownerMessage(`${dog.name} left`, `${dog.name} has checked out and left the park.`, "green");
    addCheckAudit("Dog checked out", `${dog.name} left the park`, "green");
    setQuickStatus(`${dog.name} has left. Alerts cleared for this dog.`, "green");
    refreshCheckinUI();
  }
  function bestMateHere(dogId, mateName) {
    const dog = dogById(dogId);
    if (!dog) return;
    const mate = String(mateName || dog.bestMate || "Best mate").trim() || "Best mate";
    const items = getBestMates().filter((item) => item.dogId !== dog.id);
    items.unshift({ id: `bm_${Date.now()}`, dogId: dog.id, dogName: dog.name, mateName: mate, here: true, time: new Date().toISOString() });
    saveBestMates(items);
    ownerMessage("Best mate arrived", `${mate} is here for ${dog.name}.`, "green");
    addCheckAudit("Best mate arrived", `${mate} arrived for ${dog.name}`, "green");
    setQuickStatus(`${mate} is here for ${dog.name}.`, "green");
    refreshCheckinUI();
  }
  function bestMateLeft(dogId, mateName) {
    const dog = dogById(dogId);
    if (!dog) return;
    const mate = String(mateName || dog.bestMate || "Best mate").trim() || "Best mate";
    saveBestMates(getBestMates().filter((item) => item.dogId !== dog.id));
    ownerMessage("Best mate left", `${mate} has left. Recheck suitability if ${dog.name} relies on that friend.`, "yellow");
    addCheckAudit("Best mate left", `${mate} left for ${dog.name}`, "yellow");
    setQuickStatus(`${mate} has left. Recheck suitability if needed.`, "yellow");
    refreshCheckinUI();
  }
  function setQuickStatus(message, level = "green") {
    const node = document.getElementById("quickStatusResult");
    if (node) {
      node.className = `answer ${level}`;
      node.textContent = message;
    }
    const today = document.getElementById("todayAnswer");
    if (today) {
      today.className = `todayAnswer ${level}`;
      today.innerHTML = `<b>${safe(message)}</b><br>Use Check In for more details.`;
    }
  }
  function renderCheckedInDogs() {
    const node = document.getElementById("checkedInDogsList");
    if (!node) return;
    const items = getCheckins();
    node.innerHTML = items.map((item) => `
      <article class="config-row checkDogCard ${safe(item.level)}">
        <b>${safe(item.dogName)}</b><br>
        ${safe(item.parkName)}<br>
        ${safe(item.state)}<br>
        <small>Arrived ${new Date(item.arrivedAt).toLocaleString()}</small><br>
        <button data-checkout-dog-id="${safe(item.dogId)}" class="secondary" type="button">Check out</button>
        <button data-clear-dog-alerts="${safe(item.dogName)}" class="danger" type="button">Clear alerts</button>
      </article>
    `).join("") || `<div class="empty">No dogs checked in yet.</div>`;
  }
  function renderBestMateStatus() {
    const node = document.getElementById("bestMateStatusList");
    if (!node) return;
    const items = getBestMates();
    node.innerHTML = items.map((item) => `
      <article class="config-row bestMateCard">
        <b>${safe(item.mateName)} is here</b><br>
        Best mate for ${safe(item.dogName)}<br>
        <small>${new Date(item.time).toLocaleString()}</small><br>
        <button data-bestmate-left-dog-id="${safe(item.dogId)}" data-bestmate-name="${safe(item.mateName)}" class="secondary" type="button">Best mate left</button>
      </article>
    `).join("") || `<div class="empty">No best mate alerts active.</div>`;
  }
  function renderCheckAudit() {
    const node = document.getElementById("checkInAuditList");
    if (!node) return;
    node.innerHTML = getCheckAudit().slice(0, 50).map((item) => `
      <div class="config-row ${safe(item.level)}">
        <b>${safe(item.type)}</b><br>
        ${safe(item.detail)}<br>
        <small>${new Date(item.time).toLocaleString()}</small>
      </div>
    `).join("") || `<div class="empty">No check-in audit yet.</div>`;
  }
  function refreshCheckinUI() {
    fillCheckinSelects();
    renderCheckedInDogs();
    renderBestMateStatus();
    renderCheckAudit();
    try { renderAlerts(); } catch (_) {}
    try { renderHomeDashboard(); } catch (_) {}
  }
  function quickDogId() {
    return document.getElementById("quickDogSelect")?.value || document.getElementById("checkDogSelect")?.value;
  }
  function quickParkId() {
    return document.getElementById("quickParkSelect")?.value || document.getElementById("checkParkSelect")?.value;
  }

  function applyComfortSettings() {
    const settings = load(COMFORT_KEY, { comfort: true, hideEvidence: true });
    document.body.classList.toggle("comfortMode", settings.comfort !== false);
    document.body.classList.toggle("hiddenEvidence", settings.hideEvidence !== false);
    const comfort = document.getElementById("comfortModeToggle");
    const hide = document.getElementById("hideEvidenceToggle");
    if (comfort) comfort.checked = settings.comfort !== false;
    if (hide) hide.checked = settings.hideEvidence !== false;
  }
  function saveComfort() {
    const settings = {
      comfort: document.getElementById("comfortModeToggle")?.checked !== false,
      hideEvidence: document.getElementById("hideEvidenceToggle")?.checked !== false
    };
    save(COMFORT_KEY, settings);
    applyComfortSettings();
    const node = document.getElementById("comfortStatus");
    if (node) node.textContent = settings.comfort ? "Calm mode is on." : "Calm mode is off.";
  }

  function runToggleSelfTest() {
    const checks = {
      checkin_screen: Boolean(document.getElementById("checkin")),
      checkin_form: Boolean(document.getElementById("dogCheckInForm")),
      checkout_button: Boolean(document.getElementById("checkOutSelectedDog")),
      bestmate_form: Boolean(document.getElementById("bestMateForm")),
      quick_arrived: Boolean(document.getElementById("quickDogArrived")),
      quick_left: Boolean(document.getElementById("quickDogLeft")),
      quick_needs_space: Boolean(document.getElementById("quickNeedsSpace")),
      quick_reactive_today: Boolean(document.getElementById("quickReactiveToday")),
      quick_bestmate_here: Boolean(document.getElementById("quickBestMateHere")),
      quick_bestmate_left: Boolean(document.getElementById("quickBestMateLeft")),
      quick_gate_crowded: Boolean(document.getElementById("quickGateCrowded")),
      quick_clear_dog: Boolean(document.getElementById("quickClearDog")),
      reset_all: Boolean(document.getElementById("resetAllActiveAlerts") || document.getElementById("quickResetAlerts")),
      comfort_mode: Boolean(document.getElementById("comfortModeToggle"))
    };
    save("genevieve_toggle_self_test", { checks, time: new Date().toISOString() });
    return checks;
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyComfortSettings();
    refreshCheckinUI();

    document.getElementById("dogCheckInForm")?.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      checkInDog(data.get("dog"), data.get("park"), data.get("socialState"), {
        needsSpace: Boolean(data.get("needsSpace")),
        reactiveToday: Boolean(data.get("reactiveToday")),
        gateSensitive: Boolean(data.get("gateSensitive")),
        onHeat: Boolean(data.get("onHeat")),
        intact: Boolean(data.get("intact")),
        smallDog: Boolean(data.get("smallDog")),
        seniorDog: Boolean(data.get("seniorDog")),
        puppy: Boolean(data.get("puppy"))
      });
    });

    document.getElementById("checkOutSelectedDog")?.addEventListener("click", function () {
      checkOutDog(document.getElementById("checkDogSelect")?.value);
    });

    document.getElementById("bestMateForm")?.addEventListener("submit", function (event) {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      bestMateHere(data.get("dog"), data.get("bestMate"));
    });

    document.getElementById("bestMateLeftBtn")?.addEventListener("click", function () {
      bestMateLeft(document.getElementById("bestMateDogSelect")?.value, document.getElementById("bestMateNameInput")?.value);
    });

    document.getElementById("quickDogArrived")?.addEventListener("click", function () {
      checkInDog(quickDogId(), quickParkId(), "Green - social today", {});
    });
    document.getElementById("quickDogLeft")?.addEventListener("click", function () {
      checkOutDog(quickDogId());
    });
    document.getElementById("quickNeedsSpace")?.addEventListener("click", function () {
      checkInDog(quickDogId(), quickParkId(), "Amber - needs space", { needsSpace: true });
    });
    document.getElementById("quickReactiveToday")?.addEventListener("click", function () {
      checkInDog(quickDogId(), quickParkId(), "Red - not social today", { needsSpace: true, reactiveToday: true });
    });
    document.getElementById("quickBestMateHere")?.addEventListener("click", function () {
      const dog = dogById(quickDogId());
      bestMateHere(quickDogId(), dog?.bestMate || "Best mate");
    });
    document.getElementById("quickBestMateLeft")?.addEventListener("click", function () {
      const dog = dogById(quickDogId());
      bestMateLeft(quickDogId(), dog?.bestMate || "Best mate");
    });
    document.getElementById("quickGateCrowded")?.addEventListener("click", function () {
      checkInDog(quickDogId(), quickParkId(), "Amber - gate crowded", { gateSensitive: true });
    });
    document.getElementById("quickClearDog")?.addEventListener("click", function () {
      const dog = dogById(quickDogId());
      if (dog && typeof genevieveResetAlertsForDog === "function") genevieveResetAlertsForDog(dog.name);
      setQuickStatus(`${dog?.name || "Dog"} alerts cleared.`, "green");
      refreshCheckinUI();
    });

    document.body.addEventListener("click", function (event) {
      const checkoutId = event.target.getAttribute("data-checkout-dog-id");
      if (checkoutId) checkOutDog(checkoutId);

      const clearName = event.target.getAttribute("data-clear-dog-alerts");
      if (clearName && typeof genevieveResetAlertsForDog === "function") {
        genevieveResetAlertsForDog(clearName);
        refreshCheckinUI();
      }

      const bestMateLeftDogId = event.target.getAttribute("data-bestmate-left-dog-id");
      if (bestMateLeftDogId) bestMateLeft(bestMateLeftDogId, event.target.getAttribute("data-bestmate-name"));
    });

    document.getElementById("comfortModeToggle")?.addEventListener("change", saveComfort);
    document.getElementById("hideEvidenceToggle")?.addEventListener("change", saveComfort);
    document.getElementById("resetDemoFlow")?.addEventListener("click", function () {
      saveCheckins([]);
      saveBestMates([]);
      saveCheckAudit([]);
      if (typeof genevieveResetAllDogParkAlerts === "function") genevieveResetAllDogParkAlerts();
      refreshCheckinUI();
      setQuickStatus("Demo flow reset. You can start again.", "green");
    });

    runToggleSelfTest();
  });
})();


/* GENEVIEVE_DOGPARK_OWNER_SUPERVISION_MODULE */
(function(){
 const TK="genevieve_owner_supervision_timers", RK="genevieve_unattended_dog_reports";
 const getT=()=>load(TK,[]), setT=x=>save(TK,x), getR=()=>load(RK,[]), setR=x=>save(RK,x);
 const list=()=>{try{return Array.isArray(dogs)?dogs:[]}catch(e){return[]}};
 const dog=id=>list().find(d=>String(d.id)===String(id))||list()[0]||null;
 const opts=()=>list().map(d=>`<option value="${safe(d.id)}">${safe(d.name)}</option>`).join("");
 const lvl=s=>String(s||"").toLowerCase().includes("red")?"red":String(s||"").toLowerCase().includes("amber")?"amber":String(s||"").toLowerCase().includes("yellow")?"yellow":"green";
 function log(t,d,l="amber"){try{addAudit(t,d)}catch(e){} try{addOwnerMessage(t,d,l)}catch(e){}}
 function fill(){const n=document.getElementById("ownerDutyDogSelect"); if(n)n.innerHTML=opts();}
 function alertDog(name,reason,level="red",notes=""){
   const item={id:"unattended_"+Date.now(),dogName:String(name||"Unknown dog"),reason,level,notes,createdAt:new Date().toISOString()};
   const rs=getR(); rs.unshift(item); setR(rs.slice(0,100));
   try{alerts.unshift({id:"alert_unattended_"+Date.now(),dog:item.dogName,status:level,message:`Unattended dog: ${reason}. Dog parks are not drop-off care.`,createdAt:new Date().toISOString()});save("genevieve_alerts",alerts)}catch(e){}
   log("Unattended dog alert",`${item.dogName}: ${reason}. ${notes||""}`,level);
 }
 function answer(msg,level="amber"){const n=document.getElementById("ownerDutyAnswer"); if(n){n.className=`todayAnswer ${level}`; n.innerHTML=`<b>${safe(msg)}</b><br>Dog must remain under owner supervision.`} const t=document.getElementById("todayAnswer"); if(t){t.className=`todayAnswer ${level}`;t.innerHTML=`<b>${safe(msg)}</b><br>Open Owner Duty for details.`}}
 function start(id,status,min=10){const d=dog(id); if(!d)return; const level=lvl(status), exp=Date.now()+Number(min)*60000; const ts=getT().filter(x=>x.dogId!==d.id); ts.unshift({id:"owner_timer_"+Date.now(),dogId:d.id,dogName:d.name,status,level,minutes:Number(min),startedAt:new Date().toISOString(),expiresAt:exp}); setT(ts); level==="red"||level==="amber"?alertDog(d.name,level==="red"?"Owner left dog unattended":"Owner not close enough to supervise",level,"Created from owner timer."):log("Owner supervision confirmed",`${d.name}: ${status}. Recheck in ${min} minutes.`,level); render();}
 function confirm(id){start(id,"Green - owner inside park supervising",10); answer("Owner supervision confirmed. Timer renewed.","green")}
 function left(id){const d=dog(id); if(!d)return; alertDog(d.name,"Owner left dog unattended","red","Owner marked as left/not supervising."); answer(`${d.name} is marked unattended. Red alert created.`,"red"); render();}
 function renderTimers(){const node=document.getElementById("supervisionTimerList"); if(!node)return; const now=Date.now(); let ts=getT(), changed=false; ts.forEach(x=>{if(x.expiresAt<=now&&x.level!=="red"){x.level="red";x.status="Red - supervision timer expired";alertDog(x.dogName,"Owner supervision timer expired","red","Owner did not confirm they were still present.");changed=true}}); if(changed)setT(ts); node.innerHTML=ts.map(x=>{const r=Math.max(0,Math.ceil((Number(x.expiresAt)-Date.now())/60000));return `<article class="config-row ownerDutyTimer ${safe(x.level)}"><b>${safe(x.dogName)}</b><br>${safe(x.status)}<br>${r>0?`${r} minute(s) until next confirmation`:"Expired — Red unattended-dog alert created"}<br><small>Started ${new Date(x.startedAt).toLocaleString()}</small><br><button data-renew-owner-timer="${safe(x.dogId)}" type="button">I’m still supervising</button><button data-owner-left-dog="${safe(x.dogId)}" class="danger" type="button">Owner left</button><button data-clear-owner-timer="${safe(x.id)}" class="secondary" type="button">Clear timer</button></article>`}).join("")||`<div class="empty">No active owner supervision timers.</div>`}
 function renderReports(){const node=document.getElementById("unattendedReportList"); if(!node)return; node.innerHTML=getR().map(x=>`<article class="config-row unattendedReport ${safe(x.level)}"><b>${safe(x.dogName)}</b><br>${safe(x.reason)}<br>${safe(x.notes||"")}<br><small>${new Date(x.createdAt).toLocaleString()}</small><br><button data-clear-unattended-report="${safe(x.id)}" class="secondary" type="button">Close report</button></article>`).join("")||`<div class="empty">No unattended dog reports.</div>`}
 function render(){fill();renderTimers();renderReports();try{renderAlerts()}catch(e){}}
 document.addEventListener("DOMContentLoaded",function(){
   render(); setInterval(renderTimers,30000);
   document.getElementById("ownerPresenceForm")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);start(f.get("dog"),f.get("ownerStatus"),f.get("minutes"));answer("Owner supervision timer started.",lvl(f.get("ownerStatus")))});
   document.getElementById("confirmOwnerStillHere")?.addEventListener("click",()=>confirm(document.getElementById("ownerDutyDogSelect")?.value));
   document.getElementById("ownerHasLeft")?.addEventListener("click",()=>left(document.getElementById("ownerDutyDogSelect")?.value));
   document.getElementById("unattendedReportForm")?.addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.currentTarget);const level=lvl(f.get("risk"));alertDog(f.get("dogName")||"Unknown dog",f.get("location"),level,f.get("notes"));answer("Unattended dog report created.",level);e.currentTarget.reset();render()});
   document.getElementById("quickOwnerStillHere")?.addEventListener("click",()=>confirm(document.getElementById("quickDogSelect")?.value||document.getElementById("ownerDutyDogSelect")?.value));
   document.getElementById("quickReportUnattended")?.addEventListener("click",()=>{const d=dog(document.getElementById("quickDogSelect")?.value||document.getElementById("ownerDutyDogSelect")?.value);alertDog(d?d.name:"Unknown dog","Reported as left alone","red","Quick report from Today screen.");answer("Red unattended-dog alert created.","red");render()});
   document.body.addEventListener("click",e=>{const r=e.target.getAttribute("data-renew-owner-timer");if(r)confirm(r);const l=e.target.getAttribute("data-owner-left-dog");if(l)left(l);const c=e.target.getAttribute("data-clear-owner-timer");if(c){setT(getT().filter(x=>x.id!==c));log("Owner supervision timer cleared",c,"green");render()}const cr=e.target.getAttribute("data-clear-unattended-report");if(cr){setR(getR().filter(x=>x.id!==cr));log("Unattended dog report closed",cr,"green");render()}});
   let last=(load("genevieve_dog_checkins",[])||[]).length; setInterval(()=>{const cur=load("genevieve_dog_checkins",[])||[];if(cur.length>last){const newest=cur[0]; if(newest&&!getT().some(t=>t.dogId===newest.dogId)) start(newest.dogId,"Green - owner inside park supervising",10)} last=cur.length},2000);
   save("genevieve_owner_supervision_self_test",{ownerDutyScreen:!!document.getElementById("ownerDuty"),ownerPresenceForm:!!document.getElementById("ownerPresenceForm"),reportForm:!!document.getElementById("unattendedReportForm"),quickOwnerStillHere:!!document.getElementById("quickOwnerStillHere"),quickReportUnattended:!!document.getElementById("quickReportUnattended"),time:new Date().toISOString()});
 });
})();


/* GENEVIEVE_DOGPARK_LAUNCH_CHECKLIST_MODULE */
(function () {
  const launchChecklistItems = [{"section": "1. Core App", "item": "User registration", "status": "Backend", "detail": "Not safely built into a static no-backend app.", "next_step": "Add Supabase/Firebase/Auth0 or custom backend auth."}, {"section": "1. Core App", "item": "Secure login", "status": "Backend", "detail": "Requires encrypted server-backed authentication.", "next_step": "Add production auth provider."}, {"section": "1. Core App", "item": "Password reset", "status": "Backend", "detail": "Requires secure email flow through auth provider.", "next_step": "Add production auth provider."}, {"section": "1. Core App", "item": "User profile", "status": "Partial", "detail": "Local profile-style data/settings exist in the app, but not tied to a real account.", "next_step": "Connect to backend user table."}, {"section": "1. Core App", "item": "Dog profile(s)", "status": "Built", "detail": "Dog profiles exist and are used by matching/check-in/suitability.", "next_step": ""}, {"section": "1. Core App", "item": "Multiple dogs per owner", "status": "Built", "detail": "Dog list supports multiple dog profiles.", "next_step": ""}, {"section": "1. Core App", "item": "Profile photos", "status": "Backend", "detail": "Static version does not upload or store photos safely.", "next_step": "Add file storage bucket and privacy controls."}, {"section": "1. Core App", "item": "Emergency contact details", "status": "Partial", "detail": "Emergency fields/workflows exist; needs account-backed storage for real launch.", "next_step": "Store securely per user/dog."}, {"section": "1. Core App", "item": "Settings page", "status": "Built", "detail": "Settings/delete/reset/comfort controls are present.", "next_step": ""}, {"section": "2. Dog Profiles", "item": "Dog name", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Breed", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Age", "status": "Partial", "detail": "Can be stored in notes/preferences but should be made into explicit fields for production.", "next_step": "Make explicit production fields and backend storage."}, {"section": "2. Dog Profiles", "item": "Sex", "status": "Partial", "detail": "Can be stored in notes/preferences but should be made into explicit fields for production.", "next_step": "Make explicit production fields and backend storage."}, {"section": "2. Dog Profiles", "item": "Desexed status", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Weight", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Microchip number (private)", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Council registration (optional)", "status": "Partial", "detail": "Can be stored in notes/preferences but should be made into explicit fields for production.", "next_step": "Make explicit production fields and backend storage."}, {"section": "2. Dog Profiles", "item": "Vaccination record (optional)", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Medical conditions", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Allergies", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Medications", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Behaviour notes", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Favourite toys", "status": "Partial", "detail": "Can be stored in notes/preferences but should be made into explicit fields for production.", "next_step": "Make explicit production fields and backend storage."}, {"section": "2. Dog Profiles", "item": "Likes", "status": "Partial", "detail": "Can be stored in notes/preferences but should be made into explicit fields for production.", "next_step": "Make explicit production fields and backend storage."}, {"section": "2. Dog Profiles", "item": "Dislikes", "status": "Partial", "detail": "Can be stored in notes/preferences but should be made into explicit fields for production.", "next_step": "Make explicit production fields and backend storage."}, {"section": "2. Dog Profiles", "item": "Exercise level", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "2. Dog Profiles", "item": "Confidence level", "status": "Built", "detail": "Included or supported in dog profile/intake fields; may need field polish depending on current form labels.", "next_step": "Connect to secure backend storage for launch."}, {"section": "3. Behaviour Status", "item": "Calm", "status": "Partial", "detail": "Supported conceptually, but should be added as explicit one-tap statuses.", "next_step": "Add as one-tap status option in Check In."}, {"section": "3. Behaviour Status", "item": "Nervous", "status": "Partial", "detail": "Supported conceptually, but should be added as explicit one-tap statuses.", "next_step": "Add as one-tap status option in Check In."}, {"section": "3. Behaviour Status", "item": "Reactive", "status": "Built", "detail": "Implemented as visible check-in/status toggle or compatibility input.", "next_step": ""}, {"section": "3. Behaviour Status", "item": "In Training", "status": "Partial", "detail": "Supported conceptually, but should be added as explicit one-tap statuses.", "next_step": "Add as one-tap status option in Check In."}, {"section": "3. Behaviour Status", "item": "Puppy", "status": "Built", "detail": "Implemented as visible check-in/status toggle or compatibility input.", "next_step": ""}, {"section": "3. Behaviour Status", "item": "Senior", "status": "Built", "detail": "Implemented as visible check-in/status toggle or compatibility input.", "next_step": ""}, {"section": "3. Behaviour Status", "item": "Working Dog", "status": "Partial", "detail": "Supported conceptually, but should be added as explicit one-tap statuses.", "next_step": "Add as one-tap status option in Check In."}, {"section": "3. Behaviour Status", "item": "Needs Space", "status": "Built", "detail": "Implemented as visible check-in/status toggle or compatibility input.", "next_step": ""}, {"section": "3. Behaviour Status", "item": "Do Not Approach", "status": "Partial", "detail": "Supported conceptually, but should be added as explicit one-tap statuses.", "next_step": "Add as one-tap status option in Check In."}, {"section": "3. Behaviour Status", "item": "Muzzle in Use", "status": "Partial", "detail": "Supported conceptually, but should be added as explicit one-tap statuses.", "next_step": "Add as one-tap status option in Check In."}, {"section": "3. Behaviour Status", "item": "Female in Season (if appropriate)", "status": "Built", "detail": "Implemented as visible check-in/status toggle or compatibility input.", "next_step": ""}, {"section": "4. Compatibility System", "item": "Behaviour compatibility", "status": "Built", "detail": "Suitability/compatibility engine and colour result system are present.", "next_step": ""}, {"section": "4. Compatibility System", "item": "Size compatibility", "status": "Built", "detail": "Suitability/compatibility engine and colour result system are present.", "next_step": ""}, {"section": "4. Compatibility System", "item": "Energy compatibility", "status": "Built", "detail": "Suitability/compatibility engine and colour result system are present.", "next_step": ""}, {"section": "4. Compatibility System", "item": "Play style compatibility", "status": "Built", "detail": "Suitability/compatibility engine and colour result system are present.", "next_step": ""}, {"section": "4. Compatibility System", "item": "Puppy suitability", "status": "Built", "detail": "Suitability/compatibility engine and colour result system are present.", "next_step": ""}, {"section": "4. Compatibility System", "item": "Elderly dog suitability", "status": "Built", "detail": "Suitability/compatibility engine and colour result system are present.", "next_step": ""}, {"section": "4. Compatibility System", "item": "Learning algorithm", "status": "Partial", "detail": "Demo logic learns only through local static data; true learning requires backend event data.", "next_step": "Add backend analytics and model training later."}, {"section": "4. Compatibility System", "item": "Compatibility percentage", "status": "Built", "detail": "Suitability/compatibility engine and colour result system are present.", "next_step": ""}, {"section": "4. Compatibility System", "item": "Colour indicator", "status": "Built", "detail": "Suitability/compatibility engine and colour result system are present.", "next_step": ""}, {"section": "5. Park Information", "item": "Live occupancy", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "5. Park Information", "item": "Capacity", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "5. Park Information", "item": "Number of dogs", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "5. Park Information", "item": "Number of owners", "status": "Partial", "detail": "Needs explicit park data field/API feed or council dataset.", "next_step": "Add verified council park database fields."}, {"section": "5. Park Information", "item": "Parking availability", "status": "Partial", "detail": "Needs explicit park data field/API feed or council dataset.", "next_step": "Add verified council park database fields."}, {"section": "5. Park Information", "item": "Toilet availability", "status": "Partial", "detail": "Needs explicit park data field/API feed or council dataset.", "next_step": "Add verified council park database fields."}, {"section": "5. Park Information", "item": "Water station", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "5. Park Information", "item": "Shade", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "5. Park Information", "item": "Lighting", "status": "Partial", "detail": "Needs explicit park data field/API feed or council dataset.", "next_step": "Add verified council park database fields."}, {"section": "5. Park Information", "item": "Fenced or unfenced", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "5. Park Information", "item": "Small dog area", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "5. Park Information", "item": "Large dog area", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "5. Park Information", "item": "Accessibility", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "5. Park Information", "item": "Surface type", "status": "Built", "detail": "Present in park state, amenities, suitability or park details.", "next_step": ""}, {"section": "6. Live Check-in", "item": "Check in", "status": "Built", "detail": "Check In/Owner Duty modules now cover this with local demo storage.", "next_step": "Backend needed for real multi-user live data."}, {"section": "6. Live Check-in", "item": "Check out", "status": "Built", "detail": "Check In/Owner Duty modules now cover this with local demo storage.", "next_step": "Backend needed for real multi-user live data."}, {"section": "6. Live Check-in", "item": "Automatic time tracking", "status": "Built", "detail": "Check In/Owner Duty modules now cover this with local demo storage.", "next_step": "Backend needed for real multi-user live data."}, {"section": "6. Live Check-in", "item": "Current dogs visible", "status": "Built", "detail": "Check In/Owner Duty modules now cover this with local demo storage.", "next_step": "Backend needed for real multi-user live data."}, {"section": "6. Live Check-in", "item": "Current behaviour status", "status": "Built", "detail": "Check In/Owner Duty modules now cover this with local demo storage.", "next_step": "Backend needed for real multi-user live data."}, {"section": "6. Live Check-in", "item": "Estimated crowd level", "status": "Built", "detail": "Check In/Owner Duty modules now cover this with local demo storage.", "next_step": "Backend needed for real multi-user live data."}, {"section": "7. Safety", "item": "Emergency contacts", "status": "Partial", "detail": "Workflow/UI exists or is represented in safety/emergency modules; live accuracy needs API/backend/location permissions.", "next_step": "Connect to real location, vet data, and notification services."}, {"section": "7. Safety", "item": "Nearby veterinary clinics", "status": "Backend", "detail": "Needs verified external data and local legal/council process.", "next_step": "Add vetted local database/API and council workflow."}, {"section": "7. Safety", "item": "Nearby emergency veterinary hospitals", "status": "Backend", "detail": "Needs verified external data and local legal/council process.", "next_step": "Add vetted local database/API and council workflow."}, {"section": "7. Safety", "item": "First aid guide", "status": "Partial", "detail": "Workflow/UI exists or is represented in safety/emergency modules; live accuracy needs API/backend/location permissions.", "next_step": "Connect to real location, vet data, and notification services."}, {"section": "7. Safety", "item": "Lost dog alert", "status": "Partial", "detail": "Workflow/UI exists or is represented in safety/emergency modules; live accuracy needs API/backend/location permissions.", "next_step": "Connect to real location, vet data, and notification services."}, {"section": "7. Safety", "item": "Dangerous dog report process", "status": "Backend", "detail": "Needs verified external data and local legal/council process.", "next_step": "Add vetted local database/API and council workflow."}, {"section": "7. Safety", "item": "Incident reporting", "status": "Partial", "detail": "Workflow/UI exists or is represented in safety/emergency modules; live accuracy needs API/backend/location permissions.", "next_step": "Connect to real location, vet data, and notification services."}, {"section": "7. Safety", "item": "Emergency broadcast", "status": "Partial", "detail": "Workflow/UI exists or is represented in safety/emergency modules; live accuracy needs API/backend/location permissions.", "next_step": "Connect to real location, vet data, and notification services."}, {"section": "7. Safety", "item": "GPS location", "status": "Partial", "detail": "Workflow/UI exists or is represented in safety/emergency modules; live accuracy needs API/backend/location permissions.", "next_step": "Connect to real location, vet data, and notification services."}, {"section": "8. Maps", "item": "Interactive map", "status": "Partial", "detail": "Map/park concept exists, but true interactive map/directions needs Google/Mapbox/Apple Maps API.", "next_step": "Add map provider API key and production park dataset."}, {"section": "8. Maps", "item": "Nearby parks", "status": "Partial", "detail": "Map/park concept exists, but true interactive map/directions needs Google/Mapbox/Apple Maps API.", "next_step": "Add map provider API key and production park dataset."}, {"section": "8. Maps", "item": "Directions", "status": "Partial", "detail": "Map/park concept exists, but true interactive map/directions needs Google/Mapbox/Apple Maps API.", "next_step": "Add map provider API key and production park dataset."}, {"section": "8. Maps", "item": "Distance", "status": "Partial", "detail": "Map/park concept exists, but true interactive map/directions needs Google/Mapbox/Apple Maps API.", "next_step": "Add map provider API key and production park dataset."}, {"section": "8. Maps", "item": "Travel time", "status": "Partial", "detail": "Map/park concept exists, but true interactive map/directions needs Google/Mapbox/Apple Maps API.", "next_step": "Add map provider API key and production park dataset."}, {"section": "8. Maps", "item": "Favourite parks", "status": "Partial", "detail": "Map/park concept exists, but true interactive map/directions needs Google/Mapbox/Apple Maps API.", "next_step": "Add map provider API key and production park dataset."}, {"section": "9. Weather", "item": "Temperature", "status": "Built", "detail": "Included as demo/safety logic.", "next_step": "Use live weather API for production."}, {"section": "9. Weather", "item": "Rain", "status": "Backend", "detail": "Needs live weather API feed.", "next_step": "Connect BOM/weather API and location-based alerts."}, {"section": "9. Weather", "item": "UV Index", "status": "Backend", "detail": "Needs live weather API feed.", "next_step": "Connect BOM/weather API and location-based alerts."}, {"section": "9. Weather", "item": "Wind", "status": "Backend", "detail": "Needs live weather API feed.", "next_step": "Connect BOM/weather API and location-based alerts."}, {"section": "9. Weather", "item": "Heat alerts", "status": "Built", "detail": "Included as demo/safety logic.", "next_step": "Use live weather API for production."}, {"section": "9. Weather", "item": "Storm alerts", "status": "Built", "detail": "Included as demo/safety logic.", "next_step": "Use live weather API for production."}, {"section": "10. Community", "item": "Friends", "status": "Partial", "detail": "Concept/UI exists around best mate, owner messages or reports.", "next_step": "Add backend social graph, moderation and reporting workflow."}, {"section": "10. Community", "item": "Follow users", "status": "Backend", "detail": "Requires authenticated accounts and moderation backend.", "next_step": "Add backend social graph, moderation and reporting workflow."}, {"section": "10. Community", "item": "Meet-up scheduling", "status": "Partial", "detail": "Concept/UI exists around best mate, owner messages or reports.", "next_step": "Add backend social graph, moderation and reporting workflow."}, {"section": "10. Community", "item": "Messages (optional)", "status": "Partial", "detail": "Concept/UI exists around best mate, owner messages or reports.", "next_step": "Add backend social graph, moderation and reporting workflow."}, {"section": "10. Community", "item": "Block users", "status": "Backend", "detail": "Requires authenticated accounts and moderation backend.", "next_step": "Add backend social graph, moderation and reporting workflow."}, {"section": "10. Community", "item": "Report abuse", "status": "Partial", "detail": "Concept/UI exists around best mate, owner messages or reports.", "next_step": "Add backend social graph, moderation and reporting workflow."}, {"section": "11. Reviews", "item": "Park rating", "status": "Backend", "detail": "Needs persistent review records and anti-abuse controls.", "next_step": "Add backend review/report tables and council dashboard."}, {"section": "11. Reviews", "item": "Cleanliness", "status": "Partial", "detail": "Council/evidence/reporting concepts exist.", "next_step": "Add backend review/report tables and council dashboard."}, {"section": "11. Reviews", "item": "Safety", "status": "Partial", "detail": "Council/evidence/reporting concepts exist.", "next_step": "Add backend review/report tables and council dashboard."}, {"section": "11. Reviews", "item": "Lighting", "status": "Backend", "detail": "Needs persistent review records and anti-abuse controls.", "next_step": "Add backend review/report tables and council dashboard."}, {"section": "11. Reviews", "item": "Maintenance", "status": "Partial", "detail": "Council/evidence/reporting concepts exist.", "next_step": "Add backend review/report tables and council dashboard."}, {"section": "11. Reviews", "item": "Council issue reporting", "status": "Partial", "detail": "Council/evidence/reporting concepts exist.", "next_step": "Add backend review/report tables and council dashboard."}, {"section": "12. Notifications", "item": "Favourite dog arrived", "status": "Partial", "detail": "Owner messages/local alerts exist; true push notifications need a live notification service.", "next_step": "Add push notifications, backend event triggers and user permissions."}, {"section": "12. Notifications", "item": "Favourite park busy", "status": "Partial", "detail": "Owner messages/local alerts exist; true push notifications need a live notification service.", "next_step": "Add push notifications, backend event triggers and user permissions."}, {"section": "12. Notifications", "item": "Heat warning", "status": "Partial", "detail": "Owner messages/local alerts exist; true push notifications need a live notification service.", "next_step": "Add push notifications, backend event triggers and user permissions."}, {"section": "12. Notifications", "item": "Storm warning", "status": "Partial", "detail": "Owner messages/local alerts exist; true push notifications need a live notification service.", "next_step": "Add push notifications, backend event triggers and user permissions."}, {"section": "12. Notifications", "item": "Park closure", "status": "Backend", "detail": "Requires council/API feed and push system.", "next_step": "Add push notifications, backend event triggers and user permissions."}, {"section": "12. Notifications", "item": "Incident nearby", "status": "Partial", "detail": "Owner messages/local alerts exist; true push notifications need a live notification service.", "next_step": "Add push notifications, backend event triggers and user permissions."}, {"section": "13. Administration", "item": "User management", "status": "Partial", "detail": "Needs production role-based admin backend.", "next_step": "Add role-based admin users and backend database."}, {"section": "13. Administration", "item": "Dog management", "status": "Built", "detail": "Demo admin/reporting functions exist.", "next_step": "Connect to backend for multi-user launch."}, {"section": "13. Administration", "item": "Incident review", "status": "Built", "detail": "Demo admin/reporting functions exist.", "next_step": "Connect to backend for multi-user launch."}, {"section": "13. Administration", "item": "Park management", "status": "Partial", "detail": "Needs production role-based admin backend.", "next_step": "Add role-based admin users and backend database."}, {"section": "13. Administration", "item": "Reports dashboard", "status": "Built", "detail": "Demo admin/reporting functions exist.", "next_step": "Connect to backend for multi-user launch."}, {"section": "13. Administration", "item": "Analytics", "status": "Built", "detail": "Demo admin/reporting functions exist.", "next_step": "Connect to backend for multi-user launch."}, {"section": "14. Payments", "item": "Free plan", "status": "Partial", "detail": "Plans can be shown; enforcement needs backend.", "next_step": "Set up Stripe products, Checkout, customer portal and webhook server."}, {"section": "14. Payments", "item": "Premium plan", "status": "Partial", "detail": "Plans can be shown; enforcement needs backend.", "next_step": "Set up Stripe products, Checkout, customer portal and webhook server."}, {"section": "14. Payments", "item": "Stripe integration", "status": "Backend", "detail": "Plan/pricing concept exists, but live charging requires Stripe checkout/customer portal/webhooks.", "next_step": "Set up Stripe products, Checkout, customer portal and webhook server."}, {"section": "14. Payments", "item": "Subscription management", "status": "Backend", "detail": "Plan/pricing concept exists, but live charging requires Stripe checkout/customer portal/webhooks.", "next_step": "Set up Stripe products, Checkout, customer portal and webhook server."}, {"section": "14. Payments", "item": "Invoices", "status": "Backend", "detail": "Plan/pricing concept exists, but live charging requires Stripe checkout/customer portal/webhooks.", "next_step": "Set up Stripe products, Checkout, customer portal and webhook server."}, {"section": "15. Legal & Privacy", "item": "Privacy Policy", "status": "Built", "detail": "Included in app/legal pages or safety wording.", "next_step": "Have Australian privacy/consumer/legal review before commercial launch."}, {"section": "15. Legal & Privacy", "item": "Terms of Use", "status": "Built", "detail": "Included in app/legal pages or safety wording.", "next_step": "Have Australian privacy/consumer/legal review before commercial launch."}, {"section": "15. Legal & Privacy", "item": "Community Guidelines", "status": "Review", "detail": "Needs production consent checkbox and legal review.", "next_step": "Have Australian privacy/consumer/legal review before commercial launch."}, {"section": "15. Legal & Privacy", "item": "Disclaimer that compatibility scores are decision-support tools, not guarantees", "status": "Built", "detail": "Included in app/legal pages or safety wording.", "next_step": "Have Australian privacy/consumer/legal review before commercial launch."}, {"section": "15. Legal & Privacy", "item": "User consent for location services", "status": "Review", "detail": "Needs production consent checkbox and legal review.", "next_step": "Have Australian privacy/consumer/legal review before commercial launch."}, {"section": "15. Legal & Privacy", "item": "User consent for storing dog information", "status": "Review", "detail": "Needs production consent checkbox and legal review.", "next_step": "Have Australian privacy/consumer/legal review before commercial launch."}, {"section": "16. Security", "item": "Encrypted passwords", "status": "Backend", "detail": "Requires production backend/security infrastructure.", "next_step": "Add secure auth/database/backups/account recovery."}, {"section": "16. Security", "item": "Secure database", "status": "Backend", "detail": "Requires production backend/security infrastructure.", "next_step": "Add secure auth/database/backups/account recovery."}, {"section": "16. Security", "item": "Backup system", "status": "Backend", "detail": "Requires production backend/security infrastructure.", "next_step": "Add secure auth/database/backups/account recovery."}, {"section": "16. Security", "item": "Audit logs", "status": "Built", "detail": "Local audit logs exist in static app.", "next_step": "Move audit logs to secure backend for launch."}, {"section": "16. Security", "item": "Account recovery", "status": "Backend", "detail": "Requires production backend/security infrastructure.", "next_step": "Add secure auth/database/backups/account recovery."}, {"section": "17. Accessibility", "item": "High-contrast mode", "status": "Built", "detail": "Calm/comfort design and labels support this.", "next_step": "Run WCAG/mobile accessibility test before launch."}, {"section": "17. Accessibility", "item": "Large text support", "status": "Partial", "detail": "Needs formal accessibility testing and refinements.", "next_step": "Run WCAG/mobile accessibility test before launch."}, {"section": "17. Accessibility", "item": "Screen reader support", "status": "Partial", "detail": "Needs formal accessibility testing and refinements.", "next_step": "Run WCAG/mobile accessibility test before launch."}, {"section": "17. Accessibility", "item": "Colour not used as the only indicator (icons or labels alongside colours)", "status": "Built", "detail": "Calm/comfort design and labels support this.", "next_step": "Run WCAG/mobile accessibility test before launch."}, {"section": "18. Testing", "item": "Test registration", "status": "To Do", "detail": "Requires the production feature/API/device environment.", "next_step": "Complete after backend/API integrations."}, {"section": "18. Testing", "item": "Test payments", "status": "To Do", "detail": "Requires the production feature/API/device environment.", "next_step": "Complete after backend/API integrations."}, {"section": "18. Testing", "item": "Test notifications", "status": "To Do", "detail": "Requires the production feature/API/device environment.", "next_step": "Complete after backend/API integrations."}, {"section": "18. Testing", "item": "Test maps", "status": "To Do", "detail": "Requires the production feature/API/device environment.", "next_step": "Complete after backend/API integrations."}, {"section": "18. Testing", "item": "Test compatibility calculations", "status": "Partial", "detail": "Can be tested in this static build, but still needs broader device/user testing.", "next_step": "Run documented test plan."}, {"section": "18. Testing", "item": "Test emergency functions", "status": "Partial", "detail": "Can be tested in this static build, but still needs broader device/user testing.", "next_step": "Run documented test plan."}, {"section": "18. Testing", "item": "Test on iPhone", "status": "Partial", "detail": "Can be tested in this static build, but still needs broader device/user testing.", "next_step": "Run documented test plan."}, {"section": "18. Testing", "item": "Test on Android", "status": "To Do", "detail": "Requires the production feature/API/device environment.", "next_step": "Complete after backend/API integrations."}, {"section": "18. Testing", "item": "Beta testing with users", "status": "To Do", "detail": "Requires the production feature/API/device environment.", "next_step": "Complete after backend/API integrations."}, {"section": "Future Enhancements", "item": "Smart wearable integration", "status": "Later", "detail": "Not required for MVP launch.", "next_step": "Add after stable V1 and real user feedback."}, {"section": "Future Enhancements", "item": "AI-assisted park insights based on user-reported information", "status": "Later", "detail": "Not required for MVP launch.", "next_step": "Add after stable V1 and real user feedback."}, {"section": "Future Enhancements", "item": "Council dashboards for park occupancy trends", "status": "Later", "detail": "Not required for MVP launch.", "next_step": "Add after stable V1 and real user feedback."}, {"section": "Future Enhancements", "item": "Veterinary record integrations", "status": "Later", "detail": "Not required for MVP launch.", "next_step": "Add after stable V1 and real user feedback."}, {"section": "Future Enhancements", "item": "Animal welfare organisation partnerships", "status": "Later", "detail": "Not required for MVP launch.", "next_step": "Add after stable V1 and real user feedback."}, {"section": "MVP", "item": "User and dog profiles", "status": "Built/Partial", "detail": "Static app contains the workflow; production requires backend for real users/live data.", "next_step": "Connect backend and test live."}, {"section": "MVP", "item": "Live park check-in/check-out", "status": "Built/Partial", "detail": "Static app contains the workflow; production requires backend for real users/live data.", "next_step": "Connect backend and test live."}, {"section": "MVP", "item": "Live occupancy", "status": "Built/Partial", "detail": "Static app contains the workflow; production requires backend for real users/live data.", "next_step": "Connect backend and test live."}, {"section": "MVP", "item": "Behaviour status traffic-light system", "status": "Built/Partial", "detail": "Static app contains the workflow; production requires backend for real users/live data.", "next_step": "Connect backend and test live."}, {"section": "MVP", "item": "Compatibility indicator", "status": "Built/Partial", "detail": "Static app contains the workflow; production requires backend for real users/live data.", "next_step": "Connect backend and test live."}, {"section": "MVP", "item": "Interactive park map", "status": "Backend", "detail": "Needs external provider/backend integration.", "next_step": "Add maps/push/Stripe."}, {"section": "MVP", "item": "Incident reporting", "status": "Built/Partial", "detail": "Static app contains the workflow; production requires backend for real users/live data.", "next_step": "Connect backend and test live."}, {"section": "MVP", "item": "Push notifications", "status": "Backend", "detail": "Needs external provider/backend integration.", "next_step": "Add maps/push/Stripe."}, {"section": "MVP", "item": "Premium subscriptions", "status": "Backend", "detail": "Needs external provider/backend integration.", "next_step": "Add maps/push/Stripe."}, {"section": "MVP", "item": "Admin dashboard", "status": "Built/Partial", "detail": "Static app contains the workflow; production requires backend for real users/live data.", "next_step": "Connect backend and test live."}, {"section": "MVP", "item": "Privacy, terms, and safety disclaimers", "status": "Built/Partial", "detail": "Static app contains the workflow; production requires backend for real users/live data.", "next_step": "Connect backend and test live."}];

  function launchStatusClass(status) {
    if (status === "Built") return "green";
    if (status === "Backend" || status === "To Do") return "red";
    return "amber";
  }

  function renderLaunchChecklist(mode = "all") {
    const node = document.getElementById("launchChecklistList");
    if (!node) return;
    let current = "";
    const filtered = launchChecklistItems.filter(item => {
      if (mode === "left") return item.status !== "Built";
      return true;
    });
    node.innerHTML = filtered.map(item => {
      const heading = item.section !== current ? `<h3 class="launchSectionHeading">${safe(item.section)}</h3>` : "";
      current = item.section;
      const cls = launchStatusClass(item.status);
      return `${heading}<article class="launchItem ${cls}">
        <small>${safe(item.status)}</small>
        <h3>${safe(item.item)}</h3>
        <p>${safe(item.detail)}</p>
        ${item.next_step ? `<p><b>Next:</b> ${safe(item.next_step)}</p>` : ""}
      </article>`;
    }).join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderLaunchChecklist("all");

    document.getElementById("showOnlyLeft")?.addEventListener("click", () => renderLaunchChecklist("left"));
    document.getElementById("showAllLaunchItems")?.addEventListener("click", () => renderLaunchChecklist("all"));

    document.getElementById("exportLaunchChecklistJson")?.addEventListener("click", function () {
      const blob = new Blob([JSON.stringify({ items: launchChecklistItems, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "genevieve-dog-park-launch-checklist-filled.json";
      a.click();
      URL.revokeObjectURL(a.href);
    });

    try {
      save("genevieve_launch_checklist_summary", {
        total: launchChecklistItems.length,
        built: launchChecklistItems.filter(x => x.status === "Built").length,
        left: launchChecklistItems.filter(x => x.status !== "Built").length,
        time: new Date().toISOString()
      });
    } catch (_) {}
  });
})();


/* GENEVIEVE_DOGPARK_UPLOADED_FILES_MERGE_MODULE */
(function(){
  const summary = {
    uploadedName: "genevieve-dog-park-app-clean-needed-files(1).zip",
    basePackage: "GENEVIEVE_DOGPARK_LAUNCH_CHECKLIST_FILLED_FINAL.zip",
    copiedFileCount: 6,
    copiedDocCount: 1,
    copiedInto: "uploaded-needed-files-reference/",
    mergedAt: new Date().toISOString()
  };
  document.addEventListener("DOMContentLoaded", function(){
    try { save("genevieve_uploaded_files_merge_summary", summary); }
    catch (_) { localStorage.setItem("genevieve_uploaded_files_merge_summary", JSON.stringify(summary)); }
  });
})();

/* GENEVIEVE_DOGPARK_THREE_GREEN_LAYER_THEME_MODULE */
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    try {
      save("genevieve_three_green_layer_theme", {
        border: "Timber Green",
        backgroundFade: "Elf Green",
        finalFade: "Field Green",
        appliedAt: new Date().toISOString()
      });
    } catch (_) {
      localStorage.setItem("genevieve_three_green_layer_theme", JSON.stringify({
        border: "Timber Green",
        backgroundFade: "Elf Green",
        finalFade: "Field Green",
        appliedAt: new Date().toISOString()
      }));
    }
  });
})();

/* GENEVIEVE_DOGPARK_FIELD_GREEN_FADE_FIXED_MODULE */
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    const theme = {
      border: "Timber Green",
      outerBackground: "Elf Green fading out",
      panelBackground: "Field Green fading out",
      filledPanel: "What changed right now",
      appliedAt: new Date().toISOString()
    };
    try { save("genevieve_field_green_fade_theme", theme); }
    catch (_) { localStorage.setItem("genevieve_field_green_fade_theme", JSON.stringify(theme)); }
  });
})();

/* GENEVIEVE_FINAL_DEPLOY_TODAY_BUILD_RECORD */
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    const record = {
      build: "GENEVIEVE_DOGPARK_FINAL_DEPLOY_TODAY",
      colours: {
        border: "Timber Green",
        outerFade: "Elf Green",
        panels: "Dark visible Field Green",
        alerts: "official traffic-light colours preserved"
      },
      mobile: "anti-flip / no horizontal break patch applied",
      createdAt: new Date().toISOString()
    };
    try { save("genevieve_final_deploy_today_build", record); }
    catch (_) { localStorage.setItem("genevieve_final_deploy_today_build", JSON.stringify(record)); }
  });
})();


/* GENEVIEVE_SOFT_FADE_FINAL_BUILD_RECORD */
(function(){
  document.addEventListener("DOMContentLoaded", function(){
    const record = {
      build: "GENEVIEVE_DOGPARK_SOFT_FADE_FINAL",
      colours: {
        border: "Timber Green",
        pageBackground: "Elf Green fading softly",
        panels: "Field Green fading softly to light green",
        alerts: "official colours preserved"
      },
      mobile: "anti-flip / no horizontal overflow retained",
      createdAt: new Date().toISOString()
    };
    try { save("genevieve_soft_fade_final_build", record); }
    catch (_) { localStorage.setItem("genevieve_soft_fade_final_build", JSON.stringify(record)); }
  });
})();
