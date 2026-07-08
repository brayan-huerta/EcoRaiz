// ─────────────────────────────────────────────────────────────
// EcoRaíz — Residente Urbano (EP-02..06)
// Cubre US-RU-01..15
// ─────────────────────────────────────────────────────────────

// ── Dashboard / Resumen diario ───────────────────────────
function SCRDashboard() {
  const { nav, tweaks } = useApp();
  if (tweaks.emptyState) return <SCREmptyPlants/>;
  return (
    <Phone>
      <AppHeader title="Hola, Ana" subtitle="Martes 13 de mayo"
        right={
          <button onClick={() => nav('alerts')} style={{
            width: 40, height: 40, borderRadius: 20, background: T.greenWash,
            display: 'grid', placeItems: 'center', position: 'relative',
            fontSize: 18, border: 'none', cursor: 'pointer',
          }}>
            🔔
            <span style={{
              position: 'absolute', top: 6, right: 6, width: 8, height: 8,
              borderRadius: 4, background: T.danger,
            }}/>
          </button>
        }/>
      <div style={{ flex: 1, padding: '4px 20px 100px', overflowY: 'auto' }}>
        {/* Resumen del día */}
        <div style={{
          background: T.greenDark, borderRadius: 18, padding: '18px 18px 16px',
          color: '#fff', marginBottom: 18, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -20, top: -10, fontSize: 110, opacity: 0.1 }}>🌿</div>
          <span style={{ fontFamily: T.fHead, fontSize: 11, fontWeight: 600, opacity: 0.7, letterSpacing: 0.5 }}>
            HOY EN TUS PLANTAS
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <span style={{ fontFamily: T.fHead, fontSize: 36, fontWeight: 700 }}>2</span>
            <span style={{ fontFamily: T.fBody, fontSize: 14, opacity: 0.8 }}>cuidados pendientes</span>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: T.greenLight }}/>
              <span>3 saludables</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: T.warn }}/>
              <span>1 atención</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: '#FF7B7B' }}/>
              <span>1 crítica</span>
            </div>
          </div>
        </div>

        {/* Alerta crítica destacada */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: 14,
          border: `2px solid ${T.danger}`, marginBottom: 14,
          display: 'flex', gap: 12, alignItems: 'center',
          boxShadow: '0 2px 8px rgba(211,47,47,0.08)',
        }}>
          <PlantArt variant="ficus" state="danger" w={56} h={56} r={10}/>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>Ficus</span>
              <span style={{ fontSize: 14 }}>🚨</span>
            </div>
            <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.danger, fontWeight: 600 }}>
              Humedad crítica (15%)
            </div>
          </div>
          <button onClick={() => nav('plant-detail')} style={{
            padding: '8px 14px', borderRadius: 8, border: 'none',
            background: T.danger, color: '#fff',
            fontFamily: T.fHead, fontWeight: 600, fontSize: 12, cursor: 'pointer',
          }}>Riega ya</button>
        </div>

        {/* Pendientes de hoy */}
        <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ margin: 0, fontFamily: T.fHead, fontWeight: 700, fontSize: 17, color: T.text }}>
            Para hoy
          </h2>
          <span onClick={() => nav('calendar')} style={{ fontFamily: T.fBody, fontSize: 12, color: T.greenPrim, fontWeight: 600, cursor: 'pointer' }}>
            Ver calendario
          </span>
        </div>
        {[
          { p: 'Pothos Dorado', v: 'pothos', state: 'warn', task: 'Riega hoy', detail: 'Humedad 35% · zona baja' },
          { p: 'Monstera Deliciosa', v: 'monstera', state: 'ok', task: 'Limpia las hojas', detail: 'Recomendación semanal' },
        ].map((it, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 12, padding: 12, marginBottom: 10,
            display: 'flex', gap: 12, alignItems: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          }}>
            <PlantArt variant={it.v} state={it.state} w={44} h={44} r={8}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text }}>{it.task}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{it.p} · {it.detail}</div>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: 14,
              border: `2px solid ${T.greenLight}`, display: 'grid', placeItems: 'center',
              color: T.greenLight, fontSize: 14,
            }}>✓</div>
          </div>
        ))}

        {/* Acceso rápido */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 18 }}>
          {[
            { i: '📚', t: 'Consejos', s: 'Por planta', to: 'tips' },
            { i: '📈', t: 'Evolución', s: 'Últimos 30 días', to: 'history' },
          ].map((q, i) => (
            <div key={i} onClick={() => nav(q.to)} style={{
              background: '#fff', borderRadius: 12, padding: 14,
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)', cursor: 'pointer',
            }}>
              <div style={{ fontSize: 22 }}>{q.i}</div>
              <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 14, color: T.text, marginTop: 6 }}>{q.t}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{q.s}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="inicio"/>
      <HUTag ids={['US-RU-06', 'US-RU-10']}/>
    </Phone>
  );
}

