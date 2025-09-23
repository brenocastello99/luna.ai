#!/bin/bash

echo "========================================"
echo "    LUNA.AI - Servidor Local"
echo "========================================"
echo ""
echo "Iniciando servidor local..."
echo "Acesse: http://localhost:8000"
echo ""
echo "Para parar o servidor, pressione Ctrl+C"
echo ""

# Tenta python3 primeiro, depois python
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "Python não encontrado. Instale Python para continuar."
    exit 1
fi
