import { Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Location from './pages/Location';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <StoreProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cuenta/login" element={<Login />} />
          <Route path="/cuenta/registro" element={<Register />} />
          <Route path="/cuenta/perfil" element={<Profile />} />
          <Route path="/ubicacion" element={<Location />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </StoreProvider>
  );
}
