const API_BASE = window.location.origin && window.location.origin !== "null"
    ? window.location.origin
    : "http://127.0.0.1:8000";

const TOKEN_KEY = "medai_token";
const USER_KEY = "medai_user";
const LOCAL_HISTORY_KEY = "medai_local_history";

const SAFETY_MESSAGE = "Bu sistem yapay zekâ destekli ön analiz sağlar. Kesin tanı ve tedavi kararı uzman doktor tarafından verilmelidir.";

const NAV_CONFIG = {
    patient: [
        { id: "view-patient-dashboard", label: "Hasta Dashboard" },
        { id: "view-xray-analysis", label: "Röntgen Analizi" },
        { id: "view-health-assistant", label: "Sağlık Asistanı" },
        { id: "view-medication-tracker", label: "İlaç Takibi" },
        { id: "view-appointment-tracker", label: "Randevu Takibi" },
        { id: "view-patient-history", label: "Analiz Geçmişim" },
        { id: "view-patient-reports", label: "Raporlarım" }
    ],
    doctor: [
        { id: "view-doctor-dashboard", label: "Doktor Dashboard" },
        { id: "view-doctor-all-analyses", label: "Tüm Hasta Analizleri" },
        { id: "view-doctor-risk-cases", label: "Riskli Vakalar" },
        { id: "view-xray-analysis", label: "Yeni Röntgen Analizi" },
        { id: "view-health-assistant", label: "Klinik Sağlık Asistanı" },
        { id: "view-doctor-reports", label: "Hasta Raporları" },
        { id: "view-doctor-notes", label: "Doktor Not Alanı" }
    ]
};

const NAV_ICONS = {
    "view-patient-dashboard": `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>`,
    "view-doctor-dashboard": `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>`,
    "view-xray-analysis": `<svg viewBox="0 0 24 24"><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><circle cx="12" cy="12" r="2"/></svg>`,
    "view-health-assistant": `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h8M8 14h6"/></svg>`,
    "view-medication-tracker": `<svg viewBox="0 0 24 24"><path d="M4.5 10.5C7 8 12 3 14.5 5.5s-2.5 7.5-5 10-7.5 2.5-5-2.5z"/><path d="M6 12l6-6m-3.5 8.5l4-4"/></svg>`,
    "view-appointment-tracker": `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    "view-patient-history": `<svg viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 1 1-9-9c2.52 0 4.84.99 6.57 2.57L21 8M21 3v5h-5"/></svg>`,
    "view-doctor-all-analyses": `<svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2zM12 11v6m-3-3h6"/></svg>`,
    "view-doctor-risk-cases": `<svg viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
    "view-patient-reports": `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    "view-doctor-reports": `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
    "view-doctor-notes": `<svg viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`
};

const state = {
    user: null,
    selectedFile: null,
    history: [],
    activeView: null
};

document.addEventListener("DOMContentLoaded", () => {
    bindAuth();
    bindGlobalNavigation();
    bindUpload();
    bindAssistant();
    bindMedication();
    bindAppointment();
    bindDoctorNotes();
    bindImageViewers();
    checkEngineStatus();
    restoreSession();
});

function el(id) {
    return document.getElementById(id);
}

function setText(id, value) {
    const node = el(id);
    if (node) node.textContent = value;
}

function readJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function currentRole() {
    return state.user?.role === "doctor" ? "doctor" : "patient";
}

function currentUserKey() {
    return `${currentRole()}_${state.user?.username || state.user?.name || "guest"}`;
}

function fullUrl(path) {
    if (!path) return "";
    if (String(path).startsWith("http")) return path;
    return `${API_BASE}${path}`;
}

function showAuth() {
    const auth = el("auth-container");
    const app = el("app-container");
    if (auth) auth.style.display = "grid";
    if (app) app.style.display = "none";
}

function showApp() {
    const auth = el("auth-container");
    const app = el("app-container");
    if (auth) auth.style.display = "none";
    if (app) app.style.display = "block";
}

function setAuthMessage(message) {
    setText("auth-message", message || "");
}

function showToast(title, message = "", type = "success") {
    const region = el("toast-region");
    if (!region) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <strong>${escapeHtml(title)}</strong>
        ${message ? `<span>${escapeHtml(message)}</span>` : ""}
    `;
    region.appendChild(toast);

    window.setTimeout(() => {
        toast.remove();
    }, 4200);
}

function restoreSession() {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = readJson(USER_KEY, null);

    if (!token || !user) {
        showAuth();
        return;
    }

    state.user = normalizeUser(user);
    setupApp();
}

function saveSession(token, user) {
    state.user = normalizeUser(user);
    localStorage.setItem(TOKEN_KEY, token);
    writeJson(USER_KEY, state.user);
}

function normalizeUser(user) {
    const role = user?.role === "doctor" ? "doctor" : "patient";
    const username = user?.username || (role === "doctor" ? "demo_doctor" : "demo_patient");
    const name = user?.name || (role === "doctor" ? "Dr. Demo" : "Demo Hasta");
    return { ...user, username, name, role };
}

function inferLegacyRole(username) {
    const text = String(username || "").toLocaleLowerCase("tr-TR");
    return text.includes("doktor") || text.includes("doctor") || text.startsWith("dr") ? "doctor" : "patient";
}

