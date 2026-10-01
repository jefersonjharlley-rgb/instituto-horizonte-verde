/* =========================================================
   LOCALSTORAGE
   ========================================================= */

const CHAVE_CADASTRO =
    "institutoHorizonteVerdeCadastro";


/**
 * Salva os dados do formulário no localStorage.
 *
 * Os dados são transformados em JSON antes
 * de serem armazenados.
 */
export function salvarCadastro(dados) {
    try {
        localStorage.setItem(
            CHAVE_CADASTRO,
            JSON.stringify(dados)
        );

        return true;

    } catch (erro) {
        console.error(
            "Não foi possível salvar os dados:",
            erro
        );

        return false;
    }
}


/**
 * Recupera os dados do cadastro do localStorage.
 *
 * O JSON armazenado é convertido novamente
 * em um objeto JavaScript.
 */
export function recuperarCadastro() {
    try {
        const dadosSalvos =
            localStorage.getItem(
                CHAVE_CADASTRO
            );

        if (!dadosSalvos) {
            return null;
        }

        return JSON.parse(
            dadosSalvos
        );

    } catch (erro) {
        console.error(
            "Não foi possível recuperar os dados:",
            erro
        );

        return null;
    }
}


/**
 * Restaura os dados salvos nos campos
 * do formulário.
 */
export function restaurarCadastro(
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
) {
    const dados =
        recuperarCadastro();

    if (!dados) {
        return;
    }

    /*
     * Preenche os campos de texto.
     */
    if (campoNome && dados.nome) {
        campoNome.value =
            dados.nome;
    }

    if (campoEmail && dados.email) {
        campoEmail.value =
            dados.email;
    }

    if (campoCpf && dados.cpf) {
        campoCpf.value =
            dados.cpf;
    }

    if (
        campoTelefone &&
        dados.telefone
    ) {
        campoTelefone.value =
            dados.telefone;
    }

    if (campoCep && dados.cep) {
        campoCep.value =
            dados.cep;
    }

    if (
        campoEndereco &&
        dados.endereco
    ) {
        campoEndereco.value =
            dados.endereco;
    }

    if (
        campoNumero &&
        dados.numero
    ) {
        campoNumero.value =
            dados.numero;
    }

    if (
        campoCidade &&
        dados.cidade
    ) {
        campoCidade.value =
            dados.cidade;
    }

    if (
        campoEstado &&
        dados.estado
    ) {
        campoEstado.value =
            dados.estado;
    }


    /*
     * Restaura a opção de participação.
     */
    if (dados.participacao) {
        const opcoes =
            document.querySelectorAll(
                'input[name="participacao"]'
            );

        opcoes.forEach((opcao) => {
            opcao.checked =
                opcao.value ===
                dados.participacao;
        });
    }


    /*
     * Restaura o aceite dos termos.
     */
    const termos =
        document.querySelector(
            "#termos"
        );

    if (
        termos &&
        typeof dados.termos === "boolean"
    ) {
        termos.checked =
            dados.termos;
    }


    /*
     * Como os valores são restaurados
     * diretamente, não disparamos o evento
     * input e evitamos uma nova consulta
     * automática ao ViaCEP.
     */
    if (
        mensagemCep &&
        dados.cep
    ) {
        mensagemCep.textContent =
            "Dados do cadastro recuperados.";
    }
}