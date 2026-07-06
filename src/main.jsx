import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, Award, BadgeCheck, BarChart3, BriefcaseBusiness, Building2,
  ChevronDown, ClipboardCheck, FileCheck2, Flame, Gauge, Gavel,
  HardHat, Home, Mail, Menu, MessageCircle, Phone, ShieldCheck,
  ShieldAlert, Star, Users, X
} from 'lucide-react'
import './styles.css'

const WHATSAPP_NUMBER = '51959462430'
const SECOND_NUMBER = '+51 941 760 395'
const EMAIL = 'informacionprotpae@gmail.com'

const wa = (message = 'Hola VJ Consultores Perú, quiero información sobre sus servicios de seguridad e ingeniería.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const logo = '/brochure/vj-logo-better.png'
const brochure = {
  portada: '/brochure/page-01.png',
  nosotros: '/brochure/page-02.png',
  homologacion: '/brochure/page-03.png',
  sst: '/brochure/page-04.png',
  capacitacion: '/brochure/page-05.png',
  iso: '/brochure/page-06.png',
  monitoreos: '/brochure/page-07.png',
  fiscalizacion: '/brochure/page-08.png',
  incendio: '/brochure/page-09.png',
  ingenieria: '/brochure/page-10.png',
  clientes: '/brochure/page-11.png',
}

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'servicios', label: 'Servicios', dropdown: true },
  { id: 'normas', label: 'Normas ISO', dropdown: true },
  { id: 'sst', label: 'SG-SST' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'contacto', label: 'Contacto' },
]

const heroPoints = [
  'Auditores certificados y con amplia experiencia',
  'Metodología basada en estándares internacionales',
  'Informes claros, precisos y accionables',
  'Compromiso con la mejora continua',
]

const stats = [
  { icon: ShieldCheck, title: 'Cumplimiento normativo', text: 'Aseguramos el cumplimiento de leyes y estándares vigentes.' },
  { icon: Award, title: 'Experiencia comprobada', text: 'Años de trayectoria brindando soluciones efectivas.' },
  { icon: Users, title: 'Asesoría técnica', text: 'Acompañamiento experto en cada etapa.' },
  { icon: ClipboardCheck, title: 'Auditorías confiables', text: 'Procesos objetivos, rigurosos y orientados a la mejora.' },
]

const services = [
  {
    id: 1,
    title: 'ISO / Auditorías',
    description: 'Auditorías externas en normas ISO y sistemas de gestión.',
    icon: FileCheck2,
    image: brochure.iso,
    bullets: [
      'ISO 9001, 14001, 45001, 37001, 31001 y 39001',
      'Auditoría SST y auditoría de proveedores',
      'Informes con hallazgos y oportunidades de mejora',
    ],
  },
  {
    id: 2,
    title: 'SG-SST',
    description: 'Implementación, auditoría y mejora de sistemas de seguridad y salud en el trabajo.',
    icon: ShieldAlert,
    image: brochure.sst,
    bullets: [
      'Línea base y matriz legal',
      'IPERC, mapa de riesgos y reglamento interno',
      'Registros obligatorios y plan anual SST',
    ],
  },
  {
    id: 3,
    title: 'Homologación de Proveedores',
    description: 'Evaluación y homologación para una cadena de suministro segura.',
    icon: BriefcaseBusiness,
    image: brochure.homologacion,
    bullets: [
      'Gestión financiera, legal y operativa',
      'Responsabilidad social y medioambiental',
      'Cierre de brechas y acompañamiento documental',
    ],
  },
  {
    id: 4,
    title: 'Monitoreos Ocupacionales',
    description: 'Medición de agentes físicos, químicos, biológicos y ergonómicos.',
    icon: Gauge,
    image: brochure.monitoreos,
    bullets: [
      'Ruido, iluminación, estrés térmico y radiación UV',
      'Polvo respirable e inhalable',
      'Evaluación psicosocial e informes técnicos',
    ],
  },
  {
    id: 5,
    title: 'Sistemas Contra Incendio',
    description: 'Diseño, inspección, mantenimiento y certificación.',
    icon: Flame,
    image: brochure.incendio,
    bullets: [
      'Detección, alarma y extinción',
      'Bombas, rociadores y red húmeda',
      'Diseño e instalación bajo normativa NFPA',
    ],
  },
  {
    id: 6,
    title: 'Arquitectura e Ingeniería / ITSE',
    description: 'Proyectos, inspecciones técnicas y seguridad en edificaciones.',
    icon: Building2,
    image: brochure.ingenieria,
    bullets: [
      'Planos de evacuación, señalización y distribución',
      'Pozo a tierra, diagramas unifilares y cuadros de carga',
      'Documentación para ITSE y defensa civil',
    ],
  },
]