function bindAuth() {
    el("link-show-register")?.addEventListener("click", (event) => {
        event.preventDefault();
        setAuthMessage("");
        el("login-card").hidden = true;
        el("register-card").hidden = false;
    });

    el("link-show-login")?.addEventListener("click", (event) => {
        event.preventDefault();
        setAuthMessage("");
        el("register-card").hidden = true;
        el("login-card").hidden = false;
    });

    el("login-form")?.addEventListener("submit", handleLogin);
    el("register-form")?.addEventListener("submit", handleRegister);
    el("btn-demo-patient")?.addEventListener("click", () => demoLogin("patient"));
    el("btn-demo-doctor")?.addEventListener("click", () => demoLogin("doctor"));

    el("btn-logout")?.addEventListener("click", () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        state.user = null;
        state.history = [];
        state.selectedFile = null;
        showAuth();
        showToast("Çıkış yapıldı", "Oturum kapatıldı.", "success");
    });
}

async function handleLogin(event) {
    event.preventDefault();
    setAuthMessage("");

    const form = new FormData();
    const username = el("login-username").value.trim();
    form.append("username", username);
    form.append("password", el("login-password").value.trim());

    try {
        const response = await fetch(`${API_BASE}/api/login`, {
            method: "POST",
            body: form
        });
        const data = await safeJson(response);

        if (!response.ok || !data.success) {
            throw new Error(data.detail || "Giriş başarısız.");
        }

        const user = data.user || {
            username: data.username || username,
            name: data.name || data.username || username,
            role: data.role || inferLegacyRole(username)
        };

        saveSession(data.token, user);
        setupApp();
        showToast("Giriş başarılı", "MedAI Pro paneli açıldı.", "success");
    } catch (error) {
        setAuthMessage(error.message || "Backend bağlantısı kurulamadı.");
    }
}

async function handleRegister(event) {
    event.preventDefault();
    setAuthMessage("");

    const form = new FormData();
    form.append("username", el("reg-username").value.trim());
    form.append("email", el("reg-email").value.trim());
    form.append("password", el("reg-password").value.trim());
    form.append("role", el("reg-role").value);

    try {
        const response = await fetch(`${API_BASE}/api/register`, {
            method: "POST",
            body: form
        });
        const data = await safeJson(response);

        if (!response.ok || !data.success) {
            throw new Error(data.detail || "Kayıt başarısız.");
        }

        el("register-form").reset();
        el("register-card").hidden = true;
        el("login-card").hidden = false;
        setAuthMessage("Kayıt tamamlandı. Şimdi giriş yapabilirsiniz.");
        showToast("Kayıt tamamlandı", "Yeni hesap oluşturuldu.", "success");
    } catch (error) {
        setAuthMessage(error.message || "Kayıt sırasında hata oluştu.");
    }
}

async function demoLogin(role) {
    setAuthMessage("");
    const button = role === "doctor" ? el("btn-demo-doctor") : el("btn-demo-patient");
    const originalText = button?.textContent;
    if (button) {
        button.disabled = true;
        button.textContent = "Bağlanıyor...";
    }

    const form = new FormData();
    form.append("role", role);

    try {
        const response = await fetch(`${API_BASE}/api/demo-login`, {
            method: "POST",
            body: form
        });
        const data = await safeJson(response);

        if (!response.ok || !data.success || !data.token) {
            throw new Error(data.detail || "Demo giriş backend üzerinden açılamadı.");
        }

        saveSession(data.token, data.user || {
            username: data.username || `demo_${role}`,
            name: role === "doctor" ? "Dr. Demo" : "Demo Hasta",
            role: data.role || role
        });
        setupApp();
        showToast("Demo giriş hazır", role === "doctor" ? "Doktor klinik paneli açıldı." : "Hasta paneli açıldı.", "success");
    } catch {
        const fallbackUser = {
            username: role === "doctor" ? "demo_doctor" : "demo_patient",
            name: role === "doctor" ? "Dr. Demo" : "Demo Hasta",
            role,
            fallback: true
        };
        saveSession(`demo_fallback_${role}_${Date.now()}`, fallbackUser);
        setupApp();
        showToast("Fallback demo açıldı", "Backend cevap vermedi. Analiz için backend çalışmalıdır.", "warning");
    } finally {
        if (button) {
            button.disabled = false;
            button.textContent = originalText;
        }
    }
}

async function safeJson(response) {
    try {
        return await response.json();
    } catch {
        return {};
    }
}

function setupApp() {
    showApp();

    const role = currentRole();
    const displayName = state.user.name || state.user.username;

    document.body.dataset.role = role;
    setText("product-role-label", role === "doctor" ? "Doktor klinik paneli" : "Hasta sağlık paneli");
    setText("user-display-name", displayName);
    setText("user-display-role", role === "doctor" ? "Doktor" : "Hasta");
    setText("user-avatar-initials", initials(displayName));

    buildNavigation(role);
    renderMedications();
    renderAppointments();
    renderDoctorNotes();

    switchView(role === "doctor" ? "view-doctor-dashboard" : "view-patient-dashboard", false);
    loadHistory();
}

function initials(name) {
    return String(name || "MP")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toLocaleUpperCase("tr-TR") || "MP";
}

function buildNavigation(role) {
    const nav = el("nav-links-container");
    if (!nav) return;

    nav.innerHTML = "";
    NAV_CONFIG[role].forEach((item) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "nav-link";
        button.dataset.target = item.id;
        
        const iconSvg = NAV_ICONS[item.id] || "";
        button.innerHTML = `${iconSvg}<span>${item.label}</span>`;
        
        button.addEventListener("click", () => switchView(item.id));
        nav.appendChild(button);
    });
}

function bindGlobalNavigation() {
    document.addEventListener("click", (event) => {
        const trigger = event.target.closest("[data-nav-target]");
        if (trigger) {
            switchView(trigger.dataset.navTarget);
        }
    });
}