// ── Lista de plantas con filtros ──────────────────────────
function SCRPlantList() {
  const { nav, tweaks } = useApp();
  const [activeFilter, setActiveFilter] = React.useState('all');
  if (tweaks.emptyState) return <SCREmptyPlants/>;
  const plants = [
    { name: 'Monstera Deliciosa', sp: 'Monstera deliciosa', loc: 'Sala · ventana sur', v: 'monstera', state: 'ok', metric: 'Humedad 65% · Luz 4h' },
    { name: 'Pothos Dorado', sp: 'Epipremnum aureum', loc: 'Cocina · estante', v: 'pothos', state: 'warn', metric: 'Humedad 35% · Luz 2h' },
    { name: 'Ficus Lyrata', sp: 'Ficus lyrata', loc: 'Dormitorio · esquina', v: 'ficus', state: 'danger', metric: 'Humedad 15% · Luz 0h' },
    { name: 'Suculenta Echeveria', sp: 'Echeveria elegans', loc: 'Balcón', v: 'suculenta', state: 'ok', metric: 'Humedad 22% · Luz 6h' },
    { name: 'Calathea Orbifolia', sp: 'Calathea orbifolia', loc: 'Pasillo', v: 'calathea', state: 'nodata', metric: 'Sin datos recientes' },
  ];
  const filters = [
    { id: 'all', l: 'Todas', n: 5 },
    { id: 'ok', l: '✓ Saludables', n: 2 },
    { id: 'warn', l: '⚠ Atención', n: 1 },
    { id: 'danger', l: '🚨 Críticas', n: 1 },
  ];
  return (
    <Phone>
      <AppHeader title="Mis Plantas" subtitle="5 cultivos registrados"
        right={<Btn kind="primary" size="sm" icon="+" onClick={() => nav('add-plant')}>Agregar</Btn>}/>
      {/* Search */}
      <div style={{ padding: '0 20px 12px' }}>
        <div style={{
          background: '#fff', borderRadius: 12, padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10,
          border: `1px solid ${T.hair}`,
        }}>
          <span style={{ color: T.muted, fontSize: 16 }}>🔍</span>
          <span style={{ flex: 1, fontFamily: T.fBody, fontSize: 14, color: T.faint }}>
            Buscar por nombre o ubicación
          </span>
        </div>
      </div>
      {/* Filters */}
      <div style={{ padding: '0 20px 14px', display: 'flex', gap: 8, overflowX: 'auto' }}>
        {filters.map(f => {
          const sel = f.id === activeFilter;
          return (
            <div key={f.id} onClick={() => setActiveFilter(f.id)} style={{
              padding: '7px 12px', borderRadius: 999,
              background: sel ? T.greenDark : '#fff',
              color: sel ? '#fff' : T.text,
              fontFamily: T.fHead, fontSize: 12, fontWeight: 600,
              border: sel ? 'none' : `1px solid ${T.hair}`,
              whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
            }}>
              {f.l}
              <span style={{
                fontSize: 10, padding: '1px 6px', borderRadius: 999,
                background: sel ? 'rgba(255,255,255,0.2)' : T.greenWash,
                color: sel ? '#fff' : T.greenPrim,
              }}>{f.n}</span>
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        {plants.filter(p => activeFilter === 'all' || p.state === activeFilter).map((p, i) => (
          <div key={i} onClick={() => nav('plant-detail')} style={{
            background: '#fff', borderRadius: 14, padding: 12, marginBottom: 10,
            display: 'flex', gap: 12, alignItems: 'center', cursor: 'pointer',
            borderLeft: `4px solid ${
              p.state === 'ok' ? T.ok :
              p.state === 'warn' ? T.warn :
              p.state === 'danger' ? T.danger : T.hair}`,
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <PlantArt variant={p.v} state={p.state} w={64} h={64} r={10}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>{p.name}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted, fontStyle: 'italic' }}>{p.sp}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted, marginTop: 2 }}>
                📍 {p.loc}
              </div>
              <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.text, marginTop: 4, fontWeight: 600 }}>
                {p.metric}
              </div>
            </div>
            <div style={{ alignSelf: 'flex-start', marginTop: 2 }}>
              <StatusPill state={p.state}/>
            </div>
          </div>
        ))}
        {plants.filter(p => activeFilter === 'all' || p.state === activeFilter).length === 0 && (
          <div style={{
            background: '#fff', borderRadius: 14, padding: 24, textAlign: 'center', marginTop: 12,
          }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🔍</div>
            <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>
              No hay plantas con este estado
            </div>
            <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted, marginTop: 4 }}>
              Prueba con otro filtro o quita la selección.
            </div>
          </div>
        )}
      </div>
      <TabBar active="plantas" onNav={nav}/>
      <HUTag ids={tweaks.showHU ? ['US-RU-11', 'US-RU-12'] : null}/>
    </Phone>
  );
}

