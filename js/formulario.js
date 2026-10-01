import {
    salvarCadastro,
    restaurarCadastro
} from "./storage.js";


/* =========================================================
   FORMULÁRIO
   ========================================================= */

export function iniciarFormulario() {

    const formulario =
        document.querySelector(
            "#formulario-cadastro"
        );

    const mensagem =
        document.querySelector(
            "#mensagem-formulario"
        );

    const campoNome =
        document.querySelector(
            "#nome"
        );

    const campoEmail =
        document.querySelector(
            "#email"
        );

    const campoCpf =
        document.querySelector(
            "#cpf"
        );

    const campoTelefone =
        document.querySelector(
            "#telefone"
        );

    const campoCep =
        document.querySelector(
            "#cep"
        );

    const campoEndereco =
        document.querySelector(
            "#endereco"
        );

    const campoNumero =
        document.querySelector(
            "#numero"
        );

    const campoCidade =
        document.querySelector(
            "#cidade"
        );

    const campoEstado =
        document.querySelector(
            "#estado"
        );

    const mensagemCep =
        document.querySelector(
            "#mensagem-cep"
        );

    if (
        !formulario ||
        !mensagem
    ) {
        return;
    }

    let ultimoCepConsultado =
        "";


    /* =====================================================
       SOMENTE NÚMEROS
       ===================================================== */

    function somenteNumeros(valor) {
        return valor.replace(
            /\D/g,
            ""
        );
    }


    /* =====================================================
       VALIDAÇÃO DO CPF
       ===================================================== */

    function cpfValido(valor) {
        const cpf =
            somenteNumeros(valor);

        if (
            cpf.length !== 11 ||
            /^(\d)\1{10}$/.test(cpf)
        ) {
            return false;
        }

        let soma = 0;

        for (
            let indice = 0;
            indice < 9;
            indice += 1
        ) {
            soma +=
                Number(cpf[indice]) *
                (10 - indice);
        }

        let resto =
            (soma * 10) % 11;

        const primeiroDigito =
            resto === 10
                ? 0
                : resto;

        if (
            primeiroDigito !==
            Number(cpf[9])
        ) {
            return false;
        }

        soma = 0;

        for (
            let indice = 0;
            indice < 10;
            indice += 1
        ) {
            soma +=
                Number(cpf[indice]) *
                (11 - indice);
        }

        resto =
            (soma * 10) % 11;

        const segundoDigito =
            resto === 10
                ? 0
                : resto;

        return (
            segundoDigito ===
            Number(cpf[10])
        );
    }


    /* =====================================================
       MÁSCARAS
       ===================================================== */

    function aplicarMascara(
        seletor,
        formatar
    ) {
        const campo =
            document.querySelector(
                seletor
            );

        if (!campo) {
            return;
        }

        if (
            campo.dataset.mascaraAtiva ===
            "true"
        ) {
            return;
        }

        campo.dataset.mascaraAtiva =
            "true";

        campo.addEventListener(
            "input",
            () => {
                campo.value =
                    formatar(
                        somenteNumeros(
                            campo.value
                        )
                    );
            }
        );
    }


    /* =====================================================
       FORMATAÇÃO DO CPF
       ===================================================== */

    function formatarCpf(valor) {
        return valor
            .slice(0, 11)
            .replace(
                /(\d{3})(\d)/,
                "$1.$2"
            )
            .replace(
                /(\d{3})(\d)/,
                "$1.$2"
            )
            .replace(
                /(\d{3})(\d{1,2})$/,
                "$1-$2"
            );
    }


    /* =====================================================
       FORMATAÇÃO DO CEP
       ===================================================== */

    function formatarCep(valor) {
        return valor
            .slice(0, 8)
            .replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );
    }


    /* =====================================================
       FORMATAÇÃO DO TELEFONE
       ===================================================== */

    function formatarTelefone(valor) {
        const telefone =
            valor.slice(0, 11);

        if (
            telefone.length <= 10
        ) {
            return telefone
                .replace(
                    /(\d{2})(\d)/,
                    "($1) $2"
                )
                .replace(
                    /(\d{4})(\d)/,
                    "$1-$2"
                );
        }

        return telefone
            .replace(
                /(\d{2})(\d)/,
                "($1) $2"
            )
            .replace(
                /(\d{5})(\d)/,
                "$1-$2"
            );
    }


    aplicarMascara(
        "#cpf",
        formatarCpf
    );

    aplicarMascara(
        "#cep",
        formatarCep
    );

    aplicarMascara(
        "#telefone",
        formatarTelefone
    );


    /* =====================================================
       RESTAURAÇÃO DO LOCALSTORAGE
       ===================================================== */

    if (
        formulario.dataset
            .dadosRestaurados !==
        "true"
    ) {
        restaurarCadastro(
            campoNome,
            campoEmail,
            campoCpf,
            campoTelefone,
            campoCep,
            campoEndereco,
            campoNumero,
            campoCidade,
            campoEstado,
            mensagemCep
        );

        formulario.dataset
            .dadosRestaurados =
            "true";
    }


    /* =====================================================
       VALIDAÇÃO PERSONALIZADA DO CPF
       ===================================================== */

    if (campoCpf) {
        if (
            campoCpf.dataset.cpfAtivo !==
            "true"
        ) {
            campoCpf.dataset.cpfAtivo =
                "true";

            campoCpf.addEventListener(
                "input",
                () => {
                    campoCpf.setCustomValidity(
                        ""
                    );
                }
            );
        }
    }


    /* =====================================================
       CONSULTA DE CEP
       ===================================================== */

    async function buscarEnderecoPorCep() {
        if (!campoCep) {
            return;
        }

        const cep =
            somenteNumeros(
                campoCep.value
            );

        if (cep.length !== 8) {
            if (mensagemCep) {
                mensagemCep.textContent =
                    "Digite um CEP com 8 números.";
            }

            return;
        }

        if (cep === ultimoCepConsultado) {
            return;
        }

        if (mensagemCep) {
            mensagemCep.textContent =
                "Buscando endereço...";
        }

        try {
            const resposta =
                await fetch(
                    "https://viacep.com.br/ws/" +
                    cep +
                    "/json/"
                );

            if (!resposta.ok) {
                throw new Error(
                    "Não foi possível consultar o CEP."
                );
            }

            const dados =
                await resposta.json();

            if (dados.erro) {
                if (mensagemCep) {
                    mensagemCep.textContent =
                        "CEP não encontrado. Confira os números informados.";
                }

                return;
            }

            ultimoCepConsultado = cep;

            if (campoEndereco) {
                campoEndereco.value =
                    dados.logradouro ||
                    "";
            }

            if (campoCidade) {
                campoCidade.value =
                    dados.localidade ||
                    "";
            }

            if (campoEstado) {
                campoEstado.value =
                    dados.uf ||
                    "";
            }

            if (mensagemCep) {
                mensagemCep.textContent =
                    "CEP localizado! Confira os dados e informe o número do endereço.";
            }

        } catch (erro) {
            if (mensagemCep) {
                mensagemCep.textContent =
                    "Não foi possível consultar o CEP agora. Preencha o endereço manualmente.";
            }
        }
    }


    if (campoCep) {
        if (
            campoCep.dataset.cepAtivo !==
            "true"
        ) {
            campoCep.dataset.cepAtivo = "true";

            campoCep.addEventListener(
                "input",
                () => {
                    campoCep.value =
                        formatarCep(
                            somenteNumeros(
                                campoCep.value
                            )
                        );

                    if (
                        somenteNumeros(
                            campoCep.value
                        ).length === 8
                    ) {
                        buscarEnderecoPorCep();
                    }
                }
            );

            campoCep.addEventListener(
                "blur",
                buscarEnderecoPorCep
            );
        }
    }


    /* =====================================================
       ENVIO E VALIDAÇÃO DO FORMULÁRIO
       ===================================================== */

    if (
        formulario.dataset.formularioAtivo ===
        "true"
    ) {
        return;
    }

    formulario.dataset.formularioAtivo =
        "true";


    formulario.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();

            campoCpf?.setCustomValidity(
                ""
            );


            /* =============================================
               VALIDAÇÃO NATIVA
               ============================================= */

            if (
                !formulario.checkValidity()
            ) {
                mensagem.textContent =
                    "Revise os campos destacados antes de enviar.";

                mensagem.classList.remove(
                    "sucesso"
                );

                mensagem.classList.add(
                    "erro",
                    "visivel"
                );

                formulario.reportValidity();

                setTimeout(() => {
                    mensagem.classList.remove(
                        "visivel"
                    );
                }, 4000);

                return;
            }


            /* =============================================
               VALIDAÇÃO MATEMÁTICA DO CPF
               ============================================= */

            if (
                campoCpf &&
                !cpfValido(
                    campoCpf.value
                )
            ) {
                campoCpf.setCustomValidity(
                    "Digite um CPF válido, conferindo os números."
                );

                campoCpf.reportValidity();

                mensagem.textContent =
                    "O CPF informado não passou pela validação.";

                mensagem.classList.remove(
                    "sucesso"
                );

                mensagem.classList.add(
                    "erro",
                    "visivel"
                );

                setTimeout(() => {
                    mensagem.classList.remove(
                        "visivel"
                    );
                }, 4000);

                return;
            }


            /* =============================================
               COLETA DOS DADOS
               ============================================= */

            const participacaoSelecionada =
                document.querySelector(
                    'input[name="participacao"]:checked'
                );

            const termos =
                document.querySelector(
                    "#termos"
                );


            const dadosCadastro = {
                nome:
                    campoNome
                        ? campoNome.value
                        : "",

                email:
                    campoEmail
                        ? campoEmail.value
                        : "",

                cpf:
                    campoCpf
                        ? campoCpf.value
                        : "",

                telefone:
                    campoTelefone
                        ? campoTelefone.value
                        : "",

                cep:
                    campoCep
                        ? campoCep.value
                        : "",

                endereco:
                    campoEndereco
                        ? campoEndereco.value
                        : "",

                numero:
                    campoNumero
                        ? campoNumero.value
                        : "",

                cidade:
                    campoCidade
                        ? campoCidade.value
                        : "",

                estado:
                    campoEstado
                        ? campoEstado.value
                        : "",

                participacao:
                    participacaoSelecionada
                        ? participacaoSelecionada.value
                        : "",

                termos:
                    termos
                        ? termos.checked
                        : false
            };


            /* =============================================
               SALVAMENTO NO LOCALSTORAGE
               ============================================= */

            const cadastroSalvo =
                salvarCadastro(
                    dadosCadastro
                );


            /* =============================================
               FEEDBACK
               ============================================= */

            if (cadastroSalvo) {
                mensagem.textContent =
                    "Cadastro validado com sucesso! Seus dados foram salvos neste navegador.";
            } else {
                mensagem.textContent =
                    "Cadastro validado, mas não foi possível salvar os dados neste navegador.";
            }

            mensagem.classList.remove(
                "erro"
            );

            mensagem.classList.add(
                "sucesso",
                "visivel"
            );


            /* =============================================
               LIMPA O FORMULÁRIO
               ============================================= */

            formulario.reset();


            /* =============================================
               ESCONDE O FEEDBACK
               ============================================= */

            setTimeout(() => {
                mensagem.classList.remove(
                    "visivel"
                );
            }, 4000);
        }
    );
}