const isoStandards = [
  { code: 'ISO 9001', subtitle: 'Calidad' },
  { code: 'ISO 14001', subtitle: 'Ambiental' },
  { code: 'ISO 45001', subtitle: 'Seguridad y Salud en el Trabajo' },
  { code: 'ISO 37001', subtitle: 'Antisoborno' },
  { code: 'ISO 31001', subtitle: 'Gestión de Riesgos' },
  { code: 'ISO 39001', subtitle: 'Seguridad Vial' },
]

const sstBenefits = [
  { icon: Users, title: 'Identificamos y evaluamos', text: 'riesgos para prevenir accidentes.' },
  { icon: FileCheck2, title: 'Implementamos sistemas', text: 'de gestión alineados a la normativa vigente.' },
  { icon: BarChart3, title: 'Mejoramos el desempeño', text: 'y promovemos una cultura de seguridad.' },
  { icon: Gavel, title: 'Aseguramos el cumplimiento', text: 'legal y reducimos la exposición.' },
]

const clients = ['Ferreyros', 'Alicorp', 'Engie', 'UNACEM', 'Confipetrol', 'Sacyr']

function scrollToSection(id) {
  const node = document.getElementById(id)
  if (node) node.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12)
      const sectionIds = ['inicio', 'nosotros', 'servicios', 'normas', 'sst', 'clientes', 'contacto']
      const midpoint = window.innerHeight * 0.3
      let current = 'inicio'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= midpoint) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openSection = (id) => {
    setMobileOpen(false)
    scrollToSection(id)
  }

  return (
    <div className="page-shell">
      <Header
        active={active}
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        openSection={openSection}
        onQuote={() => setQuoteOpen(true)}
      />

      <main>
        <Hero onPrimary={() => setQuoteOpen(true)} onSecondary={() => scrollToSection('servicios')} />
        <StatsStrip />
        <ServicesSection onOpen={setSelectedService} />
        <IsoStandardsSection />
        <SSTSection />
        <ClientsSection onQuote={() => setQuoteOpen(true)} />
        <ContactSection onQuote={() => setQuoteOpen(true)} />
      </main>

      <Footer onNavigate={openSection} onQuote={() => setQuoteOpen(true)} />
      <a className="floating-wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a>

      <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  )
}

