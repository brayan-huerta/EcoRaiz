// ─────────────────────────────────────────────────────────────
// EcoRaíz — General screens (EP-01) · navegables
// US-GEN-01..08
// ─────────────────────────────────────────────────────────────

// ── Splash / Welcome ────────────────────────────────────────
function SCRSplash() {
  const { nav } = useApp();
  return (
    <Phone bg={T.greenDark} statusTint="#fff">
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: '40px 32px 40px', color: '#fff',
      }}>
        <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <svg width="140" height="140" viewBox="0 0 100 100" style={{ marginBottom: 24 }}>
              <circle cx="50" cy="50" r="48" fill="rgba(255,255,255,0.06)"/>
              <g transform="translate(50 50)">
                <path d="M0 32 L0 0" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                <path d="M0 0 C -28 -8, -30 -28, -20 -38 C -8 -32, 0 -16, 0 0 Z" fill="#A5D6A7"/>
                <path d="M0 4 C 28 -2, 30 -22, 22 -32 C 12 -26, 4 -10, 0 4 Z" fill="#fff"/>
                <path d="M0 14 C -20 16, -28 6, -24 -6 C -10 -4, -2 6, 0 14 Z" fill="#66BB6A"/>
              </g>
            </svg>
            <h1 style={{
              margin: 0, fontFamily: T.fHead, fontSize: 44, fontWeight: 700,
              letterSpacing: -1, color: '#fff',
            }}>EcoRaíz</h1>
            <p style={{
              margin: '8px 0 0', fontFamily: T.fBody, fontSize: 15,
              color: '#A5D6A7', maxWidth: 280, marginInline: 'auto', lineHeight: 1.45,
            }}>Cuida tus plantas con datos simples,<br/>no con dudas.</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn kind="primary" size="lg" full onClick={() => nav('register')}>Empezar gratis</Btn>
          <Btn kind="tertiary" size="md" full style={{ color: '#fff' }}
               onClick={() => nav('login')}>Ya tengo cuenta</Btn>
        </div>
      </div>
      <HUTag ids={['US-GEN-08']}/>
    </Phone>
  );
}

// ── Reusable input ─────────────────────────────────────────
function Field({ label, placeholder, value = '', error, hint, type = 'text', right, required }) {
  return (
    <label style={{ display: 'block', marginBottom: 16 }}>
      <span style={{
        display: 'block', fontFamily: T.fHead, fontWeight: 600, fontSize: 13,
        color: T.text, marginBottom: 6,
      }}>{label} {required && <span style={{ color: T.danger }}>*</span>}</span>
      <div style={{
        display: 'flex', alignItems: 'center',
        background: '#fff', borderRadius: 10,
        border: `1.5px solid ${error ? T.danger : T.hair}`,
        padding: '0 14px', height: 48,
      }}>
        <span style={{
          flex: 1, fontFamily: T.fBody, fontSize: 15,
          color: value ? T.text : T.faint,
        }}>{value || placeholder}</span>
        {right}
      </div>
      {error && (
        <span style={{
          display: 'flex', alignItems: 'center', gap: 4,
          fontFamily: T.fBody, fontSize: 12, color: T.danger, marginTop: 4,
        }}><span style={{ fontSize: 12 }}>⚠</span>{error}</span>
      )}
      {hint && !error && (
        <span style={{
          display: 'block', fontFamily: T.fBody, fontSize: 12,
          color: T.muted, marginTop: 4,
        }}>{hint}</span>
      )}
    </label>
  );
}

