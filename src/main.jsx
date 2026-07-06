
import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import {
  AlertTriangle, ArrowRight, BadgeCheck, BarChart3, BellRing, BookOpenCheck, BriefcaseBusiness,
  Building2, CalendarCheck, CheckCircle2, ChevronLeft, ChevronRight, ClipboardCheck, ClipboardList,
  FileCheck2, Flame, Gauge, GraduationCap, HardHat, Home as HomeIcon, Leaf, Mail, Map, MapPin, Menu,
  MessageCircle, Phone, Ruler, Search, Send, Shield, ShieldAlert, Siren, Sparkles, Target,
  Users, Wrench, X
} from 'lucide-react'
import './styles.css'

const WHATSAPP_NUMBER = '51959462430'
const SECOND_NUMBER = '+51 941 760 395'
const EMAIL = 'informacionprotpae@gmail.com'

const wa = (message = 'Hola VJ Consultores Perú, quiero información sobre sus servicios de seguridad e ingeniería.') =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

const pages = [
  { id: 'inicio', label: 'Inicio', icon: HomeIcon },
  { id: 'servicios', label: 'Servicios', icon: BriefcaseBusiness },
  { id: 'sst', label: 'SG-SST', icon: ShieldAlert },
  { id: 'capacitaciones', label: 'Capacitaciones', icon: GraduationCap },
  { id: 'ingenieria', label: 'Ingeniería', icon: Ruler },
  { id: 'nosotros', label: 'Nosotros', icon: Users },
  { id: 'contacto', label: 'Contacto', icon: MessageCircle },
]

const heroSlides = [
  {
    key: 'safety',
    eyebrow: 'Seguridad e Ingeniería',
    title: 'Soluciones integrales para empresas que necesitan cumplir y crecer',
    text: 'Implementación de sistemas de gestión, homologación de proveedores, auditorías, capacitaciones, monitoreos ocupacionales, ingeniería y asesoría ante entidades fiscalizadoras.',
    cta: 'Ver servicios',
    alt: 'Solicitar asesoría',
    tags: ['SST', 'ISO', 'MINTRA', 'OEFA', 'SUNAFIL'],
  },
  {
    key: 'engineering',
    eyebrow: 'Consultoría especializada',
    title: 'Seguridad, cumplimiento legal e ingeniería en un solo aliado',
    text: 'Acompañamos a organizaciones en documentación obligatoria, planes, mapas de riesgo, auditorías, arquitectura, ITSE, sistemas contra incendio y más.',
    cta: 'Explorar soluciones',
    alt: 'Cotizar por WhatsApp',
    tags: ['ITSE', 'Planos', 'Riesgos', 'NFPA', 'Monitoreos'],
  },
  {
    key: 'training',
    eyebrow: 'Capacitación y prevención',
    title: 'Formación corporativa para reducir riesgos y fortalecer equipos',
    text: 'Capacitaciones en seguridad y salud en el trabajo, brigadas, respuesta a emergencias, primeros auxilios, alto riesgo y manejo de sustancias peligrosas.',
    cta: 'Ver capacitaciones',
    alt: 'Hablar con un asesor',
    tags: ['Brigadas', 'Incendios', 'IPERC', 'Altura', 'Emergencias'],
  },
]

const trust = [
  { icon: Building2, title: 'Empresa peruana', text: 'Consultoría, asesoría legal, ingeniería y servicios especializados.' },
  { icon: BadgeCheck, title: 'Aliado estratégico', text: 'Enfoque en mejora continua, calidad, seguridad y confianza.' },
  { icon: Shield, title: 'Cumplimiento normativo', text: 'Soporte en Ley 29783, auditorías, fiscalizaciones y sistemas de gestión.' },
  { icon: MessageCircle, title: 'Atención directa', text: 'Contacto por WhatsApp y correo para coordinar asesorías.' },
]

