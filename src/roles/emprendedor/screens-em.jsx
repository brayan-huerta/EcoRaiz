// ─────────────────────────────────────────────────────────────
// EcoRaíz — Segmento 3: Emprendedores con pequeños negocios de plantas
// Pantallas móviles basadas en US-EM-01 a US-EM-13
// Enfoque: inventario vivo, disponibilidad comercial, riesgos, mantenimiento,
// lotes, pérdidas potenciales y reportes. Sin sensores físicos ni IoT.
// ─────────────────────────────────────────────────────────────

const EM = {
  plants: [
    { name: 'Helecho Boston', sp: 'Nephrolepis exaltata', lot: 'Oficinas Mayo', qty: 18, value: 38, state: 'danger', availability: 'En recuperación', owner: 'Marco', cause: 'Humedad baja registrada', action: 'Mover a zona húmeda y revisar riego' },
    { name: 'Lirio Blanco', sp: 'Lilium candidum', lot: 'Eventos Surco', qty: 24, value: 45, state: 'warn', availability: 'Reservada', owner: 'Sabrina', cause: 'Exposición alta registrada', action: 'Reducir exposición directa' },
    { name: 'Sansevieria', sp: 'Dracaena trifasciata', lot: 'Venta tienda', qty: 32, value: 29, state: 'ok', availability: 'Lista para venta', owner: 'Reynaldo', cause: 'Condición estable', action: 'Mantener rutina' },
    { name: 'Pothos Dorado', sp: 'Epipremnum aureum', lot: 'Oficinas Mayo', qty: 16, value: 24, state: 'ok', availability: 'Lista para venta', owner: 'Marco', cause: 'Condición estable', action: 'Mantener revisión semanal' },
    { name: 'Calathea Orbifolia', sp: 'Calathea orbifolia', lot: 'Recuperación', qty: 8, value: 52, state: 'danger', availability: 'En recuperación', owner: 'Sabrina', cause: 'Hojas blandas registradas', action: 'Registrar acción correctiva hoy' },
  ],
  lots: [
    { name: 'Oficinas Mayo', type: 'Mantenimiento', total: 34, critical: 1, warn: 0, ok: 33, value: 1198 },
    { name: 'Eventos Surco', type: 'Alquiler', total: 24, critical: 0, warn: 1, ok: 23, value: 1080 },
    { name: 'Venta tienda', type: 'Venta', total: 32, critical: 0, warn: 0, ok: 32, value: 928 },
    { name: 'Recuperación', type: 'Mantenimiento', total: 8, critical: 1, warn: 2, ok: 5, value: 416 },
  ],
};

