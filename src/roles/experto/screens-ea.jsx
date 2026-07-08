// ─────────────────────────────────────────────────────────────
// EcoRaíz — Segmento 2 · Expertos ambientales, investigadores y educadores
// Pantallas móviles alineadas a US-EA-01..14
// Enfoque: registros ambientales, microclimas, análisis, observaciones y reportes.
// Nota de alcance: no usa sensores físicos ni IoT; los datos se muestran como registros
// ambientales actualizados por el usuario/equipo.
// ─────────────────────────────────────────────────────────────

const EA_CROPS = [
  { name: 'Helecho experimental', species: 'Nephrolepis exaltata', micro: 'Microclima A', state: 'warn', updated: 'Hoy 08:20', owner: 'Carlos' },
  { name: 'Cactus control', species: 'Cactaceae sp.', micro: 'Microclima B', state: 'ok', updated: 'Ayer 17:10', owner: 'Mary' },
  { name: 'Albahaca hidropónica', species: 'Ocimum basilicum', micro: 'Microclima C', state: 'danger', updated: 'Hace 3 días', owner: 'Neo' },
];

const EA_METRICS = [
  { label: 'Humedad', value: '62%', status: 'Adecuado', tone: T.ok, icon: '💧' },
  { label: 'Temperatura', value: '27°C', status: 'Alta', tone: T.warn, icon: '🌡️' },
  { label: 'Luz', value: 'Baja', status: 'Revisar', tone: T.danger, icon: '☀️' },
];

