#!/bin/bash
echo "============================================"
echo "🚀 Iniciando subida a GitHub (Modo SSH)"
echo "============================================"
echo "Repositorio: git@github.com:eliasjr89/screenshot-beautifier.git"
echo ""
echo "Configurando remoto..."
git remote set-url origin git@github.com:eliasjr89/screenshot-beautifier.git

echo "Ejecutando: git push -u origin main"
echo "--------------------------------------------"

git push -u origin main

echo ""
echo "============================================"
if [ $? -eq 0 ]; then
    echo "✅ ¡Subida completada con éxito!"
else
    echo "❌ Falló la subida."
    echo "Asegúrate de tener tus claves SSH configuradas en GitHub."
    echo "Si prefieres usar HTTPS (Token), edita este archivo o avísame."
fi
echo "============================================"
