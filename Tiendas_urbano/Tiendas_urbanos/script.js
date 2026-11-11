
const accesoUsuario = document.getElementById("accesoUsuario");
const registroUsuario = document.getElementById("registroUsuario");

const irRegistro = document.getElementById("irRegistro");
const irAcceso = document.getElementById("irAcceso");

irRegistro.addEventListener("click", function(event) {
    event.preventDefault();

    accesoUsuario.classList.add("ocultar-form");
    registroUsuario.classList.remove("ocultar-form");
});

irAcceso.addEventListener("click", function(event) {
    event.preventDefault();

    registroUsuario.classList.add("ocultar-form");
    accesoUsuario.classList.remove("ocultar-form");
});

registroUsuario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombreUsuario").value.trim();
    const correo = document.getElementById("emailRegistro").value.trim().toLowerCase();
    const password = document.getElementById("claveRegistro").value;
    const confirmar = document.getElementById("repetirClave").value;

    if (password !== confirmar) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuariosUrbano")) || [];

    const usuarioExiste = usuarios.some(function(usuario) {
        return usuario.correo === correo;
    });

    if (usuarioExiste) {
        alert("Este correo ya está registrado.");
        return;
    }

    const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        password: password
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuariosUrbano", JSON.stringify(usuarios));

    alert("¡Cuenta creada correctamente!");

    registroUsuario.reset();

    registroUsuario.classList.add("ocultar-form");
    accesoUsuario.classList.remove("ocultar-form");

    document.getElementById("correo").value = correo;
});

accesoUsuario.addEventListener("submit", function(event) {
    event.preventDefault();

    const correo = document.getElementById("emailAcceso").value.trim().toLowerCase();
    const password = document.getElementById("claveAcceso").value;

    let usuarios = JSON.parse(localStorage.getItem("usuariosUrbano")) || [];

    const usuarioEncontrado = usuarios.find(function(usuario) {
        return usuario.correo === correo && usuario.password === password;
    });

    if (usuarioEncontrado) {
        alert("¡Bienvenido a Tiendas Urbano, " + usuarioEncontrado.nombre + "!");

        localStorage.setItem("sesionUrbano", JSON.stringify({
            nombre: usuarioEncontrado.nombre,
            correo: usuarioEncontrado.correo
        }));

        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});