function EABottomNav({ active = 'expert-dashboard' }) {
  const { nav } = useApp();
  const tabs = [
    { id: 'expert-dashboard', label: 'Panel', icon: '📊' },
    { id: 'expert-variables', label: 'Variables', icon: '🌡️' },
    { id: 'expert-charts', label: 'Análisis', icon: '📈' },
    { id: 'expert-alerts', label: 'Alertas', icon: '⚠️' },
    { id: 'profile', label: 'Perfil', icon: '👤' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: 88,
      background: '#fff', borderTop: `1px solid ${T.hair}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
      padding: '8px 8px 24px', zIndex: 10,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => t.id !== active && nav(t.id)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          minWidth: 58, border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
          color: t.id === active ? T.greenPrim : T.muted,
          fontFamily: T.fHead, fontSize: 10, fontWeight: t.id === active ? 700 : 500,
        }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function EAStat({ label, value, icon, tone = T.greenPrim, onClick }) {
  return (
    <button onClick={onClick} style={{
      border: 'none', background: '#fff', borderRadius: 14, padding: '12px 10px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(33,33,33,0.04)',
      display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left', cursor: onClick ? 'pointer' : 'default',
    }}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <strong style={{ fontFamily: T.fHead, fontSize: 21, color: tone, lineHeight: 1 }}>{value}</strong>
      <span style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted, lineHeight: 1.2 }}>{label}</span>
    </button>
  );
}

function EASection({ title, action, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <h2 style={{ margin: 0, fontFamily: T.fHead, fontSize: 15, fontWeight: 700, color: T.greenDark }}>{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );
}

function EAChip({ active, children, onClick, tone = T.greenPrim }) {
  return (
    <button onClick={onClick} style={{
      border: `1.5px solid ${active ? tone : T.hair}`,
      background: active ? T.greenWash : '#fff', color: active ? T.greenDark : T.muted,
      borderRadius: 999, padding: '7px 11px', fontFamily: T.fHead,
      fontWeight: 600, fontSize: 11, cursor: 'pointer',
    }}>{children}</button>
  );
}

function EAMetricCard({ metric }) {
  return (
    <Card style={{ padding: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 19 }}>{metric.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.fHead, fontSize: 12, fontWeight: 700, color: T.text }}>{metric.label}</div>
          <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>Último registro</div>
        </div>
      </div>
      <div style={{ fontFamily: T.fHead, fontSize: 22, fontWeight: 700, color: metric.tone }}>{metric.value}</div>
      <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.text, marginTop: 2 }}>{metric.status}</div>
    </Card>
  );
}

function EABarChart({ values = [42, 58, 50, 72, 66, 80], color = T.greenMid }) {
  return (
    <div style={{ height: 110, display: 'flex', alignItems: 'flex-end', gap: 8, paddingTop: 8 }}>
      {values.map((v, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <div style={{ width: '100%', height: v, background: i === values.length - 1 ? color : T.greenLight, borderRadius: '8px 8px 3px 3px' }}/>
          <span style={{ fontFamily: T.fHead, fontSize: 9, color: T.faint }}>D{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function EARecordRow({ title, subtitle, right, tone = T.greenPrim }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: `1px solid ${T.hair}` }}>
      <div style={{ width: 10, height: 10, borderRadius: 5, background: tone, flexShrink: 0 }}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 13, color: T.text }}>{title}</div>
        <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted, marginTop: 2 }}>{subtitle}</div>
      </div>
      {right && <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 12, color: tone }}>{right}</div>}
    </div>
  );
}

function EAEmpty({ icon = '🗂️', title, body }) {
  return (
    <Card style={{ textAlign: 'center', padding: 22 }}>
      <div style={{ fontSize: 34, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>{title}</div>
      <p style={{ margin: '6px 0 0', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.45 }}>{body}</p>
    </Card>
  );
}

// ── 1. Dashboard técnico experto ───────────────────────────
function SCRExpertDashboard() {
  const { nav } = useApp();
  return (
    <Phone>
      <AppHeader title="Panel experto" subtitle="Microclimas y cultivos en seguimiento" right={<Btn size="sm" onClick={() => nav('expert-add-crop')}>+ Cultivo</Btn>}/>
      <div style={{ flex: 1, padding: '0 20px 102px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <EAStat icon="🌱" value="18" label="Cultivos monitoreados" onClick={() => nav('expert-variables')}/>
          <EAStat icon="🏷️" value="4" label="Microclimas activos" tone={T.greenDark} onClick={() => nav('expert-compare')}/>
          <EAStat icon="⚠️" value="3" label="Alertas técnicas" tone={T.warn} onClick={() => nav('expert-alerts')}/>
          <EAStat icon="📝" value="7" label="Registros pendientes" tone={T.danger} onClick={() => nav('expert-observation')}/>
        </div>

        <EASection title="Prioridad de hoy" action={<span onClick={() => nav('expert-alerts')} style={{ color: T.greenPrim, fontFamily: T.fHead, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Ver alertas →</span>}>
          <Card accent={T.warn}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ fontSize: 28 }}>🌡️</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Temperatura fuera de rango</div>
                <p style={{ margin: '4px 0 10px', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.45 }}>Microclima C registra temperatura alta. Revisa ventilación y actualiza el registro tras el ajuste.</p>
                <Btn size="sm" onClick={() => nav('expert-variables')}>Revisar detalle</Btn>
              </div>
            </div>
          </Card>
        </EASection>

        <EASection title="Cultivos recientes">
          {EA_CROPS.map(c => (
            <div key={c.name} onClick={() => nav('expert-variables')} style={{ cursor: 'pointer', marginBottom: 10 }}>
              <Card style={{ padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <PlantArt variant={c.state === 'danger' ? 'calathea' : 'ficus'} state={c.state} w={52} h={52} r={12}/>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.text }}>{c.name}</div>
                    <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted }}>{c.micro} · {c.updated}</div>
                  </div>
                  <StatusPill state={c.state}/>
                </div>
              </Card>
            </div>
          ))}
        </EASection>
      </div>
      <EABottomNav active="expert-dashboard"/>
      <HUTag ids={['US-EA-02', 'US-EA-07']}/>
    </Phone>
  );
}

// ── 2. Registrar cultivo de investigación ──────────────────
function SCRExpertAddCrop() {
  const { back, showToast } = useApp();
  const [micro, setMicro] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const save = () => {
    if (!micro) { setShowError(true); return; }
    showToast('Cultivo técnico registrado correctamente', 'success');
    setTimeout(back, 900);
  };
  return (
    <Phone>
      <AppHeader title="Agregar cultivo" subtitle="Registro para investigación" back/>
      <div style={{ flex: 1, padding: '0 20px 104px', overflowY: 'auto' }}>
        <Field label="Nombre del cultivo" value="Albahaca hidropónica" placeholder="Nombre del cultivo" required/>
        <Field label="Especie" value="Ocimum basilicum" placeholder="Especie" required/>
        <Field label="Ubicación" value="Laboratorio 2 · Mesa norte" placeholder="Ubicación" required/>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text, marginBottom: 8 }}>Microclima asociado <span style={{ color: T.danger }}>*</span></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Microclima A', 'Microclima B', 'Microclima C', 'Nuevo'].map(m => (
              <EAChip key={m} active={micro === m} onClick={() => { setMicro(m); setShowError(false); }}>{m}</EAChip>
            ))}
          </div>
          {showError && <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.danger, marginTop: 6 }}>⚠ Complete los datos técnicos requeridos</div>}
        </div>
        <Field label="Responsable" value="Carlos Ramírez" placeholder="Responsable del registro"/>
        <Card style={{ background: T.greenWash, marginBottom: 16 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 13, color: T.greenDark }}>Dato importante</div>
          <p style={{ margin: '4px 0 0', fontFamily: T.fBody, fontSize: 13, color: T.text, lineHeight: 1.45 }}>El cultivo se usará para registros ambientales manuales, observaciones técnicas y análisis histórico.</p>
        </Card>
        <Btn full size="lg" onClick={save}>Guardar cultivo</Btn>
      </div>
      <HUTag ids={['US-EA-01']}/>
    </Phone>
  );
}

// ── 3. Variables ambientales detalladas ────────────────────
function SCRExpertVariables() {
  const { nav } = useApp();
  return (
    <Phone>
      <AppHeader title="Variables" subtitle="Helecho experimental · Microclima A" back right={<button onClick={() => nav('expert-observation')} style={{ border: 'none', background: '#fff', borderRadius: 18, width: 36, height: 36, cursor: 'pointer' }}>📝</button>}/>
      <div style={{ flex: 1, padding: '0 20px 102px', overflowY: 'auto' }}>
        <Card accent={T.warn} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
            <div>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 16, color: T.text }}>Estado general</div>
              <p style={{ margin: '4px 0 0', fontFamily: T.fBody, fontSize: 12, color: T.muted }}>Última actualización: hoy 08:20</p>
            </div>
            <StatusPill state="warn"/>
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
          {EA_METRICS.map(m => <EAMetricCard key={m.label} metric={m}/>) }
        </div>

        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.greenDark, marginBottom: 8 }}>Datos desactualizados</div>
          <EARecordRow title="pH del sustrato" subtitle="Último registro hace 8 días" right="Actualizar" tone={T.warn}/>
          <EARecordRow title="Observación cualitativa" subtitle="Pendiente desde la última revisión" right="Registrar" tone={T.danger}/>
        </Card>

        <Btn full onClick={() => nav('expert-date-filter')}>Ver registros por fecha</Btn>
      </div>
      <EABottomNav active="expert-variables"/>
      <HUTag ids={['US-EA-02']}/>
    </Phone>
  );
}

// ── 4. Gráficos históricos ─────────────────────────────────
function SCRExpertCharts() {
  const { nav } = useApp();
  const [view, setView] = React.useState('humedad');
  const data = {
    humedad: { title: 'Humedad registrada', color: T.info, values: [40, 52, 60, 68, 58, 62] },
    temp: { title: 'Temperatura registrada', color: T.warn, values: [48, 56, 61, 72, 68, 76] },
    luz: { title: 'Luz registrada', color: T.greenMid, values: [70, 66, 52, 44, 40, 46] },
  }[view];
  return (
    <Phone>
      <AppHeader title="Análisis histórico" subtitle="Registros cronológicos" back right={<Btn size="sm" kind="secondary" onClick={() => nav('expert-export-report')}>Exportar</Btn>}/>
      <div style={{ flex: 1, padding: '0 20px 102px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <EAChip active={view === 'humedad'} onClick={() => setView('humedad')}>Humedad</EAChip>
          <EAChip active={view === 'temp'} onClick={() => setView('temp')}>Temperatura</EAChip>
          <EAChip active={view === 'luz'} onClick={() => setView('luz')}>Luz</EAChip>
        </div>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>{data.title}</div>
          <p style={{ margin: '4px 0 0', fontFamily: T.fBody, fontSize: 12, color: T.muted }}>Últimos 6 días de registros actualizados por el equipo.</p>
          <EABarChart values={data.values} color={data.color}/>
        </Card>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.greenDark, marginBottom: 8 }}>Lectura rápida</div>
          <EARecordRow title="Tendencia" subtitle="Ligero incremento durante los últimos registros" right="+12%" tone={data.color}/>
          <EARecordRow title="Rango recomendado" subtitle="La variable debe mantenerse en rango estable" right="Revisar" tone={T.warn}/>
        </Card>
        <EAEmpty icon="📊" title="Estado alternativo" body="Si el cultivo no tiene registros suficientes, se debe mostrar: “No existen datos suficientes para generar gráficos históricos”."/>
      </div>
      <EABottomNav active="expert-charts"/>
      <HUTag ids={['US-EA-03']}/>
    </Phone>
  );
}

// ── 5. Comparar microclimas ────────────────────────────────
function SCRExpertCompareMicroclimates() {
  const { showToast } = useApp();
  const [selected, setSelected] = React.useState(['A', 'C']);
  const toggle = id => {
    const next = selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id];
    setSelected(next);
    if (next.length < 2) showToast('Seleccione al menos dos microclimas para comparar', 'error');
  };
  return (
    <Phone>
      <AppHeader title="Comparar microclimas" subtitle="Indicadores en paralelo" back/>
      <div style={{ flex: 1, padding: '0 20px 104px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {['A', 'B', 'C'].map(id => <EAChip key={id} active={selected.includes(id)} onClick={() => toggle(id)}>Microclima {id}</EAChip>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          {selected.slice(0, 2).map(id => (
            <Card key={id} style={{ padding: 13 }}>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.greenDark, marginBottom: 8 }}>Microclima {id}</div>
              <EARecordRow title="Temperatura" subtitle="Registro promedio" right={id === 'A' ? '24°C' : '28°C'} tone={id === 'A' ? T.ok : T.warn}/>
              <EARecordRow title="Humedad" subtitle="Registro promedio" right={id === 'A' ? '64%' : '48%'} tone={id === 'A' ? T.ok : T.warn}/>
              <EARecordRow title="Luz" subtitle="Nivel reportado" right={id === 'A' ? 'Media' : 'Baja'} tone={id === 'A' ? T.greenPrim : T.danger}/>
            </Card>
          ))}
        </div>
        {selected.length < 2 ? (
          <EAEmpty icon="⚠️" title="Comparación incompleta" body="Seleccione al menos dos microclimas para comparar."/>
        ) : (
          <Card accent={T.greenMid}>
            <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.text }}>Diferencia relevante</div>
            <p style={{ margin: '5px 0 0', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.45 }}>El Microclima C presenta menor luz y humedad. Se recomienda revisar ubicación y frecuencia de registro.</p>
          </Card>
        )}
      </div>
      <HUTag ids={['US-EA-04']}/>
    </Phone>
  );
}

// ── 6. Filtrar por rango de fechas ─────────────────────────
function SCRExpertDateFilter() {
  const [empty, setEmpty] = React.useState(false);
  return (
    <Phone>
      <AppHeader title="Filtro de registros" subtitle="Rango de fechas" back/>
      <div style={{ flex: 1, padding: '0 20px 104px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <Field label="Fecha inicial" value="01/05/2026" placeholder="dd/mm/aaaa"/>
          <Field label="Fecha final" value="13/05/2026" placeholder="dd/mm/aaaa"/>
        </div>
        <Btn full onClick={() => setEmpty(!empty)}>{empty ? 'Aplicar filtro con datos' : 'Aplicar filtro sin resultados'}</Btn>
        <div style={{ height: 14 }}/>
        {empty ? (
          <EAEmpty icon="🔎" title="No se encontraron registros" body="No se encontraron registros para el periodo seleccionado. Modifica el rango de fechas."/>
        ) : (
          <>
            <Card style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.greenDark }}>Registros filtrados</div>
              <EABarChart values={[35, 52, 66, 48, 70, 62]} color={T.greenMid}/>
            </Card>
            <Card>
              <EARecordRow title="Helecho experimental" subtitle="10 registros en el periodo" right="Ver"/>
              <EARecordRow title="Cactus control" subtitle="8 registros en el periodo" right="Ver"/>
              <EARecordRow title="Albahaca hidropónica" subtitle="5 registros en el periodo" right="Ver" tone={T.warn}/>
            </Card>
          </>
        )}
      </div>
      <HUTag ids={['US-EA-05']}/>
    </Phone>
  );
}

// ── 7. Observaciones técnicas ──────────────────────────────
function SCRExpertObservation() {
  const { showToast } = useApp();
  const [text, setText] = React.useState('Se observa pérdida leve de turgencia en hojas nuevas. Revisar exposición de luz durante 48 horas.');
  const [err, setErr] = React.useState(false);
  const save = () => {
    if (!text.trim()) { setErr(true); return; }
    setErr(false);
    showToast('Observación guardada en el historial', 'success');
  };
  return (
    <Phone>
      <AppHeader title="Observación técnica" subtitle="Complementa el registro ambiental" back/>
      <div style={{ flex: 1, padding: '0 20px 104px', overflowY: 'auto' }}>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Helecho experimental</div>
          <p style={{ margin: '4px 0 0', fontFamily: T.fBody, fontSize: 13, color: T.muted }}>Microclima A · Autor: Carlos Ramírez</p>
        </Card>
        <label style={{ display: 'block', marginBottom: 12 }}>
          <span style={{ display: 'block', fontFamily: T.fHead, fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 6 }}>Observación</span>
          <textarea value={text} onChange={e => { setText(e.target.value); setErr(false); }} style={{
            width: '100%', minHeight: 170, borderRadius: 14, border: `1.5px solid ${err ? T.danger : T.hair}`,
            padding: 14, background: '#fff', resize: 'none', fontFamily: T.fBody, fontSize: 14, color: T.text, lineHeight: 1.45,
          }}/>
          {err && <span style={{ display: 'block', marginTop: 6, color: T.danger, fontFamily: T.fBody, fontSize: 12 }}>Ingrese una observación antes de guardar</span>}
        </label>
        <Btn full size="lg" onClick={save}>Guardar observación</Btn>
        <Card style={{ marginTop: 14, background: T.greenWash }}>
          <div style={{ fontFamily: T.fBody, fontSize: 13, color: T.greenDark, lineHeight: 1.45 }}>La observación se almacenará con fecha y autor dentro del historial del cultivo.</div>
        </Card>
      </div>
      <HUTag ids={['US-EA-06']}/>
    </Phone>
  );
}

// ── 8. Alertas técnicas ────────────────────────────────────
function SCRExpertTechnicalAlerts() {
  const { nav } = useApp();
  const alerts = [
    { level: 'Crítica', crop: 'Albahaca hidropónica', micro: 'Microclima C', var: 'Temperatura', action: 'Revisar ventilación del entorno', tone: T.danger },
    { level: 'Advertencia', crop: 'Helecho experimental', micro: 'Microclima A', var: 'Luz', action: 'Mover a zona con luz indirecta', tone: T.warn },
    { level: 'Resuelta', crop: 'Cactus control', micro: 'Microclima B', var: 'Humedad', action: 'Registro corregido por el equipo', tone: T.ok },
  ];
  return (
    <Phone>
      <AppHeader title="Alertas técnicas" subtitle="Variables críticas y acciones" back/>
      <div style={{ flex: 1, padding: '0 20px 102px', overflowY: 'auto' }}>
        {alerts.map(a => (
          <Card key={a.crop + a.var} accent={a.tone} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 13, color: a.tone }}>{a.level}</span>
              <span style={{ fontFamily: T.fBody, fontSize: 11, color: T.faint }}>{a.micro}</span>
            </div>
            <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>{a.crop}</div>
            <p style={{ margin: '4px 0 10px', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.45 }}><strong>Variable:</strong> {a.var}<br/><strong>Acción:</strong> {a.action}</p>
            <Btn size="sm" kind="secondary" onClick={() => nav('expert-variables')}>Ver historial reciente</Btn>
          </Card>
        ))}
      </div>
      <EABottomNav active="expert-alerts"/>
      <HUTag ids={['US-EA-07']}/>
    </Phone>
  );
}

// ── 9. Patrones ambientales ────────────────────────────────
function SCRExpertPatterns() {
  const [empty, setEmpty] = React.useState(false);
  return (
    <Phone>
      <AppHeader title="Patrones" subtitle="Tendencias recurrentes" back/>
      <div style={{ flex: 1, padding: '0 20px 104px', overflowY: 'auto' }}>
        <Btn kind="secondary" full onClick={() => setEmpty(!empty)}>{empty ? 'Mostrar patrones' : 'Ver estado sin datos'}</Btn>
        <div style={{ height: 14 }}/>
        {empty ? (
          <EAEmpty icon="🧩" title="Se requieren más registros" body="Se requieren más registros para identificar patrones. Continúa monitoreando los cultivos."/>
        ) : (
          <>
            <Card style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Patrón recurrente: baja luz</div>
              <p style={{ margin: '5px 0 8px', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.45 }}>El Microclima C presenta registros de luz baja entre 3:00 p.m. y 5:00 p.m. durante 4 días.</p>
              <EABarChart values={[70, 58, 40, 35, 42, 38]} color={T.warn}/>
            </Card>
            <Card accent={T.greenMid}>
              <EARecordRow title="Cultivos afectados" subtitle="Albahaca hidropónica, Helecho experimental" right="2"/>
              <EARecordRow title="Recomendación" subtitle="Ajustar ubicación y registrar nueva revisión" right="Hoy" tone={T.warn}/>
            </Card>
          </>
        )}
      </div>
      <HUTag ids={['US-EA-08']}/>
    </Phone>
  );
}

// ── 10. Exportar datos y generar reporte ───────────────────
function SCRExpertExportReport() {
  const { showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Reportes" subtitle="Exportación y resumen visual" back/>
      <div style={{ flex: 1, padding: '0 20px 104px', overflowY: 'auto' }}>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontSize: 16, fontWeight: 700, color: T.greenDark }}>Reporte de monitoreo</div>
          <p style={{ margin: '6px 0 12px', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.45 }}>Incluye gráficos, registros filtrados, resumen de alertas y observaciones técnicas.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Btn kind="secondary" onClick={() => showToast('Exportación CSV realizada correctamente', 'success')}>Exportar CSV</Btn>
            <Btn kind="secondary" onClick={() => showToast('Exportación PDF realizada correctamente', 'success')}>Exportar PDF</Btn>
          </div>
        </Card>
        <Card accent={T.info} style={{ marginBottom: 14 }}>
          <EARecordRow title="Alertas incluidas" subtitle="3 alertas técnicas del periodo" right="3" tone={T.warn}/>
          <EARecordRow title="Observaciones" subtitle="7 notas técnicas registradas" right="7"/>
          <EARecordRow title="Rango usado" subtitle="01/05/2026 al 13/05/2026" right="Activo" tone={T.info}/>
        </Card>
        <Btn full size="lg" onClick={() => showToast('Reporte visual generado correctamente', 'success')}>Generar reporte visual</Btn>
      </div>
      <HUTag ids={['US-EA-09', 'US-EA-10']}/>
    </Phone>
  );
}

// ── 11. Compartir resumen ──────────────────────────────────
function SCRExpertShareSummary() {
  const { showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Compartir resumen" subtitle="Vista para equipo o estudiantes" back/>
      <div style={{ flex: 1, padding: '0 20px 104px', overflowY: 'auto' }}>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Resumen del estado de cultivos</div>
          <p style={{ margin: '6px 0 12px', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.45 }}>18 cultivos revisados · 3 alertas activas · 7 observaciones técnicas en seguimiento.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <EAStat icon="✓" value="12" label="Estables" tone={T.ok}/>
            <EAStat icon="⚠" value="4" label="Atención" tone={T.warn}/>
            <EAStat icon="🚨" value="2" label="Críticos" tone={T.danger}/>
          </div>
        </Card>
        <Card accent={T.warn} style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.text }}>Hallazgo relevante</div>
          <p style={{ margin: '5px 0 0', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.45 }}>El Microclima C requiere revisión por baja exposición de luz y temperatura alta.</p>
        </Card>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <Btn kind="secondary" onClick={() => showToast('Resumen copiado', 'success')}>Copiar resumen</Btn>
          <Btn onClick={() => showToast('Resumen descargado', 'success')}>Descargar</Btn>
        </div>
      </div>
      <HUTag ids={['US-EA-12']}/>
    </Phone>
  );
}

// ── 12. Buscar registros técnicos ──────────────────────────
function SCRExpertSearchRecords() {
  const [query, setQuery] = React.useState('humedad');
  const empty = query.toLowerCase().includes('xyz');
  return (
    <Phone>
      <AppHeader title="Buscar registros" subtitle="Cultivos y microclimas" back/>
      <div style={{ flex: 1, padding: '0 20px 104px', overflowY: 'auto' }}>
        <div style={{ background: '#fff', border: `1.5px solid ${T.hair}`, borderRadius: 12, padding: '0 12px', height: 48, display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <span>🔎</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar por variable, cultivo o microclima" style={{ border: 'none', outline: 'none', flex: 1, fontFamily: T.fBody, fontSize: 14, color: T.text, background: 'transparent' }}/>
        </div>
        {empty ? (
          <EAEmpty icon="🔎" title="No se encontraron registros técnicos" body="Modifica la palabra clave para buscar otro cultivo, variable o microclima."/>
        ) : (
          <Card>
            <EARecordRow title="Humedad · Microclima A" subtitle="Helecho experimental · hoy 08:20" right="62%"/>
            <EARecordRow title="Humedad · Microclima C" subtitle="Albahaca hidropónica · ayer 16:40" right="48%" tone={T.warn}/>
            <EARecordRow title="Observación técnica" subtitle="Pérdida leve de turgencia asociada a humedad" right="Abrir" tone={T.info}/>
          </Card>
        )}
        <Btn kind="tertiary" full style={{ marginTop: 12 }} onClick={() => setQuery('xyz')}>Probar búsqueda sin resultados</Btn>
      </div>
      <HUTag ids={['US-EA-13']}/>
    </Phone>
  );
}

// ── 13. Configurar vista de análisis técnico ───────────────
function SCRExpertAnalysisSettings() {
  const { showToast } = useApp();
  const [view, setView] = React.useState('gráfico');
  const opts = ['tabla', 'gráfico', 'comparación'];
  return (
    <Phone>
      <AppHeader title="Vista de análisis" subtitle="Configuración técnica" back/>
      <div style={{ flex: 1, padding: '0 20px 104px', overflowY: 'auto' }}>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text, marginBottom: 10 }}>Presentación de datos</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {opts.map(o => <EAChip key={o} active={view === o} onClick={() => setView(o)}>{o[0].toUpperCase() + o.slice(1)}</EAChip>)}
          </div>
        </Card>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.greenDark }}>Previsualización</div>
          <p style={{ margin: '4px 0 10px', fontFamily: T.fBody, fontSize: 13, color: T.muted }}>Vista actual: {view}</p>
          {view === 'gráfico' && <EABarChart values={[40, 62, 54, 76, 65, 70]} color={T.greenMid}/>} 
          {view === 'tabla' && <><EARecordRow title="Humedad" subtitle="Microclima A" right="62%"/><EARecordRow title="Temperatura" subtitle="Microclima A" right="27°C" tone={T.warn}/></>}
          {view === 'comparación' && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}><EAStat icon="A" value="62%" label="Microclima A"/><EAStat icon="C" value="48%" label="Microclima C" tone={T.warn}/></div>}
        </Card>
        <Btn kind="secondary" full onClick={() => { setView('gráfico'); showToast('Vista restaurada correctamente', 'success'); }}>Restaurar vista</Btn>
      </div>
      <HUTag ids={['US-EA-14']}/>
    </Phone>
  );
}

Object.assign(window, {
  SCRExpertDashboard,
  SCRExpertAddCrop,
  SCRExpertVariables,
  SCRExpertCharts,
  SCRExpertCompareMicroclimates,
  SCRExpertDateFilter,
  SCRExpertObservation,
  SCRExpertTechnicalAlerts,
  SCRExpertPatterns,
  SCRExpertExportReport,
  SCRExpertShareSummary,
  SCRExpertSearchRecords,
  SCRExpertAnalysisSettings,
});
