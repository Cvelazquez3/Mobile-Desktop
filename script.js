const container = document.getElementById("contenido");

const returnButtom = `<a href="#" class="button secondary"><i class="fa-solid fa-house"></i> Volver</a>`;

const home = `
<div class="home">
    <div class="card">
        <h2>Iniciar Sesión</h2>
        <p>Accede a tu cuenta para gestionar tus trámites.</p>
        <a href="#login" class="button">Iniciar Sesión</a>
    </div>

    <div class="card">
        <h2>Consultar Trámites</h2>
        <p>Consulta el estado de trámites en tiempo real.</p>
        <a href="#process" class="button secondary">Consultar Trámites</a>
    </div>
</div>
`;

const login = `
<div class="login">
    ${returnButtom}

    <div class="card">
        <h2>Login</h2>
        <form action="https://www.comalagob.mx/login" method="post">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Contraseña" required>
            <button>Acceder</button>
        </form>
    </div>
</div>
`;

const process = `
<div class="process">
    ${returnButtom}

    <div class="card">
        <h2>Consulta</h2>
        <form action="#">
            <input type="text" name="clave_catastral" placeholder="Clave catastral" required>
            <select name="id_tramite">
                <option value="1">Asignación</option>
            </select>
            <input type="number" name="ano" placeholder="Año" required>
            <input type="number" name="ano_id" placeholder="ID" required>
            <button>Buscar</button>
        </form>
    </div>
</div>
`;

function render() {
    const hash = location.hash;

    if (hash === "#login") container.innerHTML = login;
    else if (hash === "#process") container.innerHTML = process;
    else container.innerHTML = home;
}

window.addEventListener("hashchange", render);
window.addEventListener("load", render);