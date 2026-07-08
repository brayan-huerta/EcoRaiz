// ─────────────────────────────────────────────────────────────
// EcoRaíz — App shell, router, context, modals, toasts
// + missing screens (Profile, Settings, Edit Plant, Empty/Error states, Help)
// ─────────────────────────────────────────────────────────────

const AppCtx = React.createContext(null);
const useApp = () => React.useContext(AppCtx);

// ── Screen registry (filled at end of file) ──────────────
const SCREENS = {};

// ── Provider + Router ──────────────────────────────────
function AppProvider({ children, initial = 'splash', tweaks, setTweak }) {
  const [stack, setStack] = React.useState([initial]);
  const [toast, setToast] = React.useState(null);
  const [modal, setModal] = React.useState(null);
  const current = stack[stack.length - 1];

  const nav = React.useCallback((name, opts = {}) => {
    if (opts.replace) setStack(s => [...s.slice(0, -1), name]);
    else if (opts.reset) setStack([name]);
    else setStack(s => [...s, name]);
  }, []);
  const back = React.useCallback(() => {
    setStack(s => s.length > 1 ? s.slice(0, -1) : s);
  }, []);
  const showToast = React.useCallback((message, kind = 'success') => {
    setToast({ message, kind, key: Date.now() });
    setTimeout(() => setToast(null), 2800);
  }, []);
  const confirm = React.useCallback((opts) => setModal(opts), []);
  const closeModal = React.useCallback(() => setModal(null), []);

  // Sync URL hash for shareability (Heuristic 7: flexibility)
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (h && SCREENS[h]) setStack(s => s[s.length - 1] === h ? s : [...s, h]);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const value = { current, nav, back, stack, showToast, confirm, closeModal, modal, toast, tweaks, setTweak };
  return (
    <AppCtx.Provider value={value}>
      {children}
    </AppCtx.Provider>
  );
}

// ── Router renders current screen ──────────────────────
function Router() {
  const { current, tweaks } = useApp();
  const Screen = SCREENS[current] || SCREENS['splash'];
  // Force re-mount on state changes for plant detail
  const key = current + ':' + (tweaks.plantState || '') + ':' + (tweaks.emptyState ? 'empty' : '') + ':' + (tweaks.errorState ? 'error' : '');
  return <Screen key={key}/>;
}

// ── Toast overlay (Heuristic 1: visibility) ────────────
function ToastLayer() {
  const { toast } = useApp();
  if (!toast) return null;
  const tone = toast.kind === 'success' ? T.greenDark
             : toast.kind === 'error'   ? T.danger
             : T.ink;
  return (
    <div style={{
      position: 'absolute', left: 16, right: 16, top: 56, zIndex: 100,
      background: tone, color: '#fff', borderRadius: 12, padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: T.fHead, fontWeight: 600, fontSize: 13,
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      animation: 'toastIn 220ms ease-out',
    }}>
      <span style={{ fontSize: 18 }}>
        {toast.kind === 'success' ? '✅' : toast.kind === 'error' ? '⚠️' : 'ℹ️'}
      </span>
      <span style={{ flex: 1 }}>{toast.message}</span>
    </div>
  );
}

