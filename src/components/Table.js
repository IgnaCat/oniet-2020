import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function Tabla(props) {
  console.log(props);
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>Country</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>NewConfirmed</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>TotalConfirmed</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>NewDeaths</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>TotalDeaths</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>NewRecovered</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>TotalRecovered</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow>
              <TableCell component="th" scope="row" key={row.Country}>
                {row.Country}
              </TableCell>
              <TableCell component="th" scope="row" key={row.NewConfirmed}>
                {row.NewConfirmed}
              </TableCell>
              <TableCell component="th" scope="row" key={row.TotalConfirmed}>
                {row.TotalConfirmed}
              </TableCell>
              <TableCell component="th" scope="row" key={row.NewDeaths}>
                {row.NewDeaths}
              </TableCell>
              <TableCell component="th" scope="row" key={row.TotalDeaths}>
                {row.TotalDeaths}
              </TableCell>
              <TableCell component="th" scope="row" key={row.NewRecovered}>
                {row.NewRecovered}
              </TableCell>
              <TableCell component="th" scope="row" key={row.TotalRecovered}>
                {row.TotalRecovered}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
