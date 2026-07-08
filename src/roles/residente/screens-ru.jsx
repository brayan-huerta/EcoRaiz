// ─────────────────────────────────────────────────────────────
// EcoRaíz — Residente Urbano screens (EP-02 a EP-06) · navegables
// US-RU-01..07  (US-RU-01 y US-RU-04 viven en app.jsx: empty/error state)
// NOTA: los IDs de HU (US-RU-0X) son referenciales para trazabilidad
// visual — ajústalos si no calzan exacto con tu backlog.
// ─────────────────────────────────────────────────────────────

// ── Datos mock compartidos ─────────────────────────────────
const PLANTS_MOCK = [
  { id: 'p1', name: 'Monstera Deliciosa',   location: 'Sala',        variant: 'monstera',  state: 'ok',     hint: 'Riego en 3 días' },
  { id: 'p2', name: 'Pothos',               location: 'Cocina',      variant: 'pothos',    state: 'ok',     hint: 'Todo en orden' },
  { id: 'p3', name: 'Ficus Lyrata',         location: 'Balcón',      variant: 'ficus',     state: 'warn',   hint: 'Riega hoy' },
  { id: 'p4', name: 'Suculenta Echeveria',  location: 'Escritorio',  variant: 'suculenta', state: 'danger', hint: 'Humedad crítica' },
  { id: 'p5', name: 'Calathea Orbifolia',   location: 'Dormitorio',  variant: 'calathea',  state: 'warn',   hint: 'Baja humedad ambiental' },
];

const circleBtnStyle = {
  width: 32, height: 32, border: 'none', background: '#fff', borderRadius: 16,
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)', display: 'grid', placeItems: 'center',
  fontSize: 14, color: '#1B5E20', cursor: 'pointer',
};

// ── Helpers locales ─────────────────────────────────────────
function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      flexShrink: 0, padding: '7px 14px', borderRadius: 999,
      border: `1.5px solid ${active ? T.greenMid : T.hair}`,
      background: active ? T.greenWash : '#fff',
      color: active ? T.greenDark : T.muted,
      fontFamily: T.fHead, fontWeight: 600, fontSize: 12, cursor: 'pointer',
    }}>{label}</button>
  );
}

function PlantMiniCard({ plant, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 14, padding: 12, cursor: 'pointer',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <PlantArt variant={plant.variant} state={plant.state} w={64} h={64} r={12}/>
      <div>
        <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 13, color: T.text }}>{plant.name}</div>
        <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{plant.location}</div>
      </div>
      <StatusPill state={plant.state}/>
    </div>
  );
}

