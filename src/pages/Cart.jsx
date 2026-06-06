import { Link } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import Icon from '../components/Icon';
import { Badge, Button } from '../components/ui';
import { formatCOP } from '../lib/format';
import { useStore } from '../context/StoreContext';

export default function Cart() {
  const { cartDetailed, cartSubtotal, cartCount, setQty, removeFromCart, clearCart } = useStore();

  if (cartDetailed.length === 0) {
    return (
      <div className="mx-auto grid max-w-3xl place-items-center px-4 py-28 text-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-ink-700 text-fog">
          <Icon name="cart" size={48} />
        </span>
        <h1 className="mt-6 font-display text-4xl text-chrome">Tu carrito está vacío</h1>
        <p className="mt-2 text-fog">Agrega productos y recíbelos contraentrega.</p>
        <Button to="/catalogo" className="mt-6" icon="arrow">Explorar catálogo</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <h1 className="font-display text-5xl text-chrome">TU CARRITO</h1>
      <p className="mt-2 text-fog">{cartCount} {cartCount === 1 ? 'artículo' : 'artículos'}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* items */}
        <div className="space-y-4">
          {cartDetailed.map((item) => (
            <div key={item.key} className="surface flex gap-4 rounded-xl p-4">
              <Link to={`/producto/${item.id}`} className="shrink-0">
                <ProductImage product={item.product} className="h-24 w-24 rounded-lg sm:h-28 sm:w-28" iconSize={48} />
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to={`/producto/${item.id}`} className="font-heading text-lg font-700 leading-tight text-chrome hover:text-fire">
                      {item.product.name}
                    </Link>
                    {item.color && <p className="text-sm text-fog">Color: {item.color}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.key)}
                    className="text-fog transition-colors hover:text-crimson-bright"
                    aria-label="Eliminar"
                  >
                    <Icon name="trash" size={18} />
                  </button>
                </div>

                <div className="mt-auto flex items-end justify-between pt-3">
                  <div className="flex items-center rounded-md border border-white/10 bg-ink-800">
                    <button
                      type="button"
                      onClick={() => setQty(item.key, item.qty - 1)}
                      className="grid h-9 w-9 place-items-center text-chrome hover:text-fire"
                      aria-label="Disminuir"
                    >
                      <Icon name="minus" size={16} />
                    </button>
                    <span className="w-8 text-center font-heading font-700 text-white">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(item.key, item.qty + 1)}
                      className="grid h-9 w-9 place-items-center text-chrome hover:text-fire"
                      aria-label="Aumentar"
                    >
                      <Icon name="plus" size={16} />
                    </button>
                  </div>
                  <span className="font-heading text-xl font-700 text-white">{formatCOP(item.lineTotal)}</span>
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={clearCart}
            className="text-sm text-fog transition-colors hover:text-crimson-bright"
          >
            Vaciar carrito
          </button>
        </div>

        {/* summary */}
        <aside className="h-max lg:sticky lg:top-24">
          <div className="surface clip-corner rounded-xl p-6">
            <h2 className="font-heading text-xl font-700 uppercase tracking-wide text-chrome">Resumen</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-fog">
                <dt>Subtotal</dt>
                <dd className="text-chrome">{formatCOP(cartSubtotal)}</dd>
              </div>
              <div className="flex justify-between text-fog">
                <dt>Envío</dt>
                <dd className="text-emerald-400">Se calcula en checkout</dd>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base">
                <dt className="font-heading font-700 uppercase text-chrome">Total</dt>
                <dd className="font-display text-3xl text-white">{formatCOP(cartSubtotal)}</dd>
              </div>
            </dl>

            <Badge tone="green" icon="shield" className="mt-5">Pago 100% contraentrega</Badge>

            <Button to="/checkout" size="lg" className="mt-5 w-full" icon="arrow">
              Continuar al pago
            </Button>
            <Button to="/catalogo" variant="ghost" className="mt-2 w-full">
              Seguir comprando
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
