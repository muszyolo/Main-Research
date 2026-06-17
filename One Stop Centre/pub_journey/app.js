// ========================
// DATA
// ========================
const PHASES_MSC = [
  {
    id: 1,
    emoji: "🔬",
    title: "Research Readiness",
    number: "Phase 1",
    duration: "1–2 Months",
    color: "#8b5cf6",
    goal: "Make sure your research is solid enough to publish. Lock down your findings, data, and research gap before writing a single word.",
    tasks: [
      "Clarify your research gap — What problem are you solving that others haven't?",
      "Define your 3 most important findings or results",
      "Gather and organize all your data (tables, graphs, figures)",
      "Conduct a literature review — review 30–50 recent papers (last 5 years)",
      "Run an early Turnitin check — aim for < 20–30% similarity",
      "Discuss with co-authors — agree on author order (You = first/corresponding author!)",
      "Write a clear 'Contribution Statement' — what is NEW about your work?",
      "Visit UiTM Library (PTAR) for literature search assistance"
    ]
  },
  {
    id: 2,
    emoji: "🎯",
    title: "Choose Your Journal",
    number: "Phase 2",
    duration: "1–2 Weeks",
    color: "#3b82f6",
    goal: "Find the right indexed journal or conference that fits your research. This decision affects how long it takes to publish.",
    tasks: [
      "Decide: Indexed Journal OR Conference Proceeding?",
      "Find 5–10 potential journals using Scopus Sources Search",
      "Check Web of Science Master Journal List for WoS-indexed options",
      "Check MyCite for Malaysian-focused indexed journals",
      "Verify journal quartile (Q1–Q4) on Scimago Journal Ranking",
      "Check typical review turnaround time on Scimago",
      "Check if there are Article Processing Charges (APC fees)",
      "Read 2–3 published papers from your target journal to understand their style",
      "Download the Author Guidelines from the journal's official website",
      "Verify legitimacy on Beall's List to avoid predatory journals",
      "Confirm your chosen journal counts for UiTM graduation (ask RMC)"
    ]
  },
  {
    id: 3,
    emoji: "✍️",
    title: "Write the Paper",
    number: "Phase 3",
    duration: "4–8 Weeks",
    color: "#06b6d4",
    goal: "Produce a well-structured, clear, and complete manuscript following the journal's exact template and IMRaD format.",
    tasks: [
      "Download and use the exact journal manuscript template",
      "Write the Introduction: context → gap → objective → significance",
      "Write the Literature Review: position your work among existing studies",
      "Write the Methodology: detailed enough to be reproducible",
      "Write the Results: findings with numbered tables, charts, and figures",
      "Write the Discussion: meaning, comparison with past studies, limitations",
      "Write the Conclusion: summary + future research directions",
      "Write the Abstract LAST — after the full paper is done",
      "Choose 4–6 precise keywords for discoverability",
      "Ensure all figures are high-resolution (min 300 DPI)",
      "Apply consistent citation style (APA / IEEE / Vancouver per journal)",
      "Run Grammarly or equivalent for language errors",
      "Final Turnitin check — similarity must be < 20%",
      "Have co-authors review and approve the final draft",
      "Write the Cover Letter to the Editor",
      "Prepare supplementary files if required by the journal"
    ]
  },
  {
    id: 4,
    emoji: "🚀",
    title: "Submit the Paper",
    number: "Phase 4",
    duration: "1 Week",
    color: "#f59e0b",
    goal: "Submit professionally through the journal's official portal and track your submission status.",
    tasks: [
      "Create an account on the journal's submission portal (OJS, Editorial Manager, etc.)",
      "Upload the manuscript file in the required format (Word or PDF)",
      "Upload supplementary files separately if required",
      "Attach the finalized cover letter to the Editor",
      "Declare no conflict of interest (or disclose funding/COI)",
      "Suggest 3–5 potential peer reviewers if the journal requests it",
      "Note your submission date for tracking",
      "Email all co-authors confirming submission was made",
      "Set a reminder to follow up if no response in 4–6 weeks"
    ]
  },
  {
    id: 5,
    emoji: "🔁",
    title: "Handle Peer Review",
    number: "Phase 5",
    duration: "1–6 Months",
    color: "#10b981",
    goal: "Navigate the review process professionally. Treat reviewer comments as free expert advice — revise and resubmit confidently.",
    tasks: [
      "Wait for the editor's decision (typically 4–12 weeks)",
      "Read all reviewer comments carefully — give yourself 24 hours before responding",
      "Create a 'Response to Reviewers' document (point-by-point)",
      "Address EVERY reviewer comment — never ignore any",
      "Use Track Changes in your revised manuscript",
      "Include page/line numbers when referencing changes in your response",
      "Consult co-authors on how to handle challenging comments",
      "Submit revision before the deadline (usually 4–8 weeks for minor revision)",
      "If rejected, revise the paper based on feedback and submit to the next journal"
    ]
  },
  {
    id: 6,
    emoji: "🏆",
    title: "Publish & Register",
    number: "Phase 6",
    duration: "1–3 Months",
    color: "#ec4899",
    goal: "Complete the publication process and register your paper in UiTM's PRIMe system to fulfill graduation and research requirements.",
    tasks: [
      "Review the proof/galley from the journal for errors",
      "Sign and return the Copyright Transfer Agreement",
      "Pay Article Processing Charges (APC) if applicable",
      "Note your paper's DOI (Digital Object Identifier) and URL",
      "Share on ResearchGate, LinkedIn, and Google Scholar",
      "Register the publication in UiTM PRIMe Portal (prime.uitm.edu.my)",
      "Upload evidence in PRISMa system for PTAR verification",
      "Wait for PTAR verification (up to 14 working days)",
      "For graduation: attach publication proof to IPSis thesis submission",
      "Contact Faculty Postgrad Office for graduation clearance procedure"
    ]
  }
];

