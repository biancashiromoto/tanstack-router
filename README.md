# 🛒 TanStack Market - Modern E-commerce Platform

Uma aplicação e-commerce moderna e completa construída com **React 19**, **TypeScript** e **TanStack Router**. Este projeto demonstra um sistema de compras com autenticação de usuário, catálogo de produtos, carrinho de compras, roteamento tipado e otimizações avançadas de performance.

## ✨ Principais Funcionalidades

- 🔐 **Sistema de Autenticação Completo** - Login/logout com proteção de rotas
- 🛍️ **Catálogo de Produtos** - Navegação por categorias e busca avançada
- 🛒 **Carrinho de Compras** - Gerenciamento de itens e cálculo de totais
- 👤 **Perfis de Usuário** - Visualização de dados pessoais e histórico
- 📱 **Design Responsivo** - Interface adaptável para mobile e desktop
- 🔍 **Busca com Autocomplete** - Pesquisa inteligente de produtos
- ⚡ **Performance Otimizada** - Code splitting automático e lazy loading
- 🎯 **Type Safety** - Roteamento completamente tipado com TypeScript
- 💫 **UX Avançada** - Loading states, error boundaries e navegação fluida

## 🚀 Começando

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/biancashiromoto/tanstack-router.git
cd tanstack-router
```

1. Instale as dependências:

```bash
npm install
```

1. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 🏗️ Build para Produção

Para fazer o build da aplicação para produção:

```bash
npm run build
```

Para servir o build localmente:

```bash
npm run serve
```

## 🛠️ Stack Tecnológica

- **Frontend Framework:** React 19
- **Linguagem:** TypeScript
- **Roteamento:** TanStack Router v1.131+
- **State Management:** TanStack Query (React Query) v5
- **UI Components:** Material-UI (MUI) v7
- **Styling:** Emotion + SCSS
- **Ícones:** React Icons
- **Build Tool:** Vite v6
- **Testes:** Vitest + React Testing Library
- **Debouncing:** use-debounce
- **Performance:** Web Vitals monitoring

## 📁 Estrutura do Projeto

```text
src/
├── components/              # Componentes reutilizáveis
│   ├── AppLayout/          # Layout principal da aplicação
│   ├── Card/               # Sistema de cards para produtos
│   ├── Header/             # Cabeçalho com navegação
│   │   └── Navbar/         # Barra de navegação
│   ├── LoginForm/          # Formulário de autenticação
│   ├── CartItem/           # Item do carrinho
│   ├── DailyDeals/         # Ofertas do dia
│   ├── ProductDetails/     # Detalhes do produto
│   │   ├── Images/         # Galeria de imagens
│   │   ├── Info/           # Informações básicas
│   │   ├── Price/          # Preço e descontos
│   │   └── Reviews/        # Avaliações
│   ├── Autocomplete/       # Busca inteligente
│   ├── Pagination/         # Paginação de produtos
│   ├── Rating/             # Sistema de avaliação
│   └── Loader/             # Loading states
├── routes/                  # Definições de rotas (file-based)
│   ├── __root.tsx          # Layout raiz
│   ├── index.tsx           # Homepage (/)
│   ├── login.tsx           # Página de login
│   ├── _auth.tsx           # Layout para rotas protegidas
│   ├── _auth.cart.tsx      # Carrinho (/cart)
│   ├── _auth.profile.tsx   # Perfil (/profile)
│   ├── _product.tsx        # Layout para produtos
│   └── _product.$category.$productId.tsx # Produto específico
├── context/                 # Contextos React
│   └── AuthContext.tsx     # Gerenciamento de autenticação
├── services/                # Serviços de API
│   ├── products.ts         # API de produtos
│   ├── categories.ts       # API de categorias
│   └── user.ts             # API de usuários
├── hooks/                   # Hooks customizados
│   ├── useCart.tsx         # Hook do carrinho
│   ├── useSearchProducts.tsx # Hook de busca
│   └── useResponsive.tsx   # Hook de responsividade
├── types/                   # Definições TypeScript
└── helpers/                 # Funções utilitárias
```

## 🔐 Sistema de Autenticação

A aplicação utiliza um sistema de autenticação mock com as seguintes credenciais de teste:

- **Username:** `emilys`
- **Password:** `emilyspass`

### Recursos de Autenticação

- Login/logout com persistência no localStorage
- Proteção automática de rotas sensíveis
- Redirecionamento inteligente baseado no estado de autenticação
- Context API para gerenciamento global do estado do usuário

## 🌐 Integração com API

Este projeto integra-se com a [DummyJSON API](https://dummyjson.com) oferecendo:

- **Catálogo de Produtos** - 194+ produtos em 20+ categorias
- **Autenticação de Usuário** - Sistema de login completo
- **Dados do Carrinho** - Carrinho personalizado por usuário
- **Perfis de Usuário** - Informações detalhadas dos usuários
- **Sistema de Reviews** - Avaliações e comentários

## 📱 Mapa de Rotas

### Rotas Públicas

- `/` - Homepage com ofertas do dia
- `/login` - Página de autenticação
- `/unauthenticated` - Página para usuários não autenticados
- `/{category}` - Listagem por categoria (ex: `/electronics`)
- `/{category}/{productId}` - Detalhes do produto

### Rotas Protegidas (Requer Login)

- `/profile` - Perfil do usuário
- `/cart` - Carrinho de compras
- `/user/{userId}` - Detalhes de usuário específico

## 🎯 Recursos Avançados

### File-Based Routing

- Sistema de roteamento automático baseado em arquivos
- Type safety completo em parâmetros de rota
- Layouts aninhados com `_auth.tsx` e `_product.tsx`
- Code splitting automático para cada rota

### Performance

- **Lazy Loading** - Componentes carregados sob demanda
- **Code Splitting** - Chunks separados por funcionalidade
- **Caching Inteligente** - TanStack Query para otimização de requisições
- **Debouncing** - Busca otimizada com debounce

### UX/UI

- **Loading States** - Feedback visual em todas as operações
- **Error Boundaries** - Tratamento gracioso de erros
- **Responsive Design** - Interface adaptável
- **Navegação Contextual** - Breadcrumbs e navegação intuitiva

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm run serve        # Serve build local

```

## 🎨 Padrões de Design

Este projeto segue padrões modernos de desenvolvimento:

- **Component Composition** - Componentes compostos (Card.Root, Card.Content)
- **Custom Hooks** - Lógica reutilizável encapsulada
- **Service Layer** - Camada de abstração para APIs
- **TypeScript Strict** - Tipagem rigorosa em todo o projeto
- **Context + Query** - Gerenciamento de estado híbrido
