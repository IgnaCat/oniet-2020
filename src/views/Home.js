import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Table from '../components/Table';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 8,
    marginTop: '6rem',
  },
}));

export default function Home() {
  const classes = useStyles();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const country = localStorage.getItem('covid-co');
      const response = await fetch(
        `http://localhost:8000/data/Country/${country}`
      );
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.root}>
      <br></br>
      <Table data={data}></Table>
    </div>
  );
}