// ── Modal overlay (Heuristic 5: error prevention) ─────
function ModalLayer() {
  const { modal, closeModal } = useApp();
  if (!modal) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)',
      display: 'grid', placeItems: 'center', zIndex: 90, padding: 24,
      animation: 'fadeIn 200ms ease-out',
    }} onClick={closeModal}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: '#fff', borderRadius: 18, padding: 22,
      }}>
        {modal.icon && (
          <div style={{
            width: 56, height: 56, borderRadius: 28, marginInline: 'auto', marginBottom: 12,
            background: modal.tone === 'danger' ? T.dangerSoft : T.greenWash,
            display: 'grid', placeItems: 'center', fontSize: 28,
          }}>{modal.icon}</div>
        )}
        <h3 style={{
          margin: 0, fontFamily: T.fHead, fontWeight: 700, fontSize: 18,
          color: T.text, textAlign: 'center',
        }}>{modal.title}</h3>
        {modal.body && (
          <p style={{
            margin: '8px 0 18px', fontFamily: T.fBody, fontSize: 14,
            color: T.muted, textAlign: 'center', lineHeight: 1.45,
          }}>{modal.body}</p>
        )}
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn kind="secondary" size="md" style={{ flex: 1 }}
               onClick={() => { closeModal(); modal.onCancel && modal.onCancel(); }}>
            {modal.cancelLabel || 'Cancelar'}
          </Btn>
          <Btn kind={modal.tone === 'danger' ? 'danger' : 'primary'} size="md" style={{ flex: 1 }}
               onClick={() => { closeModal(); modal.onConfirm && modal.onConfirm(); }}>
            {modal.confirmLabel || 'Confirmar'}
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ── Help bottom-sheet (Heuristic 10: help & docs) ──────
function HelpSheet({ onClose, screen }) {
  const helpFor = {
    'dashboard': {
      title: 'Inicio',
      tips: [
        'El círculo de colores resume el estado de tus plantas.',
        'Las tarjetas con borde rojo necesitan acción inmediata.',
        'Toca cualquier planta para ver el detalle completo.',
      ],
    },
    'plant-list': {
      title: 'Mis plantas',
      tips: [
        'Usa los chips para filtrar por estado.',
        'La barra busca por nombre o ubicación.',
        'Desliza una planta a la izquierda para acciones rápidas.',
      ],
    },
    'plant-detail': {
      title: 'Detalle de planta',
      tips: [
        'La recomendación principal es siempre lo primero que ves.',
        'Las pestañas dividen Resumen, Evolución, Historial y Consejos.',
        '⋯ abre opciones para editar o eliminar la planta.',
      ],
    },
  }[screen] || {
    title: 'EcoRaíz',
    tips: ['Toca el icono ? en cualquier pantalla para ver ayuda contextual.'],
  };
  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 80,
      display: 'flex', alignItems: 'flex-end',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: '#fff', borderRadius: '20px 20px 0 0',
        padding: '14px 22px 32px', animation: 'sheetIn 240ms ease-out',
      }}>
        <div style={{ width: 40, height: 4, background: T.hair, borderRadius: 2, marginInline: 'auto', marginBottom: 14 }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18, background: T.greenWash,
            display: 'grid', placeItems: 'center', fontSize: 18,
          }}>💡</div>
          <h3 style={{ margin: 0, fontFamily: T.fHead, fontSize: 18, fontWeight: 700, color: T.greenDark }}>
            Ayuda · {helpFor.title}
          </h3>
        </div>
        {helpFor.tips.map((t, i) => (
          <div key={i} style={{
            display: 'flex', gap: 10, padding: '10px 0',
            borderTop: i > 0 ? `1px solid ${T.hair}` : 'none',
          }}>
            <span style={{ color: T.greenPrim, fontWeight: 700, fontFamily: T.fHead }}>{i + 1}</span>
            <span style={{ fontFamily: T.fBody, fontSize: 14, color: T.text, lineHeight: 1.5 }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Profile screen ─────────────────────────────────────
function SCRProfile() {
  const { nav, confirm, showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Mi Perfil"
        right={
          <button onClick={() => nav('settings')} style={{
            background: 'none', border: 'none', fontSize: 20, color: T.muted, cursor: 'pointer',
          }}>⚙</button>
        }/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        <div style={{
          background: T.greenDark, borderRadius: 18, padding: '20px 18px',
          color: '#fff', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18,
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: 32, background: T.greenMid,
            display: 'grid', placeItems: 'center', fontFamily: T.fHead, fontSize: 22, fontWeight: 700,
          }}>AL</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: T.fHead, fontSize: 18, fontWeight: 700 }}>Ana López</div>
            <div style={{ fontFamily: T.fBody, fontSize: 12, opacity: 0.8 }}>ana.lopez@correo.com</div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 6,
              padding: '3px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.15)',
              fontFamily: T.fHead, fontSize: 11, fontWeight: 600,
            }}>🪴 Residente urbano</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 22 }}>
          {[
            { v: '5', l: 'Plantas' },
            { v: '23', l: 'Cuidados' },
            { v: '12', l: 'Días seguidos' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#fff', borderRadius: 12, padding: 12, textAlign: 'center',
            }}>
              <div style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 22, color: T.greenPrim }}>{s.v}</div>
              <div style={{ fontFamily: T.fBody, fontSize: 11, color: T.muted }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ background: '#fff', borderRadius: 14, marginBottom: 14 }}>
          {[
            { icon: '✏️', label: 'Editar datos personales', to: 'edit-profile' },
            { icon: '🔔', label: 'Preferencias de notificación', to: 'notifications' },
            { icon: '⚙️', label: 'Configuración', to: 'settings' },
            { icon: '💡', label: 'Guía de uso', to: 'guide' },
            { icon: '❓', label: 'Ayuda y soporte', to: 'help' },
          ].map((it, i, arr) => (
            <div key={i} onClick={() => nav(it.to)} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
              borderBottom: i < arr.length - 1 ? `1px solid ${T.hair}` : 'none',
              cursor: 'pointer',
            }}>
              <span style={{ fontSize: 18 }}>{it.icon}</span>
              <span style={{ flex: 1, fontFamily: T.fHead, fontWeight: 500, fontSize: 14, color: T.text }}>{it.label}</span>
              <span style={{ color: T.faint, fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>

        <button onClick={() => confirm({
          icon: '👋', title: '¿Cerrar sesión?',
          body: 'Tendrás que volver a iniciar sesión la próxima vez.',
          confirmLabel: 'Cerrar sesión', tone: 'danger',
          onConfirm: () => { window.location.href = '../../../index.html'; },
        })} style={{
          width: '100%', padding: 14, borderRadius: 12, border: `1.5px solid ${T.danger}`,
          background: '#fff', color: T.danger, fontFamily: T.fHead, fontWeight: 600, fontSize: 14,
          cursor: 'pointer',
        }}>Cerrar sesión</button>
      </div>
      <TabBar active="perfil"/>
      <HUTag ids={['US-GEN-06', 'US-GEN-07']}/>
    </Phone>
  );
}

// ── Notification preferences ──────────────────────────
function SCRNotifications() {
  const { showToast } = useApp();
  const [prefs, setPrefs] = React.useState({
    critical: true, warning: true, daily: true, weekly: false, marketing: false,
  });
  return (
    <Phone>
      <AppHeader title="Notificaciones" subtitle="Personaliza tus alertas" back/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        {[
          { id: 'critical', t: 'Alertas críticas', d: 'Cuando una planta esté en riesgo grave', tone: T.danger, icon: '🚨', locked: true },
          { id: 'warning',  t: 'Avisos preventivos', d: 'Antes de que el daño sea visible', tone: T.warn, icon: '⚠️' },
          { id: 'daily',    t: 'Resumen diario', d: 'Cada mañana, tus cuidados del día', tone: T.greenPrim, icon: '📅' },
          { id: 'weekly',   t: 'Reporte semanal', d: 'Evolución de tus plantas el domingo', tone: T.greenPrim, icon: '📊' },
          { id: 'marketing',t: 'Consejos y novedades', d: 'Contenido educativo ocasional', tone: T.muted, icon: '💡' },
        ].map(p => (
          <div key={p.id} style={{
            background: '#fff', borderRadius: 12, padding: 14, marginBottom: 10,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, background: T.greenWash,
              display: 'grid', placeItems: 'center', fontSize: 18,
            }}>{p.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 14, color: T.text }}>
                {p.t} {p.locked && <span style={{ fontSize: 11, color: T.muted, fontWeight: 400 }}>(siempre activa)</span>}
              </div>
              <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted }}>{p.d}</div>
            </div>
            <div onClick={() => !p.locked && setPrefs(s => ({ ...s, [p.id]: !s[p.id] }))}
              style={{
                width: 44, height: 26, borderRadius: 13,
                background: prefs[p.id] ? T.greenMid : T.hair,
                position: 'relative', cursor: p.locked ? 'not-allowed' : 'pointer',
                opacity: p.locked ? 0.6 : 1, transition: 'background 200ms',
              }}>
              <div style={{
                position: 'absolute', top: 2, left: prefs[p.id] ? 20 : 2,
                width: 22, height: 22, borderRadius: 11, background: '#fff',
                transition: 'left 200ms', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}/>
            </div>
          </div>
        ))}

        <div style={{
          marginTop: 12, background: T.warnSoft, borderRadius: 12, padding: 14,
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 18 }}>ℹ️</span>
          <p style={{ margin: 0, fontFamily: T.fBody, fontSize: 12, color: '#7A5A00', lineHeight: 1.45 }}>
            Las alertas críticas no se pueden desactivar para evitar pérdidas de plantas.
          </p>
        </div>

        <div style={{ marginTop: 18 }}>
          <Btn kind="primary" size="lg" full onClick={() => showToast('Preferencias actualizadas')}>
            Guardar preferencias
          </Btn>
        </div>
      </div>
      <HUTag ids={['US-GEN-05']}/>
    </Phone>
  );
}

