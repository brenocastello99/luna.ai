@echo off
echo ========================================
echo    LUNA.AI - Servidor Local
echo ========================================
echo.
echo Iniciando servidor local...
echo Acesse: http://localhost:8000
echo.
echo Para parar o servidor, pressione Ctrl+C
echo.
python -m http.server 8000
pause
