class CustomizationPanel {
    constructor() {
        this.isOpen = false;
        this.editableElements = new Map();
        this.currentFont = 'Inter';
        this.init();
    }
    
    init() {
        this.createPanel();
        this.createToggleButton();
        this.setupEditableElements();
        this.loadSavedSettings();
    }
    
    createPanel() {
        const panel = document.createElement('div');
        panel.className = 'customization-panel';
        panel.id = 'customization-panel';
        
        panel.innerHTML = `
            <div class="panel-header">
                <h3 class="panel-title">🎨 Personalizar Site</h3>
                <p class="panel-subtitle">Edite textos e fontes em tempo real</p>
            </div>
            
            <div class="control-group">
                <label class="control-label">Fonte Principal</label>
                <select class="font-selector" id="font-selector">
                    <option value="Inter">Inter (Padrão)</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Poppins">Poppins</option>
                    <option value="Exo 2">Exo 2</option>
                </select>
                
                <div class="preset-buttons">
                    <button class="preset-btn" onclick="customizer.applyPreset('tech')">Tech</button>
                    <button class="preset-btn" onclick="customizer.applyPreset('elegant')">Elegante</button>
                    <button class="preset-btn" onclick="customizer.applyPreset('modern')">Moderno</button>
                    <button class="preset-btn" onclick="customizer.applyPreset('classic')">Clássico</button>
                </div>
            </div>
            
            <div class="control-group">
                <label class="control-label">Modo de Edição</label>
                <button class="preset-btn" id="edit-mode-toggle" onclick="customizer.toggleEditMode()">
                    ✏️ Ativar Edição de Textos
                </button>
                <p style="font-size: 0.75rem; color: #A1A1AA; margin-top: 0.5rem;">
                    Clique nos textos destacados para editá-los
                </p>
            </div>
            
            <div class="control-group">
                <label class="control-label">Configurações Avançadas</label>
                <div class="preset-buttons">
                    <button class="preset-btn" onclick="customizer.toggleAnimations()">
                        ⚡ Animações
                    </button>
                    <button class="preset-btn" onclick="customizer.toggleParticles()">
                        ✨ Partículas
                    </button>
                </div>
            </div>
            
            <div class="control-group">
                <label class="control-label">Ações Rápidas</label>
                <button class="preset-btn" onclick="customizer.exportSettings()">
                    📥 Exportar Configurações
                </button>
                <input type="file" id="import-input" accept=".json" style="display: none;" onchange="customizer.importSettings(event)">
                <button class="preset-btn" onclick="document.getElementById('import-input').click()">
                    📤 Importar Configurações
                </button>
            </div>
            
            <div class="save-buttons">
                <button class="save-btn" onclick="customizer.saveSettings()">
                    💾 Salvar Alterações
                </button>
                <button class="reset-btn" onclick="customizer.resetToDefault()">
                    🔄 Restaurar Padrão
                </button>
                <button class="preset-btn" onclick="customizer.previewMode()">
                    👁️ Modo Preview
                </button>
            </div>
        `;
        
        document.body.appendChild(panel);
        
        // Event listeners
        document.getElementById('font-selector').addEventListener('change', (e) => {
            this.changeFont(e.target.value);
        });
    }
    
    createToggleButton() {
        const toggle = document.createElement('button');
        toggle.className = 'customize-toggle';
        toggle.innerHTML = '🎨';
        toggle.title = 'Personalizar Site';
        toggle.onclick = () => this.togglePanel();
        document.body.appendChild(toggle);
    }
    
