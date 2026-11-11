
const abrirCuenta = document.getElementById("abrirCuenta");

const sesionActiva = JSON.parse(localStorage.getItem("sesionUrbano"));

if (sesionActiva) {
    const nombreUsuario = document.createElement("span");

    nombreUsuario.textContent = sesionActiva.nombre;
    nombreUsuario.style.marginLeft = "8px";
    nombreUsuario.style.fontWeight = "bold";
    nombreUsuario.style.fontSize = "13px";

    abrirCuenta.insertAdjacentElement("afterend", nombreUsuario);

    abrirCuenta.title = "Cuenta de " + sesionActiva.nombre;

    abrirCuenta.addEventListener("click", function(event) {
        event.preventDefault();

        const cerrarSesion = confirm(
            "Hola " + sesionActiva.nombre +
            "\nCorreo: " + sesionActiva.correo +
            "\n\n¿Quieres cerrar sesión?"
        );

        if (cerrarSesion) {
            localStorage.removeItem("sesionUrbano");
            window.location.reload();
        }
    });
}
