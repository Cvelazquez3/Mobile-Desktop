const container = document.getElementById("contenido");

const returnButton = `<a href="#" class="button secondary" data-action="home"><i class="fa-solid fa-house"></i> Volver</a>`;

const home = `
<section class="home" aria-labelledby="titulo-principal">
    <h1 id="titulo-principal">Servicios disponibles</h1>

    <article class="card">
        <h2 id="home-login-title">Iniciar sesión</h2>
        <p id="login-desc">Accede a tu cuenta para gestionar tus trámites.</p>
        <a href="#login" class="button" aria-describedby="login-desc">
            <i class="fa-solid fa-user"></i>
            Iniciar sesión
        </a>
    </article>

    <article class="card">
        <h2 id="home-process-title">Consultar trámites</h2>
        <p id="process-desc">Consulta el estado de trámites en tiempo real.</p>
        <a href="#process" class="button secondary" aria-describedby="process-desc">
            <i class="fa-solid fa-circle-question"></i>
            Consultar trámites
        </a>
    </article>
</section>
`;

const login = `
<section class="login" aria-labelledby="login-title">
    ${returnButton}

    <div class="card">
        <h1 id="login-title">Iniciar sesión</h1>
        <form action="https://www.comalagob.mx/login" method="post">
            
            <div class="form-group">
                <label for="email">
                    <i class="fa-solid fa-envelope" aria-hidden="true"></i>
                    Correo electrónico
                </label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    autocomplete="email"
                    required
                >
            </div>

            <div class="form-group">
                <label for="password">
                    <i class="fa-solid fa-lock" aria-hidden="true"></i>
                    Contraseña
                </label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    autocomplete="current-password"
                    required
                >
            </div>

            <button type="submit">
                <i class="fa-solid fa-right-to-bracket" aria-hidden="true"></i>
                Acceder
            </button>

        </form>
    </div>
</section>
`;

const process = `
<section class="process" aria-labelledby="consulta-title">
    ${returnButton}

    <div class="card">
        <h1 id="consulta-title">Consulta de trámite</h1>

        <form action="#" method="get">
            
            <div class="form-group">
                <label for="clave">
                    <i class="fa-solid fa-file-lines" aria-hidden="true"></i>
                    Clave catastral
                </label>
                <input 
                    type="text" 
                    id="clave" 
                    name="clave_catastral" 
                    required
                    autocomplete="off"
                >
            </div>

            <div class="form-group">
                <label for="tramite">
                    <i class="fa-solid fa-list" aria-hidden="true"></i>
                    Tipo de trámite
                </label>
                <select id="tramite" name="id_tramite" required>
                    <option value="">Selecciona una opción</option>
                    <option value="1">Asignación</option>
                </select>
            </div>

            <div class="form-group">
                <label for="ano">
                    <i class="fa-solid fa-calendar" aria-hidden="true"></i>
                    Año
                </label>
                <input 
                    type="number" 
                    id="ano" 
                    name="ano" 
                    min="1900" 
                    max="2100"
                    required
                >
            </div>

            <div class="form-group">
                <label for="folio">
                    <i class="fa-solid fa-hashtag" aria-hidden="true"></i>
                    ID del trámite
                </label>
                <input 
                    type="number" 
                    id="folio" 
                    name="ano_id" 
                    required
                >
            </div>

            <button type="submit">
                <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                Buscar
            </button>

        </form>
    </div>
</section>
`;

function render() {
    const hash = location.hash;

    if (hash === "#login") container.innerHTML = `<div class="container">${login}</div>`;
    else if (hash === "#process") container.innerHTML = `<div class="container">${process}</div>`;
    else container.innerHTML = `<div class="container">${home}</div>`;

    // Move focus to first heading for keyboard users
    const firstHeading = container.querySelector('h1, h2');
    if(firstHeading){
        firstHeading.setAttribute('tabindex','-1');
        firstHeading.focus();
    }

    // Attach form handlers and other runtime bindings for dynamic content
    attachFormHandlers();
    updateNavActive();
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);

// Handle return/home action links via delegated listener
document.addEventListener('click', function(e){
    const btn = e.target.closest('[data-action="home"]');
    if(btn){
        e.preventDefault();
        location.hash = '';
    }
});

/* ---------------- Accessibility + Gamification helpers ---------------- */

const announcer = document.getElementById('announcer');
const progressEl = document.getElementById('progress');
const toastEl = document.getElementById('toast');

function announce(msg){
    if(announcer) announcer.textContent = msg;
}

function vibrate(pattern){
    try{ if(navigator.vibrate) navigator.vibrate(pattern); }catch(e){}
}

function setProgress(value){
    const v = Math.max(0, Math.min(100, Math.round(value)));
    if(progressEl){
        progressEl.style.width = v + '%';
        progressEl.setAttribute('aria-valuenow', String(v));
    }
    localStorage.setItem('md_progress', String(v));
}

function incrementProgress(amount){
    const cur = Number(localStorage.getItem('md_progress') || 0);
    setProgress(cur + amount);
}

function restoreProgress(){
    const cur = Number(localStorage.getItem('md_progress') || 0);
    setProgress(cur);
}

function showToast(message, timeout = 2200){
    if(!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    toastEl.classList.add('show');
    announce(message);
    setTimeout(()=>{
        toastEl.classList.remove('show');
        setTimeout(()=> toastEl.hidden = true, 300);
    }, timeout);
}

function updateNavActive(){
    const items = document.querySelectorAll('.bottom-nav-item');
    const hash = location.hash || '#';
    items.forEach(i=>{
        const nav = i.getAttribute('data-nav');
        if((hash === '' || hash === '#') && nav === 'home') i.classList.add('active'), i.setAttribute('aria-current','page');
        else if(('#'+nav) === hash) i.classList.add('active'), i.setAttribute('aria-current','page');
        else { i.classList.remove('active'); i.removeAttribute('aria-current'); }
    });
}

function attachFormHandlers(){
    restoreProgress();
    // Attach to any forms in the container
    const forms = container.querySelectorAll('form');
    forms.forEach(form=>{
        // prevent duplicate listeners
        if(form.__enhanced) return; form.__enhanced = true;

        form.addEventListener('submit', function(e){
            // For demo: prevent navigation on internal forms and show feedback
            if(form.getAttribute('action') === '#'){
                e.preventDefault();
                vibrate(20);
                incrementProgress(12);
                showToast('Búsqueda iniciada');
                announce('Búsqueda iniciada');
            } else {
                // external login submission: give feedback then allow submit
                vibrate([15,10,15]);
                incrementProgress(6);
                showToast('Enviando credenciales…');
            }
        });
    });

    // Bottom nav clicks
    const navItems = document.querySelectorAll('.bottom-nav-item');
    navItems.forEach(item=>{
        if(item.__bound) return; item.__bound = true;
        item.addEventListener('click', (ev)=>{
            const target = item.getAttribute('href');
            // let normal anchor behavior drive hashchange/render
            vibrate(10);
            setTimeout(()=> updateNavActive(), 120);
        });
    });

    // FAB behaviour
    const fab = document.querySelector('.fab');
    if(fab && !fab.__bound){
        fab.__bound = true;
        fab.addEventListener('click', (ev)=>{
            ev.preventDefault();
            vibrate([8]);
            location.hash = '#process';
            showToast('Abrir consulta');
        });
    }
}

// Initialize bindings for static controls
document.addEventListener('DOMContentLoaded', ()=>{
    restoreProgress();
    attachFormHandlers();
    // highlight nav if present
    updateNavActive();
});