const PHASES_PHD = [
  {
    id: 1,
    emoji: "🔬",
    title: "PhD Proposal & Defense",
    number: "Phase 1",
    duration: "6–12 Months",
    color: "#8b5cf6",
    goal: "Defend your proposal (DRP) and solidify the exact novel contribution (PhD requires true novelty).",
    tasks: [
      "Extensive Literature Review (100+ papers) to prove true novelty",
      "Draft full PhD proposal (Ch 1-3)",
      "Present and pass Defense of Research Proposal (DRP)",
      "Clarify the specific gap and theoretical contribution",
      "Get ethics approval if human/animal subjects are involved",
      "Start collecting massive datasets or conducting long-term experiments"
    ]
  },
  {
    id: 2,
    emoji: "🎯",
    title: "Target High-Impact Journals",
    number: "Phase 2",
    duration: "1–3 Months",
    color: "#3b82f6",
    goal: "PhD graduation typically requires 2 indexed publications. Target Web of Science (WoS) Q1 or Q2 for maximum impact.",
    tasks: [
      "Identify top-tier Web of Science (WoS) / Scopus Q1/Q2 journals",
      "Check UiTM requirement (usually 2 indexed journals for PhD graduation)",
      "Verify journal indexing on JCR (Journal Citation Reports)",
      "Check typical review turnaround time (some take 6-12 months)",
      "Avoid predatory journals (check Beall's List)",
      "Ensure journal scope perfectly aligns with your novel contribution"
    ]
  },
  {
    id: 3,
    emoji: "✍️",
    title: "Write Paper 1 & 2",
    number: "Phase 3",
    duration: "3–6 Months",
    color: "#06b6d4",
    goal: "Write rigorous manuscripts. Paper 1 could be a systematic review or early findings. Paper 2 is core findings.",
    tasks: [
      "Write Paper 1 (Systematic Literature Review or Preliminary Results)",
      "Write Paper 2 (Core Novel Findings)",
      "Ensure robust methodology and statistical/analytical proof",
      "Format strictly to journal guidelines",
      "Run Turnitin check (must be < 20%)",
      "Review with main supervisor and co-supervisors",
      "Professional proofreading/language editing"
    ]
  },
  {
    id: 4,
    emoji: "🚀",
    title: "Submit & Track",
    number: "Phase 4",
    duration: "1–2 Weeks",
    color: "#f59e0b",
    goal: "Submit to multiple high-impact journals (sequentially, not simultaneously).",
    tasks: [
      "Submit Paper 1 to target journal via portal",
      "Submit Paper 2 to target journal via portal",
      "Draft strong cover letters highlighting the novel contribution",
      "Suggest 3-5 international expert reviewers",
      "Track submission status weekly"
    ]
  },
  {
    id: 5,
    emoji: "🔁",
    title: "Rigorous Peer Review",
    number: "Phase 5",
    duration: "6–12 Months",
    color: "#10b981",
    goal: "Handle 'Major Revisions' from highly critical reviewers. Do not give up.",
    tasks: [
      "Receive decision for Paper 1 (Revise, Accept, Reject)",
      "Receive decision for Paper 2",
      "If 'Major Revision': conduct additional experiments if asked",
      "Write detailed point-by-point response to reviewers",
      "Resubmit revised manuscripts before the deadline",
      "If rejected, immediately reformat and submit to backup journal"
    ]
  },
  {
    id: 6,
    emoji: "🎓",
    title: "Acceptance & Viva Prep",
    number: "Phase 6",
    duration: "1–2 Months",
    color: "#ec4899",
    goal: "Papers accepted! Now register them and prepare for your PhD Viva Voce.",
    tasks: [
      "Papers accepted! Sign copyright transfer forms",
      "Pay Article Processing Charges (APC) if Open Access",
      "Register both publications in UiTM PRIMe system",
      "Check that your publications meet the exact PhD graduation criteria",
      "Update your CV and Google Scholar profile",
      "Include the published papers in your final PhD Thesis",
      "Prepare for Viva Voce defense!"
    ]
  }
];

const CONTACTS = [
  { phase: "Phase 1", phaseColor: "#8b5cf6", emoji: "👩‍🏫", name: "Co-authors / Colleagues", org: "Your Research Team", purpose: "Validate your findings, agree on author order, refine the research narrative.", when: "Week 1–2 of Phase 1" },
  { phase: "Phase 1", phaseColor: "#8b5cf6", emoji: "📚", name: "UiTM Librarian (PTAR)", org: "Perpustakaan Tun Abdul Razak", purpose: "Get help with literature search, citation tools (Mendeley/Zotero), and finding past papers.", when: "Week 2 of Phase 1" },
  { phase: "Phase 1–2", phaseColor: "#3b82f6", emoji: "🏢", name: "Faculty Research Coordinator", org: "Research Management Centre (RMC)", purpose: "Confirm graduation publication requirements and validate which journals qualify for your faculty.", when: "Start of Phase 1–2" },
  { phase: "Phase 2", phaseColor: "#3b82f6", emoji: "📰", name: "Journal Editor (Pre-submission)", org: "Target Journal Editorial Office", purpose: "Send a brief pre-submission inquiry to confirm your paper fits the journal's scope — saves time!", when: "During Phase 2 (optional)" },
  { phase: "Phase 3", phaseColor: "#06b6d4", emoji: "✏️", name: "English Proofreader", org: "Colleague / Writing Service", purpose: "Native or proficient English speaker to check grammar, flow, and academic tone of your manuscript.", when: "After first full draft" },
  { phase: "Phase 3", phaseColor: "#06b6d4", emoji: "🎓", name: "UiTM Writing Centre", org: "Your Campus / Faculty", purpose: "Academic writing support for structure, argumentation, and language improvement.", when: "During writing phase" },
  { phase: "Phase 5", phaseColor: "#10b981", emoji: "🔬", name: "Statistician / Lab Expert", org: "Your Department", purpose: "If reviewers question your statistical methods or experimental setup, get expert verification.", when: "During major revision" },
  { phase: "Phase 5", phaseColor: "#10b981", emoji: "🧑‍💼", name: "Senior Researcher / Mentor", org: "UiTM or External", purpose: "Get advice on handling difficult reviewer feedback, especially if you disagree with comments.", when: "If confused or discouraged" },
  { phase: "Phase 6", phaseColor: "#ec4899", emoji: "📖", name: "UiTM PTAR (Library)", org: "Perpustakaan Tun Abdul Razak", purpose: "Assist with PRIMe and PRISMa registration. They verify indexing status and validate your publication.", when: "After paper acceptance" },
  { phase: "Phase 6", phaseColor: "#ec4899", emoji: "🎓", name: "Faculty Postgrad Office / IPSis", org: "UiTM Institute of Graduate Studies", purpose: "Submit publication proof for graduation clearance. They process your thesis and confirm completion.", when: "Before thesis submission" }
];

