import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, Award, BadgeCheck, BriefcaseBusiness, Building2, ChevronDown,
  ClipboardCheck, FileCheck2, Flame, Gauge, Gavel, Mail, Menu,
  MessageCircle, Phone, Shield, ShieldAlert, Users, X
} from 'lucide-react'
import './styles.css'

const WHATSAPP_NUMBER = '51959462430'
const SECOND_NUMBER = '+51 947 160 205'
const EMAIL = 'informeve@vjconsultores.pe'
const wa = (message = 'Hola VJ Consultores Perú, quiero información sobre sus servicios.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const logo = '/brochure/vj-logo-better.png'
const brochure = {
  iso: '/brochure/page-06.png',
  sst: '/brochure/page-04.png',
  clientes: '/brochure/page-11.png',
}

const navItems = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'servicios', label: 'Servicios', dropdown: true },
  { id: 'normas', label: 'Normas ISO', dropdown: true },
  { id: 'sgsst', label: 'SG-SST' },
  { id: 'clientes', label: 'Clientes' },
  { id: 'recursos', label: 'Recursos', dropdown: true },
  { id: 'contacto', label: 'Contacto' },
]

const heroBullets = [
  'Auditores certificados y con amplia experiencia',
  'Metodología basada en estándares internacionales',
  'Informes claros, precisos y accionables',
  'Compromiso con la mejora continua',
]

const trustFeatures = [
  {
    icon: Shield,
    title: 'Cumplimiento normativo',
    text: 'Aseguramos el cumplimiento de leyes y estándares vigentes.',
  },
  {
    icon: Award,
    title: 'Experiencia comprobada',
    text: 'Años de trayectoria brindando soluciones efectivas.',
  },
  {
    icon: Users,
    title: 'Asesoría técnica',
    text: 'Acompañamiento experto en cada etapa.',
  },
  {
    icon: ClipboardCheck,
    title: 'Auditorías confiables',
    text: 'Procesos objetivos, rigurosos y orientados a la mejora.',
  },
]

const services = [
  {
    id: 1,
    title: 'ISO / Auditorías',
    description: 'Auditorías externas en normas ISO y sistemas de gestión.',
    icon: FileCheck2,
    image: brochure.iso,
    details: ['ISO 9001, 14001, 45001, 37001, 31001 y 39001', 'Auditorías SST y auditoría de proveedores', 'Informes de hallazgos y oportunidades de mejora'],
  },
  {
    id: 2,
    title: 'SG-SST',
    description: 'Implementación, auditoría y mejora de sistemas de seguridad y salud en el trabajo.',
    icon: ShieldAlert,
    image: brochure.sst,
    details: ['Línea base y matriz legal', 'IPERC, mapa de riesgos y reglamento interno', 'Registros obligatorios y plan anual SST'],
  },
  {
    id: 3,
    title: 'Homologación de Proveedores',
    description: 'Evaluación y homologación para una cadena de suministro segura.',
    icon: BriefcaseBusiness,
    image: brochure.iso,
    details: ['Evaluación financiera y legal', 'Revisión operativa y documental', 'Cierre de brechas y acompañamiento'],
  },
  {
    id: 4,
    title: 'Monitoreos Ocupacionales',
    description: 'Medición de agentes físicos, químicos, biológicos y ergonómicos.',
    icon: Gauge,
    image: brochure.sst,
    details: ['Ruido, iluminación y estrés térmico', 'Radiación UV y agentes químicos', 'Informes técnicos ocupacionales'],
  },
  {
    id: 5,
    title: 'Sistemas Contra Incendio',
    description: 'Diseño, inspección, mantenimiento y certificación.',
    icon: Flame,
    image: brochure.iso,
    details: ['Detección, alarma y extinción', 'Bombas, rociadores y red húmeda', 'Diseño e instalación bajo NFPA'],
  },
  {
    id: 6,
    title: 'Arquitectura e Ingeniería / ITSE',
    description: 'Proyectos, inspecciones técnicas y seguridad en edificaciones.',
    icon: Building2,
    image: brochure.sst,
    details: ['Planos de evacuación y señalización', 'Pozo a tierra y cuadros de carga', 'Documentación ITSE y defensa civil'],
  },
]

