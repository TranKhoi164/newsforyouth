import React, {useState, useEffect} from 'react';
import Header from './components/header/Header';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, makeStyles  } from "@material-ui/core";
import MainPage from './components/MainPage';

const globalStyle = makeStyles((theme) => ({
  banner: {
    width: '100%',
    height: '300px',
    background: '#e6e3e3',
    position: 'relative',
  },
  banner_img: {
    width: '80%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
}))

const theme = createTheme({

})

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    const formS = JSON.parse(localStorage.getItem('user'))
    if (Object.keys(user).length === 0) {
      setUser({...user, ...formS})
    }
  }, [])

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <CssBaseline />
          <Header user={user} setUser={setUser} />
          <MainPage user={user} setUser={setUser} globalStyle={globalStyle} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
