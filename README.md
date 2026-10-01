# Instituto Horizonte Verde

## Sobre o projeto

O Instituto Horizonte Verde é um projeto acadêmico de desenvolvimento web criado para apresentar uma organização não governamental, seus projetos e uma forma de demonstrar interesse em participar das ações.

O site foi desenvolvido com foco em organização, acessibilidade, navegação, responsividade e interação com o usuário.

## Tecnologias utilizadas

- **HTML5:** utilizado para estruturar semanticamente as páginas do site.
- **CSS3:** utilizado para definir o layout, a responsividade, as cores, os espaçamentos e os estados visuais dos elementos.
- **JavaScript:** utilizado para adicionar interatividade e funcionalidades ao site.
- **JavaScript Modules:** utilizados para organizar o código em diferentes arquivos, separando responsabilidades.
- **Vite:** utilizado como ferramenta de desenvolvimento e build de produção do projeto.
- **Sharp:** utilizado para a conversão e otimização da imagem da logo para o formato WebP.
- **API ViaCEP:** utilizada para consultar os dados de endereço a partir do CEP informado no formulário.
- **LocalStorage:** utilizado para armazenar e recuperar os dados preenchidos no formulário e a preferência do modo escuro no navegador.
- **Git e GitHub:** utilizados para versionamento e gerenciamento do projeto.

## Estrutura do projeto

A estrutura do projeto foi organizada para separar os arquivos de acordo com suas responsabilidades:

- **css/**: contém o arquivo `style.css`, responsável pela estilização e pelo layout das páginas.
- **img/**: contém a imagem utilizada como logo do Instituto Horizonte Verde em formato WebP.
- **js/**: contém os arquivos JavaScript separados por funcionalidades:
  - `script.js`: inicializa as funcionalidades do projeto.
  - `navegacao.js`: controla o menu e o submenu.
  - `projetos.js`: organiza e renderiza os projetos apresentados no site.
  - `formulario.js`: controla as funcionalidades e validações do formulário.
  - `storage.js`: realiza o armazenamento e a recuperação de dados no `LocalStorage`.
  - `spa.js`: controla a navegação entre páginas utilizando carregamento dinâmico.
- **index.html**: página inicial do site.
- **projetos.html**: página de apresentação dos projetos.
- **cadastro.html**: página com o formulário de cadastro demonstrativo.
- **vite.config.js**: contém as configurações utilizadas pelo Vite para a build das páginas do projeto.
- **package.json**: registra as configurações, scripts e dependências utilizadas pelo projeto.
- **package-lock.json**: registra as versões das dependências instaladas.
- **.gitignore**: define arquivos e pastas que não devem ser versionados pelo Git.

## Funcionalidades

O site possui as seguintes funcionalidades principais:

- Navegação entre as páginas do projeto.
- Menu e submenu responsivos para facilitar a navegação.
- Apresentação dos projetos da instituição.
- Renderização dos projetos utilizando JavaScript.
- Formulário de cadastro demonstrativo.
- Máscaras para campos como CPF, telefone e CEP.
- Validação dos dados preenchidos no formulário.
- Consulta de endereço por meio do CEP utilizando a API ViaCEP.
- Armazenamento e recuperação dos dados do formulário utilizando LocalStorage.
- Mensagens de feedback para orientar o usuário durante o preenchimento do formulário.
- Navegação dinâmica entre páginas utilizando JavaScript e History API.
- Modo escuro com alternância pelo usuário.
- Persistência da preferência do modo escuro utilizando LocalStorage.
- Layout responsivo para diferentes tamanhos de tela.
- Build de produção utilizando Vite.
- Otimização da imagem da logo utilizando o formato WebP.

## Acessibilidade

O projeto foi desenvolvido considerando práticas de acessibilidade para facilitar o uso do site por diferentes usuários.

Entre os recursos utilizados estão:

- Uso de elementos semânticos do HTML5 para organizar o conteúdo.
- Textos alternativos nas imagens por meio do atributo `alt`.
- Navegação por teclado e indicação visual de foco.
- Uso de `aria-live` nas mensagens de feedback do formulário.
- Utilização de `label` associados aos campos do formulário.
- Uso de `aria-expanded` e `aria-controls` nos controles de navegação.
- Uso de `aria-hidden` em elementos exclusivamente decorativos.
- Utilização de skip-link para facilitar o acesso ao conteúdo principal.
- Estrutura de títulos organizada para facilitar a compreensão do conteúdo.

## Versionamento

O projeto utiliza Git para controle de versão e GitHub para hospedagem e gerenciamento do repositório.

As alterações foram organizadas utilizando commits semânticos, com mensagens iniciadas por `feat:` para novas funcionalidades e `fix:` para correções.

Também foram utilizadas tags para identificar versões do projeto:

- `v1.0.0`: versão inicial do projeto.
- `v1.0.1`: correção na leitura dos dados dos projetos.
- `v1.0.2`: correção na consulta de CEP, permitindo uma nova tentativa quando a consulta anterior falhar.

Durante o desenvolvimento também foram utilizadas branches para realizar alterações separadamente da branch principal, além de Issues, Milestones e Pull Requests para organizar e documentar o desenvolvimento.

O projeto possui a Milestone `v1.0.2 — Estabilização do projeto`, utilizada para reunir correções e ajustes. A Issue #1 registrou a correção da consulta de CEP e o Pull Request #2 documentou a alteração do texto do botão do formulário antes de sua integração à branch principal.

## Build e produção

O projeto utiliza o Vite para executar o ambiente de desenvolvimento e gerar a versão de produção.

Os principais comandos disponíveis são:

```bash
npm install