const isoItems = [
  ['ISO', '9001', 'Calidad'],
  ['ISO', '14001', 'Ambiental'],
  ['ISO', '45001', 'Seguridad y Salud\nen el Trabajo'],
  ['ISO', '37001', 'Antisoborno'],
  ['ISO', '31001', 'Gestión de\nRiesgos'],
  ['ISO', '39001', 'Seguridad Vial'],
]

const sstItems = [
  { icon: Users, title: 'Identificamos y evaluamos', text: 'riesgos para prevenir accidentes.' },
  { icon: FileCheck2, title: 'Implementamos sistemas', text: 'de gestión alineados a la normativa vigente.' },
  { icon: BriefcaseBusiness, title: 'Mejoramos el desempeño', text: 'y promovemos una cultura de seguridad.' },
  { icon: Gavel, title: 'Aseguramos el cumplimiento', text: 'legal y reducimos la exposición.' },
]

const clientLogos = [
  { name: 'Ferreyros', extra: 'CAT', className: 'ferreyros' },
  { name: 'alicorp', className: 'alicorp' },
  { name: 'engie', className: 'engie' },
  { name: 'UNACEM', className: 'unacem' },
  { name: 'confipetrol', className: 'confipetrol' },
  { name: 'sacyr', className: 'sacyr' },
]

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(null)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [active, setActive] = useState('inicio')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const ids = ['inicio', 'nosotros', 'servicios', 'normas', 'sgsst', 'clientes', 'recursos', 'contacto']
      let current = 'inicio'
      ids.forEach((id) => {
        const section = document.getElementById(id)
        if (!section) return
        const rect = section.getBoundingClientRect()
        if (rect.top <= 140) current = id
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (id) => {
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
        onNav={handleNav}
        onQuote={() => setQuoteOpen(true)}
      />

      <main>
        <Hero onQuote={() => setQuoteOpen(true)} onServices={() => scrollToSection('servicios')} />
        <TrustBar />
        <ServicesSection onOpen={setServiceOpen} />
        <IsoSection />
        <SgSstSection />
        <ClientsSection />
        <ResourcesSection />
      </main>

      <Footer onNav={handleNav} onQuote={() => setQuoteOpen(true)} />
      <a className="floating-wa" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a>

      <ServiceModal service={serviceOpen} onClose={() => setServiceOpen(null)} />
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </div>
  )
}

function Header({ active, scrolled, mobileOpen, setMobileOpen, onNav, onQuote }) {
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-wrap">
        <button className="brand" onClick={() => onNav('inicio')}>
          <img src={logo} alt="VJ Consultores Perú" />
        </button>

        <nav className="desktop-nav">
          {navItems.map((item) => (
            <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => onNav(item.id)}>
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
          <motion.div className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <div className="container mobile-nav-inner">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => onNav(item.id)}>{item.label}</button>
              ))}
              <button className="btn btn-gold full" onClick={onQuote}>Solicitar diagnóstico</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero({ onQuote, onServices }) {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-city" />
      <div className="hero-accent hero-accent-left" />
      <div className="hero-accent hero-accent-right" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="hero-kicker">CONSULTORES EN SEGURIDAD E INGENIERÍA</span>
          <h1>
            Auditorías, Ingeniería<br />
            y Soluciones que<br />
            <span>Generan Confianza</span>
          </h1>
          <div className="yellow-line" />
          <p>
            Brindamos auditorías externas, consultoría especializada y soporte para el cumplimiento de normas ISO y sistemas de gestión.
            Impulsamos la mejora continua y la sostenibilidad de tu organización.
          </p>
          <div className="hero-actions">
            <button className="btn btn-gold hero-btn" onClick={onQuote}>Solicitar diagnóstico <ArrowRight /></button>
            <button className="btn btn-ghost-dark hero-btn" onClick={onServices}>Conocer Servicios <ArrowRight /></button>
          </div>
          <div className="hero-rating">
            <div className="hero-avatars">
              <span>A</span><span>B</span><span>C</span><span>D</span>
            </div>
            <div>
              <div className="stars">★★★★★</div>
              <small>Empresas que confían en nosotros</small>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="audit-card">
            <div className="audit-card-head">
              <div>
                <h3>AUDITORÍAS EXTERNAS</h3>
                <div className="audit-band">ISO 9001 · ISO 14001 · ISO 45001 · ISO 37001 · ISO 31001 · ISO 39001</div>
              </div>
              <img src={logo} alt="VJ Consultores" className="audit-mini-logo" />
            </div>

            <div className="audit-card-body">
              <div className="audit-points">
                {heroBullets.map((item) => (
                  <div key={item} className="audit-point"><BadgeCheck /> <span>{item}</span></div>
                ))}
              </div>
              <div className="iso-seal">
                <span>CERTIFICACIÓN</span>
                <strong>ISO</strong>
                <small>GARANTIZADA</small>
              </div>
            </div>

            <img className="audit-photo" src={brochure.iso} alt="Auditorías externas" />

            <div className="audit-footer">
              <div>
                <strong>Soluciones que protegen</strong>
                <small>Personas, Procesos y Resultados.</small>
              </div>
              <span>www.vjconsultores.pe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <section className="trust-section" id="nosotros">
      <div className="container trust-grid">
        {trustFeatures.map(({ icon: Icon, title, text }) => (
          <article key={title} className="trust-card">
            <div className="trust-icon"><Icon /></div>
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
      <div className="container services-layout">
        <div className="services-title-box">
          <span className="section-kicker">NUESTROS SERVICIOS</span>
          <h2>Soluciones integrales<br />para tu organización</h2>
          <div className="yellow-line small" />
        </div>

        <div className="services-cards">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <button key={service.id} className="service-card" onClick={() => onOpen(service)}>
                <div className="service-icon"><Icon /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function IsoSection() {
  return (
    <section className="section iso-strip-section" id="normas">
      <div className="container iso-strip">
        <div className="iso-strip-title">
          <span className="section-kicker light">NORMAS ISO</span>
          <h3>con las que trabajamos</h3>
          <div className="yellow-line small" />
        </div>
        <div className="iso-strip-items">
          {isoItems.map(([iso, code, subtitle]) => (
            <article key={code} className="iso-strip-item">
              <div className="laurels">❦</div>
              <div className="iso-top">{iso}</div>
              <strong>{code}</strong>
              <small>{subtitle}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SgSstSection() {
  return (
    <section className="section sgsst-section" id="sgsst">
      <div className="container sgsst-layout">
        <div className="sgsst-title-box">
          <span className="section-kicker">SG-SST Y CUMPLIMIENTO</span>
          <h2>Gestión que protege<br />a las personas<br />y tu negocio.</h2>
        </div>

        <div className="sgsst-content-box">
          <div className="sgsst-features">
            {sstItems.map(({ icon: Icon, title, text }) => (
              <article key={title} className="sgsst-feature">
                <Icon />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="sgsst-image-wrap">
            <img src={brochure.sst} alt="SG-SST" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ClientsSection() {
  return (
    <section className="section clients-section" id="clientes">
      <div className="container clients-layout">
        <div className="clients-title-box">
          <span className="section-kicker">RESPALDO QUE</span>
          <h2>GENERA CONFIANZA</h2>
        </div>

        <div className="clients-logos-row">
          {clientLogos.map((client) => (
            <div key={client.name} className={`client-logo-card ${client.className}`}>
              {client.extra ? <span className="client-extra">{client.extra}</span> : null}
              <span>{client.name}</span>
            </div>
          ))}
          <div className="client-count-card">
            <strong>+90</strong>
            <small>empresas que<br />confían en nosotros</small>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResourcesSection() {
  return (
    <section className="resources-section" id="recursos">
      <div className="container resources-inner">
        <div className="resources-brand">
          <img src={logo} alt="VJ Consultores Perú" />
        </div>
        <div className="resources-copy">
          <p>
            Consultores especializados en auditorías, seguridad e ingeniería.
            Comprometidos con la excelencia, el cumplimiento y la mejora continua.
          </p>
        </div>
        <div className="resources-links">
          <h4>ENLACES RÁPIDOS</h4>
          <div className="resources-links-grid">
            <span>Inicio</span>
            <span>Normas ISO</span>
            <span>Nosotros</span>
            <span>SG-SST</span>
            <span>Servicios</span>
            <span>Clientes</span>
            <span>Recursos</span>
            <span>Contacto</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ onNav, onQuote }) {
  return (
    <footer className="site-footer" id="contacto">
      <div className="container footer-main-grid">
        <div className="footer-contact-box">
          <button className="btn btn-gold footer-btn" onClick={onQuote}>Solicitar diagnóstico <ArrowRight /></button>
          <a className="btn btn-dark footer-btn" href={wa()} target="_blank" rel="noreferrer">Escríbenos por WhatsApp</a>
          <div className="footer-contact-list">
            <span><Phone /> {SECOND_NUMBER}</span>
            <span><Mail /> {EMAIL}</span>
            <span><MessageCircle /> Lima, Perú</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <small>© 2024 VJ Consultores Perú S.A.C. Todos los derechos reservados.</small>
        <div className="footer-policy-links">
          <button onClick={() => onNav('contacto')}>Política de Privacidad</button>
          <button onClick={() => onNav('contacto')}>Términos y Condiciones</button>
        </div>
      </div>
    </footer>
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
          <motion.div className="service-modal" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}>
            <button className="modal-close" onClick={onClose}><X /></button>
            <div className="service-modal-grid">
              <div className="service-modal-image"><img src={service.image} alt={service.title} /></div>
              <div className="service-modal-content">
                <span className="section-kicker">SERVICIO</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="service-modal-list">
                  {service.details.map((detail) => (
                    <div key={detail}><BadgeCheck /> <span>{detail}</span></div>
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
  const [form, setForm] = useState({ empresa: '', nombre: '', telefono: '', mensaje: '' })
  const text = useMemo(() => `Hola VJ Consultores Perú, deseo solicitar un diagnóstico. Empresa: ${form.empresa || '___'}. Nombre: ${form.nombre || '___'}. Teléfono: ${form.telefono || '___'}. Mensaje: ${form.mensaje || '___'}`, [form])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="quote-modal" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}>
            <button className="modal-close" onClick={onClose}><X /></button>
            <span className="section-kicker">DIAGNÓSTICO</span>
            <h3>Solicita una evaluación para tu empresa</h3>
            <p>Completa estos datos y abre WhatsApp con el mensaje listo para atención inmediata.</p>
            <div className="quote-form-grid">
              <input placeholder="Empresa" value={form.empresa} onChange={(e) => setForm({ ...form, empresa: e.target.value })} />
              <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} />
              <input placeholder="Teléfono" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} />
              <textarea placeholder="Cuéntanos tu necesidad" value={form.mensaje} onChange={(e) => setForm({ ...form, mensaje: e.target.value })} />
            </div>
            <div className="quote-actions">
              <a className="btn btn-gold full" href={wa(text)} target="_blank" rel="noreferrer">Enviar por WhatsApp</a>
              <a className="btn btn-outline full" href={`mailto:${EMAIL}`}>Escribir por correo</a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')).render(<App />)
