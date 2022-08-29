import './App.css';
import Layout from './shared/Layout';
import Drive from './containers/Drive';
import { Route, Routes } from 'react-router-dom'
import { DriveLayoutEnum } from './models/DriveLayoutEnum';
import { useState } from 'react';
import AppRoutes from './shared/AppRoutes';
import RoutesCollection from './router'

function App() {
  let [_layout, setLayout] = useState(DriveLayoutEnum.Card);

  const onChangeLayoutHandle = (layout: DriveLayoutEnum) => {
    setLayout(layout)
  }

  return (
    <>
      {
        <AppRoutes routes={RoutesCollection} />
      }
    </>
  );
}

export default App;
