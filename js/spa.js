import { renderizarProjetos } from "./projetos.js";
import { iniciarFormulario } from "./formulario.js";


/* =========================================================
   SPA - HISTORY API E MANIPULAÇÃO DO DOM
   ========================================================= */

/**
 * Carrega o conteúdo principal de outra página sem
 * recarregar o documento inteiro.
 *
 * @param {string} url URL da página que será carregada.
 * @param {boolean} adicionarHistorico Define se a URL
 * será adicionada ao histórico do navegador.
 */
export async function carregarPagina(
    url,
    adicionarHistorico = true
) {
    const conteudoAtual =
        document.querySelector("#conteudo-principal");

    if (!conteudoAtual) {
        return;
    }

    try {
        const resposta = await fetch(url);

        if (!resposta.ok) {
            throw new Error(
                "Não foi possível carregar a página."
            );
        }

        const html = await resposta.text();

        const documento =
            new DOMParser().parseFromString(
                html,
                "text/html"
            );

        const novoConteudo =
            documento.querySelector(
                "#conteudo-principal"
            );

        if (!novoConteudo) {
            throw new Error(
                "O conteúdo principal não foi encontrado."
            );
        }

        /*
         * Substitui o conteúdo atual pelo conteúdo
         * encontrado na página solicitada.
         */
        conteudoAtual.innerHTML =
            novoConteudo.innerHTML;

        /*
         * Atualiza o título da página.
         */
        const novoTitulo =
            documento.querySelector("title");

        if (novoTitulo) {
            document.title =
                novoTitulo.textContent;
        }

        /*
         * Atualiza a URL sem recarregar
         * o documento inteiro.
         */
        if (adicionarHistorico) {
            history.pushState(
                {},
                "",
                url
            );
        }

        /*
         * Renderiza os projetos caso
         * estejam presentes na página.
         */
        renderizarProjetos();

        /*
         * Reativa o formulário caso
         * cadastro.html tenha sido carregado.
         */
        iniciarFormulario();

        /*
         * Verifica se existe uma âncora na URL.
         */
        const endereco =
            new URL(
                url,
                window.location.href
            );

        if (endereco.hash) {
            const elementoAlvo =
                document.querySelector(
                    endereco.hash
                );

            if (elementoAlvo) {
                elementoAlvo.scrollIntoView({
                    behavior: "smooth"
                });
            }
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    } catch (erro) {
        console.error(
            "Erro ao carregar a página:",
            erro
        );

        conteudoAtual.innerHTML = `
            <section class="secao container">
                <h1>
                    Não foi possível carregar a página.
                </h1>

                <p>
                    Tente novamente ou utilize o menu
                    para continuar a navegação.
                </p>
            </section>
        `;
    }
}


/**
 * Intercepta os links internos do site
 * para utilizar a navegação SPA.
 */
export function iniciarNavegacaoSPA() {
    document.addEventListener(
        "click",
        (evento) => {
            const link =
                evento.target.closest("a");

            if (!link) {
                return;
            }

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }

            /*
             * Ignora links externos,
             * e-mail e telefone.
             */
            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {
                return;
            }

            /*
             * Ignora links que abrem
             * em outra aba.
             */
            if (
                link.target === "_blank"
            ) {
                return;
            }

            const url =
                new URL(
                    href,
                    window.location.href
                );

            /*
             * Só intercepta páginas HTML
             * do próprio projeto.
             */
            if (
                !url.pathname.endsWith(".html")
            ) {
                return;
            }

            /*
             * Impede o comportamento padrão
             * do navegador.
             */
            evento.preventDefault();

            /*
             * Trata links com âncora
             * da própria página.
             */
            if (
                url.pathname ===
                window.location.pathname &&
                url.hash
            ) {
                history.pushState(
                    {},
                    "",
                    url.pathname +
                    url.hash
                );

                const elementoAlvo =
                    document.querySelector(
                        url.hash
                    );

                if (elementoAlvo) {
                    elementoAlvo.scrollIntoView({
                        behavior: "smooth"
                    });
                }

                return;
            }

            /*
             * Carrega a nova página
             * sem recarregar o documento.
             */
            carregarPagina(
                url.pathname +
                url.hash
            );
        }
    );


    /*
     * Controla os botões voltar e avançar
     * do navegador.
     */
    window.addEventListener(
        "popstate",
        () => {
            const urlAtual =
                window.location.pathname +
                window.location.hash;

            carregarPagina(
                urlAtual,
                false
            );
        }
    );
}