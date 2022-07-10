import { useSelector } from "react-redux";
import { GFAT } from "../../api/gfat";
import { State,District } from "../../Types/types";
import { useState, useEffect } from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface DisplayPrjProp {
  prjIdList: Array<number>;
}
function DisplayPrjList(props: DisplayPrjProp) {
  interface ListState {
    element: JSX.Element;
    page: number;
    max_pages: number;
    page_count: number;
    prj_count: number;
  }

  const gfat: GFAT = useSelector((state: State) => state.gfat.value);
  const [listState, setState] = useState<ListState>({
    element: <h4>Fetching Projects. Please Wait</h4>,
    page: 1,
    max_pages: 1,
    page_count: 5,
    prj_count: 0,
  });

  interface PrjEleProp {
    prj_id: number;
  }

  async function PrjElement(props: PrjEleProp) {
    const prj = await gfat.project.getProject(props.prj_id);
    return (
      <TableRow key={`D-${props.prj_id}`}>
        <TableCell color="primary" align="left">
    <Link component={RouterLink} to={`/projects/${props.prj_id}`} underline="hover" >{prj.name}</Link>
        </TableCell>
        <TableCell color="primary" align="left">
          {prj.prj_id}
        </TableCell>
        <TableCell color="primary" align="left">
          {District[prj.prj_district]}
        </TableCell>
        <TableCell>{prj.trx_count}</TableCell>
        <TableCell color="primary" align="left">
          {prj.assigned_off_count}
        </TableCell>
      </TableRow>
    );
  }

  async function prj_page(
    prj: Array<number>,
    prj_index: number,
    page_count: number,
    prj_count: number,
    prj_list: JSX.Element[]
  ): Promise<JSX.Element[]> {
    if (prj_index > prj_count) {
      return prj_list;
    }
    const prj_ele = await PrjElement({ prj_id: prj[prj_index - 1] });
    prj_list.push(prj_ele);

    if (prj_index % page_count == 0) {
      return prj_list;
    }
    return await prj_page(prj, prj_index + 1, page_count, prj_count, prj_list);
  }

  useEffect(() => {
    const setPrj = async () => {
      if (!props.prjIdList) {
        return;
      }
      const prj = props.prjIdList;
      const prj_count = prj.length;
      const max_pages = Math.ceil(prj_count / listState.page_count);
      const ele = await prj_page(
        prj,
        1 + listState.page_count * (listState.page - 1),
        listState.page_count,
        prj_count,
        []
      );
      const element = <TableBody>{ele}</TableBody>;
      const newstate: ListState = {
        ...listState,
        ["prj_count"]: prj_count,
        ["max_pages"]: max_pages,
        ["element"]: element,
      };
      setState(newstate);
    };
    setPrj();
  }, [listState.page, props.prjIdList]);

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
                Project Name
              </TableCell>
              <TableCell color="primary" align="left">
                Project ID
              </TableCell>
              <TableCell color="primary" align="left">
                District
              </TableCell>
              <TableCell color="primary" align="left">
                Total Transactions
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

export default DisplayPrjList;