const services = [
  {
    id: 1,
    name: 'Homologación de Proveedores',
    category: 'Gestión empresarial',
    tag: 'Proveedor confiable',
    icon: ClipboardCheck,
    color: '#f6b333',
    visual: 'homologacion',
    description: 'Validación de capacidades y recursos de empresas proveedoras para demostrar competencia, confiabilidad y cumplimiento ante clientes.',
    includes: ['Gestión financiera y obligaciones legales', 'Gestión operativa', 'Gestión comercial', 'Gestión de calidad', 'Gestión medioambiental', 'Seguridad y Salud en el Trabajo', 'Responsabilidad social'],
    deliverables: ['Diagnóstico documental', 'Revisión de criterios de homologación', 'Acompañamiento para cierre de brechas', 'Soporte para presentación ante clientes'],
  },
  {
    id: 2,
    name: 'Sistema de Gestión de Seguridad y Salud en el Trabajo',
    category: 'SG-SST',
    tag: 'Ley 29783',
    icon: ShieldAlert,
    color: '#003b63',
    visual: 'sst',
    description: 'Implementación documental y operativa del SG-SST, desde línea base hasta políticas, IPERC, registros, programas y comité de SST.',
    includes: ['Diagnóstico inicial o línea base', 'Documentos obligatorios Art. 32 Ley 29783', 'Registros obligatorios Art. 33', 'IPERC', 'Mapa de riesgos', 'Plan y programa anual SST', 'Reglamento interno SST'],
    deliverables: ['Matriz de requisitos legales', 'Programa de inspecciones', 'Programa de monitoreos', 'Planes de contingencia y rescate', 'Auditorías internas', 'Tercerización del SG-SST'],
  },
  {
    id: 3,
    name: 'Capacitaciones y Entrenamientos',
    category: 'Formación corporativa',
    tag: 'Entrenamiento',
    icon: GraduationCap,
    color: '#0b6b99',
    visual: 'capacitaciones',
    description: 'Formación corporativa en SST, respuesta a emergencias, alto riesgo y brigadas para fortalecer la prevención dentro de las organizaciones.',
    includes: ['Uso y cuidado de EPP', 'IPERC', 'Comité de SST', 'Investigación de accidentes', 'Inducciones SST', 'Riesgos específicos'],
    deliverables: ['Capacitaciones programadas', 'Entrenamiento de brigadas', 'Primeros auxilios', 'Lucha contra incendios', 'Evacuación y rescate', 'Trabajo en altura y espacios confinados'],
  },
  {
    id: 4,
    name: 'Auditorías Externas ISO y SST',
    category: 'Auditoría',
    tag: 'ISO / MINTRA',
    icon: FileCheck2,
    color: '#1e4f79',
    visual: 'auditorias',
    description: 'Revisión de procesos y sistemas de gestión para identificar fortalezas, oportunidades de mejora y cumplimiento de estándares nacionales e internacionales.',
    includes: ['ISO 9001 Calidad', 'ISO 14001 Ambiental', 'ISO 45001 SST', 'ISO 37001 Antisoborno', 'ISO 31001 Riesgo', 'ISO 39001 Seguridad vial'],
    deliverables: ['Auditoría de SST según normativa nacional', 'Auditoría de proveedores', 'Informe de hallazgos', 'Recomendaciones de mejora'],
  },
  {
    id: 5,
    name: 'Monitoreos Ocupacionales',
    category: 'Higiene ocupacional',
    tag: 'Mediciones',
    icon: Gauge,
    color: '#0f8b8d',
    visual: 'monitoreos',
    description: 'Evaluación de agentes físicos, químicos, biológicos y psicosociales para prevenir riesgos ocupacionales y cumplir requerimientos normativos.',
    includes: ['Ruido por dosimetría', 'Iluminación', 'Estrés térmico', 'Radiación UVA/UVB', 'Polvo respirable e inhalable', 'COV y gases de combustión'],
    deliverables: ['Monitoreo de agentes físicos', 'Monitoreo de agentes químicos', 'Monitoreo biológico', 'Evaluación de riesgos psicosociales', 'Informes técnicos'],
  },
  {
    id: 6,
    name: 'Asesoría Integral OEFA, SUNAFIL y OSINERGMIN',
    category: 'Fiscalización',
    tag: 'Fiscalización',
    icon: BriefcaseBusiness,
    color: '#c2410c',
    visual: 'asesoria',
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
    color: '#dc2626',
    visual: 'incendio',
    description: 'Diseño, instalación y mantenimiento de sistemas de detección, alarma, extinción, rociadores, redes y bombas contra incendio.',
    includes: ['Evaluación de riesgos de incendio', 'Sistemas de extinción', 'Detección y alarma', 'Bombas contra incendio', 'Red húmeda', 'Gabinetes contra incendio'],
    deliverables: ['Diseño a medida', 'Instalación bajo normativa NFPA 20', 'Sistemas de detección bajo NFPA 72', 'Mantenimiento preventivo y correctivo'],
  },
  {
    id: 8,
    name: 'Arquitectura, Ingeniería, ITSE y Mapas de Riesgo',
    category: 'Planos e ingeniería',
    tag: 'ITSE / Defensa Civil',
    icon: Ruler,
    color: '#334155',
    visual: 'ingenieria',
    description: 'Elaboración de planos de seguridad, vivienda, ingeniería, mapas de riesgo, señalización, evacuación y documentación para ITSE.',
    includes: ['Plano de ubicación', 'Plano de distribución', 'Plano de señalización', 'Plano de evacuación', 'Pozo a tierra', 'Mapa de riesgos Ley 29783'],
    deliverables: ['Planos de arquitectura', 'Planos de estructuras', 'Planos eléctricos y sanitarios', 'Diagramas unifilares', 'Cuadro de cargas', 'Protocolos de tableros eléctricos'],
  },
]

