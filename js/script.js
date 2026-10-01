import { iniciarNavegacaoSPA } from "./spa.js";
import { renderizarProjetos } from "./projetos.js";
import { iniciarFormulario } from "./formulario.js";
import {
    iniciarMenu,
    iniciarSubmenu
} from "./navegacao.js";


/* =========================================================
   INICIALIZAÇÃO GERAL DA APLICAÇÃO
   ========================================================= */

function iniciarAplicacao() {
    iniciarFormulario();
    iniciarMenu();
    iniciarSubmenu();
    iniciarNavegacaoSPA();
    renderizarProjetos();
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {
        iniciarAplicacao();
    }
);