function switchView(viewId, refreshHistory = true) {
    state.activeView = viewId;

    document.querySelectorAll(".content-panel").forEach((panel) => {
        panel.hidden = panel.id !== viewId;
    });

    document.querySelectorAll(".nav-link").forEach((button) => {
        button.classList.toggle("active", button.dataset.target === viewId);
    });

    const historyViews = new Set([
        "view-doctor-dashboard",
        "view-patient-dashboard",
        "view-doctor-all-analyses",
        "view-doctor-risk-cases",
        "view-patient-history",
        "view-patient-reports",
        "view-doctor-reports"
    ]);

    if (refreshHistory && historyViews.has(viewId)) {
        loadHistory();
    }
}

async function loadHistory() {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token || token.startsWith("demo_fallback")) {
        state.history = getFallbackHistory();
        renderHistoryViews();
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/api/history`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error("Geçmiş alınamadı.");
        }

        const data = await safeJson(response);
        state.history = (data.history || []).map(normalizeHistoryItem);
        renderHistoryViews();
    } catch {
        state.history = getFallbackHistory();
        renderHistoryViews();
    }
}

function normalizeHistoryItem(item) {
    const confidence = Number(item.confidence || 0);
    const fractureProbability = Number(item.fracture_probability ?? item.fractureProbability ?? 0);
    const normalProbability = Number(item.normal_probability ?? item.normalProbability ?? 0);

    return {
        id: item.id || `local_${Date.now()}`,
        user_key: item.user_key || item.userKey || "",
        username: item.username || item.patient_name || item.patientName || "Hasta",
        email: item.email || "",
        role: item.role || "patient",
        prediction: item.prediction || "Sonuç yok",
        confidence,
        fracture_probability: fractureProbability,
        normal_probability: normalProbability,
        risk_level: normalizeRisk(item.risk_level || inferRisk(item.prediction, confidence, fractureProbability)),
        image_url: item.image_url || "",
        heatmap_url: item.heatmap_url || "",
        pdf_url: item.pdf_url || "",
        medical_note: item.medical_note || SAFETY_MESSAGE,
        created_at: item.created_at || new Date().toISOString()
    };
}

function getFallbackHistory() {
    const local = readJson(LOCAL_HISTORY_KEY, []).map(normalizeHistoryItem);

    if (currentRole() === "doctor") {
        return local.length ? local : seedDoctorHistory();
    }

    return local.filter((item) => item.user_key === currentUserKey());
}

function seedDoctorHistory() {
    const now = Date.now();
    return [
        normalizeHistoryItem({
            id: "demo-101",
            username: "Demo Hasta",
            prediction: "Kırık şüphesi tespit edildi",
            confidence: 82.4,
            fracture_probability: 76.8,
            normal_probability: 23.2,
            risk_level: "YÜKSEK",
            created_at: new Date(now - 1000 * 60 * 24).toISOString(),
            medical_note: SAFETY_MESSAGE
        }),
        normalizeHistoryItem({
            id: "demo-102",
            username: "Ayşe Yılmaz",
            prediction: "Belirsiz bulgu - doktor kontrolü gerekli",
            confidence: 53.1,
            fracture_probability: 49.2,
            normal_probability: 50.8,
            risk_level: "BELİRSİZ",
            created_at: new Date(now - 1000 * 60 * 90).toISOString(),
            medical_note: "Güven skoru düşük. Doktor değerlendirmesi gerekir."
        }),
        normalizeHistoryItem({
            id: "demo-103",
            username: "Mehmet Kaya",
            prediction: "Kırık bulgusu izlenmedi",
            confidence: 88.7,
            fracture_probability: 11.3,
            normal_probability: 88.7,
            risk_level: "DÜŞÜK",
            created_at: new Date(now - 1000 * 60 * 180).toISOString(),
            medical_note: SAFETY_MESSAGE
        })
    ];
}

function inferRisk(prediction, confidence, fractureProbability) {
    const text = String(prediction || "").toLocaleUpperCase("tr-TR");
    if (confidence && confidence < 55) return "BELİRSİZ";
    if (fractureProbability >= 70) return "YÜKSEK";
    if (fractureProbability >= 45) return "ORTA";
    if (text.includes("KIRIK") || text.includes("KIRIK ŞÜPHESİ")) return confidence >= 80 ? "YÜKSEK" : "ORTA";
    return "DÜŞÜK";
}

function normalizeRisk(risk) {
    const text = String(risk || "DÜŞÜK").toLocaleUpperCase("tr-TR");
    if (text.includes("ACİL")) return "ACİL";
    if (text.includes("YÜKSEK")) return "YÜKSEK";
    if (text.includes("ORTA")) return "ORTA";
    if (text.includes("BEL")) return "BELİRSİZ";
    if (text.includes("DÜŞ") || text.includes("DUS")) return "DÜŞÜK";
    return text || "DÜŞÜK";
}

function isRisky(item) {
    return normalizeRisk(item.risk_level) !== "DÜŞÜK";
}

function renderHistoryViews() {
    const history = state.history;
    const risky = history.filter(isRisky);
    const normal = history.filter((item) => !isRisky(item));
    const reports = history.filter((item) => item.pdf_url);

    setText("doc-stat-total", history.length);
    setText("doc-stat-risk", risky.length);
    setText("doc-stat-normal", normal.length);
    setText("doc-stat-reports", reports.length);

    renderPatientDashboard(history);
    renderDoctorRecentRisk(risky);
    renderDoctorAllHistory(history);
    renderDoctorRiskCases(risky);
    renderPatientHistory(history);
    renderPatientReports(history);
    renderDoctorReports(history);
}

function renderPatientDashboard(rows) {
    setText("patient-welcome-title", `${state.user?.name || "Hasta"} için sağlık özeti`);

    const risky = rows.filter(isRisky);
    const normal = rows.filter((item) => !isRisky(item));
    const reports = rows.filter((item) => item.pdf_url);

    setText("patient-stat-total", rows.length);
    setText("patient-stat-risk", risky.length);
    setText("patient-stat-normal", normal.length);
    setText("patient-stat-reports", reports.length);

    const lastBox = el("patient-last-analysis");
    if (lastBox) {
        if (!rows.length) {
            lastBox.innerHTML = `
                <div class="summary-item">
                    <strong>Henüz analiz yok</strong>
                    <span>Röntgen analizi başlatarak AI ön analiz sonucunu, heatmap ve PDF raporu oluşturabilirsiniz.</span>
                </div>
            `;
        } else {
            const item = rows[0];
            lastBox.innerHTML = `
                <div class="summary-item">
                    ${riskPill(item.risk_level)}
                    <strong>${escapeHtml(item.prediction)}</strong>
                    <span>${formatDate(item.created_at)} · Güven ${formatPercent(item.confidence)}</span>
                    <div class="table-actions">
                        ${linkButton(item.pdf_url, "PDF")}
                        ${linkButton(item.image_url, "Görsel")}
                    </div>
                </div>
            `;
        }
    }

    renderPatientDashboardMeds();
    renderPatientDashboardAppointment();
}

function renderPatientDashboardMeds() {
    const box = el("patient-today-meds");
    if (!box || !state.user) return;

    const list = readJson(storageKey("medai_meds"), []);
    if (!list.length) {
        box.innerHTML = `
            <div class="summary-item">
                <strong>Bugün için ilaç kaydı yok</strong>
                <span>İlaç takibi modülünden doz ve saat ekleyebilirsiniz.</span>
            </div>
        `;
        return;
    }

    box.innerHTML = list
        .slice()
        .sort((a, b) => String(a.time || "").localeCompare(String(b.time || "")))
        .slice(0, 4)
        .map((item) => `
            <div class="summary-item">
                <strong>${escapeHtml(item.time || "--:--")} · ${escapeHtml(item.name)}</strong>
                <span>${escapeHtml(item.dosage)}${item.note ? ` · ${escapeHtml(item.note)}` : ""}</span>
            </div>
        `).join("");
}

function renderPatientDashboardAppointment() {
    const box = el("patient-next-appointment");
    if (!box || !state.user) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const list = readJson(storageKey("medai_apps"), [])
        .map((item) => ({ ...item, sortDate: new Date(`${item.date}T00:00:00`) }))
        .filter((item) => !Number.isNaN(item.sortDate.getTime()) && item.sortDate >= today)
        .sort((a, b) => a.sortDate - b.sortDate);

    if (!list.length) {
        box.innerHTML = `
            <div class="summary-item">
                <strong>Yaklaşan randevu yok</strong>
                <span>Kontrol veya takip randevunuzu randevu modülünden ekleyebilirsiniz.</span>
            </div>
        `;
        return;
    }

    const item = list[0];
    box.innerHTML = `
        <div class="summary-item">
            <strong>${escapeHtml(item.title)}</strong>
            <span>${escapeHtml(formatShortDate(item.date))}${item.time ? ` · ${escapeHtml(item.time)}` : ""}${item.note ? ` · ${escapeHtml(item.note)}` : ""}</span>
        </div>
    `;
}

function renderDoctorRecentRisk(rows) {
    const tbody = el("doctor-recent-risk-table");
    if (!tbody) return;

    const visibleRows = rows.slice(0, 6);
    if (!visibleRows.length) {
        tbody.innerHTML = emptyRow(6, "Öncelikli riskli vaka bulunmuyor.");
        return;
    }

    tbody.innerHTML = visibleRows.map((item) => `
        <tr>
            <td>${escapeHtml(item.username)}</td>
            <td>${formatDate(item.created_at)}</td>
            <td>${escapeHtml(item.prediction)}</td>
            <td>${formatPercent(item.confidence)}</td>
            <td>${riskPill(item.risk_level)}</td>
            <td>${linkButton(item.pdf_url, "PDF")}</td>
        </tr>
    `).join("");
}

function renderDoctorAllHistory(rows) {
    const tbody = el("doctor-all-history-table");
    if (!tbody) return;

    if (!rows.length) {
        tbody.innerHTML = emptyRow(8, "Henüz klinik analiz kaydı bulunmuyor.");
        return;
    }

    tbody.innerHTML = rows.map((item) => `
        <tr>
            <td>${escapeHtml(item.username)}</td>
            <td>${formatDate(item.created_at)}</td>
            <td>${escapeHtml(item.prediction)}</td>
            <td>${formatPercent(item.confidence)}</td>
            <td>${riskPill(item.risk_level)}</td>
            <td>${linkButton(item.image_url, "Görsel")}</td>
            <td>${linkButton(item.heatmap_url, "Heatmap")}</td>
            <td>${linkButton(item.pdf_url, "PDF")}</td>
        </tr>
    `).join("");
}

function renderDoctorRiskCases(rows) {
    const tbody = el("doctor-risk-table");
    if (!tbody) return;

    if (!rows.length) {
        tbody.innerHTML = emptyRow(7, "Riskli veya belirsiz vaka bulunmuyor.");
        return;
    }

    tbody.innerHTML = rows.map((item) => `
        <tr>
            <td>${escapeHtml(item.username)}</td>
            <td>${formatDate(item.created_at)}</td>
            <td>${escapeHtml(item.prediction)}</td>
            <td>${formatPercent(item.confidence)}</td>
            <td>${riskPill(item.risk_level)}</td>
            <td>${escapeHtml(item.medical_note || SAFETY_MESSAGE)}</td>
            <td>${linkButton(item.pdf_url, "PDF")}</td>
        </tr>
    `).join("");
}

function renderPatientHistory(rows) {
    const tbody = el("patient-history-table");
    if (!tbody) return;

    if (!rows.length) {
        tbody.innerHTML = emptyRow(6, "Size ait analiz kaydı bulunmuyor.");
        return;
    }

    tbody.innerHTML = rows.map((item) => `
        <tr>
            <td>${formatDate(item.created_at)}</td>
            <td>${escapeHtml(item.prediction)}</td>
            <td>${formatPercent(item.confidence)}</td>
            <td>${riskPill(item.risk_level)}</td>
            <td>${linkButton(item.image_url, "Görsel")}</td>
            <td>${linkButton(item.pdf_url, "PDF")}</td>
        </tr>
    `).join("");
}

function renderPatientReports(rows) {
    const box = el("patient-report-list");
    if (!box) return;

    if (!rows.length) {
        box.innerHTML = `<article class="report-card"><h2>Rapor yok</h2><p class="text-muted">Analiz yaptığınızda PDF ve heatmap bağlantıları burada görünecek.</p></article>`;
        return;
    }

    box.innerHTML = rows.map((item) => `
        <article class="report-card">
            ${riskPill(item.risk_level)}
            <h2>${escapeHtml(item.prediction)}</h2>
            <div class="report-meta">
                <span>Tarih: ${formatDate(item.created_at)}</span>
                <span>Güven: ${formatPercent(item.confidence)}</span>
                <span>${escapeHtml(item.medical_note || SAFETY_MESSAGE)}</span>
            </div>
            <div class="table-actions">
                ${linkButton(item.pdf_url, "PDF")}
                ${linkButton(item.image_url, "Görsel")}
                ${linkButton(item.heatmap_url, "Heatmap")}
            </div>
        </article>
    `).join("");
}

function renderDoctorReports(rows) {
    const tbody = el("doctor-report-table");
    if (!tbody) return;

    if (!rows.length) {
        tbody.innerHTML = emptyRow(6, "Hasta raporu bulunmuyor.");
        return;
    }

    tbody.innerHTML = rows.map((item) => `
        <tr>
            <td>${escapeHtml(item.username)}</td>
            <td>${formatDate(item.created_at)}</td>
            <td>${riskPill(item.risk_level)}</td>
            <td>${linkButton(item.image_url, "Görsel")}</td>
            <td>${linkButton(item.heatmap_url, "Heatmap")}</td>
            <td>${linkButton(item.pdf_url, "PDF")}</td>
        </tr>
    `).join("");
}

function emptyRow(colspan, message) {
    return `<tr><td class="empty-row" colspan="${colspan}">${escapeHtml(message)}</td></tr>`;
}

function formatDate(value) {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return escapeHtml(value);
    return date.toLocaleString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function formatPercent(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return "-";
    return `%${number.toFixed(1)}`;
}

function riskClass(risk) {
    const normalized = normalizeRisk(risk);
    if (normalized === "YÜKSEK" || normalized === "ACİL") return "danger";
    if (normalized === "ORTA") return "warning";
    if (normalized === "DÜŞÜK") return "success";
    return "neutral";
}

function riskPill(risk) {
    const normalized = normalizeRisk(risk);
    return `<span class="risk-pill ${riskClass(normalized)}">${escapeHtml(normalized)}</span>`;
}

function linkButton(path, label) {
    if (!path) return `<span class="text-muted">Yok</span>`;
    return `<a class="btn btn-secondary small" href="${escapeHtml(fullUrl(path))}" target="_blank" rel="noopener">${escapeHtml(label)}</a>`;
}

function bindUpload() {
    const dropzone = el("dropzone-area");
    const input = el("xray-file-input");
    const form = el("analysis-upload-form");

    dropzone?.addEventListener("click", () => input?.click());
    dropzone?.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            input?.click();
        }
    });

    input?.addEventListener("change", () => {
        if (input.files?.length) selectFile(input.files[0]);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
        dropzone?.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.add("dragover");
        });
    });

    ["dragleave", "drop"].forEach((eventName) => {
        dropzone?.addEventListener(eventName, (event) => {
            event.preventDefault();
            dropzone.classList.remove("dragover");
        });
    });

    dropzone?.addEventListener("drop", (event) => {
        const file = event.dataTransfer?.files?.[0];
        if (file) selectFile(file);
    });

    el("btn-clear-file")?.addEventListener("click", () => clearSelectedFile());

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        await analyzeFile();
    });
}

function selectFile(file) {
    const extensionOk = /\.(jpg|jpeg|png|webp)$/i.test(file.name || "");
    if (!file.type.startsWith("image/") && !extensionOk) {
        showToast("Geçersiz dosya", "Lütfen JPG, PNG veya WEBP formatında bir görüntü seçin.", "error");
        return;
    }

    state.selectedFile = file;
    setText("selected-file-name", file.name);
    el("file-selected-badge").hidden = false;
    el("btn-submit-analysis").disabled = false;
    showToast("Dosya seçildi", file.name, "success");
}

function clearSelectedFile() {
    state.selectedFile = null;
    const input = el("xray-file-input");
    if (input) input.value = "";
    el("file-selected-badge").hidden = true;
    el("btn-submit-analysis").disabled = true;
}

async function analyzeFile() {
    if (!state.selectedFile) {
        showToast("Dosya gerekli", "Önce bir röntgen görüntüsü seçin.", "warning");
        return;
    }

    const button = el("btn-submit-analysis");
    if (button) {
        button.disabled = true;
        button.textContent = "Analiz ediliyor...";
    }

    setAnalysisLoading(true);

    const form = new FormData();
    form.append("file", state.selectedFile);

    try {
        const response = await fetch(`${API_BASE}/api/analyze`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY) || ""}`
            },
            body: form
        });
        const data = await safeJson(response);

        if (!response.ok || !data.success) {
            throw new Error(data.detail || "Analiz tamamlanamadı.");
        }

        renderAnalysis(data);
        storeLocalAnalysis(data);
        await loadHistory();
        showToast("Analiz tamamlandı", "AI sonucu, heatmap ve PDF raporu hazırlandı.", "success");
    } catch (error) {
        setAnalysisLoading(false);
        el("analysis-placeholder").hidden = false;
        showToast("Analiz yapılamadı", `Backend ve AI modeli aktif olmalı. Detay: ${error.message}`, "error");
    } finally {
        if (button) {
            button.disabled = !state.selectedFile;
            button.textContent = "Analizi başlat";
        }
    }
}

