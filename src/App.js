import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideBar from './components/SideBar';
import Home from './views/Home';
import Login from './views/Login';
import Container from '@material-ui/core/Container';
import { UserProvider } from './UserContext';

const routes = [
  {
    name: 'Home',
    path: '/',
    exact: true,
    component: <Home />,
  },
  {
    name: 'Login',
    path: '/login',
    exact: true,
    component: <Login />,
  },
];

function App() {
  return (
    <UserProvider>
      <Router>
        <SideBar
          routes={routes.filter(
            (x) =>
              !['Login', 'Course', 'Student', 'Attendance'].includes(x.name)
          )}
        />
        <Container style={{ marginTop: '5rem' }}>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.name}
                path={route.path}
                exact={route.exact}
                render={() => route.component}
              />
            ))}
          </Switch>
        </Container>
      </Router>
    </UserProvider>
  );
}

export default App;
