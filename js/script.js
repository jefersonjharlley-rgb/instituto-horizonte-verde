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
        iniciarAltoContraste();
    }
);

function iniciarAltoContraste() {
    const botaoContraste = document.querySelector(".contraste-toggle");

    if (!botaoContraste) {
        return;
    }

    const modoEscuroAtivo =
        localStorage.getItem("modoescuro") === "true";

    if (modoEscuroAtivo) {
        document.body.classList.add("alto-contraste");
        botaoContraste.setAttribute("aria-pressed", "true");
        botaoContraste.setAttribute(
            "aria-label",
            "Desativar modo escuro"
        );
    }

    botaoContraste.addEventListener("click", () => {
        const ativo = document.body.classList.toggle("alto-contraste");

        localStorage.setItem("modoescuro", ativo);

        botaoContraste.setAttribute(
            "aria-pressed",
            String(ativo)
        );

        botaoContraste.setAttribute(
            "aria-label",
            ativo
                ? "Desativar modo escuro"
                : "Ativar modo escuro"
        );
    });
}