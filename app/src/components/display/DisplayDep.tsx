import { useSelector } from "react-redux";
import { GFAT } from "../../api/gfat";
import { State } from "../../Types/types";
import { useState, useEffect } from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link
} from "@mui/material";
import { Link as RouterLink} from "react-router-dom";

function DisplayDepList() {
  interface ListState {
    element: JSX.Element;
    page: number;
    max_pages: number;
    page_count: number;
    dep_count: number;
  }
  const gfat: GFAT = useSelector((state: State) => state.gfat.value);
  const [listState, setState] = useState<ListState>({
    element: <h4>Fetching Departments . Please Wait</h4>,
    page: 1,
    max_pages: 1,
    page_count: 5,
    dep_count: 0,
  });

  interface DepEleProp {
    dep_id: number;
  }

  async function DepElement(props: DepEleProp) {
    const dep = await gfat.department.getDep(props.dep_id);
    return (
      <TableRow key={`D-${props.dep_id}`}>
        <TableCell color="primary" align="left">
          <Link component={RouterLink} to={`/departments/${props.dep_id}`} underline="hover" >{dep.name}</Link>
        </TableCell>
        <TableCell color="primary" align="left">
          {dep.dep_id}
        </TableCell>
        <TableCell color="primary" align="left">
          {dep.prj_count}
        </TableCell>
        <TableCell color="primary" align="left">
          {dep.off_count}
        </TableCell>
      </TableRow>
    );
  }

  async function dep_page(
    d_id: number,
    page_count: number,
    dep_count: number,
    dep_list: JSX.Element[]
  ): Promise<JSX.Element[]> {
    if (d_id > dep_count) {
      return dep_list;
    }
    const dep_ele = await DepElement({ dep_id: d_id });
    dep_list.push(dep_ele);

    if (d_id % page_count == 0) {
      return dep_list;
    }
    return await dep_page(d_id + 1, page_count, dep_count, dep_list);
  }

  useEffect(() => {
    const setDep = async () => {
      const dep_count = await gfat.department.getDepCount();
      const res = await gfat.department.getAllDep();
      const max_pages = Math.ceil(dep_count / listState.page_count);
      const ele = await dep_page(
        1 + listState.page_count * (listState.page - 1),
        listState.page_count,
        dep_count,
        []
      );
      const element = <TableBody>{ele}</TableBody>;
      const newstate: ListState = {
        ...listState,
        ["max_pages"]: max_pages,
        ["dep_count"]: dep_count,
        ["element"]: element,
      };
      setState(newstate);
    };
    setDep();
  }, [listState.page]);

  enum ButtonState {
    Priv,
    Next,
  }
  const buttonHandler = (state: ButtonState) => {
    let i: number = 0;
    switch (state) {
      case ButtonState.Priv:
        if (listState.page > 1) {
          i = -1;
        }
        break;
      case ButtonState.Next:
        if (listState.max_pages > listState.page) {
          i = 1;
        }
        break;
    }
    if (i == 0) {
      return;
    }
    setState({ ...listState, ["page"]: listState["page"] + i });
  };
  return (
    <div>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell color="primary" align="left">
                Department Name
              </TableCell>
              <TableCell color="primary" align="left">
                Department ID
              </TableCell>
              <TableCell color="primary" align="left">
                Total Projects
              </TableCell>
              <TableCell color="primary" align="left">
                Total Officers
              </TableCell>
            </TableRow>
          </TableHead>
          {listState.element}
        </Table>
      </TableContainer>
      <Button
        onClick={() => {
          buttonHandler(ButtonState.Priv);
        }}
      >
        Priv Page
      </Button>
      <Button
        onClick={() => {
          buttonHandler(ButtonState.Next);
        }}
      >
        Next Page
      </Button>
    </div>
  );
}
export default DisplayDepList;
