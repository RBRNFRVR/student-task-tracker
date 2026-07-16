// ===== STATE =====
let currentUser = null;
let tasks = [];
let subjects = [];
let currentView = 'dashboard';

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
    await checkAuth();
});

async function checkAuth() {
    try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
            currentUser = await res.json();
            await initApp();
        } else {
            showAuthScreen();
        }
    } catch {
        showAuthScreen();
    }
}

async function initApp() {
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    document.getElementById('sidebar-username').textContent = currentUser.username;
    setGreeting();
    await Promise.all([loadSubjects(), loadTasks()]);
    renderDashboard();
}

function showAuthScreen() {
    document.getElementById('auth-screen').classList.remove('hidden');
    document.getElementById('app').classList.add('hidden');
}

// ===== AUTH =====
function showTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.add('hidden'));
    event.currentTarget.classList.add('active');
    document.getElementById(tab + '-form').classList.remove('hidden');
}

async function handleLogin(e) {
    e.preventDefault();
    const errEl = document.getElementById('login-error');
    errEl.classList.add('hidden');
    const body = {
        username: document.getElementById('login-username').value.trim(),
        password: document.getElementById('login-password').value
    };
    const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    const data = await res.json();
    document.getElementById('login-password').value = '';
    if (res.ok) {
        currentUser = data;
        await initApp();
    } else {
        errEl.textContent = data.error || 'Login failed';
        errEl.classList.remove('hidden');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const errEl = document.getElementById('reg-error');
    const succEl = document.getElementById('reg-success');
    errEl.classList.add('hidden');
    succEl.classList.add('hidden');
    const body = {
        username: document.getElementById('reg-username').value.trim(),
        email: document.getElementById('reg-email').value.trim(),
        password: document.getElementById('reg-password').value
    };
    const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
        succEl.textContent = 'Account created! You can now log in.';
        succEl.classList.remove('hidden');
        document.getElementById('register-form').reset();
        setTimeout(() => {
            document.querySelectorAll('.tab-btn')[0].click();
            document.getElementById('login-username').value = body.username;
        }, 1200);
    } else {
        document.getElementById('reg-password').value = '';
        errEl.textContent = data.error || 'Registration failed';
        errEl.classList.remove('hidden');
    }
}

async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    currentUser = null; tasks = []; subjects = [];
    showAuthScreen();
}

// ===== DATA LOADING =====
async function loadTasks() {
    const res = await fetch('/api/tasks');
    if (res.ok) tasks = await res.json();
}

async function loadSubjects() {
    const res = await fetch('/api/subjects');
    if (res.ok) {
        subjects = await res.json();
        renderSidebarSubjects();
        populateSubjectFilters();
    }
}

async function loadSummary() {
    const res = await fetch('/api/tasks/summary');
    if (res.ok) {
        const s = await res.json();
        document.getElementById('sum-total').textContent = s.total;
        document.getElementById('sum-not-started').textContent = s.notStarted;
        document.getElementById('sum-in-progress').textContent = s.inProgress;
        document.getElementById('sum-completed').textContent = s.completed;
    }
}

// ===== VIEWS =====
function showView(name, linkEl) {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('view-' + name).classList.remove('hidden');
    if (linkEl) linkEl.classList.add('active');
    currentView = name;
    if (name === 'dashboard') renderDashboard();
    if (name === 'tasks') renderTasks();
    if (name === 'subjects') renderSubjects();
}

// ===== DASHBOARD =====
function renderDashboard() {
    loadSummary();
    const upcoming = tasks
        .filter(t => t.status !== 'COMPLETED')
        .slice(0, 10);
    const el = document.getElementById('dashboard-tasks');
    el.innerHTML = upcoming.length === 0
        ? emptyState('🎉', 'No pending tasks! Add one to get started.')
        : upcoming.map(taskCard).join('');
}

function setGreeting() {
    const h = new Date().getHours();
    const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    document.getElementById('dashboard-greeting').textContent = `${g}, ${currentUser.username}!`;
}

