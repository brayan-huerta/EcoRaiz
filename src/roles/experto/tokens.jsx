// ─────────────────────────────────────────────────────────────
// EcoRaíz — Design tokens + shared UI primitives
// Aligned with "Guía de Diseño Comprensiva" (TP1 2026)
// ─────────────────────────────────────────────────────────────

const T = {
  // Primary palette
  greenDark:   '#1B5E20',
  greenPrim:   '#2E7D32',
  greenMid:    '#4CAF50',
  greenLight:  '#A5D6A7',
  greenWash:   '#E8F5E9',
  // Background
  cream:       '#F5F1E8',
  white:       '#FFFFFF',
  // Status
  ok:          '#388E3C',
  warn:        '#FBC02D',
  warnSoft:    '#FFF8E1',
  danger:      '#D32F2F',
  dangerSoft:  '#FDECEA',
  info:        '#0D8AE3',
  // Text
  ink:         '#21261C',
  text:        '#333333',
  muted:       '#666666',
  faint:       '#999999',
  hair:        '#E0DCD0',
  // Fonts
  fHead: '"Poppins", "Montserrat", system-ui, sans-serif',
  fBody: '"Nunito", "Nunito Sans", system-ui, sans-serif',
};

// ─────────────────────────────────────────────────────────────
// EcoRaíz wordmark / logo (simple, brand-consistent)
// ─────────────────────────────────────────────────────────────
function EcoLogo({ size = 18, light = false, mark = true }) {
  const color = light ? '#fff' : T.greenDark;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      {mark && (
        <svg width={size + 4} height={size + 4} viewBox="0 0 28 28" fill="none" aria-hidden>
          <path d="M14 4 C 8 8, 6 14, 8 20 C 12 22, 18 20, 22 14 C 20 8, 16 4, 14 4 Z"
            fill={color} />
          <path d="M14 22 C 14 18, 14 14, 14 11" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      )}
      <span style={{
        fontFamily: T.fHead, fontWeight: 700, fontSize: size,
        color, letterSpacing: -0.2, lineHeight: 1,
      }}>EcoRaíz</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// iPhone status bar (simplified, dark text)
// ─────────────────────────────────────────────────────────────
function StatusBar({ tint = T.ink }) {
  return (
    <div style={{
      height: 44, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 22px 0 28px',
      fontFamily: '"SF Pro Text", system-ui', fontWeight: 600,
      fontSize: 15, color: tint, flexShrink: 0,
    }}>
      <span>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><g fill={tint}>
          <rect x="0" y="7" width="3" height="4" rx="0.5"/>
          <rect x="5" y="5" width="3" height="6" rx="0.5"/>
          <rect x="10" y="2" width="3" height="9" rx="0.5"/>
          <rect x="15" y="0" width="2" height="11" rx="0.5"/>
        </g></svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none"><path d="M7.5 2.5 C 4 2.5, 1.5 4.5, 0.5 6 M 7.5 5 C 5.5 5, 4 6, 3 7 M 7.5 7.5 L 7.5 8.5 M 7.5 2.5 C 11 2.5, 13.5 4.5, 14.5 6 M 7.5 5 C 9.5 5, 11 6, 12 7" stroke={tint} strokeWidth="1.2" strokeLinecap="round"/></svg>
        <div style={{
          width: 24, height: 11, border: `1px solid ${tint}`, borderRadius: 3,
          padding: 1, position: 'relative',
        }}>
          <div style={{ width: '80%', height: '100%', background: tint, borderRadius: 1 }}/>
          <div style={{ position: 'absolute', right: -3, top: 3, width: 2, height: 5, background: tint, borderRadius: 1 }}/>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom Tab Bar (mobile nav)
// ─────────────────────────────────────────────────────────────
function TabBar({ active = 'inicio', onNav }) {
  const tabs = [
    { id: 'inicio',  label: 'Inicio',     icon: '🏠', to: 'dashboard' },
    { id: 'plantas', label: 'Mis Plantas',icon: '🌿', to: 'plant-list' },
    { id: 'agregar', label: 'Agregar',    icon: '＋', primary: true, to: 'add-plant' },
    { id: 'alertas', label: 'Alertas',    icon: '🔔', to: 'alerts' },
    { id: 'perfil',  label: 'Perfil',     icon: '👤', to: 'profile' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: 88,
      background: '#fff', borderTop: `1px solid ${T.hair}`,
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
      padding: '8px 8px 24px',
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNav && t.id !== active && onNav(t.to)} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
          color: t.id === active ? T.greenPrim : T.muted, fontFamily: T.fHead,
          fontSize: 10, fontWeight: t.id === active ? 600 : 500,
          minWidth: 56, background: 'none', border: 'none', cursor: 'pointer', padding: 0,
        }}>
          {t.primary ? (
            <div style={{
              width: 44, height: 44, marginTop: -16, borderRadius: 22,
              background: T.greenMid, color: '#fff', display: 'grid',
              placeItems: 'center', fontSize: 24, fontWeight: 300,
              boxShadow: '0 6px 14px rgba(46,125,50,0.32)',
            }}>＋</div>
          ) : (
            <div style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</div>
          )}
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// App header (cream bg, green title, optional back)
// ─────────────────────────────────────────────────────────────
function AppHeader({ title, back = false, right = null, subtitle = null }) {
  const ctx = React.useContext(window.AppCtx);
  return (
    <div style={{
      padding: '8px 20px 12px', display: 'flex', alignItems: 'center', gap: 12,
      flexShrink: 0,
    }}>
      {back && (
        <button onClick={ctx && ctx.back} style={{
          width: 36, height: 36, border: 'none', background: '#fff',
          borderRadius: 18, boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          display: 'grid', placeItems: 'center', fontSize: 18, color: T.greenDark,
          cursor: 'pointer',
        }}>‹</button>
      )}
      <div style={{ flex: 1 }}>
        <h1 style={{
          margin: 0, fontFamily: T.fHead, fontWeight: 700, fontSize: 24,
          color: T.greenDark, letterSpacing: -0.3, lineHeight: 1.1,
        }}>{title}</h1>
        {subtitle && (
          <p style={{
            margin: '2px 0 0', fontFamily: T.fBody, fontSize: 13,
            color: T.muted,
          }}>{subtitle}</p>
        )}
      </div>
      {right}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Buttons
// ─────────────────────────────────────────────────────────────
function Btn({ children, kind = 'primary', size = 'md', full = false, icon, style = {}, onClick }) {
  const sizes = {
    sm: { padY: 8,  padX: 14, font: 13, radius: 8 },
    md: { padY: 12, padX: 20, font: 15, radius: 10 },
    lg: { padY: 16, padX: 24, font: 16, radius: 12 },
  }[size];
  const variants = {
    primary:   { bg: T.greenMid, color: '#fff', border: 'transparent' },
    dark:      { bg: T.greenDark, color: '#fff', border: 'transparent' },
    secondary: { bg: '#fff', color: T.greenPrim, border: T.greenMid },
    tertiary:  { bg: 'transparent', color: T.greenPrim, border: 'transparent' },
    danger:    { bg: T.danger, color: '#fff', border: 'transparent' },
    disabled:  { bg: T.greenLight, color: '#fff', border: 'transparent', op: 0.5 },
  }[kind];
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      padding: `${sizes.padY}px ${sizes.padX}px`,
      fontFamily: T.fHead, fontWeight: 600, fontSize: sizes.font,
      borderRadius: sizes.radius, border: `2px solid ${variants.border}`,
      background: variants.bg, color: variants.color, opacity: variants.op || 1,
      width: full ? '100%' : 'auto', cursor: 'pointer',
      boxShadow: kind === 'primary' || kind === 'dark' ? '0 2px 6px rgba(46,125,50,0.18)' : 'none',
      ...style,
    }}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Status pill (semáforo)
// ─────────────────────────────────────────────────────────────
function StatusPill({ state }) {
  const map = {
    ok:      { label: 'Saludable',         bg: T.greenWash,   fg: T.ok,     icon: '✓' },
    warn:    { label: 'Necesita atención', bg: T.warnSoft,    fg: '#B8860B',icon: '⚠' },
    danger:  { label: '¡Actúa ahora!',     bg: T.dangerSoft,  fg: T.danger, icon: '🚨' },
    nodata:  { label: 'Información insuficiente', bg: '#F1ECE0', fg: T.muted, icon: '○' },
  }[state] || { label: state, bg: '#eee', fg: '#333', icon: '' };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px', borderRadius: 999,
      background: map.bg, color: map.fg,
      fontFamily: T.fHead, fontWeight: 600, fontSize: 12,
    }}>
      <span style={{ fontSize: 11 }}>{map.icon}</span>{map.label}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────
// Plant illustration placeholder (consistent across cards)
// Uses a generated SVG silhouette + colored wash so we don't need photos
// ─────────────────────────────────────────────────────────────
function PlantArt({ variant = 'monstera', state = 'ok', w = 100, h = 100, r = 12 }) {
  const wash = { ok: '#E8F5E9', warn: '#FFF8E1', danger: '#FDECEA', nodata: '#F1ECE0' }[state];
  const leaf = { ok: '#2E7D32', warn: '#7A6212', danger: '#8C2F2F', nodata: '#6B7560' }[state];
  const leafLight = { ok: '#66BB6A', warn: '#D4A537', danger: '#E57373', nodata: '#A3AB95' }[state];
  // Different silhouettes per variant
  const paths = {
    monstera: (
      <g>
        <path d="M50 92 L50 56" stroke={leaf} strokeWidth="3" strokeLinecap="round"/>
        <path d="M50 56 C 22 50, 18 30, 30 18 C 40 22, 50 38, 50 56 Z" fill={leaf}/>
        <path d="M50 60 C 78 54, 84 32, 70 22 C 60 28, 52 42, 50 60 Z" fill={leafLight}/>
        <path d="M50 70 C 30 72, 22 62, 26 50 C 38 52, 48 60, 50 70 Z" fill={leafLight}/>
      </g>
    ),
    pothos: (
      <g>
        <path d="M50 92 L50 60" stroke={leaf} strokeWidth="3" strokeLinecap="round"/>
        <path d="M50 60 C 32 56, 24 44, 28 32 C 40 36, 50 48, 50 60 Z" fill={leaf}/>
        <path d="M50 65 C 68 62, 76 50, 72 38 C 60 42, 52 52, 50 65 Z" fill={leafLight}/>
        <ellipse cx="38" cy="78" rx="6" ry="4" fill={leafLight}/>
        <ellipse cx="62" cy="78" rx="6" ry="4" fill={leafLight}/>
      </g>
    ),
    ficus: (
      <g>
        <rect x="48" y="58" width="4" height="34" fill={leaf} rx="2"/>
        <circle cx="50" cy="40" r="22" fill={leaf}/>
        <circle cx="40" cy="34" r="10" fill={leafLight}/>
        <circle cx="62" cy="42" r="9" fill={leafLight}/>
      </g>
    ),
    suculenta: (
      <g>
        <ellipse cx="50" cy="85" rx="22" ry="6" fill="#8B6F47"/>
        <g transform="translate(50 60)">
          {[0, 60, 120, 180, 240, 300].map(a => (
            <ellipse key={a} cx="0" cy="-12" rx="6" ry="14"
              transform={`rotate(${a})`} fill={leafLight} stroke={leaf} strokeWidth="1"/>
          ))}
          <circle r="6" fill={leaf}/>
        </g>
      </g>
    ),
    calathea: (
      <g>
        <path d="M50 92 L50 60" stroke={leaf} strokeWidth="3" strokeLinecap="round"/>
        <ellipse cx="35" cy="40" rx="10" ry="22" fill={leaf} transform="rotate(-20 35 40)"/>
        <ellipse cx="65" cy="42" rx="10" ry="22" fill={leafLight} transform="rotate(22 65 42)"/>
        <ellipse cx="50" cy="32" rx="9" ry="20" fill={leaf}/>
      </g>
    ),
  };
  return (
    <div style={{
      width: w, height: h, borderRadius: r, background: wash,
      display: 'grid', placeItems: 'center', flexShrink: 0, overflow: 'hidden',
    }}>
      <svg width={w * 0.86} height={h * 0.86} viewBox="0 0 100 100">{paths[variant] || paths.monstera}</svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HU traceability tag (footer chip on artboards)
// ─────────────────────────────────────────────────────────────
function HUTag({ ids }) {
  const ctx = React.useContext(window.AppCtx);
  if (ctx && ctx.tweaks && !ctx.tweaks.showHU) return null;
  if (!ids || !ids.length) return null;
  return (
    <div style={{
      position: 'absolute', bottom: 6, right: 8, display: 'flex', gap: 4,
      pointerEvents: 'none',
    }}>
      {ids.map(id => (
        <span key={id} style={{
          padding: '2px 6px', borderRadius: 4,
          background: 'rgba(27,80,54,0.85)', color: '#fff',
          fontFamily: 'ui-monospace, "SF Mono", monospace', fontSize: 9,
          fontWeight: 600, letterSpacing: 0.3,
        }}>{id}</span>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Generic Card
// ─────────────────────────────────────────────────────────────
function Card({ children, accent, style = {} }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14,
      borderLeft: accent ? `4px solid ${accent}` : 'none',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(33,33,33,0.04)',
      padding: 16, ...style,
    }}>{children}</div>
  );
}

// ─────────────────────────────────────────────────────────────
// Phone frame — fixed 393×852 (iPhone 16) cream-app shell
// ─────────────────────────────────────────────────────────────
function Phone({ children, bg = T.cream, statusTint = T.ink }) {
  return (
    <div style={{
      width: 393, height: 852, background: bg, position: 'relative',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      fontFamily: T.fBody, color: T.text,
    }}>
      <StatusBar tint={statusTint}/>
      {children}
    </div>
  );
}

Object.assign(window, {
  T, EcoLogo, StatusBar, TabBar, AppHeader, Btn, StatusPill,
  PlantArt, HUTag, Card, Phone,
});
