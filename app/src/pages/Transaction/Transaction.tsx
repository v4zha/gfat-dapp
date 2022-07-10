import { GFAT } from "../../api/gfat";
import {
  LoginState,
  State,
  transaction,
  TransactionState,
} from "../../Types/types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

function Transactions() {
  interface TrxApproval {
    sender: string;
    tid: number;
    pid: number;
    assigned: boolean;
    approved: boolean;
  }
  const [loginState, gfat]: [LoginState, GFAT] = useSelector((state: State) => [
    state.gfat.login,
    state.gfat.value,
  ]);
  const [trxState, setTransaction] = useState<transaction>();
  const [ApprovalState, setApproval] = useState<TrxApproval>();
  const [TrxId, setTrxId] = useState<number>(0);
  const params = useParams();
  useEffect(() => {
    const setTrx = async () => {
      setTrxId(Number(params.trx_id));
      if (TrxId) {
        const trx = await gfat.transaction.getTransaction(TrxId);
        setTransaction(trx);
      }
      const addr = await gfat.contract.signer.getAddress();
      let assigned = false;
      if (trxState) {
        const prj = await gfat.project.getProject(
          (trxState as transaction).pid
        );
        if (prj.assigned_officers) {
          if (
            loginState == LoginState.Officer &&
            prj.assigned_officers.includes(addr)
          )
            assigned = true;
        }
      }
      let approved = false;
      if (trxState) {
        if (trxState.approved_officers.includes(addr)) {
          approved = true;
        }
      }
      if (trxState) {
        setApproval({
          sender: addr,
          tid: (trxState as transaction).tid,
          pid: (trxState as transaction).pid,
          assigned: assigned,
          approved: approved,
        });
      }
    };
    setTrx();
  }, [TrxId, trxState]);

  const TrxEnum = (state: TransactionState) => {
    let res;
    switch (state) {
      case TransactionState.Approved:
        res = "Approved";
        break;
      case TransactionState.Pending:
        res = "Pending";
        break;
    }
    return res;
  };
  const TrxApprove = () => {
    if (!trxState || !ApprovalState) {
      return;
    }
    if (
      trxState.state != TransactionState.Approved &&
      (ApprovalState as TrxApproval).assigned
    ) {
      return (
        <Button
          onClick={() => {
            const submitHandler = async () => {
              const res = await gfat.transaction.approveTransaction(
                ApprovalState.tid,
                ApprovalState.sender
              );
            };
            submitHandler();
          }}
        >
          Approve Transaction
        </Button>
      );
    }
    return <></>;
  };
  return (
    <div>
      <div>
        <h2>Transaction ID : {trxState?.tid}</h2>
        <h2>Transaction From : {trxState?.trx_from}</h2>
        <h2>Transaction To : {trxState?.trx_to}</h2>
        <h2>Transaction Amount: {trxState?.trx_amt}</h2>
        <h2>Statement : {trxState?.statement}</h2>
        <h3>Req Votes : {trxState?.required_votes} </h3>
        <h3>Recieved Votes : {trxState?.approval_votes} </h3>
        <h4>Transaction State : {trxState?.state} </h4>
      </div>
      {TrxApprove()}
    </div>
  );
}
export default Transactions;
