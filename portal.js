// Simple data storage
let assignments = [
    { id: 1, subject: "Math", title: "Algebra Homework", status: "submitted", grade: "--" },
    { id: 2, subject: "Physics", title: "Lab Report", status: "graded", grade: "85%" },
    { id: 3, subject: "Programming", title: "C++ Project", status: "submitted", grade: "--" }
];

let currentUser = null;

// Login (simple)
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    
    const id = document.getElementById('studentId').value;
    const pass = document.getElementById('password').value;
    
    if (id === "s1001" && pass === "pass123") {
        currentUser = { name: "Alex Johnson" };
        showMainPortal();
    } else {
        alert("Use: s1001 / pass123");
    }
};

// Show main portal
function showMainPortal() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainPortal').classList.remove('hidden');
    document.getElementById('welcomeName').textContent = "Alex";
    loadAssignments('all');
}

// Logout
function logout() {
    if (confirm("Logout?")) {
        currentUser = null;
        document.getElementById('loginPage').style.display = 'block';
        document.getElementById('mainPortal').classList.add('hidden');
    }
}

// Show section
function showSection(sectionId) {
    // Hide all
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    // Show selected
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
    
    // Load content
    if (sectionId === 'assignments') loadAssignments('all');
    if (sectionId === 'dashboard') updateDashboard();
}

// Load assignments
function loadAssignments(filterType) {
    const container = document.getElementById('assignmentList');
    container.innerHTML = '';
    
    // Update filter buttons
    document.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));
    
    // Make clicked button active
    event ? event.target.classList.add('active') : 
           document.querySelector('.filter').classList.add('active');
    
    // Filter assignments
    let filtered = assignments;
    if (filterType !== 'all') {
        filtered = assignments.filter(a => a.status === filterType);
    }
    
    // Display
    if (filtered.length === 0) {
        container.innerHTML = '<p>No assignments</p>';
        return;
    }
    
    filtered.forEach(assignment => {
        const div = document.createElement('div');
        div.className = 'assignment-item';
        div.innerHTML = `
            <h4>${assignment.subject}: ${assignment.title}</h4>
            <p>Status: <span class="status-badge ${assignment.status}">${assignment.status}</span></p>
            <p>Grade: ${assignment.grade}</p>
        `;
        container.appendChild(div);
    });
}

// Submit assignment (simple)
function submitAssignment() {
    const subject = document.getElementById('subject').value;
    const title = document.getElementById('title').value;
    
    if (!subject || !title) {
        alert("Please fill all fields!");
        return;
    }
    
    const newAssignment = {
        id: assignments.length + 1,
        subject: subject,
        title: title,
        status: "submitted",
        grade: "--"
    };
    
    assignments.push(newAssignment);
    alert("Assignment submitted!");
    
    // Clear form
    document.getElementById('subject').value = '';
    document.getElementById('title').value = '';
    document.getElementById('fileName').textContent = 'No file selected';
    
    // Refresh
    loadAssignments('all');
    showSection('assignments');
}

// File selection
document.getElementById('file').onchange = function(e) {
    if (e.target.files[0]) {
        document.getElementById('fileName').textContent = e.target.files[0].name;
    }
};

// Update dashboard stats
function updateDashboard() {
    const submitted = assignments.filter(a => a.status === 'submitted').length;
    const graded = assignments.filter(a => a.status === 'graded').length;
    
    document.getElementById('submittedStat').textContent = submitted;
    document.getElementById('pendingStat').textContent = assignments.length - submitted - graded;
}

// On page load
window.onload = function() {
    // File upload
    document.getElementById('file').onchange = function(e) {
        if (e.target.files[0]) {
            document.getElementById('fileName').textContent = e.target.files[0].name;
        }
    };
    
    // Auto login for testing (remove later)
    document.getElementById('studentId').value = "s1001";
    document.getElementById('password').value = "pass123";
};