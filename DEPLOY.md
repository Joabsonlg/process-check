# ProcessCheck - Deploy para GitHub Pages

## 🚀 Deploy Configurado!

Este projeto está configurado para deploy automático no GitHub Pages usando GitHub Actions.

### 📋 Configurações Aplicadas

#### 1. **Next.js para Export Estático**
- `output: 'export'` no `next.config.ts`
- `trailingSlash: true` para compatibilidade com GitHub Pages
- `images: { unoptimized: true }` para imagens estáticas

#### 2. **GitHub Actions Workflow**
- Deploy automático na branch `main`
- Build com Node.js 18
- Upload para GitHub Pages

#### 3. **Arquivos Especiais**
- `.nojekyll` para evitar processamento Jekyll
- Workflow em `.github/workflows/deploy.yml`

### 🛠️ Como Fazer Deploy

1. **Push para GitHub:**
   ```bash
   git add .
   git commit -m "Deploy ProcessCheck"
   git push origin main
   ```

2. **Habilitar GitHub Pages:**
   - Vá para Settings > Pages no seu repositório
   - Source: "GitHub Actions"
   - O deploy será automático!

3. **URL Final:**
   ```
   https://[seu-usuario].github.io/[nome-do-repo]/
   ```

### ✅ Build Testado Localmente

- ✅ Build executado com sucesso
- ✅ 13 páginas geradas estaticamente
- ✅ Pasta `out/` criada com arquivos estáticos
- ✅ Arquivo `.nojekyll` incluído

### 📁 Estrutura de Deploy

```
out/
├── index.html              # Landing page
├── assessment/             # Explorar processos
├── matrix/                 # Matriz estratégica
├── results/                # Checklist
├── about/                  # Sobre
├── [7 páginas de detalhes] # Processos específicos
├── _next/                  # Assets do Next.js
└── .nojekyll              # Configuração GitHub Pages
```

### 🔧 Comandos Úteis

```bash
# Build local para testar
npm run build

# Servir build local
npx serve out

# Verificar estrutura
ls out/
```

## 🎯 Próximos Passos

1. **Envie para GitHub** e configure GitHub Pages
2. **Teste a URL** após o deploy
3. **Configure domínio customizado** (opcional)

O ProcessCheck está pronto para ser um site público! 🌐✨