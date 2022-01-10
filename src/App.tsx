import './App.css';
import Layout from './shared/Layout';
import Drive from './containers/Drive';
import { Route, Routes } from 'react-router-dom'
import { DriveLayoutEnum } from './models/DriveLayoutEnum';
import { useState } from 'react';

function App() {
  let [_layout, setLayout] = useState(DriveLayoutEnum.Card);

  const onChangeLayoutHandle = (layout: DriveLayoutEnum) => {
    setLayout(layout)
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout onChangeLayout={onChangeLayoutHandle} />}>
          <Route path="/" element={<Drive layout={_layout} />} />
          <Route path="/location/:rid" element={<Drive layout={_layout} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
