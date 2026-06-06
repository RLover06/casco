import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import { Button } from '../components/ui';
import { useStore } from '../context/StoreContext';

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const res = login(form);
    if (res.ok) navigate('/cuenta/perfil');
    else setError(res.error);
  };

  return (
    <AuthShell title="Bienvenido de vuelta" subtitle="Ingresa para ver tus pedidos y comprar más rápido.">
      <form onSubmit={submit} className="space-y-4">
        {error && (
          <p className="rounded-md border border-crimson/30 bg-crimson/10 px-3 py-2 text-sm text-crimson-bright">
            {error}
          </p>
        )}
        <label className="block">
          <span className="mb-1.5 block font-heading text-xs font-600 uppercase tracking-wider text-fog">Correo</span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md border border-white/10 bg-ink-800 px-3 py-2.5 text-sm text-chrome placeholder:text-steel focus:border-fire focus:outline-none"
            placeholder="tucorreo@email.com"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block font-heading text-xs font-600 uppercase tracking-wider text-fog">Contraseña</span>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full rounded-md border border-white/10 bg-ink-800 px-3 py-2.5 text-sm text-chrome placeholder:text-steel focus:border-fire focus:outline-none"
            placeholder="••••••••"
          />
        </label>
        <Button as="button" type="submit" size="lg" className="w-full" icon="arrow">Iniciar sesión</Button>
      </form>
      <p className="mt-6 text-center text-sm text-fog">
        ¿No tienes cuenta?{' '}
        <Link to="/cuenta/registro" className="font-600 text-fire hover:underline">Regístrate</Link>
      </p>
    </AuthShell>
  );
}

export function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto grid max-w-md px-4 py-16 md:px-6">
      <Link to="/" className="mb-8 flex justify-center"><Logo /></Link>
      <div className="surface clip-corner rounded-2xl p-8">
        <span className="grid h-12 w-12 place-items-center rounded-md bg-fire/10 text-fire">
          <Icon name="user" size={26} />
        </span>
        <h1 className="mt-4 font-display text-3xl text-chrome">{title}</h1>
        <p className="mt-1 text-sm text-fog">{subtitle}</p>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