const sectors = [
  'Industria', 'Construcción', 'Minería', 'Transporte', 'Comercio', 'Hidrocarburos',
  'Agroindustria', 'Alimentos', 'Servicios', 'Educación', 'Logística', 'Retail'
]

const training = [
  ['Seguridad y Salud en el Trabajo', ['Uso y cuidado de equipos de protección personal', 'Identificación de Peligros y Evaluación de Riesgos IPERC', 'Comité de SST: conformación, funciones y responsabilidades', 'Investigación de accidentes e incidentes peligrosos', 'Inducciones SST', 'Capacitaciones de riesgos específicos']],
  ['Respuesta a Emergencias', ['Manipulación de productos químicos', 'Derrames de sustancias peligrosas', 'Transporte de productos peligrosos']],
  ['Alto Riesgo', ['Trabajo en altura', 'Trabajos en caliente', 'Espacios confinados', 'Riesgo eléctrico', 'Excavaciones y zanjas']],
  ['Brigadistas', ['Formación de brigadas de emergencia', 'Lucha contra incendios', 'Primeros auxilios en la industria', 'Evacuación y rescate', 'Planes de emergencia y rescate']],
]

function App() {
  const [page, setPage] = useState('inicio')
  const [open, setOpen] = useState(false)
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
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const categories = ['Todos', ...Array.from(new Set(services.map((s) => s.category)))]
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const q = `${s.name} ${s.category} ${s.description}`.toLowerCase()
      return q.includes(query.toLowerCase()) && (filter === 'Todos' || s.category === filter)
    })
  }, [query, filter])

  return (
    <LayoutGroup>
      <div className="app">
        <Header page={page} open={open} setOpen={setOpen} go={go} setQuote={setQuote} />
        <AnimatePresence mode="wait">
          <motion.main key={page} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: .25 }}>
            {page === 'inicio' && <Home hero={hero} setHero={setHero} go={go} setSelected={setSelected} setQuote={setQuote} />}
            {page === 'servicios' && <ServicesPage filteredServices={filteredServices} categories={categories} query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} setSelected={setSelected} setQuote={setQuote} />}
            {page === 'sst' && <SSTPage setSelected={setSelected} setQuote={setQuote} />}
            {page === 'capacitaciones' && <TrainingPage setQuote={setQuote} />}
            {page === 'ingenieria' && <EngineeringPage setSelected={setSelected} setQuote={setQuote} />}
            {page === 'nosotros' && <AboutPage />}
            {page === 'contacto' && <ContactPage setQuote={setQuote} go={go} />}
          </motion.main>
        </AnimatePresence>
        <Footer go={go} />
        <a className="float" href={wa()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a>
        <ServiceModal service={selected} onClose={() => setSelected(null)} setQuote={setQuote} />
        <QuoteModal open={quote} onClose={() => setQuote(false)} />
      </div>
    </LayoutGroup>
  )
}