// ── Detalle de planta — estado WARN ──────────────────────
function SCRPlantDetail() {
  const { nav, back, tweaks, confirm, showToast } = useApp();
  const state = tweaks.plantState || 'warn';
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const config = {
    ok:     { name: 'Monstera Deliciosa', v: 'monstera', humedad: 65, hLabel: 'Adecuado', luz: 4, lLabel: 'Adecuado', temp: 22, tLabel: 'Óptima' },
    warn:   { name: 'Pothos Dorado',      v: 'pothos',   humedad: 35, hLabel: 'Baja',     luz: 2, lLabel: 'Baja',     temp: 19, tLabel: 'Óptima' },
    danger: { name: 'Ficus Lyrata',       v: 'ficus',    humedad: 15, hLabel: 'Crítica',  luz: 0, lLabel: 'Crítica',  temp: 28, tLabel: 'Alta' },
  }[state];

  const headerBg = { ok: T.greenWash, warn: '#FFF4D0', danger: '#FCE4E4' }[state];
  const tone     = { ok: T.ok, warn: '#B8860B', danger: T.danger }[state];

  return (
    <Phone bg={T.cream}>
      {/* Hero */}
      <div style={{
        background: headerBg, paddingBottom: 24,
        borderRadius: '0 0 28px 28px', position: 'relative',
      }}>
        <div style={{ padding: '4px 20px 8px', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={back} style={{
            width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.7)',
            border: 'none', cursor: 'pointer',
            display: 'grid', placeItems: 'center', fontSize: 18, color: T.text,
          }}>‹</button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen(o => !o)} style={{
              width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.7)',
              border: 'none', cursor: 'pointer',
              display: 'grid', placeItems: 'center', fontSize: 16,
            }}>⋯</button>
            {menuOpen && (
              <div style={{
                position: 'absolute', right: 0, top: 44, background: '#fff',
                borderRadius: 12, boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                padding: 6, minWidth: 180, zIndex: 50,
              }}>
                {[
                  { i: '✏️', t: 'Editar planta', onClick: () => { setMenuOpen(false); nav('edit-plant'); } },
                  { i: '📊', t: 'Ver evolución', onClick: () => { setMenuOpen(false); nav('history'); } },
                  { i: '📅', t: 'Calendario', onClick: () => { setMenuOpen(false); nav('calendar'); } },
                  { i: '🗑', t: 'Eliminar planta', danger: true, onClick: () => {
                    setMenuOpen(false);
                    confirm({
                      icon: '🗑️', title: '¿Eliminar esta planta?',
                      body: 'Se borrarán los datos históricos y dejarás de recibir alertas.',
                      confirmLabel: 'Sí, eliminar', tone: 'danger',
                      onConfirm: () => { showToast('Planta eliminada correctamente'); nav('plant-list', { reset: true }); },
                    });
                  }},
                ].map((it, i) => (
                  <div key={i} onClick={it.onClick} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                    borderRadius: 8, cursor: 'pointer',
                    color: it.danger ? T.danger : T.text,
                    fontFamily: T.fHead, fontWeight: 500, fontSize: 13,
                  }}>
                    <span>{it.i}</span>{it.t}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'grid', placeItems: 'center', padding: '12px 20px 0' }}>
          <PlantArt variant={config.v} state={state} w={140} h={140} r={70}/>
          <h2 style={{
            margin: '14px 0 4px', fontFamily: T.fHead, fontWeight: 700, fontSize: 24,
            color: T.greenDark, textAlign: 'center',
          }}>{config.name}</h2>
          <span style={{
            fontFamily: T.fBody, fontSize: 12, color: T.muted, fontStyle: 'italic',
          }}>📍 Cocina · estante norte</span>
          <div style={{ marginTop: 10 }}>
            <StatusPill state={state}/>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, padding: '16px 20px 100px', overflowY: 'auto' }}>
        {/* Recomendación destacada */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: 16, marginBottom: 16,
          borderLeft: `4px solid ${tone}`,
        }}>
          <div style={{ fontFamily: T.fHead, fontSize: 11, fontWeight: 700, color: tone, letterSpacing: 0.5 }}>
            RECOMENDACIÓN
          </div>
          <div style={{
            fontFamily: T.fHead, fontSize: 19, fontWeight: 700, color: T.text,
            marginTop: 4, lineHeight: 1.2,
          }}>
            {state === 'ok' && 'No hay acciones urgentes por ahora'}
            {state === 'warn' && 'Riega hoy y rota hacia la luz'}
            {state === 'danger' && '¡Riega inmediatamente!'}
          </div>
          <p style={{
            margin: '6px 0 12px', fontFamily: T.fBody, fontSize: 13, color: T.muted,
            lineHeight: 1.45,
          }}>
            {state === 'ok' && 'Las condiciones se mantienen estables desde hace 5 días.'}
            {state === 'warn' && 'La humedad bajó al 35% y la luz no llega a 3h diarias. Una zona con más sol matutino mejoraría el estado.'}
            {state === 'danger' && 'Llevamos 9 días sin agua y la temperatura ha subido a 28°. Riega de inmediato para evitar pérdida.'}
          </p>
          {state !== 'ok' && (
            <div style={{ display: 'flex', gap: 8 }}>
              <Btn kind={state === 'danger' ? 'danger' : 'primary'} size="md" style={{ flex: 1 }}
                onClick={() => showToast('¡Cuidado registrado! Buen trabajo.', 'success')}>
                {state === 'danger' ? 'Riega ya' : 'Riega ahora'}
              </Btn>
              <Btn kind="secondary" size="md"
                onClick={() => showToast('Recordatorio pospuesto 2 horas', 'info')}>Más tarde</Btn>
            </div>
          )}
        </div>

        {/* Variables ambientales */}
        <h3 style={{ margin: '4px 0 10px', fontFamily: T.fHead, fontSize: 15, fontWeight: 700, color: T.text }}>
          Condiciones actuales
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {[
            { i: '💧', n: 'Humedad', v: config.humedad + '%', l: config.hLabel, c: state === 'ok' ? T.ok : (config.hLabel === 'Crítica' ? T.danger : T.warn) },
            { i: '☀️', n: 'Luz',     v: config.luz + 'h',     l: config.lLabel, c: state === 'ok' ? T.ok : (config.lLabel === 'Crítica' ? T.danger : T.warn) },
            { i: '🌡️', n: 'Temp.',   v: config.temp + '°',     l: config.tLabel, c: T.ok },
          ].map((m, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: 12, textAlign: 'center',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ fontSize: 20 }}>{m.i}</div>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 20, color: T.text, marginTop: 2 }}>{m.v}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{m.n}</div>
              <div style={{
                marginTop: 6, fontFamily: T.fHead, fontSize: 10, fontWeight: 700,
                color: m.c, letterSpacing: 0.3,
              }}>{m.l.toUpperCase()}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{
          marginTop: 18, display: 'flex', gap: 4,
          padding: 4, background: '#fff', borderRadius: 10,
          border: `1px solid ${T.hair}`,
        }}>
          {['Resumen', 'Evolución', 'Historial', 'Consejos'].map((t, i) => (
            <div key={i} onClick={() => {
              if (i === 1 || i === 2) nav('history');
              else if (i === 3) nav('tips');
              else setActiveTab(i);
            }} style={{
              flex: 1, padding: '8px 6px', textAlign: 'center',
              fontFamily: T.fHead, fontSize: 12, fontWeight: 600,
              background: i === activeTab ? T.greenWash : 'transparent',
              color: i === activeTab ? T.greenDark : T.muted,
              borderRadius: 7, cursor: 'pointer',
            }}>{t}</div>
          ))}
        </div>

        {/* Última actividad */}
        <div style={{ marginTop: 14, fontFamily: T.fHead, fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 8 }}>
          Última actividad
        </div>
        <div style={{ background: '#fff', borderRadius: 12, padding: 14 }}>
          {[
            { d: 'Hace 2 días', t: 'Riego completado · 250 ml' },
            { d: 'Hace 5 días', t: 'Rotación hacia ventana sur' },
            { d: 'Hace 1 semana', t: 'Limpieza de hojas' },
          ].map((e, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'center',
              paddingBottom: i < 2 ? 10 : 0, marginBottom: i < 2 ? 10 : 0,
              borderBottom: i < 2 ? `1px solid ${T.hair}` : 'none',
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: 4, background: T.greenMid, flexShrink: 0,
              }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.fBody, fontSize: 13, color: T.text }}>{e.t}</div>
                <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{e.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <HUTag ids={tweaks.showHU ? ['US-RU-03', 'US-RU-04', 'US-RU-05', 'US-RU-07', 'US-RU-14'] : null}/>
    </Phone>
  );
}

