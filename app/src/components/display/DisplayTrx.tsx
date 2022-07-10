import { useSelector } from "react-redux";
import { GFAT } from "../../api/gfat";
import { State,TransactionState } from "../../Types/types";
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

interface DisplayTrxProp {
  trxIdList: Array<number>;
}
function DisplayTrxList(props: DisplayTrxProp) {
  interface ListState {
    element: JSX.Element;
    page: number;
    max_pages: number;
    page_count: number;
    trx_count: number;
  }

  const gfat: GFAT = useSelector((state: State) => state.gfat.value);
  const [listState, setState] = useState<ListState>({
    element: <h4>Fetching Transactions. Please Wait</h4>,
    page: 1,
    max_pages: 1,
    page_count: 5,
    trx_count: 0,
  });

  interface trxEleProp {
    trx_id: number;
  }

  async function PrjElement(props: trxEleProp) {
    const trx = await gfat.transaction.getTransaction(props.trx_id);
    return (
      <TableRow key={`D-${props.trx_id}`}>
        <TableCell color="primary" align="left">
          <Link component={RouterLink} to={`/transactions/${props.trx_id}`} underline="hover">{trx.statement}</Link>
        </TableCell>
        <TableCell color="primary" align="left">
          {trx.trx_amt}
        </TableCell>
        <TableCell color="primary" align="left">
          {trx.trx_from}
        </TableCell>
        <TableCell color="primary" align="left">
          {trx.trx_to}
        </TableCell>
        <TableCell color="primary" align="left">
          {TransactionState[trx.state]}
        </TableCell>
        <TableCell color="primary" align="left">
          {`${trx.approval_votes}/${trx.required_votes}`}
        </TableCell>
      </TableRow>
    );
  }

  async function trx_page(
    trx: Array<number>,
    trx_index: number,
    page_count: number,
    trx_count: number,
    trx_list: JSX.Element[]
  ): Promise<JSX.Element[]> {
    if (trx_index > trx_count) {
      return trx_list;
    }
    const trx_ele = await PrjElement({ trx_id: trx[trx_index - 1] });
    trx_list.push(trx_ele);

    if (trx_index % page_count == 0) {
      return trx_list;
    }
    return await trx_page(trx, trx_index + 1, page_count, trx_count, trx_list);
  }

  useEffect(() => {
    const setPrj = async () => {
      const trx = props.trxIdList;
      const trx_count = trx.length;
      const max_pages = Math.ceil(trx_count / listState.page_count);
      const ele = await trx_page(
        trx,
        1 + listState.page_count * (listState.page - 1),
        listState.page_count,
        trx_count,
        []
      );
      const element = <TableBody>{ele}</TableBody>;
      const newstate: ListState = {
        ...listState,
        ["trx_count"]: trx_count,
        ["max_pages"]: max_pages,
        ["element"]: element,
      };
      setState(newstate);
    };
    setPrj();
  }, [listState.page, props.trxIdList]);

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
                Transaction Statement
              </TableCell>
              <TableCell color="primary" align="left">
                Amount
              </TableCell>
              <TableCell color="primary" align="left">
                From
              </TableCell>
              <TableCell color="primary" align="left">
                To
              </TableCell>
              <TableCell color="primary" align="left">
                Transaction State
              </TableCell>
              <TableCell color="primary" align="left">
                Recieved Votes
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

export default DisplayTrxList;