function setAnalysisLoading(isLoading) {
    el("analysis-placeholder").hidden = isLoading;
    el("analysis-loading").hidden = !isLoading;
    el("analysis-result-content").hidden = true;
    resetImageViewerTransforms();
}

function renderAnalysis(response) {
    const data = response.data || {};
    const confidence = Number(data.confidence || 0);
    const fracture = Number(data.fracture_probability || 0);
    const normal = Number(data.normal_probability || 0);
    const risk = normalizeRisk(data.risk_level || inferRisk(data.prediction, confidence, fracture));
    const medicalNote = data.medical_note || SAFETY_MESSAGE;

    el("analysis-placeholder").hidden = true;
    el("analysis-loading").hidden = true;
    el("analysis-result-content").hidden = false;

    setText("result-prediction-text", data.prediction || "Sonuç yok");
    setText("result-confidence", formatPercent(confidence));
    setText("result-prob-fracture", formatPercent(fracture));
    setText("result-prob-normal", formatPercent(normal));
    setText("result-medical-note", medicalNote);

    const riskNode = el("result-risk");
    if (riskNode) {
        riskNode.className = `risk-pill ${riskClass(risk)}`;
        riskNode.textContent = risk;
    }

    const progress = el("result-progress-fill");
    if (progress) progress.style.width = `${Math.max(0, Math.min(100, confidence))}%`;

    const originalUrl = fullUrl(response.image_url);
    if (originalUrl) el("img-output-original").src = originalUrl;

    const heatmapUrl = fullUrl(data.heatmap_url);
    if (heatmapUrl) el("img-output-heatmap").src = heatmapUrl;

    const pdfUrl = fullUrl(data.pdf_url);
    const pdfButton = el("btn-download-pdf");
    if (pdfButton) {
        pdfButton.href = pdfUrl || "#";
        pdfButton.classList.toggle("disabled", !pdfUrl);
    }
}

