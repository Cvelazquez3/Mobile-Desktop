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