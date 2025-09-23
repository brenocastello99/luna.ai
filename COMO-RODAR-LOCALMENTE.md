# 🚀 Como Rodar o Site Luna.AI Localmente

## 📋 Pré-requisitos
- Qualquer navegador moderno (Chrome, Firefox, Safari, Edge)
- Python 3 (já vem instalado no Windows 10+, Mac e Linux)
- OU Node.js (opcional)
- OU qualquer servidor web local

## 🔧 Métodos para Rodar Localmente

### **Método 1: Python (Recomendado - Mais Simples)**

1. **Abra o terminal/prompt de comando**
2. **Navegue até a pasta do projeto:**
   ```bash
   cd caminho/para/luna-ai-standalone
   ```
3. **Execute o servidor:**
   ```bash
   python -m http.server 8000
   ```
   *No Windows, pode ser:* `python3 -m http.server 8000`

4. **Abra no navegador:**
   ```
   http://localhost:8000
   ```

### **Método 2: Node.js**

1. **Instale o servidor global:**
   ```bash
   npm install -g http-server
   ```
2. **Na pasta do projeto:**
   ```bash
   http-server -p 8000
   ```
3. **Abra:** `http://localhost:8000`

### **Método 3: PHP (se tiver instalado)**

1. **Na pasta do projeto:**
   ```bash
   php -S localhost:8000
   ```
2. **Abra:** `http://localhost:8000`

### **Método 4: Live Server (VS Code)**

1. **Instale a extensão "Live Server" no VS Code**
2. **Abra a pasta do projeto no VS Code**
3. **Clique com botão direito no `index.html`**
4. **Selecione "Open with Live Server"**

## 🌐 Para Hospedar no Seu Domínio

### **Upload via FTP/cPanel:**
1. Faça upload de todos os arquivos para a pasta `public_html` (ou equivalente)
2. Certifique-se que o `index.html` está na raiz
3. Acesse seu domínio

### **Servidores como Netlify/Vercel:**
1. Faça upload da pasta completa
2. Configure para servir arquivos estáticos
3. Pronto!

## 📁 Estrutura do Projeto
```
luna-ai-standalone/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos
├── js/
│   └── main.js            # JavaScript
├── images/                # Imagens e ícones
├── politica-de-privacidade.html
├── termos-de-servico.html
└── COMO-RODAR-LOCALMENTE.md
```

## ⚠️ Importante
- **NUNCA** abra o `index.html` diretamente no navegador (duplo clique)
- **SEMPRE** use um servidor local para que os caminhos funcionem corretamente
- Todos os arquivos CSS, JS e imagens precisam ser servidos via HTTP

## 🔧 Troubleshooting

**Site aparece em branco?**
- Verifique se está usando um servidor local
- Confirme que todos os arquivos estão na pasta correta

**Imagens não carregam?**
- Verifique se a pasta `images/` está presente
- Confirme que está acessando via servidor (http://localhost)

**Animações não funcionam?**
- Verifique se o JavaScript está carregando
- Abra o console do navegador (F12) para ver erros

## 🎯 Pronto!
Agora você tem total autonomia para rodar e hospedar o site onde quiser!