function storeLocalAnalysis(response) {
    const data = response.data || {};
    const records = readJson(LOCAL_HISTORY_KEY, []);
    records.unshift({
        id: `local_${Date.now()}`,
        user_key: currentUserKey(),
        username: state.user?.name || state.user?.username || "Hasta",
        role: currentRole(),
        prediction: data.prediction,
        confidence: data.confidence,
        fracture_probability: data.fracture_probability,
        normal_probability: data.normal_probability,
        risk_level: data.risk_level,
        image_url: response.image_url,
        heatmap_url: data.heatmap_url,
        pdf_url: data.pdf_url,
        medical_note: data.medical_note || SAFETY_MESSAGE,
        created_at: new Date().toISOString()
    });
    writeJson(LOCAL_HISTORY_KEY, records.slice(0, 50));
}

function bindAssistant() {
    el("chat-input-form")?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const input = el("chat-query-input");
        const message = input.value.trim();
        if (!message) return;

        appendUserMessage(message);
        input.value = "";

        const button = el("assistant-submit");
        if (button) {
            button.disabled = true;
            button.textContent = "Yanıtlanıyor...";
        }
        setAssistantTyping(true);

        const form = new FormData();
        form.append("message", message);

        try {
            const response = await fetch(`${API_BASE}/api/health-assistant`, {
                method: "POST",
                body: form
            });
            const data = await safeJson(response);

            if (!response.ok || !data.success) {
                throw new Error(data.detail || "Asistan yanıt veremedi.");
            }

            appendAssistantMessage(data);
        } catch {
            appendAssistantMessage(localAssistant(message));
        } finally {
            setAssistantTyping(false);
            if (button) {
                button.disabled = false;
                button.textContent = "Gönder";
            }
        }
    });
}

