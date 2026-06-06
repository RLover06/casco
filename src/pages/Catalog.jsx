import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../components/Icon';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { Badge } from '../components/ui';
import { CATEGORIES, PRODUCTS, categoryName } from '../data/products';

const SORTS = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'rating', label: 'Mejor valorados' },
];

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const activeCat = params.get('categoria') || 'todos';
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('relevancia');

  const setCategory = (slug) => {
    const next = new URLSearchParams(params);
    if (slug === 'todos') next.delete('categoria');
    else next.set('categoria', slug);
    setParams(next, { replace: true });
  };

  const products = useMemo(() => {
    let list = PRODUCTS.filter((p) => (activeCat === 'todos' ? true : p.category === activeCat));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.short.toLowerCase().includes(q),
      );
    }
    switch (sort) {
      case 'precio-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'precio-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
  }, [activeCat, query, sort]);

  const chips = [{ slug: 'todos', name: 'Todos' }, ...CATEGORIES];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      {/* page header */}
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-ink-700 to-ink p-8 md:p-12">
        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-fire/15 blur-3xl" />
        <Badge tone="fire" icon="fire">Catálogo</Badge>
        <h1 className="mt-4 font-display text-5xl text-chrome md:text-6xl">
          {activeCat === 'todos' ? 'TODO EL EQUIPO' : categoryName(activeCat).toUpperCase()}
        </h1>
        <p className="mt-3 max-w-xl text-fog">
          Encuentra el equipo perfecto para tu moto. Stock disponible y pago contraentrega.
        </p>
      </div>

      {/* controls */}
      <div className="sticky top-[64px] z-30 mt-8 -mx-4 bg-ink/85 px-4 py-4 backdrop-blur-md md:mx-0 md:rounded-xl md:px-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
            {chips.map((c) => {
              const active = activeCat === c.slug;
              return (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => setCategory(c.slug)}
                  className={`shrink-0 rounded-full border px-4 py-2 font-heading text-sm font-600 uppercase tracking-wide transition-all ${
                    active
                      ? 'border-fire bg-fire text-white'
                      : 'border-white/10 text-fog hover:border-fire/50 hover:text-chrome'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            <div className="relative flex-1 lg:w-64">
              <Icon name="search" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fog" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full rounded-md border border-white/10 bg-ink-800 py-2.5 pl-10 pr-3 text-sm text-chrome placeholder:text-steel focus:border-fire focus:outline-none"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Ordenar productos"
              className="rounded-md border border-white/10 bg-ink-800 px-3 py-2.5 text-sm text-chrome focus:border-fire focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value} className="bg-ink-800">
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* results */}
      <p className="mt-6 text-sm text-fog">
        {products.length} {products.length === 1 ? 'producto' : 'productos'}
      </p>

      {products.length === 0 ? (
        <div className="mt-10 grid place-items-center rounded-xl border border-dashed border-white/10 py-20 text-center">
          <Icon name="search" size={48} className="text-steel" />
          <p className="mt-4 font-heading text-xl uppercase text-chrome">Sin resultados</p>
          <p className="mt-1 text-fog">Prueba con otra categoría o búsqueda.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