// ── Agregar planta ────────────────────────────────────────
function SCRAddPlant() {
  const { nav, back, showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Agregar planta" back/>
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        {/* Photo placeholder */}
        <div style={{
          background: T.greenWash, border: `2px dashed ${T.greenLight}`,
          borderRadius: 14, padding: 24, textAlign: 'center', marginBottom: 18,
        }}>
          <div style={{ fontSize: 36 }}>📷</div>
          <div style={{ fontFamily: T.fHead, fontSize: 14, fontWeight: 600, color: T.greenDark, marginTop: 8 }}>
            Toma una foto
          </div>
          <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted, marginTop: 2 }}>
            Te ayudaremos a identificar la especie
          </div>
        </div>

        <Field label="Nombre" placeholder='Ej. "Mi Monstera"' value="Pothos de la cocina"/>

        <div style={{ marginBottom: 16 }}>
          <span style={{
            display: 'block', fontFamily: T.fHead, fontWeight: 600, fontSize: 13,
            color: T.text, marginBottom: 6,
          }}>Especie</span>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: '#fff', borderRadius: 10,
            border: `1.5px solid ${T.hair}`, padding: '0 14px', height: 48,
          }}>
            <span style={{ flex: 1, fontFamily: T.fBody, fontSize: 15, color: T.text }}>Epipremnum aureum</span>
            <span style={{ color: T.muted, fontSize: 16 }}>▾</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <span style={{ fontFamily: T.fBody, fontSize: 12, color: T.greenPrim, fontWeight: 600 }}>
              No sé la especie — registrar igual
            </span>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <span style={{
            display: 'block', fontFamily: T.fHead, fontWeight: 600, fontSize: 13,
            color: T.text, marginBottom: 8,
          }}>Ubicación en casa</span>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { i: '☀️', l: 'Ventana sur' },
              { i: '🪟', l: 'Ventana norte', s: true },
              { i: '🏠', l: 'Interior' },
              { i: '🌳', l: 'Balcón' },
            ].map((o, i) => (
              <div key={i} style={{
                padding: '12px 14px', borderRadius: 10,
                background: o.s ? T.greenWash : '#fff',
                border: `1.5px solid ${o.s ? T.greenMid : T.hair}`,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ fontSize: 18 }}>{o.i}</span>
                <span style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text }}>{o.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <span style={{
            display: 'block', fontFamily: T.fHead, fontWeight: 600, fontSize: 13,
            color: T.text, marginBottom: 6,
          }}>Sensor IoT vinculado <span style={{ color: T.muted, fontWeight: 400 }}>(opcional)</span></span>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: '#fff', borderRadius: 10,
            border: `1.5px solid ${T.hair}`, padding: '0 14px', height: 48, gap: 10,
          }}>
            <span style={{ fontSize: 16 }}>📡</span>
            <span style={{ flex: 1, fontFamily: T.fBody, fontSize: 14, color: T.faint }}>Escanear sensor cercano</span>
            <span style={{
              fontFamily: T.fHead, fontSize: 12, fontWeight: 700, color: T.greenPrim,
            }}>BUSCAR</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24, marginBottom: 30 }}>
          <Btn kind="secondary" size="lg" style={{ flex: 1 }} onClick={back}>Cancelar</Btn>
          <Btn kind="primary" size="lg" style={{ flex: 2 }}
               onClick={() => nav('plant-created', { reset: true })}>Guardar planta</Btn>
        </div>
      </div>
      <HUTag ids={['US-RU-01', 'US-RU-02']}/>
    </Phone>
  );
}