function setAssistantTyping(isTyping) {
    const typing = el("assistant-typing");
    const box = el("chat-messages-container");
    if (!typing || !box) return;

    if (isTyping) {
        typing.hidden = false;
        box.appendChild(typing);
        box.scrollTop = box.scrollHeight;
    } else {
        typing.hidden = true;
    }
}

function appendUserMessage(message) {
    const box = el("chat-messages-container");
    if (!box) return;

    const article = document.createElement("article");
    article.className = "user-message";

    const body = document.createElement("div");
    body.className = "message-body";
    const paragraph = document.createElement("p");
    paragraph.textContent = message;
    body.appendChild(paragraph);

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = "SEN";

    article.appendChild(body);
    article.appendChild(avatar);
    box.appendChild(article);
    box.scrollTop = box.scrollHeight;
}

function appendAssistantMessage(data) {
    const box = el("chat-messages-container");
    if (!box) return;

    const cards = data.cards || {
        risk_level: data.risk_level || "BELİRSİZ",
        general_info: data.answer || "Belirtiler hakkında genel bilgilendirme yapılamadı.",
        home_care: "Belirtileri takip edin, kendinizi zorlamayın ve ilaç/tedavi kararı için sağlık profesyoneline danışın.",
        when_to_seek: "Şikâyetiniz sürerse veya kötüleşirse doktora başvurun.",
        safety_warning: data.warning || SAFETY_MESSAGE
    };

    const article = document.createElement("article");
    article.className = "assistant-message";
    article.innerHTML = `
        <div class="message-avatar">AI</div>
        <div class="message-body">
            <h3>MedAI klinik asistan</h3>
            <div class="assistant-cards">
                <div>
                    <span>Risk seviyesi</span>
                    <p>${escapeHtml(cards.risk_level)}</p>
                </div>
                <div>
                    <span>Genel bilgilendirme</span>
                    <p>${escapeHtml(cards.general_info)}</p>
                </div>
                <div>
                    <span>Evde dikkat edilecekler</span>
                    <p>${escapeHtml(cards.home_care || "Belirtileri takip edin ve ilaç/tedavi kararı için sağlık profesyoneline danışın.")}</p>
                </div>
                <div>
                    <span>Ne zaman doktora gidilmeli</span>
                    <p>${escapeHtml(cards.when_to_seek)}</p>
                </div>
                <div>
                    <span>Güvenlik uyarısı</span>
                    <p>${escapeHtml(cards.safety_warning)}</p>
                </div>
            </div>
        </div>
    `;

    box.appendChild(article);
    box.scrollTop = box.scrollHeight;
}

