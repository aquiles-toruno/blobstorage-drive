import './App.css';
import Layout from './shared/Layout';
import Drive from './containers/Drive';
import { Route, Routes } from 'react-router-dom'
import { DriveLayoutEnum } from './models/DriveLayoutEnum';
import { useState, useEffect } from 'react';

function App() {
  let [_layout, setLayout] = useState(DriveLayoutEnum.Card);

  const onChangeLayoutHandle = (layout: DriveLayoutEnum) => {
    setLayout(layout)
  }

  //Component did mount
  useEffect(() => {
    let storedLayout: string | null = localStorage.getItem("layout")

    if (storedLayout != null) {
      let driveLayoutEnum: DriveLayoutEnum = storedLayout as DriveLayoutEnum
      setLayout(driveLayoutEnum);
    }
  }, []);

  //When _layout changes
  useEffect(() => {
    localStorage.setItem("layout", _layout.toString())
  }, [_layout]);

  return (
    <Routes>
      <Route path="/" element={<Layout layout={_layout} onChangeLayout={onChangeLayoutHandle} />}>
        <Route path="/" element={<Drive layout={_layout} />} />
        <Route path="/location/:rid" element={<Drive layout={_layout} />} />
      </Route>
    </Routes>
  );
}

export default App;