    setupEditableElements() {
        // Marcar elementos editáveis
        const editableSelectors = [
            '.hero-title .title-line:first-child',
            '.hero-title .title-line:last-child',
            '.hero-subtitle', 
            '.section-title',
            '.section-subtitle',
            '.feature-title',
            '.feature-description',
            '.about-info h3',
            '.about-info p',
            '.cta-title',
            '.cta-subtitle',
            '.footer-description',
            '.section-tag',
            '.stat-label',
            '.metric-label',
            '.btn-primary .btn-icon + *',
            '.roi-title',
            '.roi-subtitle'
        ];
        
        editableSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                this.makeEditable(el);
            });
        });
    }
    
    makeEditable(element) {
        const originalText = element.textContent;
        this.editableElements.set(element, originalText);
        
        element.classList.add('editable-text');
        element.setAttribute('data-original', originalText);
        element.setAttribute('data-id', this.generateId());
        
        // Tooltip
        const tooltip = document.createElement('span');
        tooltip.className = 'edit-tooltip';
        tooltip.textContent = 'Clique para editar';
        element.appendChild(tooltip);
        
        element.addEventListener('click', (e) => {
            if (element.classList.contains('edit-mode-active')) {
                e.preventDefault();
                e.stopPropagation();
                this.editText(element);
            }
        });
    }
    
    editText(element) {
        const currentText = element.textContent.replace('Clique para editar', '').trim();
        const newText = prompt('Editar texto:', currentText);
        
        if (newText !== null && newText !== currentText) {
            // Preservar HTML interno se houver (como spans com gradiente)
            if (element.querySelector('.gradient-text')) {
                // Para elementos com gradiente, preservar a estrutura
                const parts = newText.split(' ');
                const lastWords = parts.slice(-2).join(' '); // Últimas 2 palavras com gradiente
                const firstParts = parts.slice(0, -2).join(' ');
                element.innerHTML = `${firstParts} <span class="gradient-text">${lastWords}</span>`;
            } else {
                element.textContent = newText;
            }
            
            // Re-adicionar tooltip
            const tooltip = document.createElement('span');
            tooltip.className = 'edit-tooltip';
            tooltip.textContent = 'Clique para editar';
            element.appendChild(tooltip);
            
            this.showNotification('Texto atualizado!', 'success');
        }
    }
    
    toggleEditMode() {
        const button = document.getElementById('edit-mode-toggle');
        const editableElements = document.querySelectorAll('.editable-text');
        
        if (button.textContent.includes('Ativar')) {
            // Ativar modo de edição
            button.textContent = '❌ Desativar Edição';
            button.style.background = 'rgba(239, 68, 68, 0.2)';
            button.style.borderColor = '#EF4444';
            button.style.color = '#F87171';
            editableElements.forEach(el => el.classList.add('edit-mode-active'));
            this.showNotification('Modo de edição ativado! Clique nos textos destacados.', 'info');
        } else {
            // Desativar modo de edição
            button.textContent = '✏️ Ativar Edição de Textos';
            button.style.background = '';
            button.style.borderColor = '';
            button.style.color = '';
            editableElements.forEach(el => el.classList.remove('edit-mode-active'));
            this.showNotification('Modo de edição desativado.', 'info');
        }
    }
    
    changeFont(fontFamily) {
        this.currentFont = fontFamily;
        document.documentElement.style.setProperty('--font-primary', `'${fontFamily}', -apple-system, BlinkMacSystemFont, sans-serif`);
        
        // Para títulos, usar a fonte display
        if (fontFamily === 'Exo 2') {
            document.documentElement.style.setProperty('--font-display', `'${fontFamily}', -apple-system, BlinkMacSystemFont, sans-serif`);
        }
        
        this.showNotification(`Fonte alterada para ${fontFamily}`, 'success');
    }
    
    applyPreset(presetName) {
        const presets = {
            tech: {
                font: 'Roboto',
                primary: '#00D9FF',
                secondary: '#7C3AED',
                name: 'Tecnológico'
            },
            elegant: {
                font: 'Montserrat',
                primary: '#D4AF37',
                secondary: '#2C2C2C',
                name: 'Elegante'
            },
            modern: {
                font: 'Poppins',
                primary: '#FF6B6B',
                secondary: '#4ECDC4',
                name: 'Moderno'
            },
            classic: {
                font: 'Inter',
                primary: '#06B6D4',
                secondary: '#7C3AED',
                name: 'Clássico'
            }
        };
        
        const preset = presets[presetName];
        if (preset) {
            this.changeFont(preset.font);
            document.getElementById('font-selector').value = preset.font;
            
            // Aplicar cores do preset
            document.documentElement.style.setProperty('--primary-cyan', preset.primary);
            document.documentElement.style.setProperty('--primary-violet', preset.secondary);
            
            this.showNotification(`Preset "${preset.name}" aplicado!`, 'success');
        }
    }
    
    toggleAnimations() {
        const isDisabled = document.body.classList.contains('no-animations');
        
        if (isDisabled) {
            document.body.classList.remove('no-animations');
            this.showNotification('Animações ativadas', 'success');
        } else {
            document.body.classList.add('no-animations');
            document.documentElement.style.setProperty('--transition-fast', '0ms');
            document.documentElement.style.setProperty('--transition-normal', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
            this.showNotification('Animações desativadas', 'info');
        }
    }
    
    toggleParticles() {
        const particles = document.getElementById('hero-particles');
        if (particles) {
            const isHidden = particles.style.display === 'none';
            particles.style.display = isHidden ? 'block' : 'none';
            this.showNotification(isHidden ? 'Partículas ativadas' : 'Partículas desativadas', 'info');
        }
    }
    
    previewMode() {
        const panel = document.getElementById('customization-panel');
        const toggle = document.querySelector('.customize-toggle');
        
        if (panel.style.display === 'none') {
            panel.style.display = 'block';
            toggle.style.display = 'block';
            this.showNotification('Modo de edição ativado', 'info');
        } else {
            panel.style.display = 'none';
            toggle.style.display = 'none';
            this.showNotification('Modo preview ativado - pressione F5 para voltar', 'info');
        }
    }
    
    saveSettings() {
        const settings = {
            font: this.currentFont,
            textChanges: {},
            customizations: {
                animations: !document.body.classList.contains('no-animations'),
                particles: document.getElementById('hero-particles')?.style.display !== 'none'
            },
            timestamp: new Date().toISOString()
        };
        
        // Salvar alterações de texto
        this.editableElements.forEach((original, element) => {
            const current = element.textContent.replace('Clique para editar', '').trim();
            if (current !== original) {
                const id = element.getAttribute('data-id') || this.getElementSelector(element);
                settings.textChanges[id] = current;
            }
        });
        
        localStorage.setItem('luna-customization', JSON.stringify(settings));
        this.showNotification('Configurações salvas no navegador!', 'success');
    }
    
    loadSavedSettings() {
        const saved = localStorage.getItem('luna-customization');
        if (saved) {
            try {
                const settings = JSON.parse(saved);
                
                // Aplicar fonte
                if (settings.font) {
                    setTimeout(() => {
                        this.changeFont(settings.font);
                        const selector = document.getElementById('font-selector');
                        if (selector) selector.value = settings.font;
                    }, 500);
                }
                
                // Aplicar mudanças de texto
                if (settings.textChanges) {
                    setTimeout(() => {
                        Object.entries(settings.textChanges).forEach(([id, text]) => {
                            const element = document.querySelector(`[data-id="${id}"]`) || 
                                           document.querySelector(id);
                            if (element) {
                                if (element.querySelector('.gradient-text')) {
                                    const parts = text.split(' ');
                                    const lastWords = parts.slice(-2).join(' ');
                                    const firstParts = parts.slice(0, -2).join(' ');
                                    element.innerHTML = `${firstParts} <span class="gradient-text">${lastWords}</span>`;
                                } else {
                                    element.textContent = text;
                                }
                                
                                // Re-adicionar tooltip
                                const tooltip = document.createElement('span');
                                tooltip.className = 'edit-tooltip';
                                tooltip.textContent = 'Clique para editar';
                                element.appendChild(tooltip);
                            }
                        });
                    }, 1000);
                }
                
                // Aplicar customizações
                if (settings.customizations) {
                    if (!settings.customizations.animations) {
                        this.toggleAnimations();
                    }
                    if (!settings.customizations.particles) {
                        setTimeout(() => this.toggleParticles(), 1500);
                    }
                }
                
            } catch (e) {
                console.error('Erro ao carregar configurações:', e);
            }
        }
    }
    
    exportSettings() {
        const settings = JSON.parse(localStorage.getItem('luna-customization') || '{}');
        const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `luna-customization-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Configurações exportadas!', 'success');
    }
    
    importSettings(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const settings = JSON.parse(e.target.result);
                    localStorage.setItem('luna-customization', JSON.stringify(settings));
                    this.showNotification('Configurações importadas! Recarregando...', 'success');
                    setTimeout(() => location.reload(), 1500);
                } catch (err) {
                    this.showNotification('Erro ao importar arquivo!', 'error');
                }
            };
            reader.readAsText(file);
        }
        event.target.value = ''; // Reset input
    }
    
    resetToDefault() {
        if (confirm('Tem certeza que deseja restaurar todas as configurações padrão? Esta ação não pode ser desfeita.')) {
            localStorage.removeItem('luna-customization');
            this.showNotification('Configurações restauradas! Recarregando...', 'info');
            setTimeout(() => location.reload(), 1500);
        }
    }
    
    togglePanel() {
        const panel = document.getElementById('customization-panel');
        this.isOpen = !this.isOpen;
        panel.classList.toggle('open', this.isOpen);
        
        if (this.isOpen) {
            this.showNotification('Painel de personalização aberto', 'info');
        }
    }
    
    generateId() {
        return 'edit-' + Math.random().toString(36).substr(2, 9);
    }
    
    getElementSelector(element) {
        // Gerar seletor único para o elemento
        if (element.id) return `#${element.id}`;
        if (element.className) {
            const classes = element.className.split(' ')
                .filter(c => c && !c.includes('editable') && !c.includes('edit-mode'))
                .join('.');
            if (classes) return `.${classes}`;
        }
        return element.tagName.toLowerCase();
    }
    
    showNotification(message, type = 'info') {
        // Remover notificações existentes
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilo da notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '90px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '10001',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10B981' : 
                           type === 'error' ? '#EF4444' : 
                           type === 'warning' ? '#F59E0B' : '#06B6D4',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            maxWidth: '300px',
            fontSize: '0.875rem'
        });
        
        document.body.appendChild(notification);
        
        // Animação
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// CSS adicional para animações
const additionalStyles = `
    .no-animations * {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Aguardar um pouco para garantir que tudo foi carregado
    setTimeout(() => {
        window.customizer = new CustomizationPanel();
    }, 1000);
});

// Inicializar imediatamente se o DOM já estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            if (!window.customizer) {
                window.customizer = new CustomizationPanel();
            }
        }, 1000);
    });
} else {
    // DOM já carregado
    setTimeout(() => {
        if (!window.customizer) {
            window.customizer = new CustomizationPanel();
        }
    }, 1000);
}