// ── Edit profile ──────────────────────────────────────
function SCREditProfile() {
  const { back, showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Editar perfil" back/>
      <div style={{ flex: 1, padding: '0 24px', overflowY: 'auto' }}>
        <div style={{ display: 'grid', placeItems: 'center', padding: '12px 0 24px' }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 96, height: 96, borderRadius: 48, background: T.greenMid,
              display: 'grid', placeItems: 'center', fontFamily: T.fHead, fontSize: 32, fontWeight: 700, color: '#fff',
            }}>AL</div>
            <div style={{
              position: 'absolute', bottom: 0, right: 0,
              width: 32, height: 32, borderRadius: 16, background: T.greenDark, color: '#fff',
              display: 'grid', placeItems: 'center', fontSize: 14, border: '3px solid #F5F1E8',
            }}>📷</div>
          </div>
        </div>
        <Field label="Nombre" placeholder="Tu nombre" value="Ana López"/>
        <Field label="Correo" placeholder="correo@ejemplo.com" value="ana.lopez@correo.com"/>
        <div style={{ marginBottom: 16 }}>
          <span style={{ display: 'block', fontFamily: T.fHead, fontWeight: 600, fontSize: 13, color: T.text, marginBottom: 6 }}>
            Tipo de perfil
          </span>
          <div style={{
            background: '#fff', borderRadius: 10, padding: '12px 14px',
            border: `1.5px solid ${T.hair}`, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 20 }}>🪴</span>
            <span style={{ flex: 1, fontFamily: T.fBody, fontSize: 14, color: T.text }}>Residente urbano</span>
            <span style={{ color: T.muted, fontSize: 14 }}>▾</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <Btn kind="secondary" size="lg" style={{ flex: 1 }} onClick={back}>Cancelar</Btn>
          <Btn kind="primary" size="lg" style={{ flex: 1 }}
               onClick={() => { showToast('Perfil actualizado'); back(); }}>Guardar cambios</Btn>
        </div>
      </div>
      <HUTag ids={['US-GEN-06']}/>
    </Phone>
  );
}