function localAssistant(message) {
    const text = message.toLocaleLowerCase("tr-TR");
    let risk = "BELİRSİZ";
    let general = "Belirttiğiniz şikâyet için ağrının yeri, süresi, şiddeti ve eşlik eden bulgular önemlidir.";
    let homeCare = "Dinlenmek, sıvı almak, belirtileri takip etmek ve şikâyeti artıran aktivitelerden kaçınmak yardımcı olabilir. İlaç kullanımı için sağlık profesyoneline danışın.";
    let when = "Şikâyet artarsa, uzun sürerse veya günlük yaşamınızı etkilerse doktora başvurun.";

    if (["nefes", "göğüs", "bayıl", "bilinç", "kan", "felç", "şiddetli"].some((word) => text.includes(word))) {
        risk = "ACİL";
        general = "Yazdığınız belirtiler acil değerlendirme gerektirebilir.";
        homeCare = "Evde beklemek uygun olmayabilir. Kişiyi yalnız bırakmayın ve 112/acil servis desteği isteyin.";
        when = "Nefes darlığı, göğüs ağrısı, bilinç kaybı, felç belirtisi veya yoğun kanama varsa hemen 112'yi arayın ya da acil servise başvurun.";
    } else if (["kırık", "kirik", "kol", "bacak", "ayak", "şiş", "mor", "düşt"].some((word) => text.includes(word))) {
        risk = "ORTA";
        general = "Ağrı, şişlik, morarma ve hareket kısıtlılığı kırık, çatlak veya burkulma ile ilişkili olabilir.";
        homeCare = "Bölgeyi zorlamayın, mümkünse sabit tutun ve şişlik/ağrı artarsa beklemeden değerlendirme alın.";
        when = "Şiddetli ağrı, şekil bozukluğu, uyuşma veya üzerine basamama varsa röntgen ve doktor değerlendirmesi gerekir.";
    }

    return {
        success: true,
        risk_level: risk,
        cards: {
            risk_level: risk,
            general_info: general,
            home_care: homeCare,
            when_to_seek: when,
            safety_warning: `${SAFETY_MESSAGE} Bu asistan teşhis koymaz, ilaç önermez ve reçete yazmaz.`
        }
    };
}

function storageKey(prefix) {
    return `${prefix}_${currentUserKey()}`;
}

function uniqueId() {
    return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function bindMedication() {
    el("medication-form")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const list = readJson(storageKey("medai_meds"), []);
        list.push({
            id: uniqueId(),
            name: el("med-name").value.trim(),
            dosage: el("med-dosage").value.trim(),
            time: el("med-time").value,
            note: el("med-note").value.trim()
        });
        writeJson(storageKey("medai_meds"), list);
        event.target.reset();
        renderMedications();
        renderPatientDashboardMeds();
        showToast("İlaç eklendi", "İlaç takibi güncellendi.", "success");
    });

    el("medication-list")?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-delete-med]");
        if (!button) return;
        const list = readJson(storageKey("medai_meds"), []).filter((item) => item.id !== button.dataset.deleteMed);
        writeJson(storageKey("medai_meds"), list);
        renderMedications();
        renderPatientDashboardMeds();
        showToast("İlaç silindi", "Liste güncellendi.", "success");
    });
}

function renderMedications() {
    const box = el("medication-list");
    if (!box || !state.user) return;

    const list = readJson(storageKey("medai_meds"), []);
    if (!list.length) {
        box.innerHTML = `<p class="text-muted">Henüz ilaç kaydı yok.</p>`;
        return;
    }

    box.innerHTML = list.map((item) => `
        <div class="list-row">
            <div>
                <strong>${escapeHtml(item.name)}</strong>
                <span>${escapeHtml(item.dosage)} · ${escapeHtml(item.time)}${item.note ? ` · ${escapeHtml(item.note)}` : ""}</span>
            </div>
            <button type="button" class="btn btn-ghost small" data-delete-med="${escapeHtml(item.id)}">Sil</button>
        </div>
    `).join("");
}

function bindAppointment() {
    el("appointment-form")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const list = readJson(storageKey("medai_apps"), []);
        list.push({
            id: uniqueId(),
            title: el("app-title").value.trim(),
            date: el("app-date").value,
            time: el("app-time").value,
            note: el("app-note").value.trim()
        });
        writeJson(storageKey("medai_apps"), list);
        event.target.reset();
        renderAppointments();
        renderPatientDashboardAppointment();
        showToast("Randevu eklendi", "Randevu takibi güncellendi.", "success");
    });

    el("appointment-list")?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-delete-app]");
        if (!button) return;
        const list = readJson(storageKey("medai_apps"), []).filter((item) => item.id !== button.dataset.deleteApp);
        writeJson(storageKey("medai_apps"), list);
        renderAppointments();
        renderPatientDashboardAppointment();
        showToast("Randevu silindi", "Liste güncellendi.", "success");
    });
}