function Header({ page, open, setOpen, go, setQuote }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12)
    addEventListener('scroll', f)
    f()
    return () => removeEventListener('scroll', f)
  }, [])

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="nav">
        <button className="brand" onClick={() => go('inicio')}>
          <span className="mark">VJ</span>
          <div><strong>VJ Consultores Perú</strong><small>Seguridad e Ingeniería</small></div>
        </button>
        <nav>
          {pages.map(({ id, label, icon: Icon }) => (
            <button key={id} className={page === id ? 'active' : ''} onClick={() => go(id)}><Icon />{label}</button>
          ))}
        </nav>
        <div className="actions">
          <button className="btn ghost" onClick={() => setQuote(true)}>Solicitar diagnóstico</button>
          <a className="btn primary" href={wa()} target="_blank" rel="noreferrer"><MessageCircle /> Cotizar</a>
        </div>
        <button className="hamb" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && <motion.div className="mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
          {pages.map(({ id, label, icon: Icon }) => <button key={id} className={page === id ? 'active' : ''} onClick={() => go(id)}><Icon />{label}</button>)}
          <a className="btn primary" href={wa()} target="_blank" rel="noreferrer">Cotizar por WhatsApp</a>
        </motion.div>}
      </AnimatePresence>
    </header>
  )
}

function Home({ hero, setHero, go, setSelected, setQuote }) {
  return (
    <>
      <Hero hero={hero} setHero={setHero} go={go} setQuote={setQuote} />
      <Trust />
      <Featured setSelected={setSelected} go={go} />
      <SystemsPreview setQuote={setQuote} />
      <TrainingPreview setQuote={setQuote} />
      <EngineeringPreview setSelected={setSelected} setQuote={setQuote} />
      <About />
      <Sectors />
      <FinalCTA go={go} setQuote={setQuote} />
    </>
  )
}

function Hero({ hero, setHero, go, setQuote }) {
  const s = heroSlides[hero]
  const move = (d) => setHero((v) => (v + d + heroSlides.length) % heroSlides.length)

  return (
    <section className="hero">
      <AnimatePresence mode="wait">
        <motion.div key={s.key} className={`hero-bg ${s.key}`} initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.03 }} transition={{ duration: .8 }} />
      </AnimatePresence>
      <div className="hero-shade" />
      <div className="hero-inner">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
          <span className="eyebrow"><Sparkles /> {s.eyebrow}</span>
          <AnimatePresence mode="wait">
            <motion.div key={s.title} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <h1>{s.title}</h1>
              <p>{s.text}</p>
            </motion.div>
          </AnimatePresence>
          <div className="hero-actions">
            <button className="btn primary big" onClick={() => go('servicios')}>{s.cta}<ArrowRight /></button>
            <button className="btn white big" onClick={() => setQuote(true)}>{s.alt}<MessageCircle /></button>
          </div>
          <div className="chips">{s.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </motion.div>
        <motion.div className="hero-card" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }}>
          <div className={`helmet-card ${s.key}`}>
            <HardHat />
            <span>Consultoría · Ingeniería · SST</span>
            <strong>Brindando soluciones integrales</strong>
          </div>
          <div className="hero-stats">
            <div><strong>SG-SST</strong><span>Ley 29783</span></div>
            <div><strong>ISO</strong><span>Auditorías</span></div>
            <div><strong>ITSE</strong><span>Planos y riesgo</span></div>
          </div>
        </motion.div>
      </div>
      <div className="arrows"><button onClick={() => move(-1)}><ChevronLeft /></button><button onClick={() => move(1)}><ChevronRight /></button></div>
    </section>
  )
}