// ── Settings ──────────────────────────────────────────
function SCRSettings() {
  const { nav } = useApp();
  return (
    <Phone>
      <AppHeader title="Configuración" back/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        {[
          { sec: 'Cuenta', items: [
            { i: '👤', t: 'Datos personales', to: 'edit-profile' },
            { i: '🔒', t: 'Cambiar contraseña' },
            { i: '🌐', t: 'Idioma', detail: 'Español' },
          ]},
          { sec: 'Sistema', items: [
            { i: '🔔', t: 'Notificaciones', to: 'notifications' },
            { i: '📡', t: 'Sensores vinculados', detail: '2 conectados' },
            { i: '🌡️', t: 'Unidades', detail: 'Métrico' },
          ]},
          { sec: 'Sobre', items: [
            { i: '❓', t: 'Ayuda', to: 'help' },
            { i: '📋', t: 'Términos y privacidad' },
            { i: 'ℹ️', t: 'Versión', detail: '1.0.0' },
          ]},
        ].map((g, gi) => (
          <div key={gi} style={{ marginTop: gi > 0 ? 18 : 0 }}>
            <div style={{
              fontFamily: T.fHead, fontSize: 11, fontWeight: 700, color: T.muted,
              letterSpacing: 0.5, marginBottom: 8, paddingLeft: 4,
            }}>{g.sec.toUpperCase()}</div>
            <div style={{ background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
              {g.items.map((it, i) => (
                <div key={i} onClick={() => it.to && nav(it.to)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                    borderBottom: i < g.items.length - 1 ? `1px solid ${T.hair}` : 'none',
                    cursor: it.to ? 'pointer' : 'default',
                  }}>
                  <span style={{ fontSize: 18 }}>{it.i}</span>
                  <span style={{ flex: 1, fontFamily: T.fHead, fontWeight: 500, fontSize: 14, color: T.text }}>{it.t}</span>
                  {it.detail && <span style={{ fontFamily: T.fBody, fontSize: 13, color: T.muted }}>{it.detail}</span>}
                  {it.to && <span style={{ color: T.faint, fontSize: 16 }}>›</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <HUTag ids={['US-GEN-06']}/>
    </Phone>
  );
}

// ── Help / Guide screen (Heuristic 10) ───────────────
function SCRGuide() {
  return (
    <Phone>
      <AppHeader title="Guía de uso" subtitle="Aprende lo esencial en 3 pasos" back/>
      <div style={{ flex: 1, padding: '0 20px 100px', overflowY: 'auto' }}>
        {[
          { n: 1, i: '🪴', t: 'Registra tu planta', body: 'Tómale una foto, dale un nombre y dinos dónde vive. Si no sabes la especie, podemos ayudarte a identificarla.', cta: 'Ver cómo' },
          { n: 2, i: '📡', t: 'Empieza a monitorear', body: 'Si tienes un sensor IoT, vincúlalo. Si no, registra manualmente la humedad cada tanto. Funciona igual.', cta: 'Vincular sensor' },
          { n: 3, i: '✓', t: 'Sigue las recomendaciones', body: 'Verde = todo bien. Amarillo = atiende pronto. Rojo = actúa ahora. No tienes que interpretar números.', cta: 'Ir al inicio' },
        ].map(s => (
          <div key={s.n} style={{
            background: '#fff', borderRadius: 16, padding: 18, marginBottom: 12,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: -10, top: -10, fontSize: 80, opacity: 0.06,
            }}>{s.i}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 16, background: T.greenDark, color: '#fff',
                display: 'grid', placeItems: 'center', fontFamily: T.fHead, fontWeight: 700, fontSize: 14,
              }}>{s.n}</div>
              <span style={{ fontFamily: T.fHead, fontWeight: 700, fontSize: 17, color: T.text }}>{s.t}</span>
            </div>
            <p style={{ margin: '0 0 12px', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.5 }}>
              {s.body}
            </p>
            <span style={{ fontFamily: T.fHead, fontSize: 13, fontWeight: 600, color: T.greenPrim }}>
              {s.cta} →
            </span>
          </div>
        ))}

        <div style={{
          background: T.greenWash, borderRadius: 14, padding: 16, marginTop: 12,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 28 }}>💬</div>
          <div style={{
            fontFamily: T.fHead, fontWeight: 700, fontSize: 15, color: T.greenDark, marginTop: 6,
          }}>¿Necesitas más ayuda?</div>
          <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.greenDark, marginTop: 2, marginBottom: 12 }}>
            Escríbenos a hola@ecoraiz.app
          </div>
          <Btn kind="dark" size="md">Contactar soporte</Btn>
        </div>
      </div>
      <HUTag ids={['US-GEN-08']}/>
    </Phone>
  );
}

// ── Empty: no plants yet ──────────────────────────────
function SCREmptyPlants() {
  const { nav } = useApp();
  return (
    <Phone>
      <AppHeader title="Mis Plantas"/>
      <div style={{
        flex: 1, padding: '20px 28px 100px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        <div style={{
          width: 140, height: 140, borderRadius: 70, background: T.greenWash,
          display: 'grid', placeItems: 'center', marginBottom: 18,
        }}>
          <svg width="80" height="80" viewBox="0 0 100 100">
            <path d="M50 92 L50 50" stroke={T.greenPrim} strokeWidth="3" strokeLinecap="round"/>
            <path d="M50 50 C 22 44, 18 24, 30 12 C 40 16, 50 32, 50 50 Z" fill={T.greenLight}/>
            <path d="M50 54 C 78 48, 84 26, 70 16 C 60 22, 52 36, 50 54 Z" fill={T.greenMid}/>
          </svg>
        </div>
        <h2 style={{
          margin: 0, fontFamily: T.fHead, fontWeight: 700, fontSize: 22, color: T.greenDark,
        }}>Aún no tienes plantas</h2>
        <p style={{
          margin: '8px 0 24px', fontFamily: T.fBody, fontSize: 14, color: T.muted, lineHeight: 1.5,
          maxWidth: 280,
        }}>
          Agrega tu primera planta para empezar a recibir recomendaciones de cuidado.
        </p>
        <Btn kind="primary" size="lg" onClick={() => nav('add-plant')}>＋ Agregar mi primera planta</Btn>
        <button onClick={() => nav('guide')} style={{
          marginTop: 12, background: 'none', border: 'none', color: T.greenPrim,
          fontFamily: T.fHead, fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}>¿Cómo funciona EcoRaíz?</button>
      </div>
      <TabBar active="plantas"/>
      <HUTag ids={['US-RU-01']}/>
    </Phone>
  );
}

// ── Error: no network / sensor offline ─────────────────
function SCRErrorState() {
  const { back, showToast } = useApp();
  return (
    <Phone>
      <AppHeader title="Sin conexión" back/>
      <div style={{
        flex: 1, padding: '20px 28px 100px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        <div style={{
          width: 120, height: 120, borderRadius: 60, background: T.dangerSoft,
          display: 'grid', placeItems: 'center', marginBottom: 18, fontSize: 56,
        }}>📡</div>
        <h2 style={{
          margin: 0, fontFamily: T.fHead, fontWeight: 700, fontSize: 22, color: T.danger,
        }}>No pudimos conectar con tus sensores</h2>
        <p style={{
          margin: '10px 0 6px', fontFamily: T.fBody, fontSize: 14, color: T.text, lineHeight: 1.5,
        }}>
          Revisa tu conexión Wi-Fi y que los sensores estén encendidos.
        </p>
        <p style={{
          margin: '0 0 24px', fontFamily: T.fBody, fontSize: 13, color: T.muted, lineHeight: 1.5,
        }}>
          Mientras tanto, mostraremos los últimos datos guardados.
        </p>
        <Btn kind="primary" size="lg"
             onClick={() => { showToast('Reintentando conexión...', 'info'); setTimeout(back, 1200); }}>
          Reintentar
        </Btn>
        <button onClick={back} style={{
          marginTop: 10, background: 'none', border: 'none', color: T.greenPrim,
          fontFamily: T.fHead, fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}>Ver datos guardados</button>
      </div>
      <HUTag ids={['US-RU-04']}/>
    </Phone>
  );
}

// ── Success after creating plant ───────────────────────
function SCRPlantCreated() {
  const { nav } = useApp();
  return (
    <Phone>
      <div style={{
        flex: 1, padding: '60px 32px', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        <div style={{
          width: 120, height: 120, borderRadius: 60, background: T.greenWash,
          display: 'grid', placeItems: 'center', marginBottom: 20, position: 'relative',
        }}>
          <div style={{
            position: 'absolute', inset: -8, borderRadius: 68,
            border: `2px solid ${T.greenMid}`, opacity: 0.4,
          }}/>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke={T.greenDark} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 style={{
          margin: 0, fontFamily: T.fHead, fontWeight: 700, fontSize: 26, color: T.greenDark,
        }}>¡Planta registrada!</h2>
        <p style={{
          margin: '8px 0 28px', fontFamily: T.fBody, fontSize: 15, color: T.muted, lineHeight: 1.5,
          maxWidth: 280,
        }}>
          Empezamos a monitorear su entorno. Te avisaremos cuando necesite cuidado.
        </p>
        <Btn kind="primary" size="lg" onClick={() => nav('plant-detail', { reset: true })}>Ver mi planta</Btn>
        <button onClick={() => nav('dashboard', { reset: true })} style={{
          marginTop: 10, background: 'none', border: 'none', color: T.greenPrim,
          fontFamily: T.fHead, fontWeight: 600, fontSize: 14, cursor: 'pointer',
        }}>Ir al inicio</button>
      </div>
    </Phone>
  );
}

// ── Register screen registry ──────────────────────────
function registerScreens(map) {
  Object.assign(SCREENS, map);
}

Object.assign(window, {
  AppCtx, useApp, AppProvider, Router, ToastLayer, ModalLayer, HelpSheet,
  SCREENS, registerScreens,
  SCRProfile, SCRNotifications, SCREditProfile, SCRSettings, SCRGuide,
  SCREmptyPlants, SCRErrorState, SCRPlantCreated,
});
