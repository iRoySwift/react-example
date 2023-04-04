/*
 * @Author: Roy
 * @Date: 2022-08-19 17:03:56
 * @LastEditors: Roy
 * @LastEditTime: 2022-08-22 16:35:03
 * @Description: 请填写简介
 */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { postData } from '@/utils/fetch';
import { FC, useCallback, useEffect, useState } from 'react';
import { Link } from '@mui/material';

function createData(name: string, calories: number, pid: number) {
  return { name, calories, pid };
}

interface Props {
  getList: (v: any) => void;
}

const BasicTable: FC<Props> = ({ getList }) => {
  const [list, setList] = useState<any>([]);
  // const [exeList, setExeList] = useState<any>([]);
  // 获取pid
  const initSysEnv = useCallback(
    async () =>
      await postData('http://127.0.0.1:4000/terminal')
        .then((data) => {
          setList((preList) => preList.concat([createData(`Frozen ${data}`, 159, data)]));
        })
        .catch((err) => {
          throw new Error(err);
        }),
    []
  );

  const exeShell = (row) => {
    getList(row);
  };

  useEffect(() => {
    initSysEnv();
    initSysEnv();
    initSysEnv();
  }, [initSysEnv]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">pid</TableCell>
            <TableCell align="right">action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRow key={row.pid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.pid}</TableCell>
              <TableCell align="right">
                <Link href="#" underline="none" onClick={() => exeShell(row)}>
                  execell
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
