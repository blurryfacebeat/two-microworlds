import { FC, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const RemoteNextApp = lazy(() => import('nextApp/NextApp'));
const RemoteImageApp = lazy(() => import('imageApp/ImageApp'));
const RemoteTodoApp = lazy(() => import('todoApp/TodoApp'));

export const App: FC = () => {
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
          <Link to="/images" style={{ marginRight: 12 }}>
            Images App
          </Link>
          <Link to="/todo" style={{ marginRight: 12 }}>
            Todo App
          </Link>
        </nav>

        <Suspense fallback={<div>Loading MFs...</div>}>
          <Routes>
            <Route path="/" element={<div>Главная страница gateway</div>} />
            <Route path="/next" element={<RemoteNextApp />} />
            <Route path="/images/*" element={<RemoteImageApp />} />
            <Route path="/todo/*" element={<RemoteTodoApp />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};