// ── Calendario de cuidados ────────────────────────────────
function SCRCalendar() {
  const { nav, tweaks, showToast } = useApp();
  const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const dates = [12, 13, 14, 15, 16, 17, 18];
  const today = 13;
  return (
    <Phone>
      <AppHeader title="Calendario" subtitle="Semana del 12 — 18 mayo" back
        right={<div style={{ fontSize: 18, color: T.muted }}>📅</div>}/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        {/* Week strip */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: '10px 8px',
          display: 'flex', justifyContent: 'space-between', marginBottom: 16,
        }}>
          {days.map((d, i) => {
            const isToday = dates[i] === today;
            return (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '6px 8px', borderRadius: 10,
                background: isToday ? T.greenDark : 'transparent',
                color: isToday ? '#fff' : T.text, minWidth: 36,
              }}>
                <span style={{ fontFamily: T.fHead, fontSize: 11, fontWeight: 600, opacity: 0.7 }}>{d}</span>
                <span style={{ fontFamily: T.fHead, fontSize: 16, fontWeight: 700 }}>{dates[i]}</span>
                {[12, 13, 15, 17].includes(dates[i]) && (
                  <div style={{
                    width: 4, height: 4, borderRadius: 2,
                    background: isToday ? '#fff' : T.greenMid,
                  }}/>
                )}
              </div>
            );
          })}
        </div>

        {/* Today's tasks */}
        <h3 style={{ margin: '0 0 10px', fontFamily: T.fHead, fontSize: 15, fontWeight: 700, color: T.text }}>
          Hoy · 3 cuidados
        </h3>
        {[
          { time: '08:00', t: 'Riega el Pothos Dorado', v: 'pothos', state: 'warn', done: false },
          { time: '12:00', t: 'Rota el Ficus hacia la luz', v: 'ficus', state: 'danger', done: false },
          { time: '18:00', t: 'Limpia hojas de Monstera', v: 'monstera', state: 'ok', done: true },
        ].map((t, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 12, padding: 12, marginBottom: 10,
            display: 'flex', gap: 12, alignItems: 'center',
            opacity: t.done ? 0.5 : 1,
          }}>
            <div style={{
              width: 4, height: 44, borderRadius: 2,
              background: t.state === 'ok' ? T.ok : t.state === 'warn' ? T.warn : T.danger,
            }}/>
            <PlantArt variant={t.v} state={t.state} w={40} h={40} r={8}/>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text,
                textDecoration: t.done ? 'line-through' : 'none',
              }}>{t.t}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>
                ⏰ {t.time}
              </div>
            </div>
            <div style={{
              width: 28, height: 28, borderRadius: 14,
              border: `2px solid ${t.done ? T.greenMid : T.hair}`,
              background: t.done ? T.greenMid : '#fff',
              display: 'grid', placeItems: 'center',
              color: '#fff', fontSize: 14,
            }}>{t.done ? '✓' : ''}</div>
          </div>
        ))}

        <h3 style={{ margin: '18px 0 10px', fontFamily: T.fHead, fontSize: 15, fontWeight: 700, color: T.text }}>
          Mañana · 2 cuidados
        </h3>
        <div style={{
          background: '#fff', borderRadius: 12, padding: 16, opacity: 0.8,
          fontFamily: T.fBody, fontSize: 13, color: T.muted, textAlign: 'center',
        }}>
          🌧️ Lluvia probable — los cuidados de riego se podrían posponer.
        </div>
      </div>
      <TabBar active="inicio" onNav={nav}/>
      <HUTag ids={tweaks.showHU ? ['US-RU-09', 'US-RU-07'] : null}/>
    </Phone>
  );
}