const RESOURCES = [
  { icon: "🔍", name: "Scopus Sources", desc: "Search for Scopus-indexed journals, proceedings, and books. Verify indexing status here.", url: "https://www.scopus.com/sources", label: "scopus.com/sources", color: "#f59e0b" },
  { icon: "🌐", name: "WoS Master Journal List", desc: "Official list of Web of Science indexed journals. Always verify here before submitting.", url: "https://mjl.clarivate.com/home", label: "mjl.clarivate.com", color: "#3b82f6" },
  { icon: "📊", name: "Scimago Journal Ranking", desc: "Check journal quartile (Q1–Q4), impact factor, h-index, and review time estimates.", url: "https://www.scimagojr.com/", label: "scimagojr.com", color: "#8b5cf6" },
  { icon: "🇲🇾", name: "MyCite — Malaysian Index", desc: "Malaysian Citation Index. Find locally-indexed journals that count for UiTM graduation.", url: "http://www.mycite.my/", label: "mycite.my", color: "#10b981" },
  { icon: "🏛️", name: "UiTM PRIMe Portal", desc: "UiTM's official publication registration system. Register all your publications here.", url: "https://prime.uitm.edu.my/", label: "prime.uitm.edu.my", color: "#ec4899" },
  { icon: "📚", name: "UiTM Library (PTAR)", desc: "Get research support, access databases, and get help with PRIMe verification.", url: "https://ptar.uitm.edu.my/", label: "ptar.uitm.edu.my", color: "#06b6d4" },
  { icon: "🔬", name: "UiTM Research Management", desc: "RMC portal for grants, publications, and research output management.", url: "https://rmi.uitm.edu.my/", label: "rmi.uitm.edu.my", color: "#f59e0b" },
  { icon: "⚠️", name: "Beall's List (Predatory Check)", desc: "Check if a journal or publisher is potentially predatory before submitting.", url: "https://beallslist.net/", label: "beallslist.net", color: "#ef4444" },
  { icon: "📝", name: "Grammarly", desc: "AI-powered grammar and academic writing checker. Essential for proofreading.", url: "https://www.grammarly.com/", label: "grammarly.com", color: "#3b82f6" }
];

const JOURNAL_TIMELINE = [
  { month: "Month 1", title: "Research Readiness", desc: "Complete literature review, organize data, confirm research gap", color: "#8b5cf6" },
  { month: "Month 2", title: "Choose Target Journal", desc: "Select and verify your Scopus/WoS indexed journal, download author guidelines", color: "#3b82f6" },
  { month: "Month 3", title: "First Draft Complete", desc: "Full manuscript written following IMRaD + journal template", color: "#06b6d4" },
  { month: "Month 4", title: "Revisions & Approval", desc: "Turnitin check passed (<20%), co-author approval, cover letter ready", color: "#14b8a6" },
  { month: "Month 5", title: "🚀 Paper Submitted!", desc: "Manuscript officially submitted to the journal via OJS/Editorial Manager", color: "#f59e0b" },
  { month: "Month 5–8", title: "Awaiting Peer Review", desc: "Under review — usually takes 6–12 weeks (be patient!)", color: "#8b5cf6" },
  { month: "Month 8–10", title: "Revision Submitted", desc: "Revisions addressed and resubmitted (if minor/major revision required)", color: "#10b981" },
  { month: "Month 10–14", title: "🎉 Final Acceptance!", desc: "Editor sends acceptance letter — the hardest part is over!", color: "#ec4899" },
  { month: "Month 14–18", title: "📖 Published Online", desc: "Paper goes live. Register in UiTM PRIMe. Share with your network!", color: "#10b981" }
];

const CONF_TIMELINE = [
  { month: "Month 1", title: "Research Readiness", desc: "Organize results, confirm research gap, find indexed conferences in your field", color: "#8b5cf6" },
  { month: "Month 2", title: "Choose Conference & Submit Abstract", desc: "Find Scopus/WoS indexed conference, submit abstract/extended abstract", color: "#3b82f6" },
  { month: "Month 2–3", title: "Abstract Accepted", desc: "Receive abstract acceptance — now write the full paper (typically 6–10 pages)", color: "#06b6d4" },
  { month: "Month 3–4", title: "Full Paper Submitted", desc: "Complete manuscript submitted via conference system + pay registration fee", color: "#f59e0b" },
  { month: "Month 4–5", title: "Peer Review & Revisions", desc: "Conference review feedback received and addressed", color: "#14b8a6" },
  { month: "Month 5–6", title: "🎤 Present at Conference!", desc: "Attend and present your research — network with other researchers!", color: "#ec4899" },
  { month: "Month 6–9", title: "🎉 Paper Published in Proceedings", desc: "Paper indexed in Scopus/WoS proceedings — register in UiTM PRIMe!", color: "#10b981" }
];

