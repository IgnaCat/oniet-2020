import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Chip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 8,
    marginTop: '6rem',
  },
}));

export default function Edit() {
  const classes = useStyles();
  const [user, setUser] = useState();
  const [error, setError] = useState(null);

  const [firstname, setFirstname] = useState(undefined);
  const [lastname, setLastname] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [dni, setDni] = useState(undefined);
  const [country, setCountry] = useState(undefined);

  const data = {
    firstname: { firstname },
    lastname: { lastname },
    password: { password },
    dni: { dni },
    country: { country },
  };

  const history = useHistory();

  const firstnameHandeler = (e) => {
    setFirstname(e.target.value);
  };
  const lastnameHandler = (e) => {
    setLastname(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const dniHandler = (e) => {
    setDni(e.target.value);
  };
  const countryHandler = (e) => {
    setCountry(e.target.value);
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/post', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      console.log('FAFAF');
      history.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          className={classes.paper}
          style={{ marginTop: '10rem', marginBottom: '2rem' }}
        >
          <Typography component="h1" variant="h5">
            Editar Usuario
          </Typography>
          <form onSubmit={loginHandler} className={classes.form} noValidate>
            <TextField
              onChange={firstnameHandeler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="FirstName"
              label="FirstName"
              name="FirstName"
              autoComplete="first_name"
              autoFocus
            />
            <TextField
              onChange={lastnameHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="LastName"
              label="LastName"
              type="text"
              id="LastName"
              autoComplete="last_name"
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
              autoComplete="password"
            />
            <TextField
              onChange={dniHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="dni"
              label="Dni"
              type="text"
              id="dni"
              autoComplete="dni"
            />
            <TextField
              onChange={countryHandler}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="country"
              label="Country"
              type="text"
              id="country"
              autoComplete="country"
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
    </div>
  );
}
