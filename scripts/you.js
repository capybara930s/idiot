/* ========================================================================
   Versión INOFENSIVA de youareanidiot (you.js) - Activación por Clic
   Segura para ejecutar en cualquier navegador moderno.
   ======================================================================== */

// Variable global para controlar el objeto de audio
var audioOriginal = null;

window.addEventListener('load', iniciarScript);

function iniciarScript() {
    // Intentar buscar el elemento audio del HTML
    audioOriginal = document.getElementById('youare-audio');
    
    // Si no existe en el HTML, lo creamos dinámicamente de respaldo
    if (!audioOriginal) {
        audioOriginal = new Audio('youare.mp3');
        audioOriginal.loop = true;
    }

    var micon = document.getElementById('youare-micon');
    
    // Configuración del icono del altavoz si existe en el HTML
    if (micon) {
        micon.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que interfiera con el clic de la pantalla
            toggleAudio(micon);
        });
    }
    
    // ESCUCHADOR PRINCIPAL: Al hacer clic en CUALQUIER PARTE de la pantalla, arranca el sonido
    document.addEventListener('click', function reproducirPorClic() {
        if (audioOriginal) {
            audioOriginal.muted = false;
            audioOriginal.play()
                .then(function() {
                    console.log("Audio activado con éxito mediante interacción del usuario.");
                    if (micon) micon.src = "images/speaker.png";
                    // Removemos el evento para que no intente ejecutar .play() en cada clic posterior
                    document.removeEventListener('click', reproducirPorClic);
                })
                .catch(function(error) {
                    console.log("Error al intentar reproducir:", error);
                });
        }
    });
}

// Función auxiliar para pausar/reproducir manualmente desde el icono
function toggleAudio(micon) {
    if (!audioOriginal) return;
    
    if (audioOriginal.paused) {
        audioOriginal.muted = false;
        audioOriginal.play();
        if (micon) micon.src = "images/speaker.png";
    } else {
        audioOriginal.pause();
        if (micon) micon.src = "images/speakerm.png";
    }
}

/* ========================================================================
   SECCIÓN NEUTRALIZADA - Funciones del troyano original desactivadas
   ======================================================================== */

function changeTitle(title) {
    document.title = title;
}

function proCreate() {	
    // Desactivado: Ya no abre ventanas infinitas
    console.log("Intento de pop-up bloqueado de forma segura.");
}

function playBall() {
    // Desactivado: La ventana ya no se moverá por la pantalla
}

window.oncontextmenu = function() {
    return true; // Desactivado: Permite usar el clic derecho normalmente
}

window.onmouseout = function () {
    return null; // Desactivado: El mouse puede salir sin lanzar pop-ups
};

window.onkeydown = function() {	
    return null; // Desactivado: Ya no bloquea las teclas del teclado (Ctrl, Alt, F4, etc.)
}

window.onbeforeunload = function() {
    return null; // Desactivado: Permite cerrar la pestaña inmediatamente sin molestar
};
