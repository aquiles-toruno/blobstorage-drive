import './App.css';
import Layout from './shared/Layout';
import Drive from './containers/Drive';
import { Route, Routes } from 'react-router-dom'
import { DriveLayoutEnum } from './models/DriveLayoutEnum';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  // let { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } = useAuth0()

  // console.log(user)
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