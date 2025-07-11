# Dashboard KPI e Mensagens

Este projeto é um painel de controle criado em React e TypeScript. Ele exibe KPIs de vendas e uma listagem de mensagens enviadas pelos corretores. Os dados são simulados a partir de arquivos localizados em `src/data`.

## Como executar

```sh
npm install
npm run dev
```

A aplicação será iniciada em modo desenvolvimento e poderá ser acessada no navegador.

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/f0bce951-05e4-4fa3-8cf2-c18f39a55062

## Project description

This repository contains a simple KPI dashboard used to track sales team
performance. The interface displays key indicators, conversion rates and a
performance table for brokers. You can run it locally using the following npm
scripts:

```sh
npm run dev      # start the development server
npm run build    # create a production build
npm run preview  # preview the production build
```

Mock data for the charts and tables lives in `src/hooks/useDashboardData.ts` and
additional CSV examples can be found under `src/data`.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f0bce951-05e4-4fa3-8cf2-c18f39a55062) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Running the development server

After installing dependencies, run `npm run dev` from the project root. Vite
serves the dashboard on [http://localhost:8080](http://localhost:8080) and
automatically reloads the page whenever you save changes.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f0bce951-05e4-4fa3-8cf2-c18f39a55062) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
