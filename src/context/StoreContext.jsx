import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { loadJSON, saveJSON } from '../lib/storage';
import { getProduct } from '../data/products';

const StoreContext = createContext(null);

const CART_KEY = 'lcc_cart';
const USERS_KEY = 'lcc_users';
const SESSION_KEY = 'lcc_session';
const ORDERS_KEY = 'lcc_orders';

/* ----------------------------- Cart reducer ----------------------------- */
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const { id, qty = 1, color } = action;
      const key = color ? `${id}::${color}` : id;
      const existing = state.find((i) => i.key === key);
      if (existing) {
        return state.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [...state, { key, id, color, qty }];
    }
    case 'SET_QTY': {
      const qty = Math.max(1, action.qty);
      return state.map((i) => (i.key === action.key ? { ...i, qty } : i));
    }
    case 'REMOVE':
      return state.filter((i) => i.key !== action.key);
    case 'CLEAR':
      return [];
    case 'HYDRATE':
      return action.payload;
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Hydrate from storage once on mount.
  useEffect(() => {
    dispatch({ type: 'HYDRATE', payload: loadJSON(CART_KEY, []) });
    const sessionEmail = loadJSON(SESSION_KEY, null);
    if (sessionEmail) {
      const users = loadJSON(USERS_KEY, {});
      if (users[sessionEmail]) setUser(stripPassword(users[sessionEmail]));
    }
    setOrders(loadJSON(ORDERS_KEY, []));
  }, []);

  // Persist cart whenever it changes.
  useEffect(() => {
    saveJSON(CART_KEY, cart);
  }, [cart]);

  /* ------------------------------- Cart API ------------------------------ */
  const addToCart = (id, opts = {}) => dispatch({ type: 'ADD', id, ...opts });
  const setQty = (key, qty) => dispatch({ type: 'SET_QTY', key, qty });
  const removeFromCart = (key) => dispatch({ type: 'REMOVE', key });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const cartDetailed = useMemo(
    () =>
      cart
        .map((item) => {
          const product = getProduct(item.id);
          if (!product) return null;
          return { ...item, product, lineTotal: product.price * item.qty };
        })
        .filter(Boolean),
    [cart],
  );

  const cartCount = useMemo(() => cart.reduce((n, i) => n + i.qty, 0), [cart]);
  const cartSubtotal = useMemo(
    () => cartDetailed.reduce((sum, i) => sum + i.lineTotal, 0),
    [cartDetailed],
  );

  /* ------------------------------- Auth API ------------------------------ */
  const register = ({ name, email, password, phone }) => {
    const users = loadJSON(USERS_KEY, {});
    const normalized = email.trim().toLowerCase();
    if (users[normalized]) {
      return { ok: false, error: 'Ya existe una cuenta con este correo.' };
    }
    const record = { name, email: normalized, password, phone, addresses: [] };
    users[normalized] = record;
    saveJSON(USERS_KEY, users);
    saveJSON(SESSION_KEY, normalized);
    setUser(stripPassword(record));
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const users = loadJSON(USERS_KEY, {});
    const normalized = email.trim().toLowerCase();
    const record = users[normalized];
    if (!record || record.password !== password) {
      return { ok: false, error: 'Correo o contraseña incorrectos.' };
    }
    saveJSON(SESSION_KEY, normalized);
    setUser(stripPassword(record));
    return { ok: true };
  };

  const logout = () => {
    saveJSON(SESSION_KEY, null);
    setUser(null);
  };

  const saveAddress = (address) => {
    if (!user) return;
    const users = loadJSON(USERS_KEY, {});
    const record = users[user.email];
    if (!record) return;
    record.addresses = [...(record.addresses || []), { id: crypto.randomUUID(), ...address }];
    users[user.email] = record;
    saveJSON(USERS_KEY, users);
    setUser(stripPassword(record));
  };

  const removeAddress = (id) => {
    if (!user) return;
    const users = loadJSON(USERS_KEY, {});
    const record = users[user.email];
    if (!record) return;
    record.addresses = (record.addresses || []).filter((a) => a.id !== id);
    users[user.email] = record;
    saveJSON(USERS_KEY, users);
    setUser(stripPassword(record));
  };

  /* ------------------------------ Orders API ----------------------------- */
  const placeOrder = ({ items, customer, total }) => {
    const order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: 'confirmado',
      payment: 'Contraentrega',
      items,
      customer,
      total,
      ownerEmail: user?.email ?? null,
    };
    const all = loadJSON(ORDERS_KEY, []);
    const next = [order, ...all];
    saveJSON(ORDERS_KEY, next);
    setOrders(next);
    clearCart();
    return order;
  };

  const userOrders = useMemo(
    () => (user ? orders.filter((o) => o.ownerEmail === user.email) : []),
    [orders, user],
  );

  const value = {
    // cart
    cart,
    cartDetailed,
    cartCount,
    cartSubtotal,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    // auth
    user,
    register,
    login,
    logout,
    saveAddress,
    removeAddress,
    // orders
    orders,
    userOrders,
    placeOrder,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

function stripPassword(record) {
  const { password, ...rest } = record;
  void password;
  return rest;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
