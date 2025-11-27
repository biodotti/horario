# AI School Scheduler

Este projeto foi migrado para uma estrutura moderna usando **Vite + React**.

## Como colocar online (GitHub + Render)

### Passo 1: GitHub
1. Crie uma conta no [GitHub](https://github.com) (se não tiver).
2. Crie um **Novo Repositório** (New Repository).
3. Dê o nome de `school-scheduler` (ou o que preferir).
4. **Upload dos Arquivos:**
   - Na página do seu repositório, clique em "Upload files".
   - Arraste **TODOS** os arquivos desta pasta para lá (exceto a pasta `backup`).
   - Certifique-se de que a pasta `src`, `package.json`, `vite.config.js`, `index.html` estão todos lá.
   - Clique em "Commit changes".

### Passo 2: Render (Hospedagem Grátis)
1. Crie uma conta no [Render.com](https://render.com).
2. Clique em **New +** e selecione **Static Site**.
3. Conecte sua conta do GitHub.
4. Selecione o repositório `school-scheduler` que você acabou de criar.
5. Preencha as configurações:
   - **Name:** (escolha um nome para seu site)
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
6. Clique em **Create Static Site**.

O Render vai baixar seu código, instalar as dependências (Node.js, React, etc.) automaticamente nos servidores deles e colocar seu site no ar! 🚀

## Desenvolvimento Local (Opcional)
Se você instalar o Node.js no futuro, poderá rodar este projeto localmente com:
```bash
npm install
npm run dev
```