// ── Login ─────────────────────────────────────────────────
function SCRLogin() {
  const { nav, tweaks, showToast } = useApp();
  const error = tweaks.errorState;
  return (
    <Phone>
      <div style={{ flex: 1, padding: '12px 24px 24px', display: 'flex', flexDirection: 'column' }}>
        <EcoLogo size={22}/>
        <div style={{ marginTop: 28, marginBottom: 24 }}>
          <h1 style={{
            margin: 0, fontFamily: T.fHead, fontWeight: 700, fontSize: 28,
            color: T.greenDark, letterSpacing: -0.4,
          }}>Bienvenido de nuevo</h1>
          <p style={{ margin: '6px 0 0', fontFamily: T.fBody, fontSize: 14, color: T.muted }}>
            Inicia sesión para revisar tus cultivos.
          </p>
        </div>
        <Field label="Correo electrónico" placeholder="tunombre@correo.com" required
               value={error ? "ana.lopez@correo.com" : "ana.lopez@correo.com"}/>
        <Field label="Contraseña" placeholder="Tu contraseña" required
               value={error ? "•••••••" : "••••••••"}
               error={error ? "Correo o contraseña incorrectos" : null}
               right={<span style={{ fontSize: 18, color: T.muted }}>👁</span>}/>
        <div style={{ textAlign: 'right', marginTop: -4, marginBottom: 24 }}>
          <span onClick={() => nav('recover')} style={{
            fontFamily: T.fHead, fontWeight: 500, fontSize: 13,
            color: T.greenPrim, textDecoration: 'underline', cursor: 'pointer',
          }}>Olvidé mi contraseña</span>
        </div>
        <Btn kind="primary" size="lg" full
             onClick={() => { if (error) showToast('Verifica tus datos', 'error'); else nav('dashboard', { reset: true }); }}>
          Iniciar sesión
        </Btn>
        <div style={{
          marginTop: 20, display: 'flex', alignItems: 'center', gap: 12,
          color: T.faint, fontFamily: T.fBody, fontSize: 12,
        }}>
          <div style={{ flex: 1, height: 1, background: T.hair }}/>
          <span>o continúa con</span>
          <div style={{ flex: 1, height: 1, background: T.hair }}/>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          {['Google', 'Apple'].map(p => (
            <button key={p} style={{
              flex: 1, height: 48, borderRadius: 10, border: `1.5px solid ${T.hair}`,
              background: '#fff', fontFamily: T.fHead, fontWeight: 600, fontSize: 14,
              color: T.text, cursor: 'pointer',
            }}>{p}</button>
          ))}
        </div>
        <div style={{ flex: 1 }}/>
        <p style={{
          textAlign: 'center', fontFamily: T.fBody, fontSize: 13, color: T.muted, margin: 0,
        }}>
          ¿Nuevo en EcoRaíz?{' '}
          <span onClick={() => nav('register')} style={{
            color: T.greenPrim, fontWeight: 700, cursor: 'pointer',
          }}>Regístrate</span>
        </p>
      </div>
      <HUTag ids={['US-GEN-02', 'US-GEN-03']}/>
    </Phone>
  );
}