function Trust() {
  return (
    <section className="trust">
      {trust.map(({ icon: Icon, title, text }, i) => (
        <motion.article key={title} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}>
          <Icon /><h3>{title}</h3><p>{text}</p>
        </motion.article>
      ))}
    </section>
  )
}

function SectionTitle({ eyebrow, title, text, center = false }) {
  return <motion.div className={`title ${center ? 'center' : ''}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <span className="eyebrow dark">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}
  </motion.div>
}

function Featured({ setSelected, go }) {
  return (
    <section className="section light">
      <div className="container">
        <div className="title-row">
          <SectionTitle eyebrow="Servicios principales" title="Una web que organiza todo lo que el brochure comunica" text="Servicios técnicos, legales, preventivos y de ingeniería presentados como soluciones comerciales para empresas." />
          <button className="btn ghost" onClick={() => go('servicios')}>Ver todos los servicios <ArrowRight /></button>
        </div>
        <ServiceGrid items={services.slice(0, 6)} setSelected={setSelected} />
      </div>
    </section>
  )
}

function ServiceGrid({ items, setSelected }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div layout className="service-grid">
        {items.map((service, i) => {
          const Icon = service.icon
          return (
            <motion.article layout className="service-card" key={service.id} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .95 }} transition={{ delay: i * .035 }}>
              <motion.div layoutId={`service-visual-${service.id}`} className={`service-visual ${service.visual}`} style={{ '--accent': service.color }}>
                <Icon className="main-icon" />
                <span>{service.tag}</span>
              </motion.div>
              <div className="service-body">
                <small>{service.category}</small>
                <motion.h3 layoutId={`service-title-${service.id}`}>{service.name}</motion.h3>
                <p>{service.description}</p>
                <div className="service-actions">
                  <button className="btn ghost" onClick={() => setSelected(service)}>Ver detalles</button>
                  <a className="btn primary" href={wa(`Hola VJ Consultores Perú, quiero cotizar el servicio: ${service.name}.`)} target="_blank" rel="noreferrer">Cotizar</a>
                </div>
              </div>
            </motion.article>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}

function SystemsPreview({ setQuote }) {
  return (
    <section className="section dark">
      <div className="container split">
        <SectionTitle eyebrow="Sistema de Gestión SST" title="Implementación documental y operativa para cumplir la Ley 29783" text="Diagnóstico inicial, documentos obligatorios, registros, IPERC, mapas de riesgo, planes, programas, auditorías y tercerización del sistema." />
        <motion.div className="process-card" initial={{ opacity: 0, x: 34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          {['Diagnóstico inicial o línea base', 'Documentos Art. 32 y registros Art. 33', 'IPERC, políticas, objetivos y RISST', 'Comité o supervisor SST', 'Plan anual, capacitaciones y auditoría'].map((item, i) => <p key={item}><span>{i + 1}</span>{item}</p>)}
          <button className="btn white full" onClick={() => setQuote(true)}>Solicitar diagnóstico SST <ArrowRight /></button>
        </motion.div>
      </div>
    </section>
  )
}

function TrainingPreview({ setQuote }) {
  return (
    <section className="section light">
      <div className="container">
        <SectionTitle center eyebrow="Formación corporativa" title="Capacitaciones y entrenamientos para equipos más seguros" text="SST, respuesta a emergencias, trabajos de alto riesgo y formación de brigadistas." />
        <div className="training-grid">
          {training.map(([title, list], i) => <motion.article key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}>
            <GraduationCap /><h3>{title}</h3>{list.slice(0, 5).map((x) => <p key={x}><CheckCircle2 />{x}</p>)}
          </motion.article>)}
        </div>
        <div className="center"><button className="btn primary big" onClick={() => setQuote(true)}>Programar capacitación <CalendarCheck /></button></div>
      </div>
    </section>
  )
}

function EngineeringPreview({ setSelected }) {
  const related = services.filter((s) => ['Sistemas Contra Incendio', 'Arquitectura, Ingeniería, ITSE y Mapas de Riesgo'].includes(s.name))
  return (
    <section className="section engineering">
      <div className="container">
        <div className="title-row">
          <SectionTitle eyebrow="Arquitectura e Ingeniería" title="Planos, ITSE, mapas de riesgo y sistemas contra incendio" text="Soluciones técnicas para seguridad, defensa civil, instalaciones, detección, alarma y extinción contra incendio." />
        </div>
        <ServiceGrid items={related} setSelected={setSelected} />
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section about">
      <div className="container split">
        <motion.div className="about-card" initial={{ opacity: 0, x: -34 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span>VJ</span>
          <strong>Consultores Perú</strong>
          <p>Seguridad e Ingeniería para organizaciones que buscan eficiencia, calidad, seguridad y confianza.</p>
        </motion.div>
        <div>
          <SectionTitle eyebrow="¿Quiénes son?" title="Una empresa peruana orientada al crecimiento sostenible de las organizaciones" text="Brindan soluciones integrales de consultoría, asesoría legal, ingeniería y servicios especializados, promoviendo innovación, competitividad y cumplimiento de estándares de calidad." />
          {['Mejora continua para organizaciones', 'Servicios de asesoría, consultoría e ingeniería', 'Alianza estratégica con la Cámara de Comercio de Piura', 'Enfoque en eficiencia, calidad, seguridad y confianza'].map((item) => <p className="check" key={item}><BadgeCheck /> {item}</p>)}
        </div>
      </div>
    </section>
  )
}

function Sectors() {
  return (
    <section className="section light sectors">
      <div className="container">
        <SectionTitle center eyebrow="Sectores atendidos" title="Servicios aplicables a múltiples industrias" text="Una propuesta visual para empresas que necesitan cumplir, prevenir y operar con mayor seguridad." />
        <div className="sector-grid">
          {sectors.map((sector, i) => <motion.span key={sector} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .025 }}>{sector}</motion.span>)}
        </div>
      </div>
    </section>
  )
}

function FinalCTA({ go, setQuote }) {
  return (
    <section className="final">
      <div className="container">
        <span className="eyebrow">Diagnóstico y asesoría</span>
        <h2>¿Tu empresa necesita cumplir, prevenir o levantar observaciones?</h2>
        <p>Solicita una evaluación y recibe orientación para elegir el servicio adecuado: SST, ISO, fiscalización, monitoreos, ingeniería, ITSE o sistemas contra incendio.</p>
        <div className="hero-actions center">
          <button className="btn white big" onClick={() => setQuote(true)}>Solicitar asesoría <MessageCircle /></button>
          <button className="btn dark big" onClick={() => go('servicios')}>Ver servicios <ArrowRight /></button>
        </div>
      </div>
    </section>
  )
}

function PageHero({ eyebrow, title, text }) {
  return <section className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>
}

function ServicesPage({ filteredServices, categories, query, setQuery, filter, setFilter, setSelected, setQuote }) {
  return <>
    <PageHero eyebrow="Servicios" title="Consultoría, seguridad e ingeniería organizadas para vender mejor" text="Catálogo de servicios con filtros, detalle en modal y contacto directo por WhatsApp." />
    <section className="section light"><div className="container">
      <div className="toolbar">
        <label><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar servicio, norma o categoría..." /></label>
        <div>{categories.map((c) => <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>{c}</button>)}</div>
        <button className="btn primary" onClick={() => setQuote(true)}>Solicitar diagnóstico</button>
      </div>
      <ServiceGrid items={filteredServices} setSelected={setSelected} />
      {!filteredServices.length && <div className="empty">No encontramos coincidencias. <button onClick={() => setFilter('Todos')}>Mostrar todos</button></div>}
    </div></section>
  </>
}

function SSTPage({ setSelected, setQuote }) {
  const sst = services.filter((s) => ['Sistema de Gestión de Seguridad y Salud en el Trabajo', 'Monitoreos Ocupacionales', 'Auditorías Externas ISO y SST'].includes(s.name))
  return <>
    <PageHero eyebrow="SG-SST" title="Sistema de Gestión de Seguridad y Salud en el Trabajo" text="Documentación obligatoria, IPERC, registros, comité, auditoría, monitoreos y tercerización del sistema." />
    <SystemsPreview setQuote={setQuote} />
    <section className="section light"><div className="container"><ServiceGrid items={sst} setSelected={setSelected} /></div></section>
  </>
}

function TrainingPage({ setQuote }) {
  return <>
    <PageHero eyebrow="Capacitaciones" title="Formación corporativa y entrenamientos preventivos" text="SST, respuesta a emergencias, alto riesgo y brigadistas." />
    <TrainingPreview setQuote={setQuote} />
  </>
}

function EngineeringPage({ setSelected, setQuote }) {
  const list = services.filter((s) => ['Sistemas Contra Incendio', 'Arquitectura, Ingeniería, ITSE y Mapas de Riesgo', 'Asesoría Integral OEFA, SUNAFIL y OSINERGMIN'].includes(s.name))
  return <>
    <PageHero eyebrow="Ingeniería" title="Planos, ITSE, fiscalización y sistemas contra incendio" text="Servicios técnicos para prevención, cumplimiento y seguridad operativa." />
    <section className="section light"><div className="container"><ServiceGrid items={list} setSelected={setSelected} /></div></section>
    <FinalCTA go={() => {}} setQuote={setQuote} />
  </>
}

function AboutPage() {
  return <>
    <PageHero eyebrow="Nosotros" title="Consultoría, asesoría legal, ingeniería y servicios especializados" text="Presentación institucional basada en misión, visión, alianza estratégica y enfoque de calidad." />
    <About />
    <Sectors />
  </>
}

function ContactPage({ setQuote, go }) {
  return <>
    <PageHero eyebrow="Contacto" title="Solicita asesoría para tu empresa" text="Formulario visual que envía el requerimiento por WhatsApp con el servicio de interés." />
    <section className="section light"><div className="container split">
      <div>
        <SectionTitle eyebrow="Atención comercial" title="Cuéntanos qué necesita tu organización" text="Podemos iniciar con diagnóstico, revisión documental, capacitación o cotización técnica." />
        <div className="contact-list">
          <a href={wa()} target="_blank" rel="noreferrer"><MessageCircle /> +51 959 462 430</a>
          <span><Phone /> {SECOND_NUMBER}</span>
          <a href={`mailto:${EMAIL}`}><Mail /> {EMAIL}</a>
        </div>
      </div>
      <QuoteForm />
    </div></section>
    <FinalCTA go={go} setQuote={setQuote} />
  </>
}

function QuoteForm() {
  const [form, setForm] = useState({ company: '', name: '', phone: '', service: '', city: '', message: '' })
  const update = (k, v) => setForm((o) => ({ ...o, [k]: v }))
  const msg = `Hola VJ Consultores Perú, quiero solicitar asesoría. Empresa: ${form.company || '___'}. Contacto: ${form.name || '___'}. Teléfono: ${form.phone || '___'}. Servicio de interés: ${form.service || '___'}. Ciudad: ${form.city || '___'}. Mensaje: ${form.message || '___'}`
  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <input placeholder="Empresa" value={form.company} onChange={(e) => update('company', e.target.value)} />
      <input placeholder="Nombre de contacto" value={form.name} onChange={(e) => update('name', e.target.value)} />
      <input placeholder="Teléfono / WhatsApp" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
      <input placeholder="Servicio de interés" value={form.service} onChange={(e) => update('service', e.target.value)} />
      <input placeholder="Ciudad / sede" value={form.city} onChange={(e) => update('city', e.target.value)} />
      <textarea placeholder="Mensaje o requerimiento" value={form.message} onChange={(e) => update('message', e.target.value)} />
      <a className="btn primary full" href={wa(msg)} target="_blank" rel="noreferrer">Enviar solicitud <Send /></a>
    </form>
  )
}

function ServiceModal({ service, onClose, setQuote }) {
  useEffect(() => {
    if (!service) return
    document.body.style.overflow = 'hidden'
    const f = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', f)
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', f) }
  }, [service, onClose])

  return <AnimatePresence initial={false} mode="wait">
    {service && <motion.div className="modal-bg" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal service-modal" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 28, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: .98 }} transition={{ type: 'spring', stiffness: 180, damping: 22 }}>
        <button className="close" onClick={onClose}><X /></button>
        <motion.div layoutId={`service-visual-${service.id}`} className={`modal-visual ${service.visual}`} style={{ '--accent': service.color }}>
          <service.icon className="main-icon" />
          <span>{service.tag}</span>
        </motion.div>
        <div className="modal-content">
          <small>{service.category}</small>
          <motion.h2 layoutId={`service-title-${service.id}`}>{service.name}</motion.h2>
          <p>{service.description}</p>
          <div className="modal-grid">
            <div>
              <h4>Incluye</h4>
              {service.includes.map((x) => <p key={x}><CheckCircle2 /> {x}</p>)}
            </div>
            <div>
              <h4>Entregables / soporte</h4>
              {service.deliverables.map((x) => <p key={x}><CheckCircle2 /> {x}</p>)}
            </div>
          </div>
          <div className="note"><AlertTriangle /> La propuesta final se confirma según diagnóstico, alcance, sede, documentación disponible y requerimiento técnico.</div>
          <div className="modal-actions">
            <a className="btn primary" href={wa(`Hola VJ Consultores Perú, quiero cotizar el servicio: ${service.name}.`)} target="_blank" rel="noreferrer">Cotizar este servicio</a>
            <button className="btn ghost" onClick={() => { onClose(); setQuote(true) }}>Solicitar diagnóstico</button>
          </div>
        </div>
      </motion.div>
    </motion.div>}
  </AnimatePresence>
}

function QuoteModal({ open, onClose }) {
  return <AnimatePresence>
    {open && <motion.div className="modal-bg" onMouseDown={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="modal quote-modal" onMouseDown={(e) => e.stopPropagation()} initial={{ opacity: 0, y: 24, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 14, scale: .97 }}>
        <button className="close" onClick={onClose}><X /></button>
        <SectionTitle eyebrow="Solicitud" title="Solicita diagnóstico o cotización" text="Completa los datos y abre WhatsApp con el mensaje listo para un asesor." />
        <QuoteForm />
      </motion.div>
    </motion.div>}
  </AnimatePresence>
}

function Footer({ go }) {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <button className="brand footer-brand" onClick={() => go('inicio')}><span className="mark">VJ</span><div><strong>VJ Consultores Perú</strong><small>Seguridad e Ingeniería</small></div></button>
          <p>Brindando soluciones integrales e impulsando el crecimiento a todo nivel.</p>
          <small>RUC: 20609012332 · Desarrollado por Synkro</small>
        </div>
        <div><h4>Enlaces</h4>{pages.slice(0, 6).map((p) => <button key={p.id} onClick={() => go(p.id)}>{p.label}</button>)}</div>
        <div><h4>Servicios</h4>{services.slice(0, 6).map((s) => <span key={s.id}>{s.name}</span>)}</div>
        <div><h4>Contacto</h4><span>+51 959 462 430</span><span>{SECOND_NUMBER}</span><span>{EMAIL}</span><a href={wa()} target="_blank" rel="noreferrer">Cotizar por WhatsApp</a></div>
      </div>
    </footer>
  )
}

createRoot(document.getElementById('root')).render(<App />)