function QuickLinks({ nav }) {
  const items = [
    { icon: '📅', label: 'Calendario', to: 'calendar' },
    { icon: '📈', label: 'Evolución',  to: 'history' },
    { icon: '💡', label: 'Consejos',   to: 'tips' },
  ];
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
      {items.map(q => (
        <div key={q.to} onClick={() => nav(q.to)} style={{
          flex: 1, background: '#fff', borderRadius: 14, padding: '14px 8px',
          textAlign: 'center', cursor: 'pointer',
        }}>
          <div style={{ fontSize: 22 }}>{q.icon}</div>
          <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 11, color: T.text, marginTop: 4 }}>{q.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Dashboard / Inicio ──────────────────────────────────────
function SCRDashboard() {
  const { nav, tweaks } = useApp();
  const [showHelp, setShowHelp] = React.useState(false);
  const empty = tweaks.emptyState;

  const okCount = PLANTS_MOCK.filter(p => p.state === 'ok').length;
  const warnCount = PLANTS_MOCK.filter(p => p.state === 'warn').length;
  const dangerCount = PLANTS_MOCK.filter(p => p.state === 'danger').length;

  const headline = dangerCount > 0
    ? `${dangerCount} planta${dangerCount > 1 ? 's' : ''} necesita${dangerCount > 1 ? 'n' : ''} atención urgente`
    : warnCount > 0
    ? `${warnCount} planta${warnCount > 1 ? 's' : ''} necesita${warnCount > 1 ? 'n' : ''} un poco de cariño`
    : 'Todas tus plantas están bien';

  return (
    <Phone>
      <AppHeader title="Hola, Ana 👋" subtitle="Así están tus plantas hoy"
        right={
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => nav('alerts')} style={circleBtnStyle}>🔔</button>
            <button onClick={() => setShowHelp(true)} style={circleBtnStyle}>?</button>
          </div>
        }/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        {tweaks.errorState && (
          <div onClick={() => nav('error-state')} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: T.dangerSoft, color: T.danger, borderRadius: 12, padding: '10px 14px',
            fontFamily: T.fHead, fontWeight: 600, fontSize: 12, marginBottom: 14, cursor: 'pointer',
          }}>
            <span>📡 Sensores desconectados — mostrando últimos datos</span>
            <span>›</span>
          </div>
        )}

        {empty ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🌱</div>
            <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 18, color: T.greenDark }}>Aún no tienes plantas</div>
            <p style={{ fontFamily: T.fBody, fontSize: 13, color: T.muted, margin: '8px 0 20px', lineHeight: 1.5 }}>
              Agrega tu primera planta para empezar a recibir recomendaciones de cuidado.
            </p>
            <Btn kind="primary" size="md" onClick={() => nav('add-plant')}>＋ Agregar planta</Btn>
          </div>
        ) : (
          <React.Fragment>
            <div style={{ background: T.greenDark, borderRadius: 18, padding: 18, color: '#fff', marginBottom: 18 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 28, background: 'rgba(255,255,255,0.15)',
                  display: 'grid', placeItems: 'center', fontSize: 26, flexShrink: 0,
                }}>{dangerCount > 0 ? '🚨' : warnCount > 0 ? '⚠️' : '✅'}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{headline}</div>
                  <div style={{ fontFamily: T.fBody, fontSize: 12, opacity: 0.85, marginTop: 4 }}>
                    {okCount} saludables · {warnCount} en atención · {dangerCount} críticas
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Tus plantas</span>
              <span onClick={() => nav('plant-list')} style={{
                fontFamily: T.fHead, fontWeight: 600, fontSize: 12, color: T.greenPrim, cursor: 'pointer',
              }}>Ver todas ›</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {PLANTS_MOCK.slice(0, 4).map(p => (
                <PlantMiniCard key={p.id} plant={p} onClick={() => nav('plant-detail')}/>
              ))}
            </div>

            <div style={{ marginTop: 22 }}>
              <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Accesos rápidos</span>
              <QuickLinks nav={nav}/>
            </div>
          </React.Fragment>
        )}
      </div>
      <TabBar active="inicio" onNav={nav}/>
      {showHelp && <HelpSheet screen="dashboard" onClose={() => setShowHelp(false)}/>}
      <HUTag ids={['US-RU-02']}/>
    </Phone>
  );
}

// ── Mis Plantas (lista + filtros) ───────────────────────────
function SCRPlantList() {
  const { nav, tweaks } = useApp();
  const [filter, setFilter] = React.useState('all');

  if (tweaks.emptyState) return <SCREmptyPlants/>;

  const filters = [
    { id: 'all',    label: 'Todas' },
    { id: 'ok',     label: '✓ Saludables' },
    { id: 'warn',   label: '⚠ Atención' },
    { id: 'danger', label: '🚨 Críticas' },
  ];
  const list = filter === 'all' ? PLANTS_MOCK : PLANTS_MOCK.filter(p => p.state === filter);

  return (
    <Phone>
      <AppHeader title="Mis Plantas" subtitle={`${PLANTS_MOCK.length} plantas`}
        right={<button onClick={() => nav('add-plant')} style={circleBtnStyle}>＋</button>}/>
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, background: '#fff', borderRadius: 10,
          border: `1.5px solid ${T.hair}`, padding: '0 14px', height: 44,
        }}>
          <span style={{ fontSize: 15 }}>🔍</span>
          <span style={{ fontFamily: T.fBody, fontSize: 14, color: T.faint }}>Buscar por nombre o ubicación</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto' }}>
          {filters.map(f => (
            <Chip key={f.id} label={f.label} active={filter === f.id} onClick={() => setFilter(f.id)}/>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        {list.map(p => (
          <div key={p.id} onClick={() => nav('plant-detail')} style={{
            display: 'flex', alignItems: 'center', gap: 14, background: '#fff', borderRadius: 14,
            padding: 12, marginBottom: 10, cursor: 'pointer',
          }}>
            <PlantArt variant={p.variant} state={p.state} w={56} h={56} r={12}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.text }}>{p.name}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted }}>{p.location} · {p.hint}</div>
            </div>
            <StatusPill state={p.state}/>
          </div>
        ))}
        {list.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', fontFamily: T.fBody, fontSize: 13, color: T.muted }}>
            No hay plantas en este filtro.
          </div>
        )}
      </div>
      <TabBar active="plantas" onNav={nav}/>
      <HUTag ids={['US-RU-03']}/>
    </Phone>
  );
}