// ── Register ──────────────────────────────────────────────
function SCRRegister() {
  const { back, nav, showToast } = useApp();
  const [selected, setSelected] = React.useState('ru');
  return (
    <Phone>
      <AppHeader title="Crear cuenta" subtitle="Solo necesitamos lo básico" back/>
      <div style={{ flex: 1, padding: '12px 24px 24px', overflowY: 'auto' }}>
        <Field label="Nombre" placeholder="¿Cómo te llamas?" value="Ana López" required/>
        <Field label="Correo electrónico" placeholder="tunombre@correo.com"
               value="ana.lopez@correo.com" required/>
        <Field label="Contraseña" placeholder="Mínimo 8 caracteres" value="••••••••" required
               hint="Combina letras y números"/>
        <div style={{ marginTop: 4 }}>
          <span style={{
            display: 'block', fontFamily: T.fHead, fontWeight: 600, fontSize: 13,
            color: T.text, marginBottom: 8,
          }}>Tipo de perfil <span style={{ color: T.danger }}>*</span></span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { id: 'ru', t: 'Residente urbano', d: 'Tengo plantas en casa', icon: '🪴' },
              { id: 'ea', t: 'Experto ambiental', d: 'Investigo o enseño', icon: '🔬' },
              { id: 'em', t: 'Emprendedor', d: 'Vivero, alquiler o venta', icon: '🏪' },
            ].map(p => {
              const sel = p.id === selected;
              return (
                <div key={p.id} onClick={() => setSelected(p.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px', borderRadius: 12, background: '#fff', cursor: 'pointer',
                  border: `2px solid ${sel ? T.greenMid : T.hair}`,
                  transition: 'border-color 150ms',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, fontSize: 22,
                    background: sel ? T.greenWash : '#F1ECE0',
                    display: 'grid', placeItems: 'center',
                  }}>{p.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: T.fHead, fontWeight: 600, fontSize: 14, color: T.text }}>{p.t}</div>
                    <div style={{ fontFamily: T.fBody, fontSize: 12, color: T.muted }}>{p.d}</div>
                  </div>
                  <div style={{
                    width: 22, height: 22, borderRadius: 11,
                    border: `2px solid ${sel ? T.greenMid : T.hair}`,
                    background: sel ? T.greenMid : '#fff',
                    display: 'grid', placeItems: 'center', color: '#fff', fontSize: 12,
                  }}>{sel ? '✓' : ''}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
          <Btn kind="secondary" size="lg" style={{ flex: 1 }} onClick={back}>Cancelar</Btn>
          <Btn kind="primary" size="lg" style={{ flex: 2 }}
               onClick={() => { showToast('¡Cuenta creada correctamente!'); nav('onboarding', { reset: true }); }}>
            Registrarse
          </Btn>
        </div>
        <p style={{
          marginTop: 12, fontFamily: T.fBody, fontSize: 12, color: T.muted, textAlign: 'center',
        }}>Al continuar aceptas los Términos y la Política de privacidad.</p>
      </div>
      <HUTag ids={['US-GEN-01', 'US-GEN-04']}/>
    </Phone>
  );
}

// ── Recuperar contraseña ─────────────────────────────────
function SCRRecover() {
  const { back, showToast, tweaks } = useApp();
  const noMatch = tweaks.errorState;
  return (
    <Phone>
      <AppHeader title="Recuperar contraseña" back/>
      <div style={{ flex: 1, padding: '4px 24px' }}>
        <div style={{
          background: T.greenWash, borderRadius: 14, padding: 16,
          display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 24,
        }}>
          <div style={{ fontSize: 22 }}>📩</div>
          <p style={{ margin: 0, fontFamily: T.fBody, fontSize: 13, color: T.text, lineHeight: 1.45 }}>
            Te enviaremos instrucciones al correo asociado a tu cuenta.
          </p>
        </div>
        <Field label="Correo electrónico" placeholder="tunombre@correo.com"
               value={noMatch ? "noexiste@correo.com" : ""}
               error={noMatch ? "No se encontró una cuenta asociada a este correo" : null}/>
        <Btn kind="primary" size="lg" full
             onClick={() => {
               if (noMatch) { showToast('Correo no encontrado', 'error'); return; }
               showToast('Se enviaron instrucciones a tu correo');
               setTimeout(back, 800);
             }}>
          Enviar instrucciones
        </Btn>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <span onClick={back} style={{
            fontFamily: T.fHead, fontSize: 14, color: T.greenPrim, fontWeight: 600, cursor: 'pointer',
          }}>
            Volver al inicio de sesión
          </span>
        </div>
      </div>
      <HUTag ids={['US-GEN-03']}/>
    </Phone>
  );
}

// ── Onboarding (3 slides) ────────────────────────────────
function SCROnboarding() {
  const { nav } = useApp();
  const [active, setActive] = React.useState(0);
  const steps = [
    { icon: '📡', title: 'Monitorea sin saber de números',
      body: 'Tus sensores envían humedad, luz y temperatura. Nosotros lo traducimos a algo simple: "Riega hoy".' },
    { icon: '🚨', title: 'Alertas con código de colores',
      body: 'Verde, amarillo o rojo. Sabrás de un vistazo qué planta necesita tu atención.' },
    { icon: '📅', title: 'Historial que aprende contigo',
      body: 'Cada cuidado se registra para que veas si tus plantas están mejorando con el tiempo.' },
  ];
  return (
    <Phone>
      <div style={{ padding: '4px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <EcoLogo size={16}/>
        <button onClick={() => nav('dashboard', { reset: true })} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: T.fHead, fontSize: 13, color: T.muted, fontWeight: 600,
        }}>Saltar</button>
      </div>
      <div style={{ flex: 1, padding: '24px 28px 32px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
          <div style={{
            width: 220, height: 220, borderRadius: '50%',
            background: T.greenWash, display: 'grid', placeItems: 'center',
            fontSize: 90, animation: 'pop 240ms ease-out',
          }} key={active}>{steps[active].icon}</div>
        </div>
        <h2 style={{
          margin: 0, fontFamily: T.fHead, fontWeight: 700, fontSize: 24,
          color: T.greenDark, textAlign: 'center', textWrap: 'pretty',
        }}>{steps[active].title}</h2>
        <p style={{
          margin: '12px 0 24px', fontFamily: T.fBody, fontSize: 15,
          color: T.muted, textAlign: 'center', lineHeight: 1.5, textWrap: 'pretty',
        }}>{steps[active].body}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {steps.map((_, i) => (
            <div key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 24 : 8, height: 8, borderRadius: 4,
              background: i === active ? T.greenMid : T.greenLight,
              transition: 'width 200ms', cursor: 'pointer',
            }}/>
          ))}
        </div>
        <Btn kind="primary" size="lg" full
             onClick={() => active < 2 ? setActive(active + 1) : nav('dashboard', { reset: true })}>
          {active < 2 ? 'Continuar' : 'Empezar a usar EcoRaíz'}
        </Btn>
      </div>
      <HUTag ids={['US-GEN-08']}/>
    </Phone>
  );
}

Object.assign(window, { SCRSplash, SCRLogin, SCRRegister, SCRRecover, SCROnboarding, Field });
