import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Home from './routes/Home'
import UpdatePage from './routes/UpdatePage'
import RestaurantDetailPage from './routes/RestaurantDetailPage'
import Login from './routes/Login'
import Register from './routes/Register'
import { RestaurantContextProvider } from './context/RestaurantsContext'
import AuthApi from './apis/AuthApi'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }

  const isAuth = async () => {
    try {
      const res = await AuthApi.get('/verify', {
        headers: {
          token: localStorage.token,
        },
      })

      res.data ? setIsAuthenticated(true) : setIsAuthenticated(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(async () => {
    isAuth()
  }, [])

  return (
    <RestaurantContextProvider>
      <div className='container'>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route
              exact
              path='/restaurants/:id/update'
              component={UpdatePage}
            />
            <Route
              exact
              path='/restaurants/:id/'
              render={(props) => (
                <RestaurantDetailPage
                  {...props}
                  isAuthenticated={isAuthenticated}
                />
              )}
            />
            <Route
              exact
              path='/login'
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to='/' />
                )
              }
            />
            <Route
              exact
              path='/register'
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to='/' />
                )
              }
            />
          </Switch>
        </Router>
      </div>
    </RestaurantContextProvider>
  )
}

export default App
