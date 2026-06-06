# 🏍️ La Clínica del Casco

Sitio web (catálogo + compras contraentrega) para **La Clínica del Casco**, tienda
especializada en productos para motocicletas en **Montería, Colombia**.

Aplicación React + Vite, totalmente responsive, con tema oscuro y acentos de fuego/carmesí,
animaciones de scroll y un flujo completo de compra **100% contraentrega**.

## ✨ Funcionalidades

- **Catálogo** con filtros por categoría, búsqueda y ordenamiento.
- **Detalle de producto** con selección de color/presentación, cantidad y stock.
- **Carrito** persistente y **checkout contraentrega** con confirmación de pedido.
- **Cuentas de usuario**: registro, login, perfil con historial de pedidos,
  seguimiento de estado y gestión de direcciones.
- **Botón flotante de WhatsApp** siempre visible + enlaces a Instagram, Facebook y TikTok.
- **Ubicación** con mapa de Google Maps embebido, horarios y datos de contacto.
- **Ganchos comerciales** ("Disponible 24/7", "Enviamos a todo el país",
  "Entregas el mismo día en Montería") destacados en el hero y a lo largo del sitio.
- **SEO básico**: meta tags, Open Graph y Twitter Cards.

## 🛠️ Stack

- React 19 + Vite
- React Router
- Tailwind CSS v4 (con variables CSS para theming)
- Framer Motion (animaciones)

## 🚀 Cómo ejecutar

```bash
npm install
npm run dev      # entorno de desarrollo
npm run build    # build de producción
npm run preview  # previsualizar el build
```

## ⚙️ Configuración

Toda la información del negocio (WhatsApp, redes, dirección, horarios, mapa) está
centralizada en `src/data/site.js`. El catálogo vive en `src/data/products.js`.

## 📦 Persistencia y backend

Para que el sitio funcione de inmediato sin servidores externos, el carrito, las cuentas
de usuario y los pedidos se guardan en `localStorage` (ver `src/context/StoreContext.jsx`).
Las funciones `register`, `login`, `placeOrder`, etc. están aisladas en el store, de modo
que se pueden reemplazar por llamadas a una API real (Node/Express, Next.js, etc.) sin
tocar la interfaz. Lo mismo aplica para enviar correos de confirmación reales
(Nodemailer / Resend) en `placeOrder`.
