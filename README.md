# Blog Escolar - Frontend

Aplicação frontend do Tech Challenge FIAP - Fase 03. Interface web para blog educacional com Next.js, Material-UI e TypeScript.

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Setup Inicial](#-setup-inicial)
- [Arquitetura](#-arquitetura)
- [Guia de Uso](#-guia-de-uso)
- [Testes e Deploy](#-testes-e-deploy)

## 🎯 Visão Geral

Plataforma educacional que conecta professores e alunos através de posts.

**Funcionalidades principais:**
- Autenticação com perfis diferenciados (Professor/Aluno)
- CRUD de posts (apenas professores)
- Visualização de conteúdo (todos usuários autenticados)
- Interface responsiva com Material-UI

## 🚀 Tecnologias

- **Next.js 15.5** - Framework React com App Router e Turbopack
- **React 19.1** - Biblioteca UI
- **TypeScript 5** - Tipagem estática
- **Material-UI 7.3** - Biblioteca de componentes
- **Axios** - Cliente HTTP
- **Jest + Testing Library** - Framework de testes
- **ESLint** - Linter

**Pré-requisitos:** Node.js 20+ e npm 8+

## ⚙️ Setup Inicial

```bash
# Clone e instale
git clone <url-do-repositorio>
cd tech-challenge-3/frontend
npm install

# Configure .env.local
echo "NEXT_PUBLIC_API_URL=https://tech-challenge-blog.onrender.com" > .env.local

# Execute em desenvolvimento
npm run dev
```

Aplicação disponível em [http://localhost:3000](http://localhost:3000)

## 🏗️ Arquitetura

### Estrutura de Pastas

```
frontend/
├── app/
│   ├── components/          # navbar, post, dialog
│   ├── hooks/              # useAuth (autenticação)
│   ├── createPostLayout/   # Criar post
│   ├── editPostLayout/     # Editar post
│   ├── targetPostLayout/   # Visualizar post
│   ├── login/              # Login
│   ├── register/           # Cadastro
│   └── page.tsx            # Página inicial (lista)
├── __tests__/              # Testes
└── Dockerfile
```

### Sistema de Autenticação

**Custom Hook `useAuth`:**
- Gerencia estado de autenticação via `localStorage`
- Diferencia professores (`is_teacher`) de alunos
- Fluxo: Login → Token JWT → Busca perfil → Armazena dados

**Proteção de Rotas:**
```typescript
// Verificação client-side
useEffect(() => {
  if (!isAuthenticated) router.push("/login");
}, [isAuthenticated]);

// Controle de permissões
{isTeacher && <Button>Criar Postagem</Button>}
```

### Rotas da Aplicação

| Rota | Acesso | Funcionalidade |
|------|--------|----------------|
| `/login` | Público | Autenticação |
| `/register` | Público | Cadastro |
| `/` | Autenticado | Lista de posts |
| `/targetPostLayout?id={id}` | Autenticado | Visualizar post |
| `/createPostLayout` | Professor | Criar post |
| `/editPostLayout?id={id}` | Professor | Editar post |

## 📖 Guia de Uso

### Primeiro Acesso

**Cadastro:**
1. Acesse `/login` → Clique em "Cadastre-se"
2. Preencha: nome, e-mail, senha
3. Marque "Sou professor" se aplicável
4. Faça login com as credenciais criadas

### Funcionalidades por Perfil

**Alunos:**
- ✅ Visualizar lista de posts
- ✅ Ler posts completos
- ✅ Fazer logout

**Professores (+ funcionalidades de aluno):**
- ✅ Criar posts (botão "Criar Postagem")
- ✅ Editar posts (ícone lápis no card)
- ✅ Excluir posts (ícone lixeira no card)

**Feedback Visual:**
- Snackbars para sucesso/erro
- Loading states durante requisições
- Validações de formulário

## 🧪 Testes e Deploy

### Testes

```bash
npm test              # Executar testes
npm run test:watch    # Modo watch
```

Configuração: Jest + Testing Library com ambiente `jsdom`

### Build e Deploy

**Build Local:**
```bash
npm run build
npm start
```

**Docker:**
```bash
docker build -t blog-escolar-frontend .
docker run -p 3000:3000 blog-escolar-frontend
```

**Produção (Vercel):**
```bash
npm i -g vercel
vercel --prod
```

Configure `NEXT_PUBLIC_API_URL` nas variáveis de ambiente.

**Outras opções:** Netlify, AWS Amplify, Render, Railway

---

**Desenvolvido para o Tech Challenge - FIAP Fase 03** 🎓
