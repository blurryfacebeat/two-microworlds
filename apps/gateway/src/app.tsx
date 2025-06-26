import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const RemoteNextApp = lazy(() => import('nextApp/NextApp'));

export const App = () => {
  return (
    <div>
      <h1>Frontend Gateway</h1>
      <BrowserRouter>
        <nav style={{ padding: 12 }}>
          <Link to="/" style={{ marginRight: 12 }}>
            🏠 Home
          </Link>
          <Link to="/next" style={{ marginRight: 12 }}>
            Next App
          </Link>
        </nav>

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<div>Главная страница gateway</div>} />
            <Route path="/next" element={<RemoteNextApp />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};
