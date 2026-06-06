import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { AuthShell } from './Login';
import { useStore } from '../context/StoreContext';

export default function Register() {
  const { register } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.');
    if (form.password !== form.confirm) return setError('Las contraseñas no coinciden.');
    const res = register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    if (res.ok) navigate('/cuenta/perfil');
    else setError(res.error);
  };

  const field = 'w-full rounded-md border border-white/10 bg-ink-800 px-3 py-2.5 text-sm text-chrome placeholder:text-steel focus:border-fire focus:outline-none';
  const lbl = 'mb-1.5 block font-heading text-xs font-600 uppercase tracking-wider text-fog';

  return (
    <AuthShell title="Crea tu cuenta" subtitle="Guarda tus direcciones y sigue tus pedidos.">
      <form onSubmit={submit} className="space-y-4">
        {error && (
          <p className="rounded-md border border-crimson/30 bg-crimson/10 px-3 py-2 text-sm text-crimson-bright">{error}</p>
        )}
        <label className="block">
          <span className={lbl}>Nombre completo</span>
          <input required value={form.name} onChange={update('name')} className={field} placeholder="Juan Pérez" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={lbl}>Correo</span>
            <input type="email" required value={form.email} onChange={update('email')} className={field} placeholder="correo@email.com" />
          </label>
          <label className="block">
            <span className={lbl}>Teléfono</span>
            <input value={form.phone} onChange={update('phone')} className={field} placeholder="300 123 4567" inputMode="tel" />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={lbl}>Contraseña</span>
            <input type="password" required value={form.password} onChange={update('password')} className={field} placeholder="••••••••" />
          </label>
          <label className="block">
            <span className={lbl}>Confirmar</span>
            <input type="password" required value={form.confirm} onChange={update('confirm')} className={field} placeholder="••••••••" />
          </label>
        </div>
        <Button as="button" type="submit" size="lg" className="w-full" icon="arrow">Crear cuenta</Button>
      </form>
      <p className="mt-6 text-center text-sm text-fog">
        ¿Ya tienes cuenta?{' '}
        <Link to="/cuenta/login" className="font-600 text-fire hover:underline">Inicia sesión</Link>
      </p>
    </AuthShell>
  );
}
