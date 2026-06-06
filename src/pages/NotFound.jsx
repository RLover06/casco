import Icon from '../components/Icon';
import { Button } from '../components/ui';

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-2xl place-items-center px-4 py-32 text-center">
      <Icon name="helmet" size={80} className="text-steel" />
      <p className="mt-6 font-display text-7xl text-gradient-fire">404</p>
      <h1 className="mt-2 font-display text-4xl text-chrome">PÁGINA NO ENCONTRADA</h1>
      <p className="mt-2 text-fog">Parece que tomaste un desvío. Volvamos a la ruta principal.</p>
      <Button to="/" className="mt-6" icon="arrow">Ir al inicio</Button>
    </div>
  );
}
