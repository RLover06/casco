import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductImage from '../components/ProductImage';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { Badge, Button, Stars } from '../components/ui';
import { formatCOP } from '../lib/format';
import { getProduct, PRODUCTS, categoryName } from '../data/products';
import { whatsappLink, SITE } from '../data/site';
import { useStore } from '../context/StoreContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProduct(id);
  const { addToCart } = useStore();
  const [color, setColor] = useState(product?.colors?.[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto grid max-w-3xl place-items-center px-4 py-32 text-center">
        <Icon name="helmet" size={64} className="text-steel" />
        <h1 className="mt-6 font-display text-4xl text-chrome">Producto no encontrado</h1>
        <p className="mt-2 text-fog">Es posible que ya no esté disponible.</p>
        <Button to="/catalogo" className="mt-6" icon="arrow">Volver al catálogo</Button>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product.id, { qty, color });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const buyNow = () => {
    addToCart(product.id, { qty, color });
    navigate('/carrito');
  };

  const waMsg = `¡Hola! Estoy interesado en *${product.name}* (${formatCOP(product.price)}). ¿Está disponible?`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      {/* breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-fog">
        <Link to="/" className="hover:text-chrome">Inicio</Link>
        <Icon name="chevron" size={14} />
        <Link to="/catalogo" className="hover:text-chrome">Catálogo</Link>
        <Icon name="chevron" size={14} />
        <Link to={`/catalogo?categoria=${product.category}`} className="hover:text-chrome">
          {categoryName(product.category)}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* gallery */}
        <Reveal>
          <div className="surface clip-corner aspect-square overflow-hidden rounded-2xl">
            <ProductImage product={product} className="h-full w-full" iconSize={180} />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((n) => (
              <div key={n} className="surface aspect-square overflow-hidden rounded-lg opacity-70">
                <ProductImage product={product} className="h-full w-full" iconSize={44} />
              </div>
            ))}
          </div>
        </Reveal>

        {/* info */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="chrome">{categoryName(product.category)}</Badge>
            {product.featured && <Badge tone="fire">Destacado</Badge>}
            {discount > 0 && <Badge tone="crimson" icon="fire">-{discount}%</Badge>}
          </div>

          <h1 className="mt-4 font-display text-4xl text-chrome md:text-5xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <Stars value={product.rating} size={18} />
            <span className="text-sm text-fog">{product.rating} · {product.stock} en stock</span>
          </div>

          <p className="mt-5 leading-relaxed text-fog">{product.description}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-5xl text-white">{formatCOP(product.price)}</span>
            {product.oldPrice && (
              <span className="mb-1 text-lg text-steel line-through">{formatCOP(product.oldPrice)}</span>
            )}
          </div>

          {/* colors */}
          {product.colors?.length > 0 && (
            <div className="mt-6">
              <p className="font-heading text-sm font-700 uppercase tracking-wider text-chrome">
                Color / Presentación
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    className={`rounded-md border px-4 py-2 text-sm font-600 transition-all ${
                      color === c
                        ? 'border-fire bg-fire/10 text-fire'
                        : 'border-white/10 text-fog hover:border-white/30'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* qty + actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-md border border-white/10 bg-ink-800">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-12 w-12 place-items-center text-chrome hover:text-fire"
                aria-label="Disminuir cantidad"
              >
                <Icon name="minus" size={18} />
              </button>
              <span className="w-10 text-center font-heading text-lg font-700 text-white">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="grid h-12 w-12 place-items-center text-chrome hover:text-fire"
                aria-label="Aumentar cantidad"
              >
                <Icon name="plus" size={18} />
              </button>
            </div>

            <Button
              onClick={handleAdd}
              size="lg"
              disabled={product.stock === 0}
              icon={added ? 'check' : 'cart'}
              className="flex-1 sm:flex-none"
            >
              {added ? 'Agregado' : 'Agregar al carrito'}
            </Button>
            <Button onClick={buyNow} variant="outline" size="lg" disabled={product.stock === 0}>
              Comprar ahora
            </Button>
          </div>

          <a
            href={whatsappLink(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-600 text-[#25D366] hover:underline"
          >
            <Icon name="whatsapp" size={18} />
            Pregunta por este producto en WhatsApp
          </a>

          {/* specs + trust */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {product.specs?.map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-md border border-white/5 bg-ink-800 px-3 py-2.5 text-sm text-chrome">
                <Icon name="check" size={16} className="text-fire" />
                {s}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-4 border-t border-white/5 pt-6 text-sm text-fog">
            <span className="flex items-center gap-2"><Icon name="truck" size={18} className="text-fire" /> Envío a todo el país</span>
            <span className="flex items-center gap-2"><Icon name="shield" size={18} className="text-fire" /> Pago contraentrega</span>
            <span className="flex items-center gap-2"><Icon name="bolt" size={18} className="text-fire" /> Entrega hoy en {SITE.city.split(',')[0]}</span>
          </div>
        </Reveal>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl text-chrome accent-bar md:text-4xl">También te puede gustar</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={(i % 4) * 0.06}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