// ===== TASK LIST =====
function renderTasks() {
    const status = document.getElementById('filter-status').value;
    const priority = document.getElementById('filter-priority').value;
    const subjectId = document.getElementById('filter-subject').value;
    const search = document.getElementById('filter-search').value.toLowerCase();

    const filtered = tasks.filter(t => {
        if (status && t.status !== status) return false;
        if (priority && t.priority !== priority) return false;
        if (subjectId && String(t.subjectId) !== subjectId) return false;
        if (search && !t.title.toLowerCase().includes(search) &&
            !(t.description || '').toLowerCase().includes(search)) return false;
        return true;
    });

    document.getElementById('tasks-list').innerHTML = filtered.length === 0
        ? emptyState('🔍', 'No tasks match your filters.')
        : filtered.map(taskCard).join('');
}

function taskCard(t) {
    const due = formatDue(t.dueDate);
    const nextStatus = t.status === 'NOT_STARTED' ? 'IN_PROGRESS'
        : t.status === 'IN_PROGRESS'  ? 'COMPLETED'
            : 'NOT_STARTED';
    const checkClass = t.status === 'COMPLETED'  ? 'checked'
        : t.status === 'IN_PROGRESS' ? 'in-progress' : '';
    const cardClass = t.status === 'COMPLETED' ? 'task-card completed' : 'task-card';

    const subjectHtml = t.subjectName
        ? `<span class="subject-badge" style="background:${t.subjectColor}22;color:${t.subjectColor}">
         <span class="subject-dot" style="background:${t.subjectColor}"></span>
         ${escape(t.subjectName)}
       </span>`
        : '';

    const estHtml = t.estimatedMinutes
        ? `<span class="task-estimated">⏱ ${formatMinutes(t.estimatedMinutes)}</span>`
        : '';

    return `
    <div class="${cardClass}" id="task-${t.id}">
      <div class="task-check ${checkClass}" onclick="cycleStatus(${t.id}, '${nextStatus}')"></div>
      <div class="task-body">
        <div class="task-title">${escape(t.title)}</div>
        <div class="task-meta">
          <span class="badge badge-${t.priority.toLowerCase()}">${priorityLabel(t.priority)}</span>
          <span class="badge badge-${t.status.toLowerCase().replace('_','-')}">${statusLabel(t.status)}</span>
          ${subjectHtml}
          ${due ? `<span class="task-due ${due.cls}">${due.text}</span>` : ''}
          ${estHtml}
        </div>
      </div>
      <div class="task-actions">
        <button class="icon-btn" onclick="openTaskModal(${t.id})" title="Edit">✏️</button>
        <button class="icon-btn delete" onclick="confirmDelete('task', ${t.id})" title="Delete">🗑️</button>
      </div>
    </div>`;
}

async function cycleStatus(id, nextStatus) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toTaskRequest({ ...task, status: nextStatus }))
    });
    if (res.ok) {
        const saved = await res.json();
        tasks = tasks.map(t => t.id === id ? saved : t);
        if (currentView === 'dashboard') renderDashboard();
        else renderTasks();
        loadSummary();
    }
}

function renderSubjects() {
    const el = document.getElementById('subjects-grid');
    if (subjects.length === 0) {
        el.innerHTML = `<div style="grid-column:1/-1">${emptyState('📖', 'No subjects yet. Add one to categorize your tasks.')}</div>`;
        return;
    }
    el.innerHTML = subjects.map(s => `
    <div class="subject-card" style="border-top-color:${s.color}">
      <div class="subject-card-name">${escape(s.name)}</div>
      <div class="subject-card-count">${s.taskCount} task${s.taskCount !== 1 ? 's' : ''}</div>
      <div class="subject-card-actions">
        <button class="icon-btn" onclick="openSubjectModal(${s.id})" title="Edit">✏️</button>
        <button class="icon-btn delete" onclick="confirmDelete('subject', ${s.id})" title="Delete">🗑️</button>
      </div>
    </div>`).join('');
}

function renderSidebarSubjects() {
    const el = document.getElementById('sidebar-subjects');
    if (subjects.length === 0) { el.innerHTML = ''; return; }
    el.innerHTML = '<div class="sidebar-section-label">Subjects</div>' +
        subjects.map(s => `
      <div class="sidebar-subject-item">
        <div class="subject-dot" style="background:${s.color}"></div>
        <span>${escape(s.name)}</span>
      </div>`).join('');
}