// ── Detalle de planta ────────────────────────────────────────
function SCRPlantDetail() {
  const { nav, confirm, showToast, tweaks } = useApp();
  const [showHelp, setShowHelp] = React.useState(false);
  const state = tweaks.plantState || 'ok';
  const plant = { name: 'Ficus Lyrata', location: 'Balcón', variant: 'ficus' };

  const copy = {
    ok:     { headline: 'Todo en orden',     body: 'La humedad y la luz están dentro de su rango ideal. Sigue así.' },
    warn:   { headline: 'Riega hoy',         body: 'La humedad del sustrato bajó del 30%. Un riego moderado la pondrá al día.' },
    danger: { headline: '¡Actúa ahora!',     body: 'La humedad está en niveles críticos. Riega de inmediato y revisa la ubicación.' },
  }[state];

  const metrics = [
    { icon: '💧', label: 'Humedad', value: state === 'danger' ? '12%' : state === 'warn' ? '28%' : '54%' },
    { icon: '☀️', label: 'Luz',     value: '620 lux' },
    { icon: '🌡️', label: 'Temp.',   value: '21°C' },
  ];

  return (
    <Phone>
      <AppHeader title={plant.name} subtitle={plant.location} back
        right={
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={() => nav('edit-plant')} style={circleBtnStyle}>✏️</button>
            <button onClick={() => confirm({
              icon: '🗑️', title: '¿Eliminar esta planta?',
              body: 'Se perderá todo su historial de cuidados. Esta acción no se puede deshacer.',
              confirmLabel: 'Eliminar', tone: 'danger',
              onConfirm: () => { showToast('Planta eliminada'); nav('plant-list', { reset: true }); },
            })} style={circleBtnStyle}>🗑️</button>
            <button onClick={() => setShowHelp(true)} style={circleBtnStyle}>?</button>
          </div>
        }/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <PlantArt variant={plant.variant} state={state} w={140} h={140} r={24}/>
          <div style={{ marginTop: 12 }}><StatusPill state={state}/></div>
        </div>

        <div style={{
          background: state === 'danger' ? T.dangerSoft : state === 'warn' ? T.warnSoft : T.greenWash,
          borderRadius: 16, padding: 16, marginBottom: 16,
        }}>
          <div style={{
            fontFamily: T.fHead, fontWeight: 700, fontSize: 16,
            color: state === 'danger' ? T.danger : state === 'warn' ? '#7A5A00' : T.greenDark,
          }}>{copy.headline}</div>
          <div style={{ fontFamily: T.fBody, fontSize: 13, color: T.text, marginTop: 6, lineHeight: 1.5 }}>
            {copy.body}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 18 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: '#fff', borderRadius: 12, padding: '12px 6px', textAlign: 'center' }}>
              <div style={{ fontSize: 18 }}>{m.icon}</div>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.text, marginTop: 2 }}>{m.value}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 10, color: T.muted }}>{m.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <Btn kind="primary" size="md" style={{ flex: 1 }}
               onClick={() => showToast('¡Riego registrado!')}>💧 Marcar regada</Btn>
          <Btn kind="secondary" size="md" style={{ flex: 1 }}
               onClick={() => showToast('Recordatorio pospuesto 1 día', 'info')}>⏰ Posponer</Btn>
        </div>

        <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Seguimiento</span>
        <QuickLinks nav={nav}/>
      </div>
      {showHelp && <HelpSheet screen="plant-detail" onClose={() => setShowHelp(false)}/>}
      <HUTag ids={['US-RU-05']}/>
    </Phone>
  );
}

