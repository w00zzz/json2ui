#!/bin/bash

SESSION_FILE="auth.session"
BASE_URL="http://localhost:3000"

get_csrf_token() {
  http --session="$SESSION_FILE" GET "$BASE_URL/api/auth/csrf" | jq -r .csrfToken
}

login() {
  echo "🔐 Iniciando sesión..."
  read -p "Email: " EMAIL
  read -s -p "Password: " PASSWORD
  echo

  CSRF=$(get_csrf_token)
  echo "✅ CSRF Token: $CSRF"

  http --session="$SESSION_FILE" \
    POST "$BASE_URL/api/auth/callback/credentials" \
    Content-Type:application/x-www-form-urlencoded \
    csrfToken="$CSRF" \
    email="$EMAIL" \
    password="$PASSWORD"

  echo -e "\n🔍 Verificando sesión..."
  http --session="$SESSION_FILE" GET "$BASE_URL/api/auth/session"
}

logout() {
  echo "🚪 Cerrando sesión..."
  CSRF=$(get_csrf_token)

  http --session="$SESSION_FILE" \
    POST "$BASE_URL/api/auth/signout" \
    Content-Type:application/x-www-form-urlencoded \
    csrfToken="$CSRF"

  echo -e "\n🔍 Verificando sesión..."
  http --session="$SESSION_FILE" GET "$BASE_URL/api/auth/session"
}

show_session() {
  echo "🔍 Estado de la sesión:"
  http --session="$SESSION_FILE" GET "$BASE_URL/api/auth/session"
}

menu() {
  echo "=== 🛡️ Auth Menu ==="
  echo "1) Login"
  echo "2) Logout"
  echo "3) Ver sesión actual"
  echo "4) Salir"
  echo "===================="
}

while true; do
  menu
  read -p "Elige una opción: " opt
  case $opt in
    1) login ;;
    2) logout ;;
    3) show_session ;;
    4) echo "👋 Saliendo..."; exit 0 ;;
    *) echo "❌ Opción inválida" ;;
  esac
done

