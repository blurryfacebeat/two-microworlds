import { FC } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Gallery = () => (
  <div>
    <h2>Random Images</h2>
    <img src={`https://picsum.photos/400?${Date.now()}`} />
  </div>
);

const App: FC = () => {
  return (
    <BrowserRouter basename="/images">
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