// ── Agregar / Editar planta ─────────────────────────────────
function SCRAddPlant() {
  const { back, nav, showToast, current } = useApp();
  const isEdit = current === 'edit-plant';
  const [variant, setVariant] = React.useState('monstera');
  const [linkSensor, setLinkSensor] = React.useState(true);

  const species = [
    { id: 'monstera',  label: 'Monstera' },
    { id: 'pothos',    label: 'Pothos' },
    { id: 'ficus',     label: 'Ficus' },
    { id: 'suculenta', label: 'Suculenta' },
    { id: 'calathea',  label: 'Calathea' },
  ];

  return (
    <Phone>
      <AppHeader title={isEdit ? 'Editar planta' : 'Agregar planta'}
                 subtitle={isEdit ? undefined : 'Cuéntanos sobre tu nueva planta'} back/>
      <div style={{ flex: 1, padding: '0 24px 24px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <div style={{
            width: 100, height: 100, borderRadius: 20, background: T.greenWash,
            display: 'grid', placeItems: 'center', border: `2px dashed ${T.greenMid}`, cursor: 'pointer',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 26 }}>📷</div>
              <div style={{ fontFamily: T.fHead, fontSize: 10, color: T.greenPrim, fontWeight: 600, marginTop: 2 }}>Añadir foto</div>
            </div>
          </div>
        </div>

        <Field label="Nombre de la planta" placeholder="Ej. Monstera de la sala"
               value={isEdit ? 'Ficus Lyrata' : ''} required/>

        <div style={{ marginBottom: 16 }}>
          <span style={{ display: 'block', fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text, marginBottom: 8 }}>
            Especie <span style={{ color: T.danger }}>*</span>
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {species.map(s => (
              <Chip key={s.id} label={s.label} active={variant === s.id} onClick={() => setVariant(s.id)}/>
            ))}
          </div>
        </div>

        <Field label="Ubicación" placeholder="Ej. Sala, balcón, cocina..."
               value={isEdit ? 'Balcón' : ''} required/>

        <Field label="Notas (opcional)" placeholder="Alguna preferencia o dato extra"
               hint="Por ejemplo: le gusta la luz indirecta"/>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, background: '#fff',
          borderRadius: 12, padding: 14, marginTop: 4,
        }}>
          <span style={{ fontSize: 20 }}>📡</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text }}>Vincular sensor IoT</div>
            <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>Monitoreo automático de humedad y luz</div>
          </div>
          <div onClick={() => setLinkSensor(v => !v)} style={{
            width: 44, height: 26, borderRadius: 13, background: linkSensor ? T.greenMid : T.hair,
            position: 'relative', cursor: 'pointer',
          }}>
            <div style={{
              position: 'absolute', top: 2, left: linkSensor ? 20 : 2,
              width: 22, height: 22, borderRadius: 11, background: '#fff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.2)', transition: 'left 200ms',
            }}/>
          </div>
        </div>
        {!linkSensor && (
          <p style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted, marginTop: 8, lineHeight: 1.4 }}>
            Sin sensor, podrás registrar los cuidados manualmente.
          </p>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <Btn kind="secondary" size="lg" style={{ flex: 1 }} onClick={back}>Cancelar</Btn>
          <Btn kind="primary" size="lg" style={{ flex: 2 }}
               onClick={() => {
                 if (isEdit) { showToast('Cambios guardados'); back(); }
                 else nav('plant-created', { reset: true });
               }}>
            {isEdit ? 'Guardar cambios' : 'Registrar planta'}
          </Btn>
        </div>
      </div>
      <HUTag ids={isEdit ? ['US-RU-05'] : ['US-RU-06']}/>
    </Phone>
  );
}

