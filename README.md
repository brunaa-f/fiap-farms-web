# fiap-farms

### ✨ Sobre o Projeto

 A solução é composta por uma aplicação web para desktops e um aplicativo mobile, garantindo acesso às informações em qualquer lugar.

### 🚀 Features Principais

-   **📊 Dashboard de Vendas:** Visualização clara dos produtos de maior lucro.
-   **🌱 Dashboard de Produção:** Acompanhamento em tempo real do status da produção (Aguardando, Em Produção, Colhido).
-   **📦 Controle de Estoque e Vendas:** Interface para inserir dados de vendas e produção, alimentando os dashboards de forma centralizada.
-   **🔒 Autenticação Segura:** Login de usuários utilizando e-mail, Google ou outros provedores via Firebase Authentication.

### 🛠️ Tecnologias e Arquitetura

Este projeto foi construído utilizando um monorepo gerenciado com **pnpm** para facilitar o compartilhamento de código e configurações entre as plataformas web e mobile.

| Categoria              | Tecnologia / Conceito                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ | 
| **Plataforma Web** | [**Next.js**](https://nextjs.org/), [**React**](https://reactjs.org/), [**TypeScript**](https://www.typescriptlang.org/) |
| **Plataforma Mobile** | [**React Native**](https://reactnative.dev/), [**TypeScript**](https://www.typescriptlang.org/)                        |
| **Backend & Serviços** | [**Firebase**](https://firebase.google.com/) (Authentication, Firestore)                                           |
| **Visualização de Dados** | [**Google Charts**](https://developers.google.com/chart) / [**Charts.js**](https://www.chartjs.org/)             |
| **Arquitetura** | **Microfrontend**, **Clean Architecture** |
| **Gerenciamento de Estado** | Zustand                                         |

### 🏁 Como Executar o Projeto

**Pré-requisitos:**
* [Node.js](https://nodejs.org/) (versão 18 ou superior)
* Conta no [Firebase](https://firebase.google.com/) com um projeto configurado (Authentication e Firestore habilitados).

**1. Clone os repositórios:**

Clone o repositório da aplicação web
```bash
git clone https://github.com/brunaa-f/fiap-farms-web.git
cd fiap-farms-web
```

Clone o repositório do aplicativo mobile
```bash
git clone https://github.com/brunaa-f/fiap-farms-mobile.git
cd fiap-farms-mobile
```

**3. Instale as dependências:**
Em cada projeto, execute o comando para instalar todas as dependências do workspace.
```bash
npm i
```

**4. Execute as aplicações:**

* **Para rodar a aplicação Web (Next.js):**
    ```bash
    npm run dev
    ```

* **Para rodar a aplicação Mobile (React Native):**
    ```bash
    npx expo start
    ```
