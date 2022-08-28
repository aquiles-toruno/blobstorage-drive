import './App.css';
import Layout from './shared/Layout';
import Drive from './containers/Drive';
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Drive />} />
        <Route path="/location/:rid" element={<Drive />} />
      </Route>
    </Routes>
  );
}

export default App;