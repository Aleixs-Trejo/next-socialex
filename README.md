# 🌐 Socialex

**Socialex** es un proyecto personal desarrollado con **Next.js** cuyo objetivo principal es practicar y mejorar mis habilidades como desarrollador frontend/fullstack, explorando patrones modernos, autenticación, manejo de estado global y consumo de APIs externas.

La idea de Socialex es funcionar como una **red social de entretenimiento**, donde los usuarios pueden descubrir música, contenido multimedia y divertirse con pequeños juegos de navegador.

---

## 🚀 Características principales

- 🔐 **Autenticación**
  - Registro mediante **formulario multipasos**
  - Inicio de sesión con **Google** (NextAuth)
- 👤 **Perfil de usuario**
  - Acceso condicionado según sesión activa
- 🎵 **Música**
  - Integración con la **API de Spotify**
  - Búsqueda y visualización de información musical
- 🎬 **Contenido multimedia**
  - Información general sobre:
    - Anime
    - Series
    - Películas  
  > ⚠️ *No se aloja contenido multimedia completo, solo información y referencias*
- 🎮 **Juegos de navegador**
  - Pequeños juegos casuales directamente desde la web
- 👥 **Sistema de usuarios / amigos**
  - Visualización de otros perfiles
- 🧭 **Navegación dinámica**
  - Sidebar con rutas protegidas según la sesión
  - UI reactiva y moderna

---

## 🧱 Tecnologías utilizadas

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **BetterAuth**
- **Zustand** (manejo de estado global)
- **Spotify Web API**
- **Tailwind CSS**
- **React Icons**

---

## 🗂️ Estructura general

- `/socialex/feed` → Inicio / Feed principal  
- `/socialex/users` → Usuarios / Amigos  
- `/socialex/profile` → Perfil (solo usuarios autenticados)  
- `/socialex/music` → Música (Spotify API)  
- `/socialex/games` → Juegos de navegador  

La navegación se adapta dinámicamente según el estado de autenticación del usuario.

---

## 🧠 Aprendizajes clave

Este proyecto me ha permitido practicar:

- Formularios multipasos con validaciones
- Autenticación con proveedores externos
- Manejo de sesiones en Server y Client Components
- Estado global con Zustand
- Consumo de APIs externas
- Diseño de UI modular y reutilizable
- Protección de rutas y renderizado condicional

---

## ⚙️ Variables de entorno
Para que el proyecto funcione correctamente, es necesario configurar:

```env
NEXTAUTH_SECRET=
NEXTAUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
```

---

## 📌 Estado del proyecto
### 🛠️ En desarrollo activo
Este proyecto sigue creciendo con nuevas ideas, mejoras de rendimiento y funcionalidades adicionales.

---

## 📄 Nota final
Socialex es un proyecto educativo y experimental, creado con fines de aprendizaje.
No tiene fines comerciales ni de monetización.

---

_✨ Gracias por visitar Socialex ✨_

###### Sí amigo, la IA me ayudó a generar todo eso XD.