function populateSubjectFilters() {
    const filterSel = document.getElementById('filter-subject');
    const taskSel = document.getElementById('task-subject');
    const saved = filterSel.value;
    filterSel.innerHTML = '<option value="">All Subjects</option>' +
        subjects.map(s => `<option value="${s.id}">${escape(s.name)}</option>`).join('');
    filterSel.value = saved;
    taskSel.innerHTML = '<option value="">None</option>' +
        subjects.map(s => `<option value="${s.id}">${escape(s.name)}</option>`).join('');
}

function openTaskModal(id) {
    const modal = document.getElementById('task-modal');
    document.getElementById('task-form').reset();
    document.getElementById('task-id').value = '';
    document.getElementById('task-form-error').classList.add('hidden');
    populateSubjectFilters();

    if (id) {
        const task = tasks.find(t => t.id === id);
        if (!task) return;
        document.getElementById('task-modal-title').textContent = 'Edit Task';
        document.getElementById('task-submit-btn').textContent = 'Update Task';
        document.getElementById('task-id').value = task.id;
        document.getElementById('task-title').value = task.title;
        document.getElementById('task-description').value = task.description || '';
        document.getElementById('task-due').value = task.dueDate ? toDatetimeLocal(task.dueDate) : '';
        document.getElementById('task-priority').value = task.priority;
        document.getElementById('task-status').value = task.status;
        document.getElementById('task-estimated').value = task.estimatedMinutes || '';
        document.getElementById('task-subject').value = task.subjectId || '';
    } else {
        document.getElementById('task-modal-title').textContent = 'New Task';
        document.getElementById('task-submit-btn').textContent = 'Save Task';
    }
    modal.classList.remove('hidden');
}

async function handleTaskSubmit(e) {
    e.preventDefault();
    const errEl = document.getElementById('task-form-error');
    errEl.classList.add('hidden');
    const id = document.getElementById('task-id').value;
    const dueVal = document.getElementById('task-due').value;
    const subjectVal = document.getElementById('task-subject').value;
    const body = {
        title: document.getElementById('task-title').value.trim(),
        description: document.getElementById('task-description').value.trim() || null,
        dueDate: dueVal ? new Date(dueVal).toISOString().slice(0, 19) : null,
        priority: document.getElementById('task-priority').value,
        status: document.getElementById('task-status').value,
        estimatedMinutes: document.getElementById('task-estimated').value
            ? parseInt(document.getElementById('task-estimated').value) : null,
        subjectId: subjectVal ? parseInt(subjectVal) : null
    };
    const res = await fetch(id ? `/api/tasks/${id}` : '/api/tasks', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
        if (id) tasks = tasks.map(t => t.id === parseInt(id) ? data : t);
        else tasks = [data, ...tasks];
        closeModal('task-modal');
        await loadSubjects();
        if (currentView === 'dashboard') renderDashboard();
        else if (currentView === 'tasks') renderTasks();
        loadSummary();
    } else {
        errEl.textContent = data.error || 'Failed to save task';
        errEl.classList.remove('hidden');
    }
}

// ===== SUBJECT MODAL =====
function openSubjectModal(id) {
    document.getElementById('subject-form').reset();
    document.getElementById('subject-id').value = '';
    document.getElementById('subject-color').value = '#6366f1';
    document.getElementById('subject-form-error').classList.add('hidden');

    if (id) {
        const s = subjects.find(s => s.id === id);
        if (!s) return;
        document.getElementById('subject-modal-title').textContent = 'Edit Subject';
        document.getElementById('subject-id').value = s.id;
        document.getElementById('subject-name').value = s.name;
        document.getElementById('subject-color').value = s.color;
    } else {
        document.getElementById('subject-modal-title').textContent = 'New Subject';
    }
    document.getElementById('subject-modal').classList.remove('hidden');
}

