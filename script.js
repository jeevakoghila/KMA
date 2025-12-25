// Extracted JS from index.html
// Default configuration
const defaultConfig = {
  hero_title: "Timeless Mehndi Art for Your Special Moments",
  hero_subtitle: "Bridal • Engagement • Festival • Custom Designs",
  about_title: "Where Tradition Meets Contemporary Elegance",
  about_description: "Kanyakumari Mehndi Aura crafts premium mehndi experiences for brides, families and events. With 15+ years of professional experience, we combine time-honored henna techniques with refined modern styling to deliver clean, camera-ready designs that last.",
  cta_text: "Make Your Celebration Memorable with Beautiful Mehndi",
  footer_tagline: "Creating timeless mehndi art that celebrates love, tradition, and the beauty of special moments.",
  background_color: "#FDF8F3",
  primary_color: "#6B1D3A",
  accent_color: "#C9A962",
  text_color: "#4A3728",
  secondary_surface_color: "#F5E6D3",
  font_family: "Montserrat",
  font_size: 16
};

// Gallery image placeholders (8 items)
const galleryItems = [
  { caption: "Bridal Full Hand Mehndi Design", imgSrc: "mehndi1.jpg" },
  { caption: "Intricate Mandala Mehndi Pattern", imgSrc: "mehndi2.jpg" },
  { caption: "Arabic Style Mehndi Design", imgSrc: "mehndi3.jpg" },
  { caption: "Festival Special Mehndi Design", imgSrc: "mehndi4.jpg" },
  { caption: "Engagement Mehndi Design", imgSrc: "mehndi5.jpg" },
  { caption: "Bridal Feet Mehndi Design", imgSrc: "mehndi6.jpg" },
  { caption: "Modern Minimal Mehndi Style", imgSrc: "mehndi7.jpg" },
  { caption: "Traditional Mehndi Pattern", imgSrc: "mehndi8.jpg" }
];

// Render gallery dynamically into #gallery-grid
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = galleryItems.map((item, i) => `\
    <div data-index="${i}" class="scroll-animate scroll-animate-scale stagger-${(i % 5) + 1} gallery-item relative aspect-square rounded-2xl overflow-hidden cursor-pointer group">\
      <div class="w-full h-full flex items-center justify-center p-0">\
        <img src="${item.imgSrc}" alt="${item.caption}" loading="lazy" class="w-full h-full object-cover"/>\
      </div>\
      <div class="gallery-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 flex items-end p-4">\
        <span class="text-white font-medium text-sm">${item.caption}</span>\
      </div>\
    </div>`).join('');

  if (window._scrollObserver) {
    document.querySelectorAll('#gallery-grid .scroll-animate').forEach(el => {
      if (!el.classList.contains('visible')) window._scrollObserver.observe(el);
    });
  }
}

// Click & ripple interactions
function createRipple(el, evt) {
  const rect = el.getBoundingClientRect();
  const r = Math.max(rect.width, rect.height);
  const span = document.createElement('span');
  span.className = 'ripple';
  span.style.width = span.style.height = r + 'px';
  span.style.left = (evt.clientX - rect.left - r/2) + 'px';
  span.style.top = (evt.clientY - rect.top - r/2) + 'px';
  el.appendChild(span);
  setTimeout(() => span.remove(), 700);
}

function initClickableAnimations() {
  document.querySelectorAll('#gallery-grid .gallery-item').forEach(el => {
    el.classList.add('tilt-click');
    el.addEventListener('pointerdown', (e) => {
      el.classList.add('click-zoom');
      setTimeout(() => el.classList.remove('click-zoom'), 350);
    });
    el.addEventListener('click', (e) => {
      createRipple(el, e);
      const idx = parseInt(el.getAttribute('data-index'), 10);
      setTimeout(() => openLightbox(idx), 140);
    });
  });

  document.querySelectorAll('.service-card').forEach(card => {
    card.classList.add('tilt-click');
    card.addEventListener('click', (e) => {
      card.classList.add('click-zoom');
      setTimeout(() => card.classList.remove('click-zoom'), 320);
    });
  });

  document.querySelectorAll('a.btn-primary, a.btn-secondary, button').forEach(btn => {
    btn.style.position = btn.style.position || 'relative';
    btn.addEventListener('click', (e) => {
      createRipple(btn, e);
    });
  });
}

// Parallax handler (mouse + scroll)
function initParallax() {
  const hero = document.getElementById('hero');
  const elems = document.querySelectorAll('[data-parallax]');
  function applyParallax(xPct, yPct) {
    elems.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.02;
      const tx = -xPct * speed * 30;
      const ty = -yPct * speed * 30;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });
  }
  if (hero) {
    hero.addEventListener('mousemove', (e) => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      applyParallax(x, y);
    });
  }
  window.addEventListener('scroll', () => {
    const sc = window.scrollY / (document.body.scrollHeight || 1);
    elems.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.02;
      el.style.transform = `translate3d(0, ${sc * speed * 80}px, 0)`;
    });
  }, { passive: true });
}

let currentTestimonial = 0;
let testimonialInterval;

// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

// Header scroll effect
function handleScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
}

// Scroll animations
function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  window._scrollObserver = observer;
  document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
  });
}

// Testimonial slider
function updateTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  const container = document.getElementById('testimonial-container');
  if (!track || !container) return;
  const containerWidth = container.offsetWidth;
  const totalSlides = track.children.length;
  const visibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const slideWidth = containerWidth / visibleCount;
  const maxIndex = Math.max(0, totalSlides - visibleCount);
  if (currentTestimonial > maxIndex) currentTestimonial = maxIndex;
  if (currentTestimonial < 0) currentTestimonial = 0;
  track.style.transform = `translateX(-${currentTestimonial * slideWidth}px)`;
}

function nextTestimonial() {
  const track = document.getElementById('testimonial-track');
  if (!track) return;
  const totalSlides = track.children.length;
  const visibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const maxIndex = Math.max(0, totalSlides - visibleCount);
  if (maxIndex === 0) return;
  currentTestimonial = (currentTestimonial >= maxIndex) ? 0 : currentTestimonial + 1;
  updateTestimonialSlider();
}

function prevTestimonial() {
  const track = document.getElementById('testimonial-track');
  if (!track) return;
  const totalSlides = track.children.length;
  const visibleCount = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const maxIndex = Math.max(0, totalSlides - visibleCount);
  if (maxIndex === 0) return;
  currentTestimonial = (currentTestimonial <= 0) ? maxIndex : currentTestimonial - 1;
  updateTestimonialSlider();
}

