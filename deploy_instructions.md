# Instruções Completas de Deploy - Site Luna.AI + Sistema de Personalização

## 📁 Arquivos Criados

### Novos Arquivos para Adicionar ao Repositório:

1. **`css/customization-styles.css`** - Estilos do sistema de personalização
2. **`js/customization-panel.js`** - Lógica do painel de edição
3. **`index.html`** - Atualizado com links para os novos arquivos

### Funcionalidades Implementadas:

✅ **Edição de Textos em Tempo Real** - Clique nos elementos destacados  
✅ **6 Fontes Profissionais** - Inter, Roboto, Open Sans, Montserrat, Poppins, Exo 2  
✅ **4 Presets de Design** - Tech, Elegante, Moderno, Clássico  
✅ **Configurações Avançadas** - Controle de animações e partículas  
✅ **Salvar/Carregar** - Persistência no navegador  
✅ **Exportar/Importar** - Backup em arquivo JSON  
✅ **Interface Responsiva** - Funciona em desktop e mobile  

---

## 🚀 Processo de Deploy

### **Passo 1: Preparar Arquivos Localmente**

```bash
# 1. Navegar até sua pasta do projeto
cd caminho/para/seu/projeto-luna

# 2. Criar os novos arquivos
# - Copiar conteúdo do customization-styles.css
# - Copiar conteúdo do customization-panel.js  
# - Atualizar index.html com as novas linhas no <head>

# 3. Testar localmente
python -m http.server 8000
# Abrir http://localhost:8000 e testar o sistema
```

### **Passo 2: Git + Deploy**

```bash
# Adicionar novos arquivos
git add css/customization-styles.css
git add js/customization-panel.js
git add index.html

# Commit
git commit -m "feat: adicionar sistema de personalização de textos e fontes

- Painel lateral com edição em tempo real
- 6 opções de fontes profissionais
- 4 presets de design (Tech, Elegante, Moderno, Clássico)
- Controles de animações e partículas
- Salvar/carregar configurações locais
- Exportar/importar em JSON
- Interface responsiva mobile"

# Push para GitHub
git push origin main
```

### **Passo 3: Configurar Netlify**

1. **Acessar Netlify:** https://app.netlify.com/
2. **Novo Site:** "New site from Git"
3. **Conectar GitHub:** Autorizar e selecionar repositório
4. **Build Settings:**
   - Build command: `# deixar vazio (site estático)`
   - Publish directory: `/ ou . `
5. **Deploy Site:** Netlify vai gerar uma URL temporária

### **Passo 4: Configurar Domínio Customizado**

**No Netlify:**
1. Site Settings → Domain management
2. "Add custom domain" → `luna-ai.cloud`
3. Netlify vai mostrar as configurações DNS necessárias

**Exemplo de configuração DNS que o Netlify vai fornecer:**
```
CNAME: www → seu-site-123456.netlify.app
A: @ → 75.2.60.5
```

### **Passo 5: Configurar DNS no Hostinger**

1. **Acessar Hostinger:** hpanel.hostinger.com
2. **DNS do Domínio:** Domínios → luna-ai.cloud → DNS/Nameservers
3. **Alterar registros:**

```
# REMOVER registros antigos do domínio principal
# ADICIONAR novos registros:

Tipo: A
Nome: @ (ou deixar vazio)
Aponta para: 75.2.60.5
TTL: 14400

Tipo: CNAME  
Nome: www
Aponta para: seu-site-123456.netlify.app
TTL: 14400
```

### **Passo 6: Aguardar Propagação**

- **Tempo:** 15 minutos a 2 horas
- **Verificar:** https://dnschecker.org/
- **Testar:** Acessar https://luna-ai.cloud

---

## 🎨 Como Usar o Sistema de Personalização

### **Para Você (Administrador):**

1. **Botão Flutuante:** Clique no ícone 🎨 no lado direito
2. **Painel Lateral:** Abre com todas as opções
3. **Fontes:** Dropdown com 6 opções profissionais
4. **Presets:** 4 estilos prontos com um clique
5. **Edição de Textos:** 
   - Ativar "Modo de Edição"
   - Elementos ficam destacados
   - Clicar para editar
6. **Salvar:** Configurações ficam no navegador
7. **Exportar:** Baixar arquivo JSON com configurações

### **Para Clientes/Usuários:**

- Sistema invisível por padrão
- Apenas você vê o botão de personalização
- Site funciona normalmente para visitantes
- Alterações só aparecem para quem editou

---

## 🔧 Configurações Avançadas

### **SSL Automático:**
- Netlify configura SSL automatically
- Certificado válido para luna-ai.cloud e www.luna-ai.cloud

### **Deploy Contínuo:**
- Cada `git push` faz deploy automático
- ~2 minutos para atualizar o site

### **Formulário de Contato:**
- Já configurado para Netlify Forms
- Atributo `data-netlify="true"` ativo

---

## 📊 URLs Finais

Após configuração completa:

- **Site Principal:** https://luna-ai.cloud
- **Alternativo:** https://www.luna-ai.cloud  
- **Bot (futuro):** https://bot.luna-ai.cloud (quando configurar o Nanopi)

---

## 🆘 Troubleshooting

### **Site não carrega após DNS:**
- Aguardar até 2h para propagação completa
- Testar em navegador privado/incógnito
- Verificar configurações DNS no Hostinger

### **Sistema de personalização não aparece:**
- Verificar se arquivos CSS/JS foram enviados
- Abrir console do navegador (F12) para ver erros
- Confirmar que index.html tem as linhas novas no `<head>`

### **Botão flutuante não aparece:**
- Aguardar carregamento completo da página
- Script carrega após 1 segundo por design
- Verificar se JavaScript está habilitado

---

## 🎯 Resultado Final

✅ **Site profissional no domínio principal**  
✅ **Sistema de personalização funcional**  
✅ **Deploy automático via GitHub**  
✅ **SSL configurado**  
✅ **Formulários funcionando**  
✅ **Performance otimizada (Netlify CDN)**  

**Seu site ficará disponível em luna-ai.cloud com sistema completo de personalização, deploy automático e performance de nível enterprise!**