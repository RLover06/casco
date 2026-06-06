import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductImage from '../components/ProductImage';
import Icon from '../components/Icon';
import { Badge, Button } from '../components/ui';
import { formatCOP, orderCode, formatDate } from '../lib/format';
import { whatsappLink } from '../data/site';
import { useStore } from '../context/StoreContext';

const DEPARTMENTS = [
  'Córdoba', 'Sucre', 'Bolívar', 'Atlántico', 'Antioquia', 'Cesar', 'Magdalena',
  'Santander', 'Cundinamarca', 'Valle del Cauca', 'Otro',
];

const empty = { name: '', phone: '', email: '', department: 'Córdoba', city: 'Montería', address: '', notes: '' };

export default function Checkout() {
  const { cartDetailed, cartSubtotal, placeOrder, user } = useStore();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (user) {
      setForm((f) => ({
        ...f,
        name: f.name || user.name || '',
        email: f.email || user.email || '',
        phone: f.phone || user.phone || '',
        ...(user.addresses?.[0]
          ? {
              department: user.addresses[0].department,
              city: user.addresses[0].city,
              address: user.addresses[0].address,
            }
          : {}),
      }));
    }
  }, [user]);

  const isMonteria = form.city.trim().toLowerCase() === 'montería' || form.city.trim().toLowerCase() === 'monteria';
  const shipping = isMonteria ? 0 : cartSubtotal > 300000 ? 0 : 18000;
  const total = cartSubtotal + shipping;

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Ingresa tu nombre completo.';
    if (!/^\d{7,}$/.test(form.phone.replace(/\D/g, ''))) next.phone = 'Teléfono inválido.';
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) next.email = 'Correo inválido.';
    if (!form.address.trim()) next.address = 'Ingresa la dirección de entrega.';
    if (!form.city.trim()) next.city = 'Ingresa la ciudad.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const items = cartDetailed.map((i) => ({
      id: i.id,
      name: i.product.name,
      category: i.product.category,
      color: i.color,
      qty: i.qty,
      price: i.product.price,
    }));
    const placed = placeOrder({ items, customer: { ...form, shipping }, total });
    setOrder(placed);
    window.scrollTo({ top: 0 });
  };

  /* ----------------------- Confirmation screen ----------------------- */
  if (order) {
    const waMsg =
      `¡Hola! Acabo de hacer el pedido *${orderCode(order.id)}* por ${formatCOP(order.total)} (contraentrega). ` +
      `Mi nombre es ${order.customer.name}, entrega en ${order.customer.address}, ${order.customer.city}.`;
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 md:px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15 text-emerald-400"
        >
          <Icon name="check" size={44} strokeWidth={2.5} />
        </motion.div>

        <h1 className="mt-6 text-center font-display text-5xl text-chrome">¡PEDIDO CONFIRMADO!</h1>
        <p className="mt-3 text-center text-fog">
          Tu pedido <span className="font-700 text-fire">{orderCode(order.id)}</span> fue registrado.
          Enviamos la confirmación a{' '}
          <span className="text-chrome">{order.customer.email || 'tu WhatsApp'}</span> y te
          contactaremos para coordinar la entrega contraentrega.
        </p>

        <div className="surface clip-corner mt-8 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <Badge tone="green" icon="check">Contraentrega</Badge>
            <span className="text-sm text-fog">{formatDate(order.createdAt)}</span>
          </div>

          <div className="mt-5 space-y-3">
            {order.items.map((it, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-chrome">{it.qty}× {it.name}{it.color ? ` · ${it.color}` : ''}</span>
                <span className="text-fog">{formatCOP(it.price * it.qty)}</span>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between text-fog"><span>Envío</span><span>{order.customer.shipping === 0 ? 'Gratis' : formatCOP(order.customer.shipping)}</span></div>
            <div className="flex justify-between text-base">
              <span className="font-heading font-700 uppercase text-chrome">Total a pagar</span>
              <span className="font-display text-2xl text-white">{formatCOP(order.total)}</span>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-white/5 bg-ink-800 p-4 text-sm text-fog">
            <p className="font-600 text-chrome">Entrega a:</p>
            <p>{order.customer.name} · {order.customer.phone}</p>
            <p>{order.customer.address}, {order.customer.city}, {order.customer.department}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsappLink(waMsg)} size="lg" icon="whatsapp" className="flex-1">
            Confirmar por WhatsApp
          </Button>
          <Button to={user ? '/cuenta/perfil' : '/catalogo'} variant="outline" size="lg" className="flex-1">
            {user ? 'Ver mis pedidos' : 'Seguir comprando'}
          </Button>
        </div>
      </div>
    );
  }

  /* --------------------------- Empty guard --------------------------- */
  if (cartDetailed.length === 0) {
    return (
      <div className="mx-auto grid max-w-3xl place-items-center px-4 py-28 text-center">
        <Icon name="cart" size={48} className="text-steel" />
        <h1 className="mt-6 font-display text-4xl text-chrome">No hay nada para pagar</h1>
        <Button to="/catalogo" className="mt-6" icon="arrow">Ir al catálogo</Button>
      </div>
    );
  }

  /* ----------------------------- Form ----------------------------- */
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <Link to="/carrito" className="inline-flex items-center gap-2 text-sm text-fog hover:text-chrome">
        <Icon name="arrowLeft" size={16} /> Volver al carrito
      </Link>
      <h1 className="mt-4 font-display text-5xl text-chrome">FINALIZAR COMPRA</h1>
      <p className="mt-2 text-fog">Modalidad exclusiva: <span className="font-600 text-fire">pago contraentrega</span>. Pagas cuando recibes.</p>

      <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* form fields */}
        <div className="space-y-6">
          <fieldset className="surface rounded-xl p-6">
            <legend className="px-2 font-heading text-lg font-700 uppercase tracking-wide text-chrome">
              Datos de contacto
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Nombre completo" error={errors.name}>
                <input className={inputCls(errors.name)} value={form.name} onChange={update('name')} placeholder="Juan Pérez" />
              </Field>
              <Field label="Teléfono / WhatsApp" error={errors.phone}>
                <input className={inputCls(errors.phone)} value={form.phone} onChange={update('phone')} placeholder="300 123 4567" inputMode="tel" />
              </Field>
              <Field label="Correo (opcional)" error={errors.email} className="sm:col-span-2">
                <input className={inputCls(errors.email)} value={form.email} onChange={update('email')} placeholder="tucorreo@email.com" type="email" />
              </Field>
            </div>
          </fieldset>

          <fieldset className="surface rounded-xl p-6">
            <legend className="px-2 font-heading text-lg font-700 uppercase tracking-wide text-chrome">
              Dirección de entrega
            </legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Departamento">
                <select className={inputCls()} value={form.department} onChange={update('department')}>
                  {DEPARTMENTS.map((d) => <option key={d} value={d} className="bg-ink-800">{d}</option>)}
                </select>
              </Field>
              <Field label="Ciudad" error={errors.city}>
                <input className={inputCls(errors.city)} value={form.city} onChange={update('city')} placeholder="Montería" />
              </Field>
              <Field label="Dirección completa" error={errors.address} className="sm:col-span-2">
                <input className={inputCls(errors.address)} value={form.address} onChange={update('address')} placeholder="Cra 6 # 30-45, Barrio Centro" />
              </Field>
              <Field label="Notas para el repartidor (opcional)" className="sm:col-span-2">
                <textarea className={`${inputCls()} resize-none`} rows={3} value={form.notes} onChange={update('notes')} placeholder="Punto de referencia, horario preferido..." />
              </Field>
            </div>
          </fieldset>

          <div className="flex items-center gap-3 rounded-xl border border-fire/20 bg-fire/5 p-4">
            <Icon name="shield" size={28} className="shrink-0 text-fire" />
            <p className="text-sm text-fog">
              <span className="font-600 text-chrome">Pago contraentrega:</span> no pagas nada ahora.
              Cancelas en efectivo cuando recibas tu pedido en la puerta de tu casa.
            </p>
          </div>
        </div>

        {/* summary */}
        <aside className="h-max lg:sticky lg:top-24">
          <div className="surface clip-corner rounded-xl p-6">
            <h2 className="font-heading text-xl font-700 uppercase tracking-wide text-chrome">Tu pedido</h2>

            <div className="mt-4 max-h-72 space-y-3 overflow-auto pr-1">
              {cartDetailed.map((i) => (
                <div key={i.key} className="flex items-center gap-3">
                  <ProductImage product={i.product} className="h-12 w-12 shrink-0 rounded-md" iconSize={24} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-chrome">{i.product.name}</p>
                    <p className="text-xs text-fog">{i.qty} × {formatCOP(i.product.price)}</p>
                  </div>
                  <span className="text-sm text-chrome">{formatCOP(i.lineTotal)}</span>
                </div>
              ))}
            </div>

            <dl className="mt-5 space-y-3 border-t border-white/10 pt-4 text-sm">
              <div className="flex justify-between text-fog"><dt>Subtotal</dt><dd className="text-chrome">{formatCOP(cartSubtotal)}</dd></div>
              <div className="flex justify-between text-fog">
                <dt>Envío {isMonteria && '(Montería)'}</dt>
                <dd className={shipping === 0 ? 'text-emerald-400' : 'text-chrome'}>{shipping === 0 ? 'Gratis' : formatCOP(shipping)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <dt className="font-heading font-700 uppercase text-chrome">Total</dt>
                <dd className="font-display text-3xl text-white">{formatCOP(total)}</dd>
              </div>
            </dl>

            <Button as="button" type="submit" size="lg" className="mt-5 w-full" icon="check">
              Confirmar pedido
            </Button>
            <p className="mt-3 text-center text-xs text-steel">
              Al confirmar aceptas ser contactado para coordinar la entrega.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function inputCls(error) {
  return `w-full rounded-md border bg-ink-800 px-3 py-2.5 text-sm text-chrome placeholder:text-steel focus:outline-none ${
    error ? 'border-crimson focus:border-crimson' : 'border-white/10 focus:border-fire'
  }`;
}

function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-heading text-xs font-600 uppercase tracking-wider text-fog">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-crimson-bright">{error}</span>}
    </label>
  );
}