function startAutoSlide() {
  stopAutoSlide();
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

function stopAutoSlide() {
  if (testimonialInterval) clearInterval(testimonialInterval);
  testimonialInterval = null;
}

// Lightbox
function openLightbox(index) {
  const lightbox = document.getElementById('lightbox');
  const caption = document.getElementById('lightbox-caption');
  const lightboxImage = document.getElementById('lightbox-image');
  const item = galleryItems[index] || {};
  if (caption) caption.textContent = item.caption || '';
  if (lightboxImage) {
    if (item.imgSrc) {
      lightboxImage.innerHTML = `<img src="${item.imgSrc}" alt="${(item.caption||'Image')}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;">`;
    } else if (item.svg) {
      lightboxImage.innerHTML = `<svg id="lightbox-svg" class="w-full h-full" viewbox="0 0 200 200" fill="none">${item.svg}</svg>`;
    } else {
      lightboxImage.innerHTML = '';
    }
  }
  if (lightbox) {
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox(event) {
  if (event) event.stopPropagation();
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

// SDK render handlers
async function onConfigChange(config) {
  const heroTitle = document.getElementById('hero-title');
  const heroSub = document.getElementById('hero-subtitle');
  if (heroTitle) heroTitle.textContent = config.hero_title || defaultConfig.hero_title;
  if (heroSub) heroSub.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
  const aboutTitle = document.getElementById('about-title');
  const aboutDesc = document.getElementById('about-description');
  if (aboutTitle) aboutTitle.textContent = config.about_title || defaultConfig.about_title;
  if (aboutDesc) aboutDesc.textContent = config.about_description || defaultConfig.about_description;
  const ctaText = document.getElementById('cta-text');
  if (ctaText) ctaText.textContent = config.cta_text || defaultConfig.cta_text;
  const footerTag = document.getElementById('footer-tagline');
  if (footerTag) footerTag.textContent = config.footer_tagline || defaultConfig.footer_tagline;
  const bgColor = config.background_color || defaultConfig.background_color;
  const textColor = config.text_color || defaultConfig.text_color;
  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;
  const fontFamily = config.font_family || defaultConfig.font_family;
  const fontSize = config.font_size || defaultConfig.font_size;
  document.body.style.fontFamily = `${fontFamily}, Montserrat, sans-serif`;
  document.body.style.fontSize = `${fontSize}px`;
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      { get: () => config.background_color || defaultConfig.background_color, set: (v) => { config.background_color = v; if (window.elementSdk) window.elementSdk.setConfig({ background_color: v }); } },
      { get: () => config.secondary_surface_color || defaultConfig.secondary_surface_color, set: (v) => { config.secondary_surface_color = v; if (window.elementSdk) window.elementSdk.setConfig({ secondary_surface_color: v }); } },
      { get: () => config.text_color || defaultConfig.text_color, set: (v) => { config.text_color = v; if (window.elementSdk) window.elementSdk.setConfig({ text_color: v }); } },
      { get: () => config.primary_color || defaultConfig.primary_color, set: (v) => { config.primary_color = v; if (window.elementSdk) window.elementSdk.setConfig({ primary_color: v }); } },
      { get: () => config.accent_color || defaultConfig.accent_color, set: (v) => { config.accent_color = v; if (window.elementSdk) window.elementSdk.setConfig({ accent_color: v }); } }
    ],
    borderables: [],
    fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: (v) => { config.font_family = v; if (window.elementSdk) window.elementSdk.setConfig({ font_family: v }); } },
    fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: (v) => { config.font_size = v; if (window.elementSdk) window.elementSdk.setConfig({ font_size: v }); } }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ["hero_title", config.hero_title || defaultConfig.hero_title],
    ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
    ["about_title", config.about_title || defaultConfig.about_title],
    ["about_description", config.about_description || defaultConfig.about_description],
    ["cta_text", config.cta_text || defaultConfig.cta_text],
    ["footer_tagline", config.footer_tagline || defaultConfig.footer_tagline]
  ]);
}

// Theme handling: light / dark
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  if (isDark) {
    document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color-ivory').trim();
    document.body.style.color = getComputedStyle(document.documentElement).getPropertyValue('--color-brown').trim();
  } else {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
  }
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.innerHTML = isDark
      ? '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />'
      : '<path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z" />';
  }
  try { localStorage.setItem('site-theme', theme); } catch (e) {}
}

function initTheme() {
  const saved = (() => { try { return localStorage.getItem('site-theme'); } catch (e) { return null; } })();
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  applyTheme(theme);
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const savedNow = localStorage.getItem('site-theme');
      if (!savedNow) applyTheme(e.matches ? 'dark' : 'light');
    });
  }
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const now = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      applyTheme(now === 'dark' ? 'light' : 'dark');
    });
  }
}

// Initialize everything
function init() {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', updateTestimonialSlider);
  renderGallery();
  initScrollObserver();
  initClickableAnimations();
  initParallax();
  initTheme();
  updateTestimonialSlider();
  startAutoSlide();
  const testimonialSection = document.getElementById('testimonials');
  if (testimonialSection) {
    testimonialSection.addEventListener('mouseenter', stopAutoSlide);
    testimonialSection.addEventListener('mouseleave', startAutoSlide);
  }
  if (window.elementSdk) {
    window.elementSdk.init({ defaultConfig, onConfigChange, mapToCapabilities, mapToEditPanelValues });
  }
}

// safely init when DOM ready
if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(init, 20); else document.addEventListener('DOMContentLoaded', init);
