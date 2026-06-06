import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import Icon from '../components/Icon';
import { Badge, Button } from '../components/ui';
import { formatCOP, formatDate, orderCode } from '../lib/format';
import { useStore } from '../context/StoreContext';

const TABS = [
  { id: 'pedidos', label: 'Mis pedidos', icon: 'cart' },
  { id: 'direcciones', label: 'Direcciones', icon: 'map' },
  { id: 'datos', label: 'Mis datos', icon: 'user' },
];

const STATUS_TONE = {
  confirmado: 'fire',
  'en camino': 'crimson',
  entregado: 'green',
};

export default function Profile() {
  const { user, userOrders, logout, saveAddress, removeAddress } = useStore();
  const [tab, setTab] = useState('pedidos');

  if (!user) return <Navigate to="/cuenta/login" replace />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-fire to-crimson text-white">
            <Icon name="user" size={32} />
          </span>
          <div>
            <h1 className="font-display text-4xl text-chrome">Hola, {user.name?.split(' ')[0] || 'rider'}</h1>
            <p className="text-sm text-fog">{user.email}</p>
          </div>
        </div>
        <Button onClick={logout} variant="outline" icon="arrow">Cerrar sesión</Button>
      </div>

      {/* tabs */}
      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto border-b border-white/5">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 font-heading text-sm font-600 uppercase tracking-wide transition-colors ${
              tab === t.id ? 'border-fire text-fire' : 'border-transparent text-fog hover:text-chrome'
            }`}
          >
            <Icon name={t.icon} size={18} /> {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8">
        {tab === 'pedidos' && <Orders orders={userOrders} />}
        {tab === 'direcciones' && (
          <Addresses addresses={user.addresses || []} onAdd={saveAddress} onRemove={removeAddress} />
        )}
        {tab === 'datos' && <Datos user={user} />}
      </div>
    </div>
  );
}

function Orders({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="grid place-items-center rounded-xl border border-dashed border-white/10 py-20 text-center">
        <Icon name="cart" size={48} className="text-steel" />
        <p className="mt-4 font-heading text-xl uppercase text-chrome">Aún no tienes pedidos</p>
        <p className="mt-1 text-fog">Cuando compres, tus pedidos aparecerán aquí.</p>
        <Button to="/catalogo" className="mt-6" icon="arrow">Explorar catálogo</Button>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {orders.map((o) => (
        <div key={o.id} className="surface rounded-xl p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-heading text-lg font-700 text-chrome">{orderCode(o.id)}</span>
              <Badge tone={STATUS_TONE[o.status] || 'chrome'}>{o.status}</Badge>
            </div>
            <span className="text-sm text-fog">{formatDate(o.createdAt)}</span>
          </div>

          {/* tracking bar */}
          <Tracking status={o.status} />

          <div className="mt-4 space-y-1 border-t border-white/5 pt-4 text-sm">
            {o.items.map((it, i) => (
              <div key={i} className="flex justify-between text-fog">
                <span className="text-chrome">{it.qty}× {it.name}</span>
                <span>{formatCOP(it.price * it.qty)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
            <span className="text-sm text-fog">{o.payment}</span>
            <span className="font-display text-2xl text-white">{formatCOP(o.total)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Tracking({ status }) {
  const steps = ['confirmado', 'en camino', 'entregado'];
  const current = Math.max(0, steps.indexOf(status));
  return (
    <div className="mt-4 flex items-center">
      {steps.map((s, i) => (
        <div key={s} className="flex flex-1 items-center last:flex-none">
          <span
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs ${
              i <= current ? 'bg-fire text-white' : 'bg-ink-700 text-steel'
            }`}
          >
            {i < current ? <Icon name="check" size={16} /> : i + 1}
          </span>
          {i < steps.length - 1 && (
            <span className={`mx-1 h-0.5 flex-1 ${i < current ? 'bg-fire' : 'bg-ink-700'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

function Addresses({ addresses, onAdd, onRemove }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ label: 'Casa', department: 'Córdoba', city: 'Montería', address: '' });
  const field = 'w-full rounded-md border border-white/10 bg-ink-800 px-3 py-2.5 text-sm text-chrome placeholder:text-steel focus:border-fire focus:outline-none';

  const submit = (e) => {
    e.preventDefault();
    if (!form.address.trim()) return;
    onAdd(form);
    setForm({ label: 'Casa', department: 'Córdoba', city: 'Montería', address: '' });
    setOpen(false);
  };

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="surface flex items-start justify-between gap-3 rounded-xl p-5">
            <div>
              <Badge tone="chrome">{a.label}</Badge>
              <p className="mt-2 text-chrome">{a.address}</p>
              <p className="text-sm text-fog">{a.city}, {a.department}</p>
            </div>
            <button type="button" onClick={() => onRemove(a.id)} className="text-fog hover:text-crimson-bright" aria-label="Eliminar dirección">
              <Icon name="trash" size={18} />
            </button>
          </div>
        ))}

        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid place-items-center gap-2 rounded-xl border border-dashed border-white/15 p-5 text-fog transition-colors hover:border-fire hover:text-fire"
          >
            <Icon name="plus" size={24} />
            <span className="font-heading text-sm font-600 uppercase tracking-wide">Agregar dirección</span>
          </button>
        )}
      </div>

      {open && (
        <form onSubmit={submit} className="surface mt-4 grid gap-4 rounded-xl p-6 sm:grid-cols-2">
          <input className={field} placeholder="Etiqueta (Casa, Trabajo)" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
          <input className={field} placeholder="Departamento" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
          <input className={field} placeholder="Ciudad" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
          <input className={field} placeholder="Dirección" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <div className="flex gap-3 sm:col-span-2">
            <Button as="button" type="submit" icon="check">Guardar</Button>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
          </div>
        </form>
      )}
    </div>
  );
}

function Datos({ user }) {
  const rows = [
    { label: 'Nombre', value: user.name },
    { label: 'Correo', value: user.email },
    { label: 'Teléfono', value: user.phone || 'No registrado' },
  ];
  return (
    <div className="surface max-w-xl rounded-xl p-6">
      <dl className="divide-y divide-white/5">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between py-3">
            <dt className="font-heading text-sm font-600 uppercase tracking-wide text-fog">{r.label}</dt>
            <dd className="text-chrome">{r.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs text-steel">
        ¿Necesitas actualizar tus datos? Escríbenos por WhatsApp o vuelve a registrarte.
      </p>
    </div>
  );
}