const TIPS = [
  "🎯 Start with a conference proceeding for a quick win (6–9 months), then expand into a journal paper. Both count for MSc graduation!",
  "🔍 ALWAYS verify a journal's indexing status directly on scopus.com or mjl.clarivate.com — never trust the journal's own claims.",
  "✍️ Write your Abstract LAST — after you've written the full paper. It's a summary, not an introduction.",
  "⚠️ Your paper must be indexed in Scopus, WoS, MyCite, or ERA to count for your UiTM MSc graduation requirement.",
  "🤝 You MUST be the Main Author or Corresponding Author for the publication to count toward your graduation.",
  "🔄 Rejection is normal! Most published papers were rejected at least once before acceptance. Revise and resubmit.",
  "📊 Check Scimago (scimagojr.com) to see a journal's quartile ranking, typical review time, and acceptance rate.",
  "💰 Check for Article Processing Charges (APC) before submitting. Open Access journals can cost RM1,000–RM5,000+.",
  "📝 Register your paper in UiTM PRIMe portal as soon as it's accepted — PTAR needs 14 working days to verify.",
  "🤖 Use Grammarly + Turnitin on every draft. Keep similarity below 20% and fix grammar before peer reviewers see it.",
  "📚 Read 2–3 recent papers from your target journal before writing — understand their style, scope, and typical length.",
  "💡 Your MSc thesis chapter IS your paper — convert your best chapter into a journal manuscript!"
];

// ========================
// STATE
// ========================
let currentMode = localStorage.getItem('pubjourney_mode') || 'msc';
let PHASES = currentMode === 'msc' ? PHASES_MSC : PHASES_PHD;

function getStorageKey() {
  return currentMode === 'msc' ? 'pubjourney_checklist' : 'pubjourney_checklist_phd';
}

let checklistState = JSON.parse(localStorage.getItem(getStorageKey()) || '{}');
let currentTip = 0;
let currentTimeline = 'journal';

const KANBAN_COLS = [
  { id: 'drafting', title: 'Idea / Drafting' },
  { id: 'coauthors', title: 'Under Review (Co-authors)' },
  { id: 'submitted', title: 'Submitted / Peer Review' },
  { id: 'revisions', title: 'Revisions Required' },
  { id: 'accepted', title: 'Accepted / Published' }
];

let kanbanState = JSON.parse(localStorage.getItem('pubjourney_kanban') || '[]');
let meetingLogState = JSON.parse(localStorage.getItem('pubjourney_meetings') || '[]');

// ========================
// INIT
// ========================
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('journey-select').value = currentMode;
  document.getElementById('journey-select').addEventListener('change', (e) => {
    switchJourneyMode(e.target.value);
  });

  buildAll();
  setupNav();
  setupTips();
  setupClock();
  updateAllProgress();
  setupMobile();
  setupModal();
  setup3DEffects();

  // Cursor Flashlight Track
  document.addEventListener('mousemove', (e) => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
});

function switchJourneyMode(mode) {
  currentMode = mode;
  localStorage.setItem('pubjourney_mode', mode);
  PHASES = currentMode === 'msc' ? PHASES_MSC : PHASES_PHD;
  checklistState = JSON.parse(localStorage.getItem(getStorageKey()) || '{}');
  buildAll();
  updateAllProgress();
}

function buildAll() {
  buildDashboardCards();
  buildPhasesList();
  buildChecklist();
  buildContacts();
  buildResources();
  buildTimeline();
  buildKanban();
  renderMeetings();
}

// ========================
// NAVIGATION
// ========================
function setupNav() {
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.dataset.page;
      switchPage(page);
      closeSidebar();
    });
  });

  // Phase dots navigate to phases
  document.querySelectorAll('.phase-dot').forEach(dot => {
    dot.addEventListener('click', () => {
      switchPage('phases');
      closeSidebar();
    });
  });
}

function switchPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  document.getElementById(`nav-${page}`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================
// MOBILE SIDEBAR
// ========================
function setupMobile() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('overlay');

  hamburger.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
    overlay.classList.toggle('visible');
  });

  overlay.addEventListener('click', closeSidebar);
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
}

// ========================
// TIPS TICKER
// ========================
function setupTips() {
  const content = document.getElementById('news-ticker-content');
  if (content) {
    const allTips = TIPS.map(t => `<span class="ticker-item"><span>⚡</span>${t}</span>`).join('');
    content.innerHTML = allTips + allTips; // Duplicate to create continuous seamless loop
  }
}