// ── Historial / Evolución ─────────────────────────────────
function SCRHistory() {
  const { tweaks } = useApp();
  return (
    <Phone>
      <AppHeader title="Evolución" subtitle="Monstera Deliciosa · 30 días" back/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        {/* Status timeline (semaforo) */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ fontFamily: T.fHead, fontSize: 13, fontWeight: 700, color: T.text }}>Estado diario</span>
            <span style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>Últimos 30 días</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: 3 }}>
            {Array.from({ length: 30 }).map((_, i) => {
              const colors = [T.greenLight, T.greenLight, T.warn, T.warn, T.greenLight, T.danger, T.warn, T.greenLight,
                              T.greenLight, T.greenLight, T.greenLight, T.warn, T.warn, T.greenLight, T.greenLight,
                              T.greenLight, T.greenLight, T.warn, T.greenLight, T.greenLight, T.greenLight, T.greenLight,
                              T.greenLight, T.greenLight, T.greenLight, T.warn, T.greenLight, T.greenLight, T.ok, T.ok];
              return (
                <div key={i} style={{
                  height: 24, borderRadius: 3, background: colors[i],
                }}/>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontFamily: T.fBody, fontSize: 10, color: T.muted }}>
            <span>13 abr</span><span>13 may</span>
          </div>
        </div>

        {/* Humidity graph */}
        <div style={{ background: '#fff', borderRadius: 14, padding: 16, marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
            <span style={{ fontFamily: T.fHead, fontSize: 13, fontWeight: 700, color: T.text }}>💧 Humedad del suelo</span>
            <span style={{ fontFamily: T.fHead, fontSize: 18, fontWeight: 700, color: T.greenPrim }}>65%</span>
          </div>
          <span style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>Promedio semanal: 58%</span>
          <svg viewBox="0 0 300 100" style={{ width: '100%', height: 100, marginTop: 8 }}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={T.greenMid} stopOpacity="0.3"/>
                <stop offset="100%" stopColor={T.greenMid} stopOpacity="0"/>
              </linearGradient>
            </defs>
            <path d="M 0 70 L 30 60 L 60 65 L 90 50 L 120 75 L 150 80 L 180 55 L 210 40 L 240 45 L 270 30 L 300 25 L 300 100 L 0 100 Z" fill="url(#g1)"/>
            <path d="M 0 70 L 30 60 L 60 65 L 90 50 L 120 75 L 150 80 L 180 55 L 210 40 L 240 45 L 270 30 L 300 25" stroke={T.greenPrim} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="0" y1="50" x2="300" y2="50" stroke={T.warn} strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
            <text x="300" y="46" fontFamily="system-ui" fontSize="9" fill={T.warn} textAnchor="end">Mín. saludable</text>
          </svg>
        </div>

        {/* Actions log */}
        <h3 style={{ margin: '8px 0 10px', fontFamily: T.fHead, fontSize: 15, fontWeight: 700, color: T.text }}>
          Cuidados realizados
        </h3>
        <div style={{ background: '#fff', borderRadius: 14, padding: 4 }}>
          {[
            { d: '13 may', e: 'Riego registrado', i: '💧', meta: 'Recomendación completada' },
            { d: '09 may', e: 'Rotación hacia luz', i: '🔄', meta: 'Acción manual' },
            { d: '06 may', e: 'Limpieza de hojas', i: '🧽', meta: 'Cuidado semanal' },
            { d: '03 may', e: 'Riego registrado', i: '💧', meta: '300 ml · Recomendación' },
            { d: '29 abr', e: 'Cambio de ubicación', i: '📍', meta: 'Mudada a sala sur' },
          ].map((e, i, arr) => (
            <div key={i} style={{
              display: 'flex', gap: 12, alignItems: 'center', padding: '12px 12px',
              borderBottom: i < arr.length - 1 ? `1px solid ${T.hair}` : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 18, background: T.greenWash,
                display: 'grid', placeItems: 'center', fontSize: 18, flexShrink: 0,
              }}>{e.i}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text }}>{e.e}</div>
                <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{e.meta}</div>
              </div>
              <span style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{e.d}</span>
            </div>
          ))}
        </div>
      </div>
      <HUTag ids={tweaks.showHU ? ['US-RU-08', 'US-RU-15'] : null}/>
    </Phone>
  );
}

