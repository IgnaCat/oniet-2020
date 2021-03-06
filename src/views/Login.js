import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { UserContext } from '../UserContext';
/* import API from '../API'; */
import { Chip } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [error, setError] = useState(null);

  const [, setUser] = useContext(UserContext);
  const history = useHistory();

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8000/user/${email}/${password}`
      );
      const token = await response.json();
      setUser({ token });
      console.log(token.email);
      localStorage.setItem('covid-email', token.email);
      localStorage.setItem('covid-psw', token.password);
      localStorage.setItem('covid-co', token.country);
      history.push('/');
    } catch (error) {
      setError('Ingrese email o password validos');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper} style={{ marginTop: '10rem' }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={loginHandler} className={classes.form} noValidate>
          <TextField
            onChange={emailHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Email"
            label="Email"
            name="Email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            onChange={passwordHandler}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        {!!error && (
          <Chip
            label={error}
            color="secondary"
            onDelete={() => setError(null)}
          />
        )}
      </div>
    </Container>
  );
}