// ========================
// CLOCK WIDGET
// ========================
function setupClock() {
  const clockEl = document.getElementById('ticker-clock');
  if (!clockEl) return;
  
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}:${seconds}`;
  }
  
  updateClock();
  setInterval(updateClock, 1000);
}

// ========================
// CHECKLIST STATE
// ========================
function getTaskKey(phaseId, taskIdx) {
  return `p${phaseId}_t${taskIdx}`;
}

function isTaskDone(phaseId, taskIdx) {
  return checklistState[getTaskKey(phaseId, taskIdx)] === true;
}

function toggleTask(phaseId, taskIdx) {
  const key = getTaskKey(phaseId, taskIdx);
  const wasDone = checklistState[key] === true;
  checklistState[key] = !wasDone;
  localStorage.setItem(getStorageKey(), JSON.stringify(checklistState));
  
  if (!wasDone && typeof confetti === 'function') {
    const e = window.event;
    const phaseColor = PHASES.find(p => p.id === phaseId)?.color || '#38bdf8';
    if (e && e.clientX) {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: [phaseColor, '#ffffff', '#fcd34d'],
        disableForReducedMotion: true
      });
    } else {
      confetti({ particleCount: 30, spread: 50, colors: [phaseColor, '#ffffff'] });
    }
  }

  updateAllProgress();
  refreshTaskUI(phaseId, taskIdx);
  checkCelebration(phaseId);
}

function refreshTaskUI(phaseId, taskIdx) {
  // Update all task items across pages
  document.querySelectorAll(`[data-phase="${phaseId}"][data-task="${taskIdx}"]`).forEach(el => {
    if (isTaskDone(phaseId, taskIdx)) {
      el.classList.add('done');
      el.querySelector('.task-cb').textContent = '✓';
    } else {
      el.classList.remove('done');
      el.querySelector('.task-cb').textContent = '';
    }
  });
  refreshChecklistFilter();
}

function refreshChecklistFilter() {
  const active = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  applyFilter(active);
}

// ========================
// PROGRESS CALCULATION
// ========================
function getPhaseProgress(phaseId) {
  const phase = PHASES.find(p => p.id === phaseId);
  if (!phase) return { done: 0, total: 0, pct: 0 };
  const total = phase.tasks.length;
  let done = 0;
  for (let i = 0; i < total; i++) {
    if (isTaskDone(phaseId, i)) done++;
  }
  return { done, total, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
}

function getOverallProgress() {
  let totalDone = 0, totalAll = 0;
  PHASES.forEach(p => {
    const prog = getPhaseProgress(p.id);
    totalDone += prog.done;
    totalAll += prog.total;
  });
  return totalAll > 0 ? Math.round((totalDone / totalAll) * 100) : 0;
}

function updateAllProgress() {
  const overall = getOverallProgress();

  // Sidebar + mobile badge
  document.getElementById('sidebar-progress-fill').style.width = overall + '%';
  document.getElementById('sidebar-progress-text').textContent = overall + '%';
  document.getElementById('mobile-progress-badge').textContent = overall + '%';

  // Main progress bar
  document.getElementById('main-progress-fill').style.width = overall + '%';
  document.getElementById('main-progress-text').textContent = overall + '% Complete';

  // Stats
  let tasksDone = 0, phasesStarted = 0, phasesDone = 0;
  PHASES.forEach(p => {
    const prog = getPhaseProgress(p.id);
    tasksDone += prog.done;
    if (prog.done > 0) phasesStarted++;
    if (prog.pct === 100) phasesDone++;
  });

  document.getElementById('stat-tasks-done').textContent = tasksDone;
  document.getElementById('stat-phases-active').textContent = phasesStarted;
  document.getElementById('stat-phases-done').textContent = phasesDone;
  const liquidWave = document.getElementById('liquid-wave');
  const liquidText = document.getElementById('stat-overall-liquid');
  if (liquidWave && liquidText) {
    const topVal = 100 - overall;
    liquidWave.style.top = `${topVal}%`;
    liquidText.textContent = overall + '%';
  } else {
    const oldOverall = document.getElementById('stat-overall');
    if (oldOverall) oldOverall.textContent = overall + '%';
  }

  // AI Indicator Logic
  const aiIndicator = document.getElementById('ai-indicator');
  if (aiIndicator) {
    aiIndicator.className = 'ai-indicator'; // Reset classes
    let aiText = '';
    if (tasksDone === 0) {
      aiText = 'Booing you 👻';
      aiIndicator.classList.add('ai-boo');
    } else if (tasksDone < 10) {
      aiText = 'Keep pushing 🔥';
      aiIndicator.classList.add('ai-need-more');
    } else if (tasksDone < 20) {
      aiText = 'Need more ⚡';
      aiIndicator.classList.add('ai-need-more');
    } else {
      aiText = 'You done well! 🌟';
      aiIndicator.classList.add('ai-done-well');
    }
    typeWriterEffect(aiIndicator, aiText);
  }

  // Phase dots and Locks
  let previousPhaseIsDone = true;

  PHASES.forEach((p, idx) => {
    // Dots
    const dot = document.getElementById(`dot-${p.id}`);
    const prog = getPhaseProgress(p.id);
    if (dot) {
      if (prog.pct === 100) dot.classList.add('done');
      else dot.classList.remove('done');
    }

    // Locks
    const acc = document.getElementById(`acc-${p.id}`);
    const cg = document.getElementById(`cg-${p.id}`);
    
    if (idx === 0) {
      previousPhaseIsDone = (prog.pct === 100);
      return; // First phase never locked
    }

    if (!previousPhaseIsDone) {
      if (acc && !acc.classList.contains('locked')) acc.classList.add('locked');
      if (cg && !cg.classList.contains('locked')) cg.classList.add('locked');
    } else {
      if (acc && acc.classList.contains('locked')) {
        acc.classList.remove('locked');
        acc.classList.add('unlock-anim');
        setTimeout(() => acc.classList.remove('unlock-anim'), 1000);
      }
      if (cg && cg.classList.contains('locked')) {
        cg.classList.remove('locked');
        cg.classList.add('unlock-anim');
        setTimeout(() => cg.classList.remove('unlock-anim'), 1000);
      }
    }
    
    previousPhaseIsDone = (prog.pct === 100);
  });

  // Phase cards (dashboard)
  PHASES.forEach(p => {
    const prog = getPhaseProgress(p.id);
    const fill = document.getElementById(`pc-fill-${p.id}`);
    const text = document.getElementById(`pc-pct-${p.id}`);
    const doneCount = document.getElementById(`pc-done-${p.id}`);
    if (fill) fill.style.width = prog.pct + '%';
    if (text) text.textContent = prog.pct + '%';
    if (doneCount) doneCount.textContent = `${prog.done}/${prog.total} tasks`;
  });

  // Phase accordion progress
  PHASES.forEach(p => {
    const prog = getPhaseProgress(p.id);
    const fill = document.getElementById(`pa-fill-${p.id}`);
    const pct = document.getElementById(`pa-pct-${p.id}`);
    if (fill) fill.style.width = prog.pct + '%';
    if (pct) pct.textContent = prog.pct + '%';
  });

  // Checklist group counts
  PHASES.forEach(p => {
    const prog = getPhaseProgress(p.id);
    const el = document.getElementById(`cph-count-${p.id}`);
    if (el) el.textContent = `${prog.done}/${prog.total}`;
  });
}

// ========================
// DASHBOARD CARDS
// ========================
function buildDashboardCards() {
  const grid = document.getElementById('phase-cards-grid');
  grid.innerHTML = PHASES.map(p => `
    <div class="phase-card" onclick="goToPhase(${p.id})" style="border-left:2px solid ${p.color};">
      <div class="pc-header">
        <div class="pc-emoji" style="background:${p.color}18;">${p.emoji}</div>
        <div class="pc-number">${p.number}</div>
      </div>
      <div class="pc-title">${p.title}</div>
      <div class="pc-duration">${p.duration}</div>
      <div class="pc-progress-bar">
        <div class="pc-progress-fill" id="pc-fill-${p.id}" style="background:${p.color};"></div>
      </div>
      <div class="pc-progress-text">
        <span id="pc-done-${p.id}">0/${p.tasks.length} tasks</span>
        <span id="pc-pct-${p.id}" style="color:${p.color}">0%</span>
      </div>
    </div>
  `).join('');
}

function goToPhase(id) {
  switchPage('phases');
  setTimeout(() => {
    const acc = document.getElementById(`acc-${id}`);
    if (acc) {
      acc.classList.add('open');
      acc.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

// ========================
// PHASES LIST
// ========================
function buildPhasesList() {
  const list = document.getElementById('phases-list');
  list.innerHTML = PHASES.map(p => `
    <div class="phase-accordion" id="acc-${p.id}">
      <div class="phase-accordion-header" onclick="toggleAccordion(${p.id})">
        <div class="pa-icon" style="background:${p.color}22;">
          ${p.emoji}
        </div>
        <div class="pa-info">
          <div class="pa-title">${p.number}: ${p.title}</div>
          <div class="pa-meta">⏱️ ${p.duration} • ${p.tasks.length} tasks</div>
        </div>
        <div class="pa-progress" style="--phase-color: ${p.color};">
          <span class="pa-pct" id="pa-pct-${p.id}" style="color:${p.color}">0%</span>
          <div class="pa-bar">
            <div class="pa-bar-fill" id="pa-fill-${p.id}" style="background:${p.color};"></div>
          </div>
        </div>
        <div class="pa-chevron">⌄</div>
      </div>
      <div class="phase-accordion-body">
        <div class="phase-goal">🎯 <strong>Goal:</strong> ${p.goal}</div>
        <ul class="task-list">
          ${p.tasks.map((task, idx) => `
            <li class="task-item ${isTaskDone(p.id, idx) ? 'done' : ''}"
                data-phase="${p.id}" data-task="${idx}"
                onclick="toggleTask(${p.id}, ${idx})">
              <div class="task-cb">${isTaskDone(p.id, idx) ? '✓' : ''}</div>
              <div class="task-text">${task}</div>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

function toggleAccordion(id) {
  const acc = document.getElementById(`acc-${id}`);
  acc.classList.toggle('open');
}

// ========================
// CHECKLIST PAGE
// ========================
function buildChecklist() {
  const container = document.getElementById('checklist-all');
  container.innerHTML = PHASES.map(p => `
    <div class="checklist-phase-group" id="cg-${p.id}">
      <div class="checklist-phase-header" style="border-left:3px solid ${p.color};">
        <span class="cph-icon">${p.emoji}</span>
        <span class="cph-title" style="color:${p.color}">${p.number}: ${p.title}</span>
        <span class="cph-count" id="cph-count-${p.id}">0/${p.tasks.length}</span>
      </div>
      <div class="checklist-tasks" id="ctl-${p.id}">
        ${p.tasks.map((task, idx) => `
          <div class="task-item ${isTaskDone(p.id, idx) ? 'done' : ''}"
               data-phase="${p.id}" data-task="${idx}"
               onclick="toggleTask(${p.id}, ${idx})">
            <div class="task-cb">${isTaskDone(p.id, idx) ? '✓' : ''}</div>
            <div class="task-text">${task}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });

  // Reset button
  document.getElementById('reset-all-btn').addEventListener('click', () => {
    if (confirm('⚠️ Reset ALL checklist progress? This cannot be undone.')) {
      checklistState = {};
      localStorage.setItem('pubjourney_checklist', JSON.stringify(checklistState));
      buildChecklist();
      buildPhasesList();
      updateAllProgress();
    }
  });
}

function applyFilter(filter) {
  document.querySelectorAll('.task-item').forEach(item => {
    const done = item.classList.contains('done');
    if (filter === 'all') item.style.display = '';
    else if (filter === 'done') item.style.display = done ? '' : 'none';
    else if (filter === 'pending') item.style.display = !done ? '' : 'none';
  });
}

// ========================
// CONTACTS
// ========================
function buildContacts() {
  const grid = document.getElementById('contacts-grid');
  grid.innerHTML = CONTACTS.map(c => `
    <div class="contact-card">
      <div class="contact-phase-tag" style="background:${c.phaseColor}22;color:${c.phaseColor};border:1px solid ${c.phaseColor}44;">
        ${c.phase}
      </div>
      <div class="contact-header">
        <div class="contact-avatar" style="background:${c.phaseColor}22;">${c.emoji}</div>
        <div>
          <div class="contact-name">${c.name}</div>
          <div class="contact-org">${c.org}</div>
        </div>
      </div>
      <div class="contact-purpose">${c.purpose}</div>
      <div class="contact-when">⏱️ ${c.when}</div>
    </div>
  `).join('');
}

// ========================
// RESOURCES
// ========================
function buildResources() {
  const grid = document.getElementById('resources-grid');
  grid.innerHTML = RESOURCES.map(r => `
    <a href="${r.url}" target="_blank" rel="noopener" class="resource-card">
      <span class="resource-arrow">↗</span>
      <span class="resource-icon">${r.icon}</span>
      <div class="resource-name">${r.name}</div>
      <div class="resource-desc">${r.desc}</div>
      <div class="resource-url">${r.label}</div>
    </a>
  `).join('');
}

// ========================
// TIMELINE
// ========================
function buildTimeline() {
  renderTimeline(currentTimeline);

  document.getElementById('toggle-journal').addEventListener('click', () => {
    currentTimeline = 'journal';
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('toggle-journal').classList.add('active');
    renderTimeline('journal');
  });

  document.getElementById('toggle-conf').addEventListener('click', () => {
    currentTimeline = 'conference';
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('toggle-conf').classList.add('active');
    renderTimeline('conference');
  });
}

function renderTimeline(type) {
  const data = type === 'journal' ? JOURNAL_TIMELINE : CONF_TIMELINE;
  const container = document.getElementById('timeline-container');
  
  // Create timeline items
  const itemsHTML = data.map(item => `
    <div class="timeline-item">
      <div class="tl-dot" style="background:${item.color}; z-index: 2;"></div>
      <div class="tl-card card-3d">
        <div class="tl-month" style="color:${item.color}">${item.month}</div>
        <div class="tl-title">${item.title}</div>
        <div class="tl-desc">${item.desc}</div>
      </div>
    </div>
  `).join('');

  // Add the glowing orb
  container.innerHTML = `
    <div class="timeline-orb"></div>
    ${itemsHTML}
  `;
}

// ========================
// CELEBRATION MODAL
// ========================
function setupModal() {
  document.getElementById('modal-close-btn').addEventListener('click', () => {
    document.getElementById('celebration-modal').classList.remove('visible');
  });
}

function checkCelebration(phaseId) {
  const prog = getPhaseProgress(phaseId);
  if (prog.pct === 100) {
    const phase = PHASES.find(p => p.id === phaseId);
    showCelebration(phase);
  }
  const overall = getOverallProgress();
  if (overall === 100) {
    showFinalCelebration();
  }
}

function showCelebration(phase) {
  const modal = document.getElementById('celebration-modal');
  document.getElementById('modal-emoji').textContent = '🎉';
  document.getElementById('modal-title').textContent = `${phase.title} Complete!`;
  document.getElementById('modal-text').textContent = `Amazing work! You've completed all tasks in ${phase.number}: ${phase.title}. Keep up the great momentum — you're one step closer to publication!`;
  modal.classList.add('visible');
}

function showFinalCelebration() {
  const modal = document.getElementById('celebration-modal');
  document.getElementById('modal-emoji').textContent = '🏆';
  document.getElementById('modal-title').textContent = 'You Did It! Published! 🎓';
  document.getElementById('modal-text').textContent = `Congratulations! You have completed your entire publication journey. Your paper is indexed, registered in PRIMe, and you\'re one step closer to graduation. You are officially a published researcher!`;
  modal.classList.add('visible');
}

// ========================
// 3D REALISTIC EFFECTS
// ========================
function setup3DEffects() {
  const initCards = () => {
    const cards = document.querySelectorAll('.stat-card, .phase-card, .contact-card, .resource-card, .tl-card');
    
    cards.forEach(card => {
      // Prevent multiple listeners
      if(card.dataset.has3d) return;
      card.dataset.has3d = "true";
      
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // max 5 deg tilt
        const rotateY = ((x - centerX) / centerX) * 5;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateZ(10px)`;
        card.style.transition = 'transform 0.05s linear, box-shadow 0.3s ease';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)';
        card.style.transition = 'transform 0.4s ease-out, box-shadow 0.3s ease';
      });
    });
  };

  // Run init immediately and also set an observer in case content changes
  initCards();
  const observer = new MutationObserver(initCards);
  observer.observe(document.body, { childList: true, subtree: true });
}

// ========================
// KANBAN BOARD
// ========================
function buildKanban() {
  const board = document.getElementById('kanban-board');
  if (!board) return;

  board.innerHTML = KANBAN_COLS.map(col => `
    <div class="kanban-col" data-col="${col.id}">
      <div class="kanban-col-header">
        ${col.title}
        <span class="kanban-col-count" id="kb-count-${col.id}">0</span>
      </div>
      <div class="kanban-cards" id="kb-cards-${col.id}" 
           ondragover="kbDragOver(event)" 
           ondragleave="kbDragLeave(event)" 
           ondrop="kbDrop(event, '${col.id}')">
        <!-- Cards injected here -->
      </div>
    </div>
  `).join('');

  renderKanbanCards();
}

function renderKanbanCards() {
  // Clear columns
  KANBAN_COLS.forEach(col => {
    const colEl = document.getElementById(`kb-cards-${col.id}`);
    if (colEl) colEl.innerHTML = '';
    const countEl = document.getElementById(`kb-count-${col.id}`);
    if (countEl) countEl.textContent = '0';
  });

  // Count per col
  const counts = {};
  KANBAN_COLS.forEach(c => counts[c.id] = 0);

  // Render cards
  kanbanState.forEach(card => {
    const colEl = document.getElementById(`kb-cards-${card.colId}`);
    if (!colEl) return;

    counts[card.colId]++;

    const cardEl = document.createElement('div');
    cardEl.className = 'kanban-card card-3d'; // Added card-3d for effect
    cardEl.draggable = true;
    cardEl.id = `kb-card-${card.id}`;
    cardEl.ondragstart = (e) => kbDragStart(e, card.id);
    cardEl.ondragend = (e) => kbDragEnd(e);

    cardEl.innerHTML = `
      <div class="k-card-header" style="display: flex; justify-content: space-between; align-items: start;">
        <div class="k-card-title">${card.title}</div>
        <div class="k-card-actions" style="display: flex; gap: 5px;">
          <button onclick="editKanbanCard('${card.id}')" title="Edit" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; font-size:14px; padding: 0 2px;">✎</button>
          <button onclick="deleteKanbanCard('${card.id}')" title="Delete" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:14px; padding: 0 2px;">✕</button>
        </div>
      </div>
      <div class="k-card-desc">${card.desc}</div>
      ${card.journal ? `<div class="k-card-journal">${card.journal}</div>` : ''}
    `;

    colEl.appendChild(cardEl);
  });

  // Update counts
  KANBAN_COLS.forEach(col => {
    const countEl = document.getElementById(`kb-count-${col.id}`);
    if (countEl) countEl.textContent = counts[col.id];
  });
}

function saveKanbanState() {
  localStorage.setItem('pubjourney_kanban', JSON.stringify(kanbanState));
  renderKanbanCards();
}

function addKanbanCard() {
  const title = prompt("Enter manuscript title or topic:");
  if (!title) return;
  const journal = prompt("Target Journal (optional):", "TBD");

  const newCard = {
    id: Date.now().toString(),
    colId: 'drafting',
    title: title,
    desc: 'New manuscript draft started.',
    journal: journal || ''
  };

  kanbanState.push(newCard);
  saveKanbanState();
}

function editKanbanCard(id) {
  const card = kanbanState.find(c => c.id === id);
  if (!card) return;
  
  const newTitle = prompt("Edit manuscript title or topic:", card.title);
  if (newTitle === null) return;
  
  const newJournal = prompt("Edit Target Journal (optional):", card.journal);
  if (newJournal === null) return;
  
  card.title = newTitle.trim() || card.title;
  card.journal = newJournal.trim();
  saveKanbanState();
}

function deleteKanbanCard(id) {
  if (confirm("Are you sure you want to delete this Kanban task?")) {
    kanbanState = kanbanState.filter(c => c.id !== id);
    saveKanbanState();
  }
}

// Drag & Drop Handlers
let draggedCardId = null;

function kbDragStart(e, cardId) {
  draggedCardId = cardId;
  setTimeout(() => e.target.classList.add('dragging'), 0);
  e.dataTransfer.effectAllowed = 'move';
}

function kbDragEnd(e) {
  e.target.classList.remove('dragging');
  document.querySelectorAll('.kanban-cards').forEach(col => col.classList.remove('drag-over'));
  draggedCardId = null;
}

function kbDragOver(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
  e.dataTransfer.dropEffect = 'move';
}

function kbDragLeave(e) {
  e.currentTarget.classList.remove('drag-over');
}

function kbDrop(e, targetColId) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');

  if (draggedCardId) {
    const card = kanbanState.find(c => c.id === draggedCardId);
    if (card && card.colId !== targetColId) {
      card.colId = targetColId;
      saveKanbanState();
    }
  }
}

// ========================
// SUPERVISOR MEETING LOG
// ========================
function saveMeeting() {
  const dateStr = document.getElementById('ml-date').value;
  const supervisor = document.getElementById('ml-supervisor').value.trim();
  const topic = document.getElementById('ml-topic').value.trim();
  const feedback = document.getElementById('ml-feedback').value.trim();
  const action = document.getElementById('ml-action').value.trim();

  if (!dateStr || !topic) {
    alert("Please enter at least the Date and Core Topic.");
    return;
  }

  const newMeeting = {
    id: Date.now().toString(),
    date: dateStr,
    supervisor: supervisor || 'Main Supervisor',
    topic: topic,
    feedback: feedback || 'No key feedback recorded.',
    action: action || 'No specific action items.'
  };

  // Prepend to show newest first
  meetingLogState.unshift(newMeeting);
  localStorage.setItem('pubjourney_meetings', JSON.stringify(meetingLogState));

  // Clear form
  document.getElementById('ml-date').value = '';
  document.getElementById('ml-supervisor').value = '';
  document.getElementById('ml-topic').value = '';
  document.getElementById('ml-feedback').value = '';
  document.getElementById('ml-action').value = '';

  renderMeetings();
}

function renderMeetings() {
  const feed = document.getElementById('meeting-feed');
  if (!feed) return;

  if (meetingLogState.length === 0) {
    feed.innerHTML = '<div style="text-align:center; color:var(--text-secondary); padding: 20px;">No meetings logged yet. Your history will appear here.</div>';
    return;
  }

  feed.innerHTML = meetingLogState.map(m => `
    <div class="meeting-log-card">
      <button class="ml-delete" onclick="deleteMeeting('${m.id}')" title="Delete Log">🗑️</button>
      <div class="ml-header">
        <div class="ml-date">📅 ${new Date(m.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
        <div class="ml-super">🗣️ ${m.supervisor}</div>
      </div>
      <div class="ml-topic">${m.topic}</div>
      
      <div class="ml-section-title">Key Feedback</div>
      <div class="ml-text">${m.feedback}</div>
      
      <div class="ml-section-title">Action Items</div>
      <div class="ml-text">${m.action}</div>
    </div>
  `).join('');
}

function deleteMeeting(id) {
  if (confirm("Are you sure you want to delete this meeting log?")) {
    meetingLogState = meetingLogState.filter(m => m.id !== id);
    localStorage.setItem('pubjourney_meetings', JSON.stringify(meetingLogState));
    renderMeetings();
  }
}

// ========================
// AI CHATBOX WIDGET
// ========================
function toggleChat() {
  const panel = document.getElementById('chat-widget-panel');
  if (panel) {
    panel.classList.toggle('open');
  }
}

function handleChatEnter(e) {
  if (e.key === 'Enter') {
    sendChatMessage();
  }
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  const chatBody = document.getElementById('chat-body');

  // Add User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg user';
  userMsg.textContent = text;
  chatBody.appendChild(userMsg);

  input.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  // Add Typing Indicator
  const typingMsg = document.createElement('div');
  typingMsg.className = 'chat-msg typing';
  typingMsg.textContent = 'AI is typing...';
  chatBody.appendChild(typingMsg);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Simulate AI Response Delay
  setTimeout(() => {
    chatBody.removeChild(typingMsg);

    const aiMsg = document.createElement('div');
    aiMsg.className = 'chat-msg ai';
    
    // Simple mock logic
    const lower = text.toLowerCase();
    if (lower.includes('hello') || lower.includes('hi')) {
      aiMsg.textContent = 'Hello! Ready to conquer your research today?';
    } else if (lower.includes('stuck') || lower.includes('help')) {
      aiMsg.textContent = 'Don\'t worry! Taking a break can help. Check the Kanban board to see if there are smaller tasks you can knock out quickly.';
    } else if (lower.includes('supervisor')) {
      aiMsg.textContent = 'Make sure you log your supervisor meetings in the new Meeting Log tab so you don\'t forget their feedback!';
    } else {
      const responses = [
        "That's an interesting point! I suggest looking into recent papers on Google Scholar to back that up.",
        "Remember to break that down into smaller tasks in your Checklist.",
        "Great! Keep up the momentum. You're doing well.",
        "Have you discussed this approach with your supervisor yet?",
        "I recommend drafting a brief outline before diving into writing the full section."
      ];
      aiMsg.textContent = responses[Math.floor(Math.random() * responses.length)];
    }

    chatBody.appendChild(aiMsg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1500);
}
