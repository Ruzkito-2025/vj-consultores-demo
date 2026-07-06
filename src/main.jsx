
import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, Award, BadgeCheck, BriefcaseBusiness, Building2, ChevronDown,
  ClipboardCheck, FileCheck2, Flame, Gauge, Gavel, Mail, Menu,
  MessageCircle, Phone, Shield, ShieldAlert, Users, X, Home as HomeIcon,
  BookOpenCheck, Target, MapPin, Search, Send
} from 'lucide-react'
import './styles.css'

const WHATSAPP_NUMBER = '51959462430'
const SECOND_NUMBER = '+51 947 160 205'
const EMAIL = 'informeve@vjconsultores.pe'
const wa = (message = 'Hola VJ Consultores Perú, quiero información sobre sus servicios.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const logo = '/brochure/vj-logo-better.png'
const building = '/brochure/hero-buildings.png'
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
  { id: 'inicio', label: 'Inicio', icon: HomeIcon },
  { id: 'nosotros', label: 'Nosotros', icon: Users },
  { id: 'servicios', label: 'Servicios', icon: BriefcaseBusiness, dropdown: true },
  { id: 'normas', label: 'Normas ISO', icon: Award, dropdown: true },
  { id: 'sgsst', label: 'SG-SST', icon: ShieldAlert },
  { id: 'clientes', label: 'Clientes', icon: BadgeCheck },
  { id: 'recursos', label: 'Recursos', icon: BookOpenCheck, dropdown: true },
  { id: 'contacto', label: 'Contacto', icon: MessageCircle },
]

const heroBullets = [
  'Auditores certificados y con amplia experiencia',
  'Metodología basada en estándares internacionales',
  'Informes claros, precisos y accionables',
  'Compromiso con la mejora continua',
]

const trustFeatures = [
  { icon: Shield, title: 'Cumplimiento normativo', text: 'Aseguramos el cumplimiento de leyes y estándares vigentes.' },
  { icon: Award, title: 'Experiencia comprobada', text: 'Años de trayectoria brindando soluciones efectivas.' },
  { icon: Users, title: 'Asesoría técnica', text: 'Acompañamiento experto en cada etapa.' },
  { icon: ClipboardCheck, title: 'Auditorías confiables', text: 'Procesos objetivos, rigurosos y orientados a la mejora.' },
]

const services = [
  {
    id: 1,
    title: 'ISO / Auditorías',
    category: 'Auditorías externas',
    description: 'Auditorías externas en normas ISO y sistemas de gestión.',
    icon: FileCheck2,
    image: brochure.iso,
    details: ['ISO 9001, 14001, 45001, 37001, 31001 y 39001', 'Auditorías SST y auditoría de proveedores', 'Informes de hallazgos y oportunidades de mejora'],
  },
  {
    id: 2,
    title: 'SG-SST',
    category: 'Seguridad y Salud en el Trabajo',
    description: 'Implementación, auditoría y mejora de sistemas de seguridad y salud en el trabajo.',
    icon: ShieldAlert,
    image: brochure.sst,
    details: ['Línea base y matriz legal', 'IPERC, mapa de riesgos y reglamento interno', 'Registros obligatorios y plan anual SST'],
  },
  {
    id: 3,
    title: 'Homologación de Proveedores',
    category: 'Gestión empresarial',
    description: 'Evaluación y homologación para una cadena de suministro segura.',
    icon: BriefcaseBusiness,
    image: brochure.homologacion,
    details: ['Evaluación financiera y legal', 'Revisión operativa y documental', 'Cierre de brechas y acompañamiento'],
  },
  {
    id: 4,
    title: 'Monitoreos Ocupacionales',
    category: 'Higiene ocupacional',
    description: 'Medición de agentes físicos, químicos, biológicos y ergonómicos.',
    icon: Gauge,
    image: brochure.monitoreos,
    details: ['Ruido, iluminación y estrés térmico', 'Radiación UV y agentes químicos', 'Informes técnicos ocupacionales'],
  },
  {
    id: 5,
    title: 'Sistemas Contra Incendio',
    category: 'Ingeniería contra incendio',
    description: 'Diseño, inspección, mantenimiento y certificación.',
    icon: Flame,
    image: brochure.incendio,
    details: ['Detección, alarma y extinción', 'Bombas, rociadores y red húmeda', 'Diseño e instalación bajo NFPA'],
  },
  {
    id: 6,
    title: 'Arquitectura e Ingeniería / ITSE',
    category: 'Arquitectura e ingeniería',
    description: 'Proyectos, inspecciones técnicas y seguridad en edificaciones.',
    icon: Building2,
    image: brochure.ingenieria,
    details: ['Planos de evacuación y señalización', 'Pozo a tierra y cuadros de carga', 'Documentación ITSE y defensa civil'],
  },
]

