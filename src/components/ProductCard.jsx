import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';
import { Badge, Stars } from './ui';
import Icon from './Icon';
import { formatCOP } from '../lib/format';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product }) {
  const { addToCart } = useStore();
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  const lowStock = product.stock > 0 && product.stock <= 8;

  return (
    <article className="group surface clip-corner overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-fire/40 hover:shadow-[0_20px_50px_-20px_rgba(255,90,31,0.5)]">
      <Link to={`/producto/${product.id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <ProductImage
            product={product}
            className="h-full w-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {discount > 0 && <Badge tone="crimson" icon="fire">-{discount}%</Badge>}
            {product.featured && <Badge tone="fire">Destacado</Badge>}
          </div>
          {product.stock === 0 && (
            <div className="absolute inset-0 grid place-items-center bg-ink/70 backdrop-blur-sm">
              <span className="font-heading text-lg font-700 uppercase tracking-wider text-crimson-bright">
                Agotado
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="font-heading text-xs uppercase tracking-widest text-fog">
            {product.category}
          </span>
          <Stars value={product.rating} />
        </div>

        <Link to={`/producto/${product.id}`}>
          <h3 className="mt-2 text-xl font-heading font-700 leading-tight text-chrome transition-colors group-hover:text-fire">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-fog">{product.short}</p>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-heading font-700 text-white">
                {formatCOP(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-steel line-through">
                  {formatCOP(product.oldPrice)}
                </span>
              )}
            </div>
            {lowStock && (
              <span className="mt-1 block text-xs font-600 text-fire">
                ¡Solo quedan {product.stock}!
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={product.stock === 0}
            onClick={() => addToCart(product.id)}
            aria-label={`Agregar ${product.name} al carrito`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink-700 text-chrome transition-all hover:bg-fire hover:text-white disabled:opacity-40"
          >
            <Icon name="cart" size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
