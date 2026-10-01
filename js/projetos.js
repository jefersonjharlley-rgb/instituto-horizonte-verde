/* =========================================================
   SISTEMA DE TEMPLATES DOS PROJETOS
   ========================================================= */

/**
 * Lê os projetos existentes no HTML e transforma
 * cada card em um objeto JavaScript.
 *
 * @returns {Array} Lista de projetos.
 */
export function obterDadosProjetos() {
    const elementos =
        document.querySelectorAll(
            ".lista-projetos .projeto"
        );

    return Array.from(
        elementos
    ).map((projeto) => {

        const icone =
            projeto.querySelector(".icone");

        const etiqueta =
            projeto.querySelector(".etiqueta");

        const titulo =
            projeto.querySelector("h3");

        const descricao = projeto.querySelector("p:not(.etiqueta)");

        const itens =
            projeto.querySelectorAll("li");

        return {
            id: projeto.id,

            icone:
                icone
                    ? icone.textContent.trim()
                    : "",

            categoria:
                etiqueta
                    ? etiqueta.textContent.trim()
                    : "",

            titulo:
                titulo
                    ? titulo.textContent.trim()
                    : "",

            descricao:
                descricao
                    ? descricao.textContent.trim()
                    : "",

            itens:
                Array.from(
                    itens
                ).map(
                    (item) =>
                        item.textContent.trim()
                )
        };
    });
}


/**
 * Gera novamente os cards dos projetos
 * utilizando Template Literals e map().
 */
export function renderizarProjetos() {
    const container =
        document.querySelector(
            ".lista-projetos"
        );

    if (!container) {
        return;
    }

    /*
     * Captura os dados que já estão
     * presentes no HTML.
     */
    const projetos =
        obterDadosProjetos();

    /*
     * Limpa o container e gera novamente
     * os componentes a partir dos dados.
     */
    container.innerHTML =
        projetos
            .map(
                (projeto) => `
                    <article
                        class="projeto"
                        id="${projeto.id}"
                    >

                        ${projeto.icone
                        ? `
                                    <span
                                        class="icone"
                                        aria-hidden="true"
                                    >
                                        ${projeto.icone}
                                    </span>
                                  `
                        : ""
                    }

                        ${projeto.categoria
                        ? `
                                    <span class="etiqueta">
                                        ${projeto.categoria}
                                    </span>
                                  `
                        : ""
                    }

                        <h3>
                            ${projeto.titulo}
                        </h3>

                        <p>
                            ${projeto.descricao}
                        </p>

                        <ul>
                            ${projeto.itens
                        .map(
                            (item) => `
                                            <li>
                                                ${item}
                                            </li>
                                        `
                        )
                        .join("")
                    }
                        </ul>

                    </article>
                `
            )
            .join("");
}