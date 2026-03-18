const chain = document.getElementById('chain');
const body = document.body;

// 1. Lamp Pull & Shutter Control
chain.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    body.classList.toggle('dark-mode');
    // Pull animation
    chain.style.transform = "translateX(-50%) translateY(25px)";
    setTimeout(() => { chain.style.transform = "translateX(-50%) translateY(0px)"; }, 200);
});

// 2. Password Toggle Function
function togglePass(id, icon) {
    const field = document.getElementById(id);
    if (field.type === "password") {
        field.type = "text";
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        field.type = "password";
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// 3. Navigation between Sections
function showSection(id) {
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// 4. Registration Handler
function handleRegister() {
    const email = document.getElementById('reg-email').value;
    const pass = document.getElementById('reg-pass').value;
    const conf = document.getElementById('reg-conf').value;
    if (!email || !pass || pass !== conf) { alert("Check your inputs!"); return; }
    localStorage.setItem('user_' + email, JSON.stringify({ pass }));
    alert("Registration Successful!");
    document.getElementById('signup-form').reset();
    showSection('login-section');
}

// 5. Login Handler
function handleLogin() {
    const emailInp = document.getElementById('login-user');
    const passInp = document.getElementById('login-pass');
    const data = localStorage.getItem('user_' + emailInp.value);
    if (data && JSON.parse(data).pass === passInp.value) {
        alert("Login Successful!");
        emailInp.value = ""; passInp.value = "";
    } else alert("Invalid Credentials!");
}

// 6. Reset & Copy Handler
function handleReset() {
    const email = document.getElementById('reset-email').value;
    if (localStorage.getItem('user_' + email)) {
        const newP = "Neon@" + Math.floor(1000 + Math.random() * 9000);
        let user = JSON.parse(localStorage.getItem('user_' + email));
        user.pass = newP;
        localStorage.setItem('user_' + email, JSON.stringify(user));
        document.getElementById('new-pass-text').innerText = newP;
        document.querySelector('.pass-display-box').style.display = "block";
    } else alert("Email not found!");
}

function copyPass() {
    const pText = document.getElementById('new-pass-text').innerText;
    navigator.clipboard.writeText(pText).then(() => {
        alert("Copied!");
        document.getElementById('reset-email').value = "";
        document.querySelector('.pass-display-box').style.display = "none";
    });
}
