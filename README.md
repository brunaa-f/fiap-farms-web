FIAP Farms

> Solução cross-platform para a Cooperativa FIAP Farms, desenvolvida para o Tech Challenge da Pós-Graduação. O projeto oferece uma visão estratégica de vendas e produção através de dashboards interativos, controle de estoque e sistema de metas.

### ✨ Sobre o Projeto

O **AgroDash** é a resposta ao desafio proposto pela Cooperativa FIAP Farms. O objetivo é fornecer aos cooperados uma ferramenta poderosa e intuitiva para otimizar o planejamento de safras e maximizar a lucratividade. A solução é composta por uma aplicação web para desktops e um aplicativo mobile, garantindo acesso às informações em qualquer lugar.

### 🚀 Features Principais

-   **📊 Dashboard de Vendas:** Visualização clara dos produtos de maior lucro, com gráficos e filtros interativos.
-   **🌱 Dashboard de Produção:** Acompanhamento em tempo real do status da produção (Aguardando, Em Produção, Colhido).
-   **📦 Controle de Estoque e Vendas:** Interface para inserir dados de vendas e produção, alimentando os dashboards de forma centralizada.
-   **🎯 Metas e Notificações:** Definição de metas de vendas e produção com um sistema de notificações para celebrar as conquistas.
-   **🔒 Autenticação Segura:** Login de usuários utilizando e-mail, Google ou outros provedores via Firebase Authentication.

### 🛠️ Tecnologias e Arquitetura

Este projeto foi construído utilizando um monorepo gerenciado com **pnpm** para facilitar o compartilhamento de código e configurações entre as plataformas web e mobile.

| Categoria              | Tecnologia / Conceito                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Gerenciador de Pacotes** | [**pnpm**](https://pnpm.io/) (Workspaces)                                                                          |
| **Plataforma Web** | [**Next.js**](https://nextjs.org/), [**React**](https://reactjs.org/), [**TypeScript**](https://www.typescriptlang.org/) |
| **Plataforma Mobile** | [**React Native**](https://reactnative.dev/), [**TypeScript**](https://www.typescriptlang.org/)                        |
| **Backend & Serviços** | [**Firebase**](https://firebase.google.com/) (Authentication, Firestore)                                           |
| **Visualização de Dados** | [**Google Charts**](https://developers.google.com/chart) / [**Charts.js**](https://www.chartjs.org/)             |
| **Arquitetura** | **Microfrontend**, **Clean Architecture** |
| **Gerenciamento de Estado** | Gerenciamento de Estado Global (ex: Zustand, Redux Toolkit)                                                      |

### 📂 Estrutura do Monorepo

O projeto está organizado em um workspace do pnpm, com a seguinte estrutura:

```
/
├── apps/
│   ├── web/        # Aplicação Web (Next.js)
│   └── mobile/     # Aplicação Mobile (React Native)
|
├── packages/
│   ├── ui/         # Componentes React compartilhados (botões, cards, etc.)
│   └── config/     # Configurações compartilhadas (ESLint, TypeScript)
|
├── package.json
└── pnpm-workspace.yaml
```

### 🏁 Como Executar o Projeto

**Pré-requisitos:**
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* [pnpm](https://pnpm.io/installation) instalado globalmente (`npm install -g pnpm`)
* Conta no [Firebase](https://firebase.google.com/) com um projeto configurado (Authentication e Firestore habilitados).

**1. Clone o repositório:**
```bash
git clone [https://github.com/brunaa-f/fiap-farms.git](https://github.com/brunaa-f/fiap-farms.git)
cd fiap-farms
```

**2. Configure as variáveis de ambiente:**
Crie um arquivo `.env.local` dentro de `apps/web` e `apps/mobile` a partir do arquivo `.env.example` fornecido em cada pasta. Preencha com as credenciais do seu projeto Firebase.

**3. Instale as dependências:**
Na raiz do projeto, execute o comando para instalar todas as dependências do workspace.
```bash
pnpm install
```

**4. Execute as aplicações:**

* **Para rodar a aplicação Web (Next.js):**
    ```bash
    # Executa a aplicação web na porta 3000
    pnpm --filter web dev
    ```

* **Para rodar a aplicação Mobile (React Native):**
    ```bash
    # Inicia o Metro Bundler
    pnpm --filter mobile start

    # Em outro terminal, para rodar no Android
    pnpm --filter mobile android

    # Ou para rodar no iOS (requer macOS e Xcode)
    pnpm --filter mobile ios
    ```
