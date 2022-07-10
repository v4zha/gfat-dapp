import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { State } from "../../Types/types";
import { GFAT } from "../../api/gfat";
import { useState } from "react";

interface TrxProps {
  sender: string;
  pid: number;
}

function CreateTrx(props: TrxProps) {
  const [result, setRes] = useState<JSX.Element>();

  const gfat: GFAT = useSelector((state: State) => {
    return state.gfat.value;
  });

  interface TrxForm {
    statement: string;
    trx_from: string;
    trx_to: string;
    trx_amt: number;
    req_votes: number;
  }

  const { control, handleSubmit } = useForm<TrxForm>({
    defaultValues: {
      statement: "",
      req_votes: 0,
    },
  });

  const onSubmit: SubmitHandler<TrxForm> = async (data: TrxForm) => {
    const res = await gfat.transaction.createTransaction(
      props.pid,
      data.trx_from,
      data.trx_to,
      data.trx_amt,
      data.statement,
      data.req_votes,
      props.sender
    );
    setRes(
      <div>
        <h3>Result</h3>
        <span>Created Transaction with ID : {res}</span>
        <br />
      </div>
    );
  };

  return (
    <div>
      <h1>Create Transaction</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="trx_from"
            control={control}
            render={({ field }) => (
              <TextField
                label="Transaction From Account"
                type="string"
                variant="outlined"
                {...field}
              />
            )}
          />
        </div>
        <br />
        <br />
        <div>
          <Controller
            name="trx_to"
            control={control}
            render={({ field }) => (
              <TextField
                label="Transaction To Account"
                type="string"
                variant="outlined"
                {...field}
              />
            )}
          />
        </div>
        <br />
        <br />
        <div>
          <Controller
            name="trx_amt"
            control={control}
            render={({ field }) => (
              <TextField
                label="Amount Transfered"
                type="number"
                variant="outlined"
                {...field}
              />
            )}
          />
        </div>
        <br />
        <br />
        <div>
          <Controller
            name="statement"
            control={control}
            render={({ field }) => (
              <TextField
                label="Transaction Statement"
                variant="outlined"
                {...field}
              />
            )}
          />
        </div>
        <br />
        <br />
        <div>
          <Controller
            name="req_votes"
            control={control}
            render={({ field }) => (
              <TextField
                label="No.of votes Required for Approval"
                type="number"
                variant="outlined"
                {...field}
              />
            )}
          />
        </div>
        <br />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
      <br />
      <br />
      {result}
    </div>
  );
}
export default CreateTrx;
