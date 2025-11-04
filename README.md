# 🚀 Portfolio Personal - Ian

Un portfolio web moderno y responsive para desarrollador web, construido con HTML5, CSS3 y JavaScript vanilla.

## ✨ Características

- **Diseño Responsive**: Se adapta perfectamente a todos los dispositivos
- **Animaciones Suaves**: Efectos de scroll y transiciones modernas
- **Performance Optimizada**: Carga rápida y experiencia fluida
- **SEO Friendly**: Optimizado para motores de búsqueda
- **Accesibilidad**: Cumple con estándares de accesibilidad web
- **Cross-Browser**: Compatible con todos los navegadores modernos

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - HTML5 semántico
  - CSS3 con variables personalizadas
  - JavaScript ES6+
  - Font Awesome Icons
  - Google Fonts (Inter)

- **Bibliotecas**:
  - AOS (Animate On Scroll)
  - Intersection Observer API

## 📱 Secciones del Portfolio

1. **Hero Section**: Presentación principal con efecto de texto animado
2. **Sobre Mí**: Información personal y estadísticas
3. **Habilidades**: Grid de tecnologías y herramientas
4. **Proyectos**: Portfolio filtrable de trabajos
5. **Contacto**: Formulario funcional y información de contacto

## 🚀 Instalación y Uso

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tuusuario/mi-portfolio.git
   cd mi-portfolio
   ```

2. **Abre el proyecto**:
   - Simplemente abre `index.html` en tu navegador
   - O usa un servidor local como Live Server en VS Code

3. **Personalización**:
   - Edita el contenido en `index.html`
   - Modifica los estilos en `css/style.css`
   - Ajusta la funcionalidad en `js/script.js`

## 🎨 Personalización

### Cambiar Colores
Modifica las variables CSS en `:root` dentro de `css/style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #f59e0b;
    --accent-color: #10b981;
    /* ... más colores */
}
```

### Agregar Proyectos
Añade nuevas tarjetas de proyecto en la sección `#projects`:

```html
<div class="project-card" data-category="web" data-aos="fade-up">
    <div class="project-image">
        <img src="assets/tu-proyecto.jpg" alt="Tu Proyecto">
        <div class="project-overlay">
            <a href="#" class="project-link">
                <i class="fas fa-external-link-alt"></i>
            </a>
            <a href="https://github.com/tuusuario/proyecto" class="project-link">
                <i class="fab fa-github"></i>
            </a>
        </div>
    </div>
    <div class="project-content">
        <h3>Nombre del Proyecto</h3>
        <p>Descripción del proyecto...</p>
        <div class="project-tech">
            <span>React</span>
            <span>Node.js</span>
        </div>
    </div>
</div>
```

### Modificar Información Personal
Actualiza los siguientes elementos:

- **Nombre y título**: Edita el hero section
- **Información de contacto**: Actualiza email, teléfono y ubicación
- **Enlaces sociales**: Cambia las URLs de GitHub, LinkedIn, etc.
- **CV**: Reemplaza el enlace del CV en la sección "Sobre mí"

## 📂 Estructura del Proyecto

```
mi-portfolio/
│
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos principales
├── js/
│   └── script.js       # Funcionalidad JavaScript
├── assets/
│   ├── hero-image.svg  # Imagen SVG del hero
│   ├── about-image.jpg # Tu foto personal (por añadir)
│   ├── project1.jpg    # Imágenes de proyectos (por añadir)
│   ├── project2.jpg
│   ├── project3.jpg
│   ├── project4.jpg
│   └── cv-ian-desarrollador.pdf # Tu CV (por añadir)
└── README.md           # Este archivo
```

## 🖼️ Imágenes Necesarias

Para completar el portfolio, necesitarás añadir las siguientes imágenes:

1. **Foto personal** (`assets/about-image.jpg`): 400x400px recomendado
2. **Imágenes de proyectos** (`assets/project1-4.jpg`): 600x400px recomendado
3. **CV en PDF** (`assets/cv-ian-desarrollador.pdf`)
4. **Favicon** (`assets/favicon.ico`): 32x32px

## 🚀 Despliegue

### GitHub Pages
1. Sube el código a GitHub
2. Ve a Settings → Pages
3. Selecciona la rama main como fuente
4. Tu portfolio estará disponible en `https://tuusuario.github.io/mi-portfolio`

### Netlify
1. Conecta tu repositorio de GitHub
2. Netlify detectará automáticamente la configuración
3. Tu sitio se desplegará automáticamente

### Vercel
1. Importa tu proyecto desde GitHub
2. Vercel se encargará del resto automáticamente

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ⚡ Optimizaciones de Performance

- **Lazy Loading**: Las imágenes se cargan según sea necesario
- **Minificación**: CSS y JS optimizados para producción
- **Compresión de imágenes**: Usar formatos WebP cuando sea posible
- **Critical CSS**: Estilos críticos inline
- **Service Worker**: Para funcionalidad offline (opcional)

## 🎯 SEO y Accesibilidad

- **Meta tags** optimizados
- **Estructura semántica** con HTML5
- **Alt text** en todas las imágenes
- **Aria labels** para elementos interactivos
- **Contraste de colores** cumple WCAG 2.1
- **Navegación por teclado** completamente funcional

## 🐛 Solución de Problemas

### Las animaciones no funcionan
- Verifica que AOS esté cargando correctamente
- Comprueba que JavaScript esté habilitado

### El formulario no envía
- Por defecto está configurado para mostrar una notificación
- Integra con un servicio como Formspree o Netlify Forms

### Problemas de responsive
- Verifica que el viewport meta tag esté presente
- Comprueba los media queries en CSS

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si encuentras algún bug o tienes ideas para mejoras:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Contacto

**Ian** - Desarrollador Web
- Email: ian@ejemplo.com
- LinkedIn: [linkedin.com/in/tuusuario](https://linkedin.com/in/tuusuario)
- GitHub: [github.com/tuusuario](https://github.com/tuusuario)

---

⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub!

## 🔄 Próximas Mejoras

- [ ] Modo oscuro/claro
- [ ] Blog integrado
- [ ] Animaciones más avanzadas
- [ ] PWA (Progressive Web App)
- [ ] Multilingual support
- [ ] CMS headless integration
- [ ] Tests automatizados

## 🙏 Agradecimientos

- [Font Awesome](https://fontawesome.com/) por los iconos
- [Google Fonts](https://fonts.google.com/) por la tipografía
- [AOS Library](https://michalsnik.github.io/aos/) por las animaciones
- [Unsplash](https://unsplash.com/) por las imágenes de placeholder