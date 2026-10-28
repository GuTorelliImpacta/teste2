import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { StickyCTA } from './StickyCTA';
import { loadAnalytics } from '@/lib/analytics';

export function Layout() {
  useEffect(() => loadAnalytics(), []);
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
