#!/bin/bash

# Comprueba si hay cambios
if git diff --quiet && git diff --cached --quiet; then
  echo "✅ No hay cambios para subir."
  exit 0
fi

# Formato de fecha y hora
DATE=$(date "+%Y-%m-%d %H:%M")

# Mensaje de commit
COMMIT_MSG="Auto: $DATE - cambios locales"

# Añadir, commitear y hacer push
git add .
git commit -m "$COMMIT_MSG"
git push

echo "🚀 Cambios subidos a GitHub con mensaje:"
echo "$COMMIT_MSG"
