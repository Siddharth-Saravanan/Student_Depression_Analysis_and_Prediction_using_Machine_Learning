// MOCK DATA STORAGE
let database = [
    { id: 'STU-102', date: '02/05/2026', risk: 'Low', score: '0.12' },
    { id: 'STU-105', date: '02/05/2026', risk: 'High', score: '0.88' }
];

lucide.createIcons();

// NAVIGATION LOGIC
function switchView(viewName) {
    const titles = {
        assessment: 'Predictive Diagnostics',
        dashboard: 'Student Analytics'
    };
    document.getElementById('page-title').innerText =
        titles[viewName] || 'Depredictor';

    document.querySelectorAll('.view-panel').forEach(v =>
        v.classList.add('hidden')
    );
    document
        .getElementById(`view-${viewName}`)
        .classList.remove('hidden');

    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove(
            'bg-blue-600',
            'text-white',
            'shadow-lg',
            'shadow-blue-100'
        );
        n.classList.add('text-slate-500', 'hover:bg-slate-100');
    });

    const activeNav = document.getElementById(`nav-${viewName}`);
    if (activeNav) {
        activeNav.classList.remove('text-slate-500', 'hover:bg-slate-100');
        activeNav.classList.add(
            'bg-blue-600',
            'text-white',
            'shadow-lg',
            'shadow-blue-100'
        );
    }

    if (viewName === 'dashboard') renderTable();
}

// SLIDER HELPER
function updateLabel(id) {
    document.getElementById(`${id}-display`).innerText =
        document.getElementById(id).value + '/5';
}

// ANALYSIS SUBMISSION
document.getElementById('wellness-form').onsubmit = function (e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');

    document.getElementById('state-empty').classList.add('hidden');
    document.getElementById('state-result').classList.add('hidden');
    document.getElementById('state-loading').classList.remove('hidden');
    btn.disabled = true;
    btn.innerText = 'Analyzing Student Profile...';

    setTimeout(() => {
        const pressure = parseInt(
            document.getElementById('pressure').value
        );
        const financial = parseInt(
            document.getElementById('financial').value
        );
        const cgpa = parseFloat(document.getElementById('cgpa').value);
        const stuId = document.getElementById('studentId').value;

        // Mock logic simulating your notebook's findings
        const isHigh = pressure + financial > 7 || cgpa < 6.5;

        const riskText = document.getElementById('risk-text');
        const riskEmote = document.getElementById('risk-emote');
        const riskDesc = document.getElementById('risk-desc');

        if (isHigh) {
            riskText.innerText = 'High Risk Profile';
            riskText.className = 'text-3xl font-black mt-1 text-red-600';
            riskEmote.innerText = '⚠️';
            riskDesc.innerText =
                'Indicators suggest significant academic and lifestyle stressors. Immediate clinical intake session is recommended to review coping mechanisms.';
        } else {
            riskText.innerText = 'Low Risk Profile';
            riskText.className =
                'text-3xl font-black mt-1 text-green-600';
            riskEmote.innerText = '✅';
            riskDesc.innerText =
                'Lifestyle factors and academic metrics are within stable ranges. Current wellness protocols appear effective. Continue routine observation.';
        }

        document.getElementById('state-loading').classList.add('hidden');
        document.getElementById('state-result').classList.remove('hidden');
        document.getElementById('result-card').className =
            'p-8 rounded-3xl bg-white border border-slate-200 shadow-sm transition-all duration-500 flex flex-col justify-center min-h-[400px]';

        btn.disabled = false;
        btn.innerText = 'Execute ML Diagnostic Analysis';

        // Update mock history
        database.unshift({
            id: stuId,
            date: new Date().toLocaleDateString(),
            risk: isHigh ? 'High' : 'Low',
            score: '0.87'
        });
    }, 1200);
};

// RENDER TABLE
function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = database
        .map(
            r => `
        <tr class="hover:bg-slate-50 transition">
            <td class="px-8 py-4 font-bold text-slate-700">${r.id}</td>
            <td class="px-8 py-4 text-slate-500">${r.date}</td>
            <td class="px-8 py-4">
                <span class="px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    r.risk === 'High'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-green-50 text-green-600'
                }">${r.risk} Risk</span>
            </td>
            <td class="px-8 py-4 font-mono text-slate-400 font-bold tracking-tight">${
                r.score
            }</td>
        </tr>`
        )
        .join('');
}