function Header({ active, scrolled, mobileOpen, setMobileOpen, openSection, onQuote }) {
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-wrap">
        <button className="brand" onClick={() => openSection('inicio')}>
          <img src={logo} alt="VJ Consultores Perú" />
        </button>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={active === item.id ? 'active' : ''}
              onClick={() => openSection(item.id)}
            >
              {item.label}
              {item.dropdown && <ChevronDown />}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button className="btn btn-outline" onClick={onQuote}>Diagnóstico</button>
          <a className="btn btn-gold" href={wa()} target="_blank" rel="noreferrer">Cotizar</a>
        </div>

        <button className="menu-toggle" onClick={() => setMobileOpen((v) => !v)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => (
              <button key={item.id} onClick={() => openSection(item.id)}>
                {item.label}
              </button>
            ))}
            <button className="btn btn-gold full" onClick={onQuote}>Solicitar diagnóstico</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero({ onPrimary, onSecondary }) {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-overlay" />
      <div className="container hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="eyebrow">CONSULTORES EN SEGURIDAD E INGENIERÍA</span>
          <h1>
            Auditorías, Ingeniería<br />
            y Soluciones que <span>Generan Confianza</span>
          </h1>
          <div className="hero-line" />
          <p>
            Brindamos auditorías externas, consultoría especializada y soporte para el cumplimiento
            de normas ISO y sistemas de gestión. Impulsamos la mejora continua y la sostenibilidad
            de tu organización.
          </p>
          <div className="hero-actions-row">
            <button className="btn btn-gold" onClick={onPrimary}>Solicitar diagnóstico <ArrowRight /></button>
            <button className="btn btn-dark" onClick={onSecondary}>Conocer servicios <ArrowRight /></button>
          </div>
          <div className="hero-trust">
            <div className="hero-avatars">
              <span>A</span><span>B</span><span>C</span><span>D</span>
            </div>
            <div>
              <div className="hero-stars">★★★★★</div>
              <small>Empresas que confían en nosotros</small>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <div className="hero-card">
            <div className="hero-card-top">
              <div>
                <h3>AUDITORÍAS EXTERNAS</h3>
                <div className="hero-card-tags">ISO 9001 · ISO 14001 · ISO 45001 · ISO 37001 · ISO 31001 · ISO 39001</div>
              </div>
              <img src={logo} alt="VJ" className="mini-logo" />
            </div>
            <div className="hero-card-body">
              <div className="hero-points">
                {heroPoints.map((point) => (
                  <div key={point} className="hero-point"><BadgeCheck /> <span>{point}</span></div>
                ))}
              </div>
              <div className="iso-badge-large">
                <span>CERTIFICACIÓN</span>
                <strong>ISO</strong>
                <small>GARANTIZADA</small>
              </div>
            </div>
            <div className="hero-card-photo-wrap">
              <img src={brochure.iso} alt="Auditorías ISO" className="hero-card-photo" />
            </div>
            <div className="hero-card-footer">
              <div>
                <strong>Soluciones que protegen</strong>
                <small>Personas, Procesos y Resultados.</small>
              </div>
              <span>www.vjconsultores.pe</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function StatsStrip() {
  return (
    <section className="stats-wrap">
      <div className="container stats-grid">
        {stats.map(({ icon: Icon, title, text }) => (
          <article key={title} className="stat-card">
            <div className="stat-icon"><Icon /></div>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ServicesSection({ onOpen }) {
  return (
    <section className="section services-section" id="servicios">
      <div className="container">
        <div className="section-head services-head">
          <div>
            <span className="section-kicker">NUESTROS SERVICIOS</span>
            <h2>Soluciones integrales<br />para tu organización</h2>
            <div className="section-underline" />
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.button
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => onOpen(service)}
              >
                <div className="service-icon"><Icon /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function IsoStandardsSection() {
  return (
    <section className="section iso-section" id="normas">
      <div className="container iso-strip">
        <div className="iso-strip-title">
          <span>NORMAS ISO</span>
          <strong>con las que trabajamos</strong>
          <div className="section-underline light" />
        </div>
        <div className="iso-items">
          {isoStandards.map((item) => (
            <article key={item.code} className="iso-item">
              <div className="laurel">✦</div>
              <strong>{item.code}</strong>
              <small>{item.subtitle}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SSTSection() {
  return (
    <section className="section sst-section" id="sst">
      <div className="container sst-grid">
        <div className="sst-copy" id="nosotros">
          <span className="section-kicker">SG-SST Y CUMPLIMIENTO</span>
          <h2>Gestión que protege<br />a las personas<br />y tu negocio.</h2>
          <div className="section-underline" />
        </div>

        <div className="sst-cards">
          {sstBenefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="sst-card">
              <Icon />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="sst-image-card">
          <img src={brochure.sst} alt="Seguridad y Salud en el Trabajo" />
        </div>
      </div>
    </section>
  )
}

function ClientsSection({ onQuote }) {
  return (
    <section className="section clients-section" id="clientes">
      <div className="container">
        <div className="clients-head">
          <div>
            <span className="section-kicker">RESPALDO QUE</span>
            <h2>GENERA CONFIANZA</h2>
          </div>
          <button className="btn btn-gold" onClick={onQuote}>Solicitar diagnóstico</button>
        </div>

        <div className="clients-grid">
          {clients.map((client) => (
            <div key={client} className="client-chip">{client}</div>
          ))}
          <div className="client-highlight">
            <strong>+90</strong>
            <small>empresas que confían en nosotros</small>
          </div>
        </div>

        <div className="clients-brochure-card">
          <div className="clients-brochure-copy">
            <span className="section-kicker">CLIENTES Y EXPERIENCIA</span>
            <h3>Una presentación corporativa más fuerte y más confiable</h3>
            <p>
              Integramos visualmente el respaldo comercial del brochure para reforzar la confianza,
              mostrar experiencia y transmitir una imagen mucho más sólida de la empresa.
            </p>
          </div>
          <img src={brochure.clientes} alt="Clientes VJ Consultores" />
        </div>
      </div>
    </section>
  )
}

function ContactSection({ onQuote }) {
  return (
    <section className="section contact-section" id="contacto">
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="section-kicker">CONTACTO</span>
          <h2>Solicita una evaluación y descubre cómo podemos ayudarte</h2>
          <p>
            Podemos iniciar con diagnóstico, revisión documental, capacitación, implementación de sistemas
            de gestión o cotización técnica según el tipo de necesidad de tu organización.
          </p>
          <div className="contact-list">
            <a href={wa()} target="_blank" rel="noreferrer"><MessageCircle /> +51 959 462 430</a>
            <span><Phone /> {SECOND_NUMBER}</span>
            <a href={`mailto:${EMAIL}`}><Mail /> {EMAIL}</a>
          </div>
        </div>

        <QuoteForm onQuickQuote={onQuote} />
      </div>
    </section>
  )
}

function QuoteForm({ onQuickQuote }) {
  const [form, setForm] = useState({ empresa: '', nombre: '', telefono: '', servicio: '', mensaje: '' })
  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))
  const message = `Hola VJ Consultores Perú, deseo información. Empresa: ${form.empresa || '___'}. Contacto: ${form.nombre || '___'}. Teléfono: ${form.telefono || '___'}. Servicio: ${form.servicio || '___'}. Mensaje: ${form.mensaje || '___'}`

  return (
    <form className="quote-form" onSubmit={(e) => e.preventDefault()}>
      <div className="quote-form-head">
        <h3>Solicitar diagnóstico</h3>
        <p>Completa los datos y abre WhatsApp con el mensaje listo.</p>
      </div>
      <input value={form.empresa} onChange={(e) => setField('empresa', e.target.value)} placeholder="Empresa" />
      <input value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} placeholder="Nombre de contacto" />
      <input value={form.telefono} onChange={(e) => setField('telefono', e.target.value)} placeholder="Teléfono / WhatsApp" />
      <input value={form.servicio} onChange={(e) => setField('servicio', e.target.value)} placeholder="Servicio de interés" />
      <textarea value={form.mensaje} onChange={(e) => setField('mensaje', e.target.value)} placeholder="Cuéntanos brevemente tu necesidad" />
      <div className="quote-form-actions">
        <a className="btn btn-gold full" href={wa(message)} target="_blank" rel="noreferrer">Enviar por WhatsApp</a>
        <button type="button" className="btn btn-outline full" onClick={onQuickQuote}>Abrir modal</button>
      </div>
    </form>
  )
}

function ServiceModal({ service, onClose }) {
  useEffect(() => {
    if (!service) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [service, onClose])

  return (
    <AnimatePresence>
      {service && (
        <motion.div className="modal-backdrop" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal-card" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }}>
            <button className="modal-close" onClick={onClose}><X /></button>
            <div className="modal-grid">
              <div className="modal-image-wrap">
                <img src={service.image} alt={service.title} />
              </div>
              <div className="modal-content">
                <span className="section-kicker">SERVICIO DESTACADO</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="modal-bullets">
                  {service.bullets.map((bullet) => (
                    <div key={bullet}><BadgeCheck /> <span>{bullet}</span></div>
                  ))}
                </div>
                <a className="btn btn-gold" href={wa(`Hola VJ Consultores Perú, quiero cotizar el servicio: ${service.title}.`)} target="_blank" rel="noreferrer">Cotizar este servicio <ArrowRight /></a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function QuoteModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="quote-modal" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.98 }}>
            <button className="modal-close" onClick={onClose}><X /></button>
            <span className="section-kicker">DIAGNÓSTICO</span>
            <h3>Conversemos sobre tu empresa</h3>
            <p>
              Te ayudamos a identificar el servicio ideal: auditorías ISO, SG-SST, homologación,
              monitoreos, ingeniería, fiscalización o sistemas contra incendio.
            </p>
            <div className="quote-modal-actions">
              <a className="btn btn-gold full" href={wa()} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
              <a className="btn btn-outline full" href={`mailto:${EMAIL}`}>Escribir por correo</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Footer({ onNavigate, onQuote }) {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="container footer-cta-inner">
          <div>
            <span className="section-kicker light-kicker">¿LISTO PARA LLEVAR TU GESTIÓN AL SIGUIENTE NIVEL?</span>
            <h2>Solicita un diagnóstico gratuito y descubre cómo podemos ayudarte.</h2>
          </div>
          <div className="footer-cta-actions">
            <button className="btn btn-gold" onClick={onQuote}>Solicitar diagnóstico <ArrowRight /></button>
            <a className="btn btn-dark" href={wa()} target="_blank" rel="noreferrer">Escríbenos por WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="container footer-main">
        <div className="footer-brand-block">
          <img src={logo} alt="VJ Consultores Perú" />
          <p>
            Consultores especializados en auditorías, seguridad e ingeniería. Comprometidos con la excelencia,
            el cumplimiento y la mejora continua.
          </p>
        </div>

        <div>
          <h4>Enlaces rápidos</h4>
          {['inicio', 'nosotros', 'servicios', 'normas', 'sst', 'clientes', 'contacto'].map((id) => (
            <button key={id} onClick={() => onNavigate(id)}>{id === 'normas' ? 'Normas ISO' : id.charAt(0).toUpperCase() + id.slice(1)}</button>
          ))}
        </div>

        <div>
          <h4>Contáctanos</h4>
          <span>+51 959 462 430</span>
          <span>{SECOND_NUMBER}</span>
          <span>{EMAIL}</span>
          <span>Lima, Perú</span>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <small>© 2024 VJ Consultores Perú S.A.C. Todos los derechos reservados.</small>
          <small>Política de Privacidad · Términos y Condiciones</small>
        </div>
      </div>
    </footer>
  )
}

createRoot(document.getElementById('root')).render(<App />)