const isoItems = [
  ['ISO', '9001', 'Calidad'],
  ['ISO', '14001', 'Ambiental'],
  ['ISO', '45001', 'Seguridad y Salud en el Trabajo'],
  ['ISO', '37001', 'Antisoborno'],
  ['ISO', '31001', 'Gestión de Riesgos'],
  ['ISO', '39001', 'Seguridad Vial'],
]

const sstItems = [
  { icon: Users, title: 'Identificamos y evaluamos', text: 'riesgos para prevenir accidentes.' },
  { icon: FileCheck2, title: 'Implementamos sistemas', text: 'de gestión alineados a la normativa vigente.' },
  { icon: Target, title: 'Mejoramos el desempeño', text: 'y promovemos una cultura de seguridad.' },
  { icon: Gavel, title: 'Aseguramos el cumplimiento', text: 'legal y reducimos la exposición.' },
]

const clientLogos = [
  { name: 'Ferreyros', extra: 'CAT', className: 'ferreyros' },
  { name: 'alicorp', className: 'alicorp' },
  { name: 'engie', className: 'engie' },
  { name: 'UNACEM', className: 'unacem' },
  { name: 'confipetrol', className: 'confipetrol' },
  { name: 'sacyr', className: 'sacyr' },
  { name: 'Ferreyros', extra: 'CAT', className: 'ferreyros' },
  { name: 'alicorp', className: 'alicorp' },
  { name: 'engie', className: 'engie' },
  { name: 'UNACEM', className: 'unacem' },
]

const pageCopy = {
  inicio: ['Consultores en Seguridad e Ingeniería', 'Auditorías, Ingeniería y Soluciones que Generan Confianza'],
  nosotros: ['Quiénes somos', 'Consultoría, asesoría legal, ingeniería y servicios especializados'],
  servicios: ['Nuestros servicios', 'Soluciones integrales para tu organización'],
  normas: ['Normas ISO', 'Auditorías externas bajo estándares internacionales'],
  sgsst: ['SG-SST y cumplimiento', 'Gestión que protege a las personas y tu negocio'],
  clientes: ['Respaldo', 'Empresas que confían en VJ Consultores Perú'],
  recursos: ['Recursos', 'Documentación técnica y material corporativo'],
  contacto: ['Contacto', 'Solicita diagnóstico para tu empresa'],
}

function App() {
  const [page, setPage] = useState('inicio')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(null)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id) => {
    setPage(id)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="page-shell">
      <Header
        active={page}
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onNav={go}
        onQuote={() => setQuoteOpen(true)}
      />

      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.28 }}
        >
          {page === 'inicio' && <HomePage onQuote={() => setQuoteOpen(true)} onServiceOpen={setServiceOpen} go={go} />}
          {page === 'nosotros' && <AboutPage onQuote={() => setQuoteOpen(true)} />}
          {page === 'servicios' && <ServicesPage onServiceOpen={setServiceOpen} />}
          {page === 'normas' && <NormasPage onServiceOpen={setServiceOpen} />}
          {page === 'sgsst' && <SgSstPage onQuote={() => setQuoteOpen(true)} />}
          {page === 'clientes' && <ClientesPage onQuote={() => setQuoteOpen(true)} />}
          {page === 'recursos' && <ResourcesPage />}
          {page === 'contacto' && <ContactPage onQuote={() => setQuoteOpen(true)} />}
        </motion.main>
      </AnimatePresence>

      <Footer onNav={go} onQuote={() => setQuoteOpen(true)} />
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

function HomePage({ onQuote, onServiceOpen, go }) {
  return (
    <>
      <Hero onQuote={onQuote} onServices={() => go('servicios')} />
      <TrustBar />
      <ServicesPreview onOpen={onServiceOpen} go={go} />
      <IsoSection />
      <SgSstPreview go={go} />
      <ClientsCarousel onQuote={onQuote} />
    </>
  )
}

function Hero({ onQuote, onServices }) {
  return (
    <section className="hero-section">
      <div className="hero-city"><img src={building} alt="" /></div>
      <motion.div className="hero-accent hero-accent-left" animate={{ y: [0, -10, 0], opacity: [0.45, 0.85, 0.45] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.div className="hero-accent hero-accent-right" animate={{ y: [0, 12, 0], opacity: [0.35, 0.8, 0.35] }} transition={{ duration: 5, repeat: Infinity }} />
      <div className="container hero-grid">
        <motion.div className="hero-copy" initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
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
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.92, y: 28, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: -1.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <AuditCard />
        </motion.div>
      </div>
    </section>
  )
}

function AuditCard() {
  return (
    <div className="audit-card">
      <div className="audit-shine" />
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
        <motion.div className="iso-seal" animate={{ rotate: [0, 4, 0, -4, 0] }} transition={{ duration: 6, repeat: Infinity }}>
          <span>CERTIFICACIÓN</span>
          <strong>ISO</strong>
          <small>GARANTIZADA</small>
        </motion.div>
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
  )
}

function TrustBar() {
  return (
    <section className="trust-section">
      <div className="container trust-grid">
        {trustFeatures.map(({ icon: Icon, title, text }, i) => (
          <motion.article key={title} className="trust-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
            <div className="trust-icon"><Icon /></div>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function ServicesPreview({ onOpen, go }) {
  return (
    <section className="section services-section">
      <div className="container services-layout">
        <div className="services-title-box">
          <span className="section-kicker">NUESTROS SERVICIOS</span>
          <h2>Soluciones integrales<br />para tu organización</h2>
          <div className="yellow-line small" />
          <button className="mini-link" onClick={() => go('servicios')}>Ver página completa <ArrowRight /></button>
        </div>
        <ServicesCards onOpen={onOpen} compact />
      </div>
    </section>
  )
}

function ServicesCards({ onOpen, compact = false }) {
  return (
    <div className={`services-cards ${compact ? 'compact' : ''}`}>
      {services.map((service, i) => {
        const Icon = service.icon
        return (
          <motion.button
            key={service.id}
            className="service-card"
            onClick={() => onOpen(service)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -7, scale: 1.02 }}
            transition={{ delay: i * 0.035 }}
          >
            <div className="service-icon"><Icon /></div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.button>
        )
      })}
    </div>
  )
}

function IsoSection() {
  return (
    <section className="section iso-strip-section">
      <div className="container iso-strip">
        <div className="iso-strip-title">
          <span className="section-kicker light">NORMAS ISO</span>
          <h3>con las que trabajamos</h3>
          <div className="yellow-line small" />
        </div>
        <div className="iso-strip-items">
          {isoItems.map(([iso, code, subtitle], i) => (
            <motion.article key={code} className="iso-strip-item" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
              <div className="laurels">❦</div>
              <div className="iso-top">{iso}</div>
              <strong>{code}</strong>
              <small>{subtitle}</small>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SgSstPreview({ go }) {
  return (
    <section className="section sgsst-section">
      <div className="container sgsst-layout">
        <div className="sgsst-title-box">
          <span className="section-kicker">SG-SST Y CUMPLIMIENTO</span>
          <h2>Gestión que protege<br />a las personas<br />y tu negocio.</h2>
          <button className="mini-link" onClick={() => go('sgsst')}>Ver página SG-SST <ArrowRight /></button>
        </div>
        <SgSstContent />
      </div>
    </section>
  )
}

function SgSstContent() {
  return (
    <div className="sgsst-content-box">
      <div className="sgsst-features">
        {sstItems.map(({ icon: Icon, title, text }, i) => (
          <motion.article key={title} className="sgsst-feature" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
            <Icon />
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div className="sgsst-image-wrap" whileHover={{ scale: 1.03 }}>
        <img src={brochure.sst} alt="SG-SST" />
      </motion.div>
    </div>
  )
}

function ClientsCarousel({ onQuote }) {
  return (
    <section className="section clients-section">
      <div className="container clients-layout">
        <div className="clients-title-box">
          <span className="section-kicker">RESPALDO QUE</span>
          <h2>GENERA CONFIANZA</h2>
          <button className="mini-link" onClick={onQuote}>Solicitar propuesta <ArrowRight /></button>
        </div>
        <div className="clients-carousel-shell">
          <div className="clients-carousel-track">
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div key={`${client.name}-${index}`} className={`client-logo-card ${client.className}`}>
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
      </div>
    </section>
  )
}

function PageHero({ page }) {
  const [kicker, title] = pageCopy[page] || pageCopy.inicio
  return (
    <section className="page-hero">
      <div className="hero-city page-city"><img src={building} alt="" /></div>
      <div className="container page-hero-inner">
        <span className="hero-kicker">{kicker}</span>
        <h1>{title}</h1>
        <p>Diseño corporativo, información técnica clara y contacto directo para solicitar asesoría o diagnóstico.</p>
      </div>
    </section>
  )
}

function AboutPage({ onQuote }) {
  return (
    <>
      <PageHero page="nosotros" />
      <section className="page-section">
        <div className="container two-col-page">
          <motion.div className="brochure-frame" initial={{ opacity: 0, x: -26 }} animate={{ opacity: 1, x: 0 }}>
            <img src={brochure.nosotros} alt="Quiénes somos" />
          </motion.div>
          <div className="page-copy-block">
            <span className="section-kicker">QUIÉNES SOMOS</span>
            <h2>Aliados estratégicos para empresas que buscan calidad, seguridad y confianza.</h2>
            <p>
              VJ Consultores Perú brinda consultoría, asesoría legal, ingeniería y servicios especializados para impulsar la mejora continua,
              la eficiencia operativa y el cumplimiento normativo.
            </p>
            <div className="page-checks">
              {['Consultoría técnica especializada', 'Asesoría legal y normativa', 'Ingeniería y seguridad', 'Enfoque en mejora continua'].map((x) => <span key={x}><BadgeCheck /> {x}</span>)}
            </div>
            <button className="btn btn-gold" onClick={onQuote}>Solicitar diagnóstico <ArrowRight /></button>
          </div>
        </div>
      </section>
    </>
  )
}

function ServicesPage({ onServiceOpen }) {
  return (
    <>
      <PageHero page="servicios" />
      <section className="page-section">
        <div className="container">
          <ServicesCards onOpen={onServiceOpen} />
          <div className="service-gallery">
            {services.map((service) => (
              <motion.article key={service.id} className="service-gallery-card" whileHover={{ y: -6 }}>
                <img src={service.image} alt={service.title} />
                <div><strong>{service.title}</strong><p>{service.category}</p></div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function NormasPage({ onServiceOpen }) {
  const isoService = services[0]
  return (
    <>
      <PageHero page="normas" />
      <section className="page-section">
        <div className="container two-col-page">
          <div className="page-copy-block">
            <span className="section-kicker">AUDITORÍAS EXTERNAS</span>
            <h2>Estándares ISO para organizaciones que buscan orden, confianza y mejora continua.</h2>
            <p>Auditorías externas en calidad, ambiente, seguridad y salud, antisoborno, riesgos y seguridad vial.</p>
            <div className="norma-grid">{isoItems.map(([iso, code, subtitle]) => <div key={code}><strong>{iso} {code}</strong><span>{subtitle}</span></div>)}</div>
            <button className="btn btn-gold" onClick={() => onServiceOpen(isoService)}>Ver servicio ISO <ArrowRight /></button>
          </div>
          <motion.div className="brochure-frame" initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }}>
            <img src={brochure.iso} alt="Normas ISO" />
          </motion.div>
        </div>
      </section>
    </>
  )
}

function SgSstPage({ onQuote }) {
  return (
    <>
      <PageHero page="sgsst" />
      <section className="page-section">
        <div className="container two-col-page">
          <div>
            <SgSstContent />
          </div>
          <div className="page-copy-block">
            <span className="section-kicker">LEY 29783</span>
            <h2>Implementación documental y operativa del Sistema de Gestión SST.</h2>
            <p>Incluye línea base, matriz legal, IPERC, mapa de riesgos, comité SST, registros obligatorios, plan anual y auditorías.</p>
            <button className="btn btn-gold" onClick={onQuote}>Solicitar diagnóstico SST <ArrowRight /></button>
          </div>
        </div>
      </section>
    </>
  )
}

function ClientesPage({ onQuote }) {
  return (
    <>
      <PageHero page="clientes" />
      <section className="page-section">
        <div className="container">
          <ClientsCarousel onQuote={onQuote} />
          <div className="brochure-frame wide">
            <img src={brochure.clientes} alt="Clientes" />
          </div>
        </div>
      </section>
    </>
  )
}

function ResourcesPage() {
  return (
    <>
      <PageHero page="recursos" />
      <section className="page-section">
        <div className="container resources-page-grid">
          {[brochure.portada, brochure.iso, brochure.sst, brochure.clientes].map((img, idx) => (
            <motion.article key={img} className="resource-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
              <img src={img} alt={`Recurso ${idx + 1}`} />
              <div><strong>{['Brochure institucional', 'Auditorías ISO', 'SG-SST', 'Clientes'][idx]}</strong><p>Material visual de soporte para presentación comercial.</p></div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  )
}

function ContactPage({ onQuote }) {
  return (
    <>
      <PageHero page="contacto" />
      <section className="page-section">
        <div className="container contact-page-grid">
          <div className="page-copy-block">
            <span className="section-kicker">CONTACTO</span>
            <h2>Solicita una evaluación y recibe orientación técnica.</h2>
            <p>Podemos iniciar con diagnóstico, revisión documental, capacitación o cotización técnica.</p>
            <div className="contact-list">
              <a href={wa()} target="_blank" rel="noreferrer"><MessageCircle /> +51 959 462 430</a>
              <span><Phone /> {SECOND_NUMBER}</span>
              <a href={`mailto:${EMAIL}`}><Mail /> {EMAIL}</a>
              <span><MapPin /> Lima, Perú</span>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>
    </>
  )
}

function QuoteForm() {
  const [form, setForm] = useState({ empresa: '', nombre: '', telefono: '', servicio: '', mensaje: '' })
  const text = useMemo(() => `Hola VJ Consultores Perú, deseo solicitar un diagnóstico. Empresa: ${form.empresa || '___'}. Nombre: ${form.nombre || '___'}. Teléfono: ${form.telefono || '___'}. Servicio: ${form.servicio || '___'}. Mensaje: ${form.mensaje || '___'}`, [form])
  const setField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  return (
    <form className="quote-form" onSubmit={(e) => e.preventDefault()}>
      <h3>Solicitar diagnóstico</h3>
      <p>Completa los datos y abre WhatsApp con el mensaje listo.</p>
      <input placeholder="Empresa" value={form.empresa} onChange={(e) => setField('empresa', e.target.value)} />
      <input placeholder="Nombre" value={form.nombre} onChange={(e) => setField('nombre', e.target.value)} />
      <input placeholder="Teléfono" value={form.telefono} onChange={(e) => setField('telefono', e.target.value)} />
      <input placeholder="Servicio de interés" value={form.servicio} onChange={(e) => setField('servicio', e.target.value)} />
      <textarea placeholder="Cuéntanos tu necesidad" value={form.mensaje} onChange={(e) => setField('mensaje', e.target.value)} />
      <a className="btn btn-gold full" href={wa(text)} target="_blank" rel="noreferrer">Enviar por WhatsApp <Send /></a>
    </form>
  )
}

function Footer({ onNav, onQuote }) {
  return (
    <footer className="site-footer">
      <div className="container footer-pretty">
        <div className="footer-brand-card">
          <img src={logo} alt="VJ Consultores Perú" />
          <p>
            Consultores especializados en auditorías, seguridad e ingeniería. Comprometidos con la excelencia,
            el cumplimiento y la mejora continua.
          </p>
        </div>
        <div className="footer-links">
          <h4>Enlaces rápidos</h4>
          {navItems.slice(0, 7).map((item) => <button key={item.id} onClick={() => onNav(item.id)}>{item.label}</button>)}
        </div>
        <div className="footer-contact">
          <h4>Contáctanos</h4>
          <span><Phone /> {SECOND_NUMBER}</span>
          <span><Mail /> {EMAIL}</span>
          <span><MapPin /> Lima, Perú</span>
          <button className="btn btn-gold" onClick={onQuote}>Solicitar diagnóstico <ArrowRight /></button>
          <a className="btn btn-dark" href={wa()} target="_blank" rel="noreferrer">Escríbenos por WhatsApp</a>
        </div>
      </div>
      <div className="container footer-bottom">
        <small>© 2024 VJ Consultores Perú S.A.C. Todos los derechos reservados.</small>
        <div className="footer-policy-links">
          <button>Política de Privacidad</button>
          <button>Términos y Condiciones</button>
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
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="quote-modal" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 24, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }}>
            <button className="modal-close" onClick={onClose}><X /></button>
            <QuoteForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

createRoot(document.getElementById('root')).render(<App />)
