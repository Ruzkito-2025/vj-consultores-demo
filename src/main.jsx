
import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import {
  AlertTriangle, ArrowRight, BadgeCheck, BookOpenCheck, BriefcaseBusiness, Building2,
  CalendarCheck, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck, FileCheck2,
  Flame, Gauge, GraduationCap, HardHat, Home as HomeIcon, Mail, MapPin, Menu,
  MessageCircle, Phone, Ruler, Search, Send, ShieldAlert, Sparkles, Star, Target,
  Users, X
} from 'lucide-react'
import './styles.css'

const WHATSAPP_NUMBER = '51959462430'
const SECOND_NUMBER = '+51 941 760 395'
const EMAIL = 'informacionprotpae@gmail.com'
const wa = (message = 'Hola VJ Consultores Perú, quiero información sobre sus servicios de seguridad e ingeniería.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

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

const pages = [
  { id: 'inicio', label: 'Inicio', icon: HomeIcon },
  { id: 'servicios', label: 'Servicios', icon: BriefcaseBusiness },
  { id: 'iso', label: 'ISO / Auditorías', icon: FileCheck2 },
  { id: 'sst', label: 'SG-SST', icon: ShieldAlert },
  { id: 'ingenieria', label: 'Ingeniería', icon: Ruler },
  { id: 'clientes', label: 'Clientes', icon: Star },
  { id: 'contacto', label: 'Contacto', icon: MessageCircle },
]

const heroSlides = [
  {
    key: 'portada',
    image: brochure.portada,
    eyebrow: 'Seguridad e Ingeniería',
    title: 'Soluciones integrales para empresas que necesitan cumplir, prevenir y crecer',
    text: 'Implementación de sistemas de gestión, homologación, auditorías ISO/MINTRA, asesoría ante fiscalización, planos, ITSE, monitoreos y sistemas contra incendio.',
    cta: 'Ver servicios',
    alt: 'Solicitar asesoría',
    tags: ['SG-SST', 'Homologación', 'ISO', 'ITSE', 'SUNAFIL'],
  },
  {
    key: 'iso',
    image: brochure.iso,
    eyebrow: 'Auditorías externas',
    title: 'ISO 9001, 14001, 45001, 37001, 31001 y 39001 como eje de confianza',
    text: 'Una sección potente para mostrar estándares, auditorías externas, revisión de procesos y soporte para cumplimiento de sistemas de gestión.',
    cta: 'Ver ISO',
    alt: 'Cotizar auditoría',
    tags: ['ISO 9001', 'ISO 14001', 'ISO 45001', 'ISO 37001', 'ISO 39001'],
  },
  {
    key: 'clientes',
    image: brochure.clientes,
    eyebrow: 'Clientes y respaldo',
    title: 'Una presentación más fuerte con clientes, servicios e imágenes reales del brochure',
    text: 'La web ahora usa piezas del brochure para que se perciba como una empresa sólida, con experiencia visual y respaldo comercial.',
    cta: 'Ver clientes',
    alt: 'Hablar con un asesor',
    tags: ['Clientes', 'Experiencia', 'Respaldo', 'Confianza'],
  },
]

const isoStandards = [
  ['ISO 9001:2015', 'Sistema de Gestión de Calidad'],
  ['ISO 14001:2015', 'Sistema de Gestión Ambiental'],
  ['ISO 45001:2018', 'Seguridad y Salud en el Trabajo'],
  ['ISO 37001:2016', 'Sistema de Gestión Antisoborno'],
  ['ISO 31001:2018', 'Sistema de Gestión de Riesgo'],
  ['ISO 39001:2015', 'Sistema de Gestión de Seguridad Vial'],
]

const services = [
  {
    id: 1,
    name: 'Homologación de Proveedores',
    category: 'Gestión empresarial',
    tag: 'Proveedor confiable',
    icon: ClipboardCheck,
    image: brochure.homologacion,
    description: 'Validación de capacidades y recursos de una empresa proveedora para demostrar competencia, confiabilidad y cumplimiento ante clientes.',
    includes: ['Gestión financiera y obligaciones legales', 'Gestión operativa', 'Gestión comercial', 'Gestión de calidad', 'Gestión medioambiental', 'Seguridad y Salud en el Trabajo', 'Responsabilidad social'],
    deliverables: ['Diagnóstico documental', 'Revisión de criterios de homologación', 'Cierre de brechas', 'Soporte para presentación ante clientes'],
  },
  {
    id: 2,
    name: 'Sistema de Gestión de Seguridad y Salud en el Trabajo',
    category: 'SG-SST',
    tag: 'Ley 29783',
    icon: ShieldAlert,
    image: brochure.sst,
    description: 'Implementación documental y operativa del SG-SST: línea base, documentos obligatorios, registros, IPERC, mapa de riesgos, plan anual y comité SST.',
    includes: ['Diagnóstico inicial o línea base', 'Documentos obligatorios Art. 32', 'Registros obligatorios Art. 33', 'IPERC', 'Mapa de riesgos', 'Plan anual SST', 'Reglamento interno SST'],
    deliverables: ['Matriz de requisitos legales', 'Programa de inspecciones', 'Monitoreos ocupacionales', 'Planes de contingencia y rescate', 'Auditorías internas', 'Tercerización del SG-SST'],
  },
  {
    id: 3,
    name: 'Capacitaciones y Entrenamientos',
    category: 'Formación corporativa',
    tag: 'Entrenamiento',
    icon: GraduationCap,
    image: brochure.capacitacion,
    description: 'Formación corporativa en SST, respuesta a emergencias, alto riesgo y brigadas para fortalecer la prevención en las organizaciones.',
    includes: ['Uso y cuidado de EPP', 'IPERC', 'Comité de SST', 'Investigación de accidentes', 'Inducciones SST', 'Riesgos específicos'],
    deliverables: ['Brigadas de emergencia', 'Primeros auxilios', 'Lucha contra incendios', 'Evacuación y rescate', 'Trabajo en altura', 'Espacios confinados'],
  },
  {
    id: 4,
    name: 'Auditorías Externas ISO y SST',
    category: 'Auditoría ISO / MINTRA',
    tag: 'ISO',
    icon: FileCheck2,
    image: brochure.iso,
    description: 'Revisión de procesos para identificar fortalezas, oportunidades de mejora y cumplimiento de estándares nacionales e internacionales.',
    includes: isoStandards.map(([iso, name]) => `${iso}: ${name}`),
    deliverables: ['Auditoría SST según normativa nacional', 'Auditoría de proveedores', 'Informe de hallazgos', 'Recomendaciones de mejora', 'Soporte con profesionales acreditados por MINTRA'],
  },
  {
    id: 5,
    name: 'Monitoreos Ocupacionales',
    category: 'Higiene ocupacional',
    tag: 'Mediciones',
    icon: Gauge,
    image: brochure.monitoreos,
    description: 'Evaluación de agentes físicos, químicos, biológicos y psicosociales para prevenir riesgos ocupacionales y respaldar el cumplimiento normativo.',
    includes: ['Ruido por dosimetría', 'Iluminación', 'Estrés térmico', 'Radiación UVA/UVB', 'Polvo respirable e inhalable', 'COV y gases de combustión'],
    deliverables: ['Monitoreo de agentes físicos', 'Monitoreo de agentes químicos', 'Monitoreo biológico', 'Evaluación psicosocial', 'Informes técnicos'],
  },
  {
    id: 6,
    name: 'Asesoría Integral OEFA, SUNAFIL y OSINERGMIN',
    category: 'Fiscalización',
    tag: 'Fiscalización',
    icon: BriefcaseBusiness,
    image: brochure.fiscalizacion,
    description: 'Acompañamiento ante requerimientos, observaciones y fiscalizaciones de entidades como OEFA, SUNAFIL y OSINERGMIN.',
    includes: ['Gestión ambiental', 'Cumplimiento legal', 'Levantamiento de observaciones', 'Registro de Comité o Supervisor SST', 'Requerimientos legales', 'Planes de contingencia'],
    deliverables: ['Matriz de aspectos ambientales', 'Planes de gestión ambiental', 'Planes de residuos sólidos', 'Asesoría administrativa', 'Capacitaciones de medio ambiente'],
  },
  {
    id: 7,
    name: 'Sistemas Contra Incendio',
    category: 'Ingeniería contra incendio',
    tag: 'NFPA',
    icon: Flame,
    image: brochure.incendio,
    description: 'Diseño, instalación y mantenimiento de sistemas de detección, alarma, extinción, rociadores, redes y bombas contra incendio.',
    includes: ['Evaluación de riesgos de incendio', 'Sistemas de extinción', 'Detección y alarma', 'Bombas contra incendio', 'Red húmeda', 'Gabinetes contra incendio'],
    deliverables: ['Diseño a medida', 'Instalación bajo normativa NFPA 20', 'Detección bajo NFPA 72', 'Mantenimiento preventivo y correctivo'],
  },
  {
    id: 8,
    name: 'Arquitectura, Ingeniería, ITSE y Mapas de Riesgo',
    category: 'Planos e ingeniería',
    tag: 'ITSE / Defensa Civil',
    icon: Ruler,
    image: brochure.ingenieria,
    description: 'Elaboración de planos de seguridad, vivienda, ingeniería, mapas de riesgo, señalización, evacuación y documentación para ITSE.',
    includes: ['Plano de ubicación', 'Plano de distribución', 'Plano de señalización', 'Plano de evacuación', 'Pozo a tierra', 'Mapa de riesgos Ley 29783'],
    deliverables: ['Planos de arquitectura', 'Planos de estructuras', 'Planos eléctricos y sanitarios', 'Diagramas unifilares', 'Cuadro de cargas', 'Protocolos de tableros eléctricos'],
  },
]

const sectors = ['Industria','Construcción','Minería','Transporte','Comercio','Hidrocarburos','Agroindustria','Alimentos','Servicios','Educación','Logística','Retail']
const brochureCards = [
  ['Portada institucional', brochure.portada, 'Resumen de seguridad, ingeniería y servicios centrales.'],
  ['Quiénes somos', brochure.nosotros, 'Misión, visión, alianza estratégica y presentación institucional.'],
  ['Auditorías ISO', brochure.iso, 'Normas ISO, auditorías externas y soporte de cumplimiento.'],
  ['Clientes', brochure.clientes, 'Logos de clientes y respaldo comercial del brochure.'],
]

function App() {
  const [page, setPage] = useState('inicio')
  const [mobile, setMobile] = useState(false)
  const [hero, setHero] = useState(0)
  const [selected, setSelected] = useState(null)
  const [quote, setQuote] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('Todos')

  useEffect(() => {
    const id = setInterval(() => setHero((v) => (v + 1) % heroSlides.length), 6200)
    return () => clearInterval(id)
  }, [])

  const go = (id) => {
    setPage(id)
    setMobile(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const categories = ['Todos', ...Array.from(new Set(services.map((s) => s.category)))]
  const filtered = useMemo(() => services.filter((s) => {
    const text = `${s.name} ${s.category} ${s.description}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (filter === 'Todos' || s.category === filter)
  }), [query, filter])

  return (
    <LayoutGroup>
      <div className="app">
        <Header page={page} mobile={mobile} setMobile={setMobile} go={go} setQuote={setQuote} />
        <AnimatePresence mode="wait">
          <motion.main key={page} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .25 }}>
            {page === 'inicio' && <Home hero={hero} setHero={setHero} go={go} setSelected={setSelected} setQuote={setQuote} />}
            {page === 'servicios' && <ServicesPage filtered={filtered} categories={categories} query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} setSelected={setSelected} setQuote={setQuote} />}
            {page === 'iso' && <IsoPage setSelected={setSelected} setQuote={setQuote} />}
            {page === 'sst' && <SSTPage setSelected={setSelected} setQuote={setQuote} />}
            {page === 'ingenieria' && <EngineeringPage setSelected={setSelected} setQuote={setQuote} />}
            {page === 'clientes' && <ClientsPage setQuote={setQuote} />}
            {page === 'contacto' && <ContactPage setQuote={setQuote} go={go} />}
          </motion.main>
        </AnimatePresence>
        <Footer go={go} />
        <a className="float" href={wa()} target="_blank" rel="noreferrer"><MessageCircle /></a>
        <ServiceModal service={selected} onClose={() => setSelected(null)} setQuote={setQuote} />
        <QuoteModal open={quote} onClose={() => setQuote(false)} />
      </div>
    </LayoutGroup>
  )
}

function Header({ page, mobile, setMobile, go, setQuote }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12)
    addEventListener('scroll', f); f()
    return () => removeEventListener('scroll', f)
  }, [])

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="nav">
        <button className="brand" onClick={() => go('inicio')}>
          <span className="logo-mark">VJ</span>
          <div><strong>VJ Consultores Perú</strong><small>Seguridad e Ingeniería</small></div>
        </button>
        <nav>
          {pages.map(({ id, label, icon: Icon }) => <button key={id} className={page === id ? 'active' : ''} onClick={() => go(id)}><Icon />{label}</button>)}
        </nav>
        <div className="actions">
          <button className="btn ghost" onClick={() => setQuote(true)}>Diagnóstico</button>
          <a className="btn primary" href={wa()} target="_blank" rel="noreferrer"><MessageCircle /> Cotizar</a>
        </div>
        <button className="hamb" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {mobile && <motion.div className="mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
          {pages.map(({ id, label, icon: Icon }) => <button key={id} className={page === id ? 'active' : ''} onClick={() => go(id)}><Icon />{label}</button>)}
          <a className="btn primary full" href={wa()} target="_blank" rel="noreferrer">Cotizar por WhatsApp</a>
        </motion.div>}
      </AnimatePresence>
    </header>
  )
}

function Home({ hero, setHero, go, setSelected, setQuote }) {
  return <>
    <Hero hero={hero} setHero={setHero} go={go} setQuote={setQuote} />
    <Trust />
    <BrochureProof />
    <IsoSpotlight setSelected={setSelected} />
    <Featured setSelected={setSelected} go={go} />
    <About />
    <ClientsStrip setQuote={setQuote} />
    <Sectors />
    <FinalCTA go={go} setQuote={setQuote} />
  </>
}

function Hero({ hero, setHero, go, setQuote }) {
  const s = heroSlides[hero]
  const move = (d) => setHero((v) => (v + d + heroSlides.length) % heroSlides.length)
  const targetPage = s.key === 'iso' ? 'iso' : s.key === 'clientes' ? 'clientes' : 'servicios'
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles /> {s.eyebrow}</span>
          <AnimatePresence mode="wait">
            <motion.div key={s.key} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}>
              <h1>{s.title}</h1>
              <p>{s.text}</p>
              <div className="chips">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </motion.div>
          </AnimatePresence>
          <div className="hero-actions">
            <button className="btn primary big" onClick={() => go(targetPage)}>{s.cta}<ArrowRight /></button>
            <button className="btn white big" onClick={() => setQuote(true)}>{s.alt}<MessageCircle /></button>
          </div>
        </div>
        <div className="hero-visual-wrap">
          <AnimatePresence mode="wait">
            <motion.div className="hero-visual" key={s.key} initial={{ opacity: 0, scale: .96, x: 24 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: .98, x: -24 }} transition={{ duration: .45 }}>
              <img src={s.image} alt={s.title} />
              <div className="hero-floating">
                <strong>Brochure integrado</strong>
                <span>Imágenes reales + ISO + clientes</span>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="hero-controls">
            <div className="dots">{heroSlides.map((_, i) => <button key={i} className={hero === i ? 'active' : ''} onClick={() => setHero(i)} />)}</div>
            <div className="arrow-buttons"><button onClick={() => move(-1)}><ChevronLeft /></button><button onClick={() => move(1)}><ChevronRight /></button></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Trust() {
  const items = [
    { icon: Building2, title: 'Empresa peruana', text: 'Consultoría, asesoría legal, ingeniería y servicios especializados.' },
    { icon: ShieldAlert, title: 'Cumplimiento normativo', text: 'Ley 29783, SG-SST, auditorías, fiscalizaciones y estándares ISO.' },
    { icon: FileCheck2, title: 'ISO y MINTRA', text: 'Auditorías externas y revisión de procesos bajo estándares nacionales e internacionales.' },
    { icon: MessageCircle, title: 'Atención directa', text: 'WhatsApp, correo y diagnóstico para orientar el servicio adecuado.' },
  ]
  return <section className="trust container">{items.map(({icon: Icon, title, text}) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</section>
}

function Title({ eyebrow, title, text, center = false }) {
  return <div className={`title ${center ? 'center' : ''}`}><span className="eyebrow dark">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function BrochureProof() {
  return (
    <section className="section light">
      <div className="container">
        <Title center eyebrow="Material oficial" title="Ahora la web usa imágenes del brochure" text="Esto eleva la confianza porque muestra identidad, servicios, clientes y páginas reales de la presentación comercial." />
        <div className="brochure-grid">
          {brochureCards.map(([title, img, text], i) => <motion.article key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*.05 }}>
            <img src={img} alt={title} />
            <div><strong>{title}</strong><p>{text}</p></div>
          </motion.article>)}
        </div>
      </div>
    </section>
  )
}

function IsoSpotlight({ setSelected }) {
  const service = services.find((s) => s.name.includes('Auditorías'))
  return (
    <section className="section iso-section">
      <div className="container iso-grid">
        <div>
          <Title eyebrow="Certificaciones y estándares ISO" title="La sección ISO debía ser protagonista" text="El brochure comunica auditorías externas y soporte en estándares ISO, por eso ahora tiene una zona propia con imagen real y badges." />
          <div className="iso-badges">{isoStandards.map(([iso, label]) => <div key={iso}><strong>{iso}</strong><span>{label}</span></div>)}</div>
          <button className="btn primary big" onClick={() => setSelected(service)}>Ver auditorías ISO <ArrowRight /></button>
        </div>
        <div className="iso-image"><img src={brochure.iso} alt="Auditorías ISO" /></div>
      </div>
    </section>
  )
}

function Featured({ setSelected, go }) {
  return <section className="section light"><div className="container">
    <div className="row"><Title eyebrow="Servicios principales" title="Servicios del brochure convertidos en una web más potente" text="Cada servicio ahora tiene imagen real del brochure, modal con detalle y cotización directa." /><button className="btn ghost" onClick={() => go('servicios')}>Ver todos<ArrowRight /></button></div>
    <ServiceGrid items={services.slice(0,6)} setSelected={setSelected} />
  </div></section>
}

function ServiceGrid({ items, setSelected }) {
  return <div className="service-grid">{items.map((service, i) => {
    const Icon = service.icon
    return <motion.article key={service.id} className="service-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i*.04 }}>
      <motion.div layoutId={`svc-img-${service.id}`} className="service-img"><img src={service.image} alt={service.name} /><span>{service.tag}</span></motion.div>
      <div className="service-body">
        <small>{service.category}</small>
        <motion.h3 layoutId={`svc-title-${service.id}`}>{service.name}</motion.h3>
        <p>{service.description}</p>
        <div className="card-actions"><button className="btn ghost" onClick={() => setSelected(service)}>Ver detalles</button><a className="btn primary" href={wa(`Hola VJ Consultores Perú, quiero cotizar el servicio: ${service.name}.`)} target="_blank" rel="noreferrer">Cotizar</a></div>
      </div>
    </motion.article>
  })}</div>
}

function About() {
  return <section className="section about"><div className="container split">
    <div className="image-panel"><img src={brochure.nosotros} alt="Quiénes somos VJ Consultores" /></div>
    <div><Title eyebrow="Quiénes son" title="Consultoría, asesoría legal, ingeniería y servicios especializados" text="Empresa peruana orientada al crecimiento sostenible de las organizaciones, promoviendo innovación, competitividad y cumplimiento de estándares de calidad." />
      {['Mejora continua para organizaciones','Eficiencia, calidad, seguridad y confianza','Alianza estratégica con la Cámara de Comercio de Piura','Soluciones integrales para distintos sectores'].map((item) => <p className="check" key={item}><BadgeCheck /> {item}</p>)}
    </div>
  </div></section>
}

function ClientsStrip({ setQuote }) {
  return <section className="section clients-section"><div className="container split">
    <div><Title eyebrow="Clientes que respaldan" title="Una página más fuerte necesita mostrar respaldo comercial" text="El brochure incluye una lámina de clientes; ahora se integra en la web para aumentar la percepción de confianza." />
      <button className="btn primary big" onClick={() => setQuote(true)}>Solicitar propuesta <MessageCircle /></button></div>
    <div className="image-panel clients"><img src={brochure.clientes} alt="Clientes VJ Consultores" /></div>
  </div></section>
}

function Sectors() {
  return <section className="section light"><div className="container"><Title center eyebrow="Sectores atendidos" title="Servicios aplicables a múltiples industrias" text="Una propuesta visual para empresas que necesitan cumplir, prevenir y operar con mayor seguridad." /><div className="sector-grid">{sectors.map((s) => <span key={s}>{s}</span>)}</div></div></section>
}

function FinalCTA({ go, setQuote }) {
  return <section className="final"><div className="container"><span className="eyebrow">Diagnóstico y asesoría</span><h2>¿Tu empresa necesita cumplir, prevenir o levantar observaciones?</h2><p>Solicita una evaluación para elegir el servicio adecuado: SST, ISO, fiscalización, monitoreos, ingeniería, ITSE o sistemas contra incendio.</p><div className="hero-actions center"><button className="btn white big" onClick={() => setQuote(true)}>Solicitar asesoría<MessageCircle /></button><button className="btn dark big" onClick={() => go('servicios')}>Ver servicios<ArrowRight /></button></div></div></section>
}

function PageHero({ eyebrow, title, text, image }) {
  return <section className="page-hero"><div className="container page-hero-grid"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{image && <img src={image} alt={title} />}</div></section>
}

function ServicesPage({ filtered, categories, query, setQuery, filter, setFilter, setSelected, setQuote }) {
  return <>
    <PageHero eyebrow="Servicios" title="Catálogo de servicios con imágenes reales del brochure" text="Filtra por categoría, revisa el detalle y cotiza por WhatsApp." image={brochure.portada} />
    <section className="section light"><div className="container">
      <div className="toolbar"><label><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar servicio, norma o categoría..." /></label><div>{categories.map((c) => <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>{c}</button>)}</div><button className="btn primary" onClick={() => setQuote(true)}>Diagnóstico</button></div>
      <ServiceGrid items={filtered} setSelected={setSelected} />
    </div></section>
  </>
}

function IsoPage({ setSelected, setQuote }) {
  const iso = services.find((s) => s.name.includes('Auditorías'))
  return <>
    <PageHero eyebrow="Auditorías ISO / MINTRA" title="Estándares ISO convertidos en una sección comercial potente" text="ISO 9001, 14001, 45001, 37001, 31001, 39001, auditoría SST y proveedores." image={brochure.iso} />
    <IsoSpotlight setSelected={setSelected} />
    <section className="section light"><div className="container"><ServiceGrid items={[iso]} setSelected={setSelected} /></div></section>
  </>
}

function SSTPage({ setSelected, setQuote }) {
  const list = services.filter((s) => ['SG-SST','Higiene ocupacional','Auditoría ISO / MINTRA'].includes(s.category))
  return <>
    <PageHero eyebrow="SG-SST" title="Seguridad y Salud en el Trabajo" text="Implementación documental y operativa para cumplimiento de Ley 29783." image={brochure.sst} />
    <section className="section light"><div className="container"><ServiceGrid items={list} setSelected={setSelected} /></div></section>
  </>
}

function EngineeringPage({ setSelected, setQuote }) {
  const list = services.filter((s) => ['Ingeniería contra incendio','Planos e ingeniería','Fiscalización'].includes(s.category))
  return <>
    <PageHero eyebrow="Ingeniería e ITSE" title="Planos, sistemas contra incendio y asesoría ante fiscalización" text="Una página interna para servicios técnicos de arquitectura, ingeniería, defensa civil y prevención." image={brochure.ingenieria} />
    <section className="section light"><div className="container"><ServiceGrid items={list} setSelected={setSelected} /></div></section>
  </>
}

function ClientsPage({ setQuote }) {
  return <>
    <PageHero eyebrow="Clientes" title="Clientes que respaldan nuestros servicios" text="Integración de la lámina de clientes del brochure para reforzar confianza." image={brochure.clientes} />
    <ClientsStrip setQuote={setQuote} />
  </>
}

function ContactPage({ setQuote, go }) {
  return <>
    <PageHero eyebrow="Contacto" title="Solicita asesoría para tu empresa" text="Formulario visual que envía el requerimiento por WhatsApp." image={brochure.portada} />
    <section className="section light"><div className="container split"><div><Title eyebrow="Atención comercial" title="Cuéntanos qué necesita tu organización" text="Podemos iniciar con diagnóstico, revisión documental, capacitación o cotización técnica." /><div className="contact-list"><a href={wa()} target="_blank" rel="noreferrer"><MessageCircle /> +51 959 462 430</a><span><Phone /> {SECOND_NUMBER}</span><a href={`mailto:${EMAIL}`}><Mail /> {EMAIL}</a></div></div><QuoteForm /></div></section>
    <FinalCTA go={go} setQuote={setQuote} />
  </>
}

function QuoteForm() {
  const [form, setForm] = useState({ company: '', name: '', phone: '', service: '', city: '', message: '' })
  const update = (k, v) => setForm((o) => ({ ...o, [k]: v }))
  const msg = `Hola VJ Consultores Perú, quiero solicitar asesoría. Empresa: ${form.company || '___'}. Contacto: ${form.name || '___'}. Teléfono: ${form.phone || '___'}. Servicio de interés: ${form.service || '___'}. Ciudad: ${form.city || '___'}. Mensaje: ${form.message || '___'}`
  return <form className="form" onSubmit={(e) => e.preventDefault()}><input placeholder="Empresa" value={form.company} onChange={(e) => update('company', e.target.value)} /><input placeholder="Nombre de contacto" value={form.name} onChange={(e) => update('name', e.target.value)} /><input placeholder="Teléfono / WhatsApp" value={form.phone} onChange={(e) => update('phone', e.target.value)} /><input placeholder="Servicio de interés" value={form.service} onChange={(e) => update('service', e.target.value)} /><input placeholder="Ciudad / sede" value={form.city} onChange={(e) => update('city', e.target.value)} /><textarea placeholder="Mensaje o requerimiento" value={form.message} onChange={(e) => update('message', e.target.value)} /><a className="btn primary full" href={wa(msg)} target="_blank" rel="noreferrer">Enviar solicitud <Send /></a></form>
}

function ServiceModal({ service, onClose, setQuote }) {
  useEffect(() => {
    if (!service) return
    document.body.style.overflow = 'hidden'
    const f = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', f)
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', f) }
  }, [service, onClose])
  return <AnimatePresence initial={false} mode="wait">{service && <motion.div className="modal-bg" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="modal service-modal" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 28, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }} transition={{ type: 'spring', stiffness: 180, damping: 22 }}><button className="close" onClick={onClose}><X /></button><motion.div layoutId={`svc-img-${service.id}`} className="modal-image"><img src={service.image} alt={service.name} /><span>{service.tag}</span></motion.div><div className="modal-content"><small>{service.category}</small><motion.h2 layoutId={`svc-title-${service.id}`}>{service.name}</motion.h2><p>{service.description}</p><div className="modal-grid"><div><h4>Incluye</h4>{service.includes.map((x) => <p key={x}><CheckCircle2 /> {x}</p>)}</div><div><h4>Entregables / soporte</h4>{service.deliverables.map((x) => <p key={x}><CheckCircle2 /> {x}</p>)}</div></div><div className="note"><AlertTriangle /> La propuesta final se confirma según diagnóstico, sede, documentación disponible y requerimiento técnico.</div><div className="modal-actions"><a className="btn primary" href={wa(`Hola VJ Consultores Perú, quiero cotizar el servicio: ${service.name}.`)} target="_blank" rel="noreferrer">Cotizar este servicio</a><button className="btn ghost" onClick={() => { onClose(); setQuote(true) }}>Solicitar diagnóstico</button></div></div></motion.div></motion.div>}</AnimatePresence>
}

function QuoteModal({ open, onClose }) {
  return <AnimatePresence>{open && <motion.div className="modal-bg" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="modal quote-modal" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: .97 }}><button className="close" onClick={onClose}><X /></button><Title eyebrow="Solicitud" title="Solicita diagnóstico o cotización" text="Completa los datos y abre WhatsApp con el mensaje listo para un asesor." /><QuoteForm /></motion.div></motion.div>}</AnimatePresence>
}

function Footer({ go }) {
  return <footer><div className="container footer-grid"><div><button className="brand footer-brand" onClick={() => go('inicio')}><span className="logo-mark">VJ</span><div><strong>VJ Consultores Perú</strong><small>Seguridad e Ingeniería</small></div></button><p>Brindando soluciones integrales e impulsando el crecimiento a todo nivel.</p><small>RUC: 20609012332 · Desarrollado por Synkro</small></div><div><h4>Enlaces</h4>{pages.slice(0, 6).map((p) => <button key={p.id} onClick={() => go(p.id)}>{p.label}</button>)}</div><div><h4>Servicios</h4>{services.slice(0, 6).map((s) => <span key={s.id}>{s.name}</span>)}</div><div><h4>Contacto</h4><span>+51 959 462 430</span><span>{SECOND_NUMBER}</span><span>{EMAIL}</span><a href={wa()} target="_blank" rel="noreferrer">Cotizar por WhatsApp</a></div></div></footer>
}

createRoot(document.getElementById('root')).render(<App />)