function EMStateColor(state) {
  return state === 'ok' ? T.ok : state === 'warn' ? T.warn : state === 'danger' ? T.danger : T.hair;
}
function EMStateLabel(state) {
  return state === 'ok' ? 'Saludable' : state === 'warn' ? 'Atención' : state === 'danger' ? 'Crítica' : 'Sin datos';
}
function EMAvailabilityColor(label) {
  if (label === 'Lista para venta') return T.ok;
  if (label === 'Reservada') return T.info;
  if (label === 'En recuperación') return '#B8860B';
  return T.muted;
}
function EMTabBar({ active }) {
  const { nav } = useApp();
  const tabs = [
    { id: 'panel', label: 'Panel', icon: '🏪', to: 'em-dashboard' },
    { id: 'inventario', label: 'Inventario', icon: '🌿', to: 'em-inventory' },
    { id: 'agregar', label: 'Agregar', icon: '＋', to: 'em-add-plant', primary: true },
    { id: 'lotes', label: 'Lotes', icon: '📦', to: 'em-lots' },
    { id: 'perfil', label: 'Perfil', icon: '👤', to: 'profile' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: 88,
      background: '#fff', borderTop: `1px solid ${T.hair}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', padding: '8px 8px 24px',
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => nav(t.to)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: active === t.id ? T.greenPrim : T.muted, fontFamily: T.fHead,
          fontSize: 10, fontWeight: active === t.id ? 700 : 500,
          minWidth: 56, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}>
          {t.primary ? <div style={{ width: 44, height: 44, marginTop: -16, borderRadius: 22, background: T.greenMid, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 24, boxShadow: '0 6px 14px rgba(46,125,50,0.32)' }}>＋</div> : <div style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</div>}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
function EMMetric({ title, value, subtitle, tone = T.greenMid, icon = '●' }) {
  return (
    <div style={{ background: '#fff', borderRadius: 14, padding: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: tone }} />
      </div>
      <div style={{ fontFamily: T.fHead, fontWeight: 800, fontSize: 22, color: T.text, marginTop: 8 }}>{value}</div>
      <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 12, color: T.text }}>{title}</div>
      <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted, marginTop: 2 }}>{subtitle}</div>
    </div>
  );
}
function EMPlantRow({ plant, onClick, compact = false }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff', borderRadius: 14, padding: compact ? 10 : 12, marginBottom: 10,
      display: 'flex', alignItems: 'center', gap: 12, cursor: onClick ? 'pointer' : 'default',
      borderLeft: `4px solid ${EMStateColor(plant.state)}`,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      <PlantArt variant={plant.state === 'danger' ? 'ficus' : plant.state === 'warn' ? 'calathea' : 'pothos'} state={plant.state} w={compact ? 46 : 58} h={compact ? 46 : 58} r={10}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 800, fontSize: 14, color: T.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{plant.name}</div>
        </div>
        <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{plant.qty} unidades · S/ {plant.value} c/u</div>
        <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>Lote: {plant.lot}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
        <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 10, padding: '4px 7px', borderRadius: 999, background: `${EMAvailabilityColor(plant.availability)}22`, color: EMAvailabilityColor(plant.availability) }}>{plant.availability}</span>
        <span style={{ fontFamily: T.fHead, fontSize: 11, fontWeight: 700, color: EMStateColor(plant.state) }}>{EMStateLabel(plant.state)}</span>
      </div>
    </div>
  );
}
function EMBar({ label, value, max = 100, color = T.greenMid }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: T.fBody, fontSize: 11, color: T.muted, marginBottom: 4 }}>
        <span>{label}</span><b style={{ color: T.text }}>{value}</b>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: '#F1ECE0', overflow: 'hidden' }}>
        <div style={{ width: `${Math.min(100, (value / max) * 100)}%`, height: '100%', background: color, borderRadius: 999 }} />
      </div>
    </div>
  );
}
function EMField({ label, value, placeholder, invalid }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontFamily: T.fHead, fontSize: 12, fontWeight: 700, color: T.text, marginBottom: 6 }}>{label}</label>
      <div style={{ background: '#fff', border: `1.5px solid ${invalid ? T.danger : T.hair}`, borderRadius: 12, padding: '12px 13px', fontFamily: T.fBody, fontSize: 14, color: value ? T.text : T.faint }}>
        {value || placeholder}
      </div>
      {invalid && <div style={{ marginTop: 4, fontFamily: T.fBody, fontSize: 11, color: T.danger }}>{invalid}</div>}
    </div>
  );
}
function EMChip({ children, active, color = T.greenMid }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 10px', borderRadius: 999, background: active ? color : '#fff', color: active ? '#fff' : T.text, border: active ? 'none' : `1px solid ${T.hair}`, fontFamily: T.fHead, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{children}</span>;
}

function SCREMDashboard() {
  const { nav } = useApp();
  const total = EM.plants.reduce((s, p) => s + p.qty, 0);
  const critical = EM.plants.filter(p => p.state === 'danger').reduce((s, p) => s + p.qty, 0);
  const warn = EM.plants.filter(p => p.state === 'warn').reduce((s, p) => s + p.qty, 0);
  const ready = EM.plants.filter(p => p.availability === 'Lista para venta').reduce((s, p) => s + p.qty, 0);
  return (
    <Phone>
      <AppHeader title="Panel comercial" subtitle="Inventario vivo · pequeños negocios" right={<Btn size="sm" onClick={() => nav('em-add-plant')}>Agregar</Btn>}/>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 100px' }}>
        <div style={{ background: T.greenDark, borderRadius: 20, padding: 18, color: '#fff', marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -10, top: -20, fontSize: 120, opacity: 0.11 }}>🏪</div>
          <div style={{ fontFamily: T.fHead, fontSize: 11, fontWeight: 700, opacity: .75, letterSpacing: .5 }}>RESUMEN DE NEGOCIO</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 8 }}><span style={{ fontFamily: T.fHead, fontSize: 36, fontWeight: 800 }}>{total}</span><span style={{ fontSize: 14, opacity: .85 }}>plantas registradas</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
            <div><b>{ready}</b><br/><small>listas</small></div><div><b>{warn}</b><br/><small>atención</small></div><div><b>{critical}</b><br/><small>críticas</small></div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <EMMetric title="En riesgo" value={critical} subtitle="S/ 1,100 aprox." tone={T.danger} icon="🚨"/>
          <EMMetric title="Listas venta" value={ready} subtitle="Disponibles hoy" tone={T.ok} icon="🏷️"/>
          <EMMetric title="Lotes" value={EM.lots.length} subtitle="Venta / alquiler" tone={T.info} icon="📦"/>
          <EMMetric title="Pendientes" value="3" subtitle="Acciones correctivas" tone={T.warn} icon="🛠️"/>
        </div>
        <h2 style={{ margin: '0 0 10px', fontFamily: T.fHead, fontSize: 17, color: T.text }}>Prioridad de hoy</h2>
        {EM.plants.filter(p => p.state !== 'ok').map((p, i) => <EMPlantRow key={i} plant={p} onClick={() => nav(p.state === 'danger' ? 'em-critical' : 'em-risks')}/>) }
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
          <Btn kind="secondary" onClick={() => nav('em-losses')}>Ver pérdidas</Btn>
          <Btn kind="secondary" onClick={() => nav('em-weekly-summary')}>Resumen semanal</Btn>
        </div>
      </div>
      <EMTabBar active="panel"/><HUTag ids={['US-EM-07','US-EM-04']}/>
    </Phone>
  );
}

function SCREMInventory() {
  const { nav } = useApp();
  const [filter, setFilter] = React.useState('all');
  const filtered = EM.plants.filter(p => filter === 'all' || p.availability === filter || p.state === filter);
  return (
    <Phone>
      <AppHeader title="Inventario vivo" subtitle="Estado comercial de plantas" right={<Btn size="sm" onClick={() => nav('em-add-plant')}>Nuevo</Btn>}/>
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: '10px 14px', display: 'flex', gap: 10, border: `1px solid ${T.hair}` }}><span>🔍</span><span style={{ color: T.faint, fontSize: 14 }}>Buscar especie, lote o estado</span></div>
      </div>
      <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {[['all','Todas'],['Lista para venta','Listas'],['Reservada','Reservadas'],['En recuperación','Recuperación'],['danger','Críticas']].map(([id,l]) => <button key={id} onClick={() => setFilter(id)} style={{ background: 'none', border: 'none', padding: 0 }}><EMChip active={filter===id} color={id==='danger'?T.danger:T.greenDark}>{l}</EMChip></button>)}
      </div>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        {filtered.map((p, i) => <EMPlantRow key={i} plant={p} onClick={() => nav('em-availability')}/>) }
        {!filtered.length && <Card><div style={{ textAlign: 'center', padding: 18 }}><div style={{ fontSize: 34 }}>🪴</div><b>No hay plantas con este filtro</b><p style={{ color: T.muted }}>Vuelve al inventario completo o registra una nueva planta comercial.</p></div></Card>}
      </div>
      <EMTabBar active="inventario"/><HUTag ids={['US-EM-01','US-EM-02']}/>
    </Phone>
  );
}

function SCREMAddCommercialPlant() {
  const { nav, showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Agregar comercial" subtitle="Registro para inventario vivo" back/>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 100px' }}>
        <EMField label="Nombre comercial" value="Helecho Boston" />
        <EMField label="Especie" value="Nephrolepis exaltata" />
        <EMField label="Cantidad" value="18" />
        <EMField label="Valor referencial" value="S/ 38.00" />
        <EMField label="Lote o categoría" value="Oficinas Mayo · mantenimiento" />
        <EMField label="Ubicación" value="Zona sombra húmeda" />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          <EMChip active color={T.greenDark}>Venta</EMChip><EMChip>Alquiler</EMChip><EMChip>Mantenimiento</EMChip>
        </div>
        <Card accent={T.warn} style={{ marginBottom: 14 }}><b style={{ fontFamily: T.fHead }}>Validación de cantidad</b><p style={{ margin: '6px 0 0', fontSize: 13, color: T.muted }}>Si la cantidad es 0 o negativa, la app muestra: “Ingrese una cantidad válida”.</p></Card>
        <Btn full onClick={() => { showToast('Planta comercial registrada'); nav('em-inventory'); }}>Guardar</Btn>
      </div>
      <HUTag ids={['US-EM-01']}/>
    </Phone>
  );
}

function SCREMAvailability() {
  const { showToast } = useApp();
  const plant = EM.plants[0];
  return (
    <Phone>
      <AppHeader title="Disponibilidad" subtitle="Cambiar estado comercial" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        <EMPlantRow plant={plant}/>
        <Card accent={T.danger} style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.fHead, fontWeight: 800, color: T.danger }}>Advertencia comercial</div>
          <p style={{ margin: '6px 0 0', color: T.muted, fontSize: 13 }}>Esta planta tiene una alerta crítica activa. Si la marcas como “Lista para venta”, confirma que ya fue revisada.</p>
        </Card>
        <h2 style={{ fontFamily: T.fHead, fontSize: 16 }}>Nueva disponibilidad</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {['Lista para venta','Reservada','En recuperación'].map((x, i) => <button key={x} onClick={() => showToast(`Disponibilidad actualizada: ${x}`)} style={{ background: '#fff', border: `1.5px solid ${i===2?T.greenMid:T.hair}`, borderRadius: 14, padding: 14, textAlign: 'left', fontFamily: T.fHead, fontWeight: 700, color: EMAvailabilityColor(x) }}>{x}</button>)}
        </div>
      </div>
      <HUTag ids={['US-EM-02']}/>
    </Phone>
  );
}

function SCREMRisks() {
  const { nav } = useApp();
  const risks = EM.plants.filter(p => p.state !== 'ok');
  return (
    <Phone>
      <AppHeader title="Riesgos comerciales" subtitle="Deterioro estimado por registros" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        <Card accent={T.warn} style={{ marginBottom: 14 }}><b style={{ fontFamily: T.fHead }}>No usa sensores físicos</b><p style={{ margin: '6px 0 0', fontSize: 13, color: T.muted }}>Los riesgos se basan en registros del usuario, revisión visual y estado comercial actualizado.</p></Card>
        {risks.map((p, i) => <Card key={i} accent={EMStateColor(p.state)} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 12 }}><PlantArt variant="ficus" state={p.state} w={54} h={54}/><div style={{ flex: 1 }}><b style={{ fontFamily: T.fHead }}>{p.name}</b><p style={{ margin: '4px 0', fontSize: 12, color: T.muted }}>{p.cause}</p><p style={{ margin: 0, fontSize: 12 }}><b>Acción:</b> {p.action}</p></div></div>
          <Btn size="sm" kind={p.state==='danger'?'danger':'secondary'} full style={{ marginTop: 10 }} onClick={() => nav('em-corrective')}>Registrar acción</Btn>
        </Card>)}
      </div>
      <EMTabBar active="panel"/><HUTag ids={['US-EM-03']}/>
    </Phone>
  );
}

function SCREMCriticalPlants() {
  const { nav } = useApp();
  const critical = EM.plants.filter(p => p.state === 'danger');
  return (
    <Phone>
      <AppHeader title="Plantas críticas" subtitle="Prioriza lo que puede generar pérdidas" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        {critical.map((p, i) => <EMPlantRow key={i} plant={p} onClick={() => nav('em-losses')}/>) }
        <Card accent={T.greenMid} style={{ marginTop: 10 }}><b style={{ fontFamily: T.fHead }}>Sin críticas</b><p style={{ margin: '6px 0 0', color: T.muted, fontSize: 13 }}>Cuando no existan plantas críticas, se muestran las plantas en advertencia y saludables.</p></Card>
      </div>
      <HUTag ids={['US-EM-04']}/>
    </Phone>
  );
}

function SCREMCorrectiveAction() {
  const { showToast, nav } = useApp();
  return (
    <Phone>
      <AppHeader title="Acción correctiva" subtitle="Control de mantenimiento comercial" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        <EMPlantRow plant={EM.plants[0]} compact/>
        <EMField label="Acción realizada" value="Traslado a zona de sombra y riego controlado" />
        <EMField label="Responsable" value="Marco" />
        <EMField label="Resultado observado" value="Hojas menos caídas después de revisión" />
        <Card accent={T.danger} style={{ marginBottom: 14 }}><b style={{ fontFamily: T.fHead }}>Campo obligatorio</b><p style={{ margin: '6px 0 0', fontSize: 13, color: T.muted }}>Si no ingresas descripción, se muestra: “Ingrese una descripción de la acción realizada”.</p></Card>
        <Btn full onClick={() => { showToast('Acción correctiva guardada'); nav('em-maintenance-history'); }}>Guardar acción</Btn>
      </div>
      <HUTag ids={['US-EM-05']}/>
    </Phone>
  );
}

function SCREMMaintenanceHistory() {
  return (
    <Phone>
      <AppHeader title="Historial comercial" subtitle="Mantenimiento aplicado" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        {[
          ['Hoy 9:20', 'Helecho Boston', 'Riego controlado y cambio de ubicación', 'Marco'],
          ['Ayer 16:10', 'Calathea Orbifolia', 'Revisión de hojas blandas y poda leve', 'Sabrina'],
          ['Lun 11:00', 'Lirio Blanco', 'Reducción de exposición solar', 'Reynaldo'],
        ].map((h, i) => <Card key={i} accent={i===0?T.greenMid:T.hair} style={{ marginBottom: 10 }}><div style={{ fontFamily: T.fHead, fontWeight: 800 }}>{h[1]}</div><div style={{ fontSize: 12, color: T.muted }}>{h[0]} · Responsable: {h[3]}</div><p style={{ margin: '6px 0 0', fontSize: 13 }}>{h[2]}</p></Card>)}
        <Card><div style={{ textAlign: 'center', padding: 12, color: T.muted }}>Estado vacío: “Aún no hay mantenimiento registrado”.</div></Card>
      </div>
      <HUTag ids={['US-EM-06']}/>
    </Phone>
  );
}

function SCREMPotentialLosses() {
  const risky = EM.plants.filter(p => p.state !== 'ok');
  const loss = risky.reduce((s, p) => s + p.qty * p.value, 0);
  return (
    <Phone>
      <AppHeader title="Pérdidas potenciales" subtitle="Impacto económico estimado" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        <div style={{ background: T.danger, color: '#fff', borderRadius: 18, padding: 18, marginBottom: 16 }}><div style={{ fontFamily: T.fHead, fontSize: 12, opacity: .85 }}>RIESGO ECONÓMICO</div><div style={{ fontFamily: T.fHead, fontSize: 34, fontWeight: 800 }}>S/ {loss.toLocaleString('es-PE')}</div><div style={{ fontSize: 13, opacity: .9 }}>Si no se atienden las plantas en riesgo</div></div>
        {risky.map((p, i) => <Card key={i} accent={EMStateColor(p.state)} style={{ marginBottom: 10 }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><b style={{ fontFamily: T.fHead }}>{p.name}</b><b>S/ {p.qty * p.value}</b></div><div style={{ fontSize: 12, color: T.muted }}>{p.qty} unidades × S/ {p.value} · {p.availability}</div></Card>)}
        <Card accent={T.warn}><b style={{ fontFamily: T.fHead }}>Valor no registrado</b><p style={{ margin: '6px 0 0', fontSize: 13, color: T.muted }}>Si una planta no tiene valor referencial, la app permite editarlo desde inventario.</p></Card>
      </div>
      <HUTag ids={['US-EM-08']}/>
    </Phone>
  );
}

function SCREMLots() {
  const { nav } = useApp();
  return (
    <Phone>
      <AppHeader title="Lotes comerciales" subtitle="Venta, alquiler y mantenimiento" back right={<Btn size="sm" onClick={() => nav('em-compare-lots')}>Comparar</Btn>}/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        {EM.lots.map((l, i) => <Card key={i} accent={l.critical ? T.danger : l.warn ? T.warn : T.ok} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><b style={{ fontFamily: T.fHead }}>{l.name}</b><div style={{ fontSize: 12, color: T.muted }}>{l.type} · {l.total} plantas</div></div><span style={{ fontFamily: T.fHead, fontWeight: 800 }}>S/ {l.value}</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12, fontSize: 12 }}><span>✓ {l.ok}</span><span>⚠ {l.warn}</span><span>🚨 {l.critical}</span></div>
        </Card>)}
        <Btn full onClick={() => nav('em-add-plant')}>Crear nuevo lote</Btn>
      </div>
      <EMTabBar active="lotes"/><HUTag ids={['US-EM-09']}/>
    </Phone>
  );
}

function SCREMCompareLots() {
  return (
    <Phone>
      <AppHeader title="Comparar lotes" subtitle="Identifica el grupo con mayor atención" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}><EMChip active color={T.greenDark}>Oficinas Mayo</EMChip><EMChip active color={T.greenDark}>Recuperación</EMChip></div>
        <Card accent={T.danger} style={{ marginBottom: 12 }}><b style={{ fontFamily: T.fHead }}>Lote con mayor riesgo: Recuperación</b><p style={{ margin: '6px 0 0', fontSize: 13, color: T.muted }}>Tiene 1 planta crítica y 2 en advertencia. Requiere atención prioritaria.</p></Card>
        <Card style={{ marginBottom: 10 }}><EMBar label="Oficinas Mayo · críticas" value={1} max={4} color={T.danger}/><EMBar label="Oficinas Mayo · saludables" value={33} max={34} color={T.ok}/></Card>
        <Card><EMBar label="Recuperación · críticas" value={1} max={4} color={T.danger}/><EMBar label="Recuperación · advertencia" value={2} max={4} color={T.warn}/><EMBar label="Recuperación · saludables" value={5} max={8} color={T.ok}/></Card>
      </div>
      <HUTag ids={['US-EM-10']}/>
    </Phone>
  );
}

function SCREMExportReport() {
  const { showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Reporte comercial" subtitle="Exportar estado del inventario" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        <Card accent={T.greenDark} style={{ marginBottom: 14 }}><b style={{ fontFamily: T.fHead }}>Reporte filtrado</b><p style={{ margin: '6px 0 0', fontSize: 13, color: T.muted }}>Incluye estados, alertas, acciones correctivas, responsables y pérdidas potenciales.</p></Card>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}><EMChip active color={T.danger}>Críticas</EMChip><EMChip active color={T.warn}>En recuperación</EMChip><EMChip>Listas venta</EMChip></div>
        <Card style={{ marginBottom: 14 }}><EMBar label="Plantas atendidas" value={42} max={60} color={T.greenMid}/><EMBar label="Alertas críticas" value={2} max={10} color={T.danger}/><EMBar label="Acciones correctivas" value={8} max={10} color={T.info}/></Card>
        <Btn full onClick={() => showToast('Reporte PDF generado')}>Exportar reporte PDF</Btn>
      </div>
      <HUTag ids={['US-EM-11']}/>
    </Phone>
  );
}

function SCREMAssignResponsible() {
  const { showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Asignar responsable" subtitle="Organiza el mantenimiento" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        <EMPlantRow plant={EM.plants[0]} compact/>
        <h2 style={{ fontFamily: T.fHead, fontSize: 16 }}>Equipo disponible</h2>
        {['Marco · turno mañana','Sabrina · ventas y eventos','Reynaldo · mantenimiento','Sin seleccionar'].map((x, i) => <button key={x} onClick={() => i<3 && showToast(`Responsable asignado: ${x.split(' · ')[0]}`)} style={{ width: '100%', background: '#fff', border: `1.5px solid ${i===0?T.greenMid:T.hair}`, borderRadius: 14, padding: 14, marginBottom: 10, textAlign: 'left', fontFamily: T.fHead, fontWeight: 700, color: i===3?T.danger:T.text }}>{x}</button>)}
        <Card accent={T.danger}><b style={{ fontFamily: T.fHead }}>Validación</b><p style={{ margin: '6px 0 0', fontSize: 13, color: T.muted }}>Si no selecciona responsable, se muestra: “Seleccione un responsable”.</p></Card>
      </div>
      <HUTag ids={['US-EM-12']}/>
    </Phone>
  );
}

function SCREMWeeklySummary() {
  return (
    <Phone>
      <AppHeader title="Resumen semanal" subtitle="Estado general del inventario" back/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}><EMMetric title="Atendidas" value="42" subtitle="esta semana" tone={T.ok} icon="✅"/><EMMetric title="Alertas" value="7" subtitle="2 críticas" tone={T.danger} icon="🔔"/></div>
        <Card accent={T.greenDark} style={{ marginBottom: 14 }}><b style={{ fontFamily: T.fHead }}>Conclusión general</b><p style={{ margin: '6px 0 0', fontSize: 13, color: T.muted }}>El inventario está mayormente estable. Prioriza helechos y calatheas en recuperación para evitar pérdidas.</p></Card>
        <Card style={{ marginBottom: 10 }}><EMBar label="Acciones correctivas realizadas" value={8} max={10} color={T.info}/><EMBar label="Plantas listas para venta" value={48} max={90} color={T.ok}/><EMBar label="Plantas críticas" value={2} max={10} color={T.danger}/></Card>
        <Card accent={T.warn}><b style={{ fontFamily: T.fHead }}>Semana sin datos</b><p style={{ margin: '6px 0 0', fontSize: 13, color: T.muted }}>Si no hay registros, la app muestra: “No existen registros suficientes para generar el resumen semanal”.</p></Card>
      </div>
      <HUTag ids={['US-EM-13']}/>
    </Phone>
  );
}

Object.assign(window, {
  SCREMDashboard, SCREMInventory, SCREMAddCommercialPlant, SCREMAvailability,
  SCREMRisks, SCREMCriticalPlants, SCREMCorrectiveAction, SCREMMaintenanceHistory,
  SCREMPotentialLosses, SCREMLots, SCREMCompareLots, SCREMExportReport,
  SCREMAssignResponsible, SCREMWeeklySummary,
});