function renderAppointments() {
    const box = el("appointment-list");
    if (!box || !state.user) return;

    const list = readJson(storageKey("medai_apps"), []);
    if (!list.length) {
        box.innerHTML = `<p class="text-muted">Henüz randevu kaydı yok.</p>`;
        return;
    }

    box.innerHTML = list.map((item) => `
        <div class="list-row">
            <div>
                <strong>${escapeHtml(item.title)}</strong>
                <span>${escapeHtml(formatShortDate(item.date))}${item.time ? ` · ${escapeHtml(item.time)}` : ""}${item.note ? ` · ${escapeHtml(item.note)}` : ""}</span>
            </div>
            <button type="button" class="btn btn-ghost small" data-delete-app="${escapeHtml(item.id)}">Sil</button>
        </div>
    `).join("");
}

function formatShortDate(value) {
    if (!value) return "Tarih yok";
    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

function bindDoctorNotes() {
    el("doctor-note-form")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const list = readJson(storageKey("medai_doctor_notes"), []);
        list.unshift({
            id: uniqueId(),
            patient: el("note-patient").value.trim(),
            body: el("note-body").value.trim(),
            created_at: new Date().toISOString()
        });
        writeJson(storageKey("medai_doctor_notes"), list);
        event.target.reset();
        renderDoctorNotes();
        showToast("Doktor notu kaydedildi", "Klinik not alanı güncellendi.", "success");
    });

    el("doctor-notes-list")?.addEventListener("click", (event) => {
        const button = event.target.closest("[data-delete-note]");
        if (!button) return;
        const list = readJson(storageKey("medai_doctor_notes"), []).filter((item) => item.id !== button.dataset.deleteNote);
        writeJson(storageKey("medai_doctor_notes"), list);
        renderDoctorNotes();
        showToast("Not silindi", "Doktor not listesi güncellendi.", "success");
    });
}

function renderDoctorNotes() {
    const box = el("doctor-notes-list");
    if (!box || !state.user) return;

    const list = readJson(storageKey("medai_doctor_notes"), []);
    if (!list.length) {
        box.innerHTML = `<p class="text-muted">Henüz doktor notu yok.</p>`;
        return;
    }

    box.innerHTML = list.map((item) => `
        <div class="list-row">
            <div>
                <strong>${escapeHtml(item.patient)}</strong>
                <span>${formatDate(item.created_at)}</span>
                <span>${escapeHtml(item.body)}</span>
            </div>
            <button type="button" class="btn btn-ghost small" data-delete-note="${escapeHtml(item.id)}">Sil</button>
        </div>
    `).join("");
}

function bindImageViewers() {
    const viewerStates = {
        original: { zoom: 1, contrast: 100, invert: 0 },
        heatmap: { zoom: 1, contrast: 100, invert: 0 }
    };

    const toolbars = document.querySelectorAll(".viewport-toolbar");
    toolbars.forEach(toolbar => {
        const type = toolbar.dataset.viewer;
        const img = el(type === "original" ? "img-output-original" : "img-output-heatmap");
        if (!img) return;

        toolbar.addEventListener("click", (event) => {
            const btn = event.target.closest(".toolbar-btn");
            if (!btn) return;
            event.preventDefault();
            const action = btn.dataset.action;
            const state = viewerStates[type];

            if (action === "zoom-in") {
                state.zoom = Math.min(3, state.zoom + 0.2);
            } else if (action === "zoom-out") {
                state.zoom = Math.max(0.6, state.zoom - 0.2);
            } else if (action === "invert") {
                state.invert = state.invert === 0 ? 100 : 0;
                btn.classList.toggle("active", state.invert > 0);
            } else if (action === "contrast") {
                state.contrast = state.contrast === 100 ? 175 : (state.contrast === 175 ? 250 : 100);
                btn.classList.toggle("active", state.contrast > 100);
            } else if (action === "reset") {
                state.zoom = 1;
                state.contrast = 100;
                state.invert = 0;
                toolbar.querySelectorAll(".toolbar-btn").forEach(b => b.classList.remove("active"));
            }

            img.style.transform = `scale(${state.zoom})`;
            img.style.filter = `contrast(${state.contrast}%) invert(${state.invert}%)`;
        });
    });
}

function resetImageViewerTransforms() {
    ["img-output-original", "img-output-heatmap"].forEach(id => {
        const img = el(id);
        if (img) {
            img.style.transform = "scale(1)";
            img.style.filter = "contrast(100%) invert(0%)";
        }
    });
    document.querySelectorAll(".viewport-toolbar .toolbar-btn").forEach(b => b.classList.remove("active"));
}

async function checkEngineStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/status`);
        const data = await response.json();
        const badge = el("engine-status");
        const badgeText = el("engine-status-text");
        if (badge && badgeText) {
            if (data.success) {
                badge.classList.remove("offline");
                badgeText.textContent = `AI ENGINE: ONLINE (${data.ai_model || 'EfficientNet-B0'})`;
            } else {
                badge.classList.add("offline");
                badgeText.textContent = `AI ENGINE: OFFLINE`;
            }
        }
    } catch {
        const badge = el("engine-status");
        const badgeText = el("engine-status-text");
        if (badge && badgeText) {
            badge.classList.add("offline");
            badgeText.textContent = `AI ENGINE: DEMO FALLBACK`;
        }
    }
}

