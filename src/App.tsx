import './App.css';
import Layout from './shared/Layout';
import Drive from './containers/Drive';
import { Route, Routes } from 'react-router-dom'
import { DriveLayoutEnum } from './models/DriveLayoutEnum';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  let [_layout, setLayout] = useState(DriveLayoutEnum.Card);

  // let { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } = useAuth0()

  // console.log(user)

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

  // if (isAuthenticated)
  //   getAccessTokenSilently().then((data) => {
  //     console.log(data)
  //   })

  // if (isAuthenticated)
  return (
    <Routes>
      <Route path="/" element={<Layout layout={_layout} onChangeLayout={onChangeLayoutHandle} />}>
        <Route path="/" element={<Drive />} />
        <Route path="/location/:rid" element={<Drive />} />
      </Route>
    </Routes>
  );
  // else
  //   return <button onClick={loginWithRedirect}>Log in</button>;
}

export default App;