async function handleSubjectSubmit(e) {
    e.preventDefault();
    const errEl = document.getElementById('subject-form-error');
    errEl.classList.add('hidden');
    const id = document.getElementById('subject-id').value;
    const body = {
        name: document.getElementById('subject-name').value.trim(),
        color: document.getElementById('subject-color').value
    };
    const res = await fetch(id ? `/api/subjects/${id}` : '/api/subjects', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
        if (id) subjects = subjects.map(s => s.id === parseInt(id) ? data : s);
        else subjects = [...subjects, data];
        closeModal('subject-modal');
        renderSidebarSubjects();
        populateSubjectFilters();
        if (currentView === 'subjects') renderSubjects();
    } else {
        errEl.textContent = data.error || 'Failed to save subject';
        errEl.classList.remove('hidden');
    }
}

// ===== DELETE FLOW =====
function confirmDelete(type, id) {
    const msg = type === 'task'
        ? 'Delete this task? This cannot be undone.'
        : 'Delete this subject? Tasks assigned to it will lose their subject.';
    document.getElementById('confirm-message').textContent = msg;
    document.getElementById('confirm-btn').onclick = () => performDelete(type, id);
    document.getElementById('confirm-modal').classList.remove('hidden');
}

async function performDelete(type, id) {
    closeModal('confirm-modal');
    const url = type === 'task' ? `/api/tasks/${id}` : `/api/subjects/${id}`;
    const res = await fetch(url, { method: 'DELETE' });
    if (res.ok) {
        if (type === 'task') {
            tasks = tasks.filter(t => t.id !== id);
            if (currentView === 'dashboard') renderDashboard();
            else if (currentView === 'tasks') renderTasks();
            loadSummary();
        } else {
            subjects = subjects.filter(s => s.id !== id);
            await loadTasks();
            renderSidebarSubjects();
            populateSubjectFilters();
            if (currentView === 'subjects') renderSubjects();
            else if (currentView === 'dashboard') renderDashboard();
            else if (currentView === 'tasks') renderTasks();
        }
    }
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function closeModalOnOverlay(e, id) {
    if (e.target.id === id) closeModal(id);
}


function formatDue(isoStr) {
    if (!isoStr) return null;
    const due = new Date(isoStr);
    const now = new Date();
    const diff = due - now;

    if (diff < 0) {
        return { text: `Overdue since ${formatDate(due)}`, cls: 'overdue' };
    }

    const totalMinutes = Math.floor(diff / 60000);
    const totalHours   = Math.floor(diff / 3600000);
    const days         = Math.floor(diff / 86400000);
    const hours        = Math.floor((diff % 86400000) / 3600000);
    const minutes      = Math.floor((diff % 3600000) / 60000);

    let text;
    if (totalMinutes < 60) {
        text = `${totalMinutes}m left`;
    } else if (totalHours < 24) {
        text = `${hours}h ${minutes > 0 ? minutes + 'm ' : ''}left`;
    } else {
        text = `${days}d ${hours > 0 ? hours + 'h ' : ''}left`;
    }

    const cls = days <= 3 ? 'due-soon' : '';
    return { text, cls };
}

function formatDate(d) {
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function formatMinutes(m) {
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    const rem = m % 60;
    return rem ? `${h}h ${rem}m` : `${h}h`;
}

function toDatetimeLocal(iso) {
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function toTaskRequest(t) {
    return {
        title: t.title,
        description: t.description || null,
        dueDate: t.dueDate ? new Date(t.dueDate).toISOString().slice(0, 19) : null,
        priority: t.priority,
        status: t.status,
        estimatedMinutes: t.estimatedMinutes || null,
        subjectId: t.subjectId || null
    };
}

function priorityLabel(p) {
    return p === 'HIGH' ? '🔴 High' : p === 'MEDIUM' ? '🟡 Medium' : '🟢 Low';
}

function statusLabel(s) {
    return s === 'NOT_STARTED' ? 'Not Started'
        : s === 'IN_PROGRESS' ? 'In Progress'
            : 'Completed';
}

function escape(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function emptyState(icon, msg) {
    return `<div class="empty-state"><div class="empty-icon">${icon}</div><p>${msg}</p></div>`;
}