// ── Alertas ───────────────────────────────────────────────
function SCRAlerts() {
  const { nav, tweaks, showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Alertas" subtitle="2 activas · 3 esta semana"
        right={<span style={{ fontFamily: T.fHead, fontSize: 12, color: T.greenPrim, fontWeight: 600 }}>Marcar todas</span>}/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        <div style={{
          fontFamily: T.fHead, fontSize: 11, fontWeight: 700, color: T.muted,
          letterSpacing: 0.5, margin: '4px 0 8px',
        }}>ACTIVAS</div>

        {[
          { state: 'danger', v: 'ficus', p: 'Ficus Lyrata',
            title: 'Humedad crítica', body: 'Llevamos 9 días sin riego registrado y la humedad bajó al 15%.',
            time: 'hace 12 min', action: 'Riega ya' },
          { state: 'warn', v: 'pothos', p: 'Pothos Dorado',
            title: 'Luz insuficiente', body: 'Lleva 4 días bajo 2h de luz. Considera moverlo cerca de una ventana.',
            time: 'hace 2 h', action: 'Ver cómo' },
        ].map((a, i) => {
          const tone = a.state === 'danger' ? T.danger : T.warn;
          const wash = a.state === 'danger' ? T.dangerSoft : T.warnSoft;
          return (
            <div key={i} style={{
              background: '#fff', borderRadius: 14, padding: 14, marginBottom: 12,
              border: `1.5px solid ${tone}`,
            }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <PlantArt variant={a.v} state={a.state} w={52} h={52} r={10}/>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text }}>{a.title}</span>
                    <span style={{
                      padding: '2px 8px', borderRadius: 999, background: wash,
                      color: tone, fontFamily: T.fHead, fontSize: 10, fontWeight: 700,
                    }}>{a.state === 'danger' ? 'CRÍTICA' : 'ATENCIÓN'}</span>
                  </div>
                  <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted, marginTop: 2 }}>{a.p} · {a.time}</div>
                  <p style={{
                    margin: '8px 0 10px', fontFamily: T.fBody, fontSize: 13, color: T.text, lineHeight: 1.45,
                  }}>{a.body}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <Btn kind={a.state === 'danger' ? 'danger' : 'primary'} size="sm">{a.action}</Btn>
                    <Btn kind="tertiary" size="sm">Posponer</Btn>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div style={{
          fontFamily: T.fHead, fontSize: 11, fontWeight: 700, color: T.muted,
          letterSpacing: 0.5, margin: '16px 0 8px',
        }}>HISTORIAL · ESTA SEMANA</div>

        {[
          { state: 'ok', t: 'Humedad restablecida', p: 'Monstera Deliciosa', d: 'ayer · resuelta' },
          { state: 'ok', t: 'Riego completado', p: 'Pothos Dorado', d: 'lunes · resuelta' },
          { state: 'warn', t: 'Temperatura alta detectada', p: 'Calathea Orbifolia', d: 'domingo · pospuesta' },
        ].map((a, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 12, padding: 12, marginBottom: 8,
            display: 'flex', gap: 12, alignItems: 'center', opacity: 0.85,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 16,
              background: a.state === 'ok' ? T.greenWash : T.warnSoft,
              color: a.state === 'ok' ? T.ok : T.warn,
              display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 700,
            }}>{a.state === 'ok' ? '✓' : '⚠'}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text }}>{a.t}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{a.p} · {a.d}</div>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="alertas" onNav={nav}/>
      <HUTag ids={tweaks.showHU ? ['US-RU-06'] : null}/>
    </Phone>
  );
}

// ── Consejos personalizados ──────────────────────────────
function SCRTips() {
  const { tweaks } = useApp();
  return (
    <Phone>
      <AppHeader title="Consejos" subtitle="Pothos Dorado" back/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        <div style={{
          background: '#fff', borderRadius: 14, padding: 14, marginBottom: 14,
          display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <PlantArt variant="pothos" state="warn" w={48} h={48} r={10}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 14, color: T.text }}>Pothos Dorado</div>
            <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted, fontStyle: 'italic' }}>Epipremnum aureum</div>
          </div>
          <StatusPill state="warn"/>
        </div>

        {[
          { i: '💧', t: 'Riego', body: 'Riega cuando los primeros 3 cm del sustrato estén secos. Aproximadamente cada 7-10 días en clima templado.',
            tag: 'Cada 7-10 días', accent: T.greenPrim },
          { i: '☀️', t: 'Luz', body: 'Prefiere luz indirecta brillante. Tolera sombra pero pierde el dorado de las hojas. Evita el sol directo del mediodía.',
            tag: 'Luz indirecta', accent: T.warn },
          { i: '🌡️', t: 'Temperatura', body: 'Cómoda entre 18° y 24°. Por debajo de 13° puede sufrir daño. Aléjala de aires acondicionados y radiadores.',
            tag: '18° — 24° C', accent: T.greenPrim },
          { i: '🪴', t: 'Sustrato', body: 'Mezcla con buen drenaje: tierra universal + perlita + corteza de pino en partes iguales.',
            tag: 'Bien drenado', accent: T.greenPrim },
        ].map((c, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 14, padding: 14, marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10, background: T.greenWash,
                display: 'grid', placeItems: 'center', fontSize: 18,
              }}>{c.i}</div>
              <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.text, flex: 1 }}>{c.t}</span>
              <span style={{
                padding: '3px 9px', borderRadius: 999, background: T.greenWash,
                color: c.accent, fontFamily: T.fHead, fontWeight: 600, fontSize: 10,
              }}>{c.tag}</span>
            </div>
            <p style={{ margin: 0, fontFamily: T.fBody, fontSize: 13, color: T.text, lineHeight: 1.5 }}>
              {c.body}
            </p>
          </div>
        ))}

        <div style={{
          background: T.greenWash, borderRadius: 14, padding: 14,
          fontFamily: T.fBody, fontSize: 13, color: T.greenDark, lineHeight: 1.45,
          display: 'flex', gap: 10, marginTop: 4,
        }}>
          <span style={{ fontSize: 18 }}>💡</span>
          <span>Los consejos se afinan cuando agregas la ubicación y especie exacta de tu planta.</span>
        </div>
      </div>
      <HUTag ids={tweaks.showHU ? ['US-RU-13'] : null}/>
    </Phone>
  );
}

Object.assign(window, {
  SCRDashboard, SCRPlantList, SCRPlantDetail, SCRAddPlant,
  SCRCalendar, SCRHistory, SCRAlerts, SCRTips,
});