// ── Calendario ────────────────────────────────────────────
function SCRCalendar() {
  const today = 8; // 8 de julio 2026
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const tasked = { 8: 'today', 10: 'water', 14: 'fert', 17: 'water', 22: 'water', 25: 'check', 29: 'water' };
  const dowLabels = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
  const leadingBlanks = 3; // julio 2026 inicia en miércoles

  const upcoming = [
    { day: 10, task: 'Regar Monstera Deliciosa', icon: '💧' },
    { day: 14, task: 'Fertilizar Pothos', icon: '🌱' },
    { day: 17, task: 'Regar Ficus Lyrata', icon: '💧' },
    { day: 22, task: 'Regar Calathea Orbifolia', icon: '💧' },
    { day: 25, task: 'Revisar Suculenta Echeveria', icon: '🔍' },
  ];

  return (
    <Phone>
      <AppHeader title="Calendario" subtitle="Julio 2026" back/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 14, marginBottom: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 6 }}>
            {dowLabels.map((d, i) => (
              <div key={i} style={{ textAlign: 'center', fontFamily: T.fHead, fontSize: 10, fontWeight: 700, color: T.muted }}>{d}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {Array.from({ length: leadingBlanks }).map((_, i) => <div key={'b' + i}/>)}
            {days.map(d => {
              const task = tasked[d];
              const isToday = d === today;
              return (
                <div key={d} style={{
                  aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', borderRadius: 10,
                  background: isToday ? T.greenMid : 'transparent',
                  color: isToday ? '#fff' : T.text,
                  fontFamily: T.fBody, fontSize: 12, position: 'relative',
                }}>
                  {d}
                  {task && !isToday && (
                    <div style={{
                      width: 5, height: 5, borderRadius: 3, position: 'absolute', bottom: 3,
                      background: task === 'water' ? T.info : task === 'fert' ? T.ok : T.warn,
                    }}/>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 14, marginBottom: 16, fontFamily: T.fBody, fontSize: 11, color: T.muted }}>
          <span><span style={{ color: T.info }}>●</span> Riego</span>
          <span><span style={{ color: T.ok }}>●</span> Fertilizar</span>
          <span><span style={{ color: T.warn }}>●</span> Revisión</span>
        </div>

        <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Próximos cuidados</span>
        <div style={{ marginTop: 10 }}>
          {upcoming.map((u, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, background: '#fff',
              borderRadius: 12, padding: 12, marginBottom: 8,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: T.greenWash,
                display: 'grid', placeItems: 'center', fontFamily: T.fHead, fontWeight: 700, fontSize: 13, color: T.greenDark,
              }}>{u.day}</div>
              <div style={{ flex: 1, fontFamily: T.fBody, fontSize: 13, color: T.text }}>{u.task}</div>
              <span style={{ fontSize: 16 }}>{u.icon}</span>
            </div>
          ))}
        </div>
      </div>
      <HUTag ids={['US-RU-07']}/>
    </Phone>
  );
}

// ── Evolución / historial ────────────────────────────────
function SCRHistory() {
  const points = [62, 58, 65, 70, 55, 48, 60, 72];
  const w = 320, h = 120, pad = 10;
  const stepX = (w - pad * 2) / (points.length - 1);
  const maxV = 100;
  const coords = points.map((p, i) => `${pad + i * stepX},${h - pad - (p / maxV) * (h - pad * 2)}`).join(' ');

  const log = [
    { date: '5 jul',  action: 'Riego',              plant: 'Ficus Lyrata',        icon: '💧' },
    { date: '3 jul',  action: 'Fertilización',      plant: 'Pothos',              icon: '🌱' },
    { date: '1 jul',  action: 'Poda ligera',        plant: 'Monstera Deliciosa',  icon: '✂️' },
    { date: '28 jun', action: 'Riego',              plant: 'Calathea Orbifolia',  icon: '💧' },
    { date: '25 jun', action: 'Cambio de maceta',   plant: 'Suculenta Echeveria', icon: '🪴' },
  ];

  return (
    <Phone>
      <AppHeader title="Evolución" subtitle="Salud general · últimas 8 semanas" back/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', borderRadius: 16, padding: 16, marginBottom: 18 }}>
          <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
            <polyline points={coords} fill="none" stroke={T.greenMid} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            {points.map((p, i) => (
              <circle key={i} cx={pad + i * stepX} cy={h - pad - (p / maxV) * (h - pad * 2)} r="3.5" fill={T.greenDark}/>
            ))}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: T.fBody, fontSize: 10, color: T.faint, marginTop: 6 }}>
            <span>Hace 8 sem.</span><span>Hoy</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: 14, textAlign: 'center' }}>
            <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 20, color: T.greenPrim }}>72%</div>
            <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>Salud promedio</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 12, padding: 14, textAlign: 'center' }}>
            <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 20, color: T.greenPrim }}>+12%</div>
            <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>vs. mes anterior</div>
          </div>
        </div>

        <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Historial de cuidados</span>
        <div style={{ marginTop: 10 }}>
          {log.map((l, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderBottom: i < log.length - 1 ? `1px solid ${T.hair}` : 'none',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: T.greenWash, display: 'grid', placeItems: 'center', fontSize: 15 }}>{l.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text }}>{l.action} · {l.plant}</div>
                <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{l.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <HUTag ids={['US-RU-07']}/>
    </Phone>
  );
}

// ── Alertas ──────────────────────────────────────────────
function SCRAlerts() {
  const { nav } = useApp();
  const alerts = [
    { plant: 'Suculenta Echeveria', msg: 'Humedad crítica del sustrato (12%). Riega de inmediato.', level: 'danger', time: 'Hace 20 min' },
    { plant: 'Ficus Lyrata',        msg: 'La humedad bajó de 30%. Se recomienda regar hoy.',        level: 'warn',   time: 'Hace 2 h' },
    { plant: 'Calathea Orbifolia',  msg: 'Humedad ambiental por debajo del rango ideal.',            level: 'warn',   time: 'Hace 5 h' },
    { plant: 'Sensor · Sala',       msg: 'Sensor sin reportar datos hace más de 12 h.',               level: 'info',   time: 'Ayer' },
  ];
  const styles = {
    danger: { bg: T.dangerSoft, fg: T.danger, icon: '🚨' },
    warn:   { bg: T.warnSoft,   fg: '#B8860B', icon: '⚠️' },
    info:   { bg: '#E3F2FD',    fg: T.info,    icon: 'ℹ️' },
  };
  return (
    <Phone>
      <AppHeader title="Alertas" subtitle={`${alerts.filter(a => a.level !== 'info').length} activas`}/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        {alerts.map((a, i) => {
          const s = styles[a.level];
          return (
            <div key={i} style={{
              background: '#fff', borderRadius: 14, padding: 14, marginBottom: 10,
              borderLeft: `4px solid ${s.fg}`,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 17, background: s.bg,
                  display: 'grid', placeItems: 'center', fontSize: 16, flexShrink: 0,
                }}>{s.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 13, color: T.text }}>{a.plant}</div>
                  <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted, marginTop: 2, lineHeight: 1.4 }}>{a.msg}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                    <span style={{ fontFamily: T.fBody, fontSize: 10, color: T.faint }}>{a.time}</span>
                    {a.level !== 'info' && (
                      <span onClick={() => nav('plant-detail')} style={{
                        fontFamily: T.fHead, fontWeight: 600, fontSize: 11, color: T.greenPrim, cursor: 'pointer',
                      }}>Ver planta ›</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <TabBar active="alertas" onNav={nav}/>
      <HUTag ids={['US-RU-04']}/>
    </Phone>
  );
}

// ── Consejos ─────────────────────────────────────────────
function SCRTips() {
  const [cat, setCat] = React.useState('todos');
  const cats = [
    { id: 'todos',  label: 'Todos' },
    { id: 'riego',  label: '💧 Riego' },
    { id: 'luz',    label: '☀️ Luz' },
    { id: 'plagas', label: '🐛 Plagas' },
  ];
  const tips = [
    { cat: 'riego',  icon: '💧', t: 'Riega por la mañana',              b: 'El agua se absorbe mejor antes de que suba la temperatura del día.' },
    { cat: 'luz',    icon: '☀️', t: 'Rota tus plantas cada semana',      b: 'Así reciben luz pareja en todas sus hojas y crecen simétricas.' },
    { cat: 'plagas', icon: '🐛', t: 'Revisa el envés de las hojas',      b: 'Ahí suelen esconderse ácaros y cochinillas antes de notarse a simple vista.' },
    { cat: 'riego',  icon: '💧', t: 'Menos es más en invierno',          b: 'Reduce la frecuencia de riego cuando bajan las temperaturas.' },
    { cat: 'luz',    icon: '☀️', t: 'Evita el sol directo del mediodía', b: 'Puede quemar las hojas de especies como Calathea o Pothos.' },
  ];
  const list = cat === 'todos' ? tips : tips.filter(t => t.cat === cat);

  return (
    <Phone>
      <AppHeader title="Consejos" subtitle="Aprende a cuidar mejor tus plantas" back/>
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {cats.map(c => (
          <Chip key={c.id} label={c.label} active={cat === c.id} onClick={() => setCat(c.id)}/>
        ))}
      </div>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        {list.map((t, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, padding: 16, marginBottom: 10,
            display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: T.greenWash, display: 'grid', placeItems: 'center', fontSize: 17, flexShrink: 0 }}>{t.icon}</div>
            <div>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.text }}>{t.t}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted, marginTop: 4, lineHeight: 1.45 }}>{t.b}</div>
            </div>
          </div>
        ))}
      </div>
      <HUTag ids={['US-RU-07']}/>
    </Phone>
  );
}

Object.assign(window, {
  SCRDashboard, SCRPlantList, SCRPlantDetail, SCRAddPlant,
  SCRCalendar, SCRHistory, SCRAlerts, SCRTips,
});
