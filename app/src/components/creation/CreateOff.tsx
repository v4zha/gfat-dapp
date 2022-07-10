import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { State } from "../../Types/types";
import { GFAT } from "../../api/gfat";
import { useState } from "react";
import { DepDropDown } from "./DepdropDown";
import { DepInfo } from "../../services/DataFetch";
import { useDepInfo } from "./CreationHooks";

function CreateOff() {
  const [result, setRes] = useState<JSX.Element>();
  const dep_info = useDepInfo();

  const gfat: GFAT = useSelector((state: State) => {
    return state.gfat.value;
  });

  interface OffForm {
    off_name: string;
    address: string;
    dep_id: number;
  }

  const { register, control, handleSubmit } = useForm<OffForm>({
    defaultValues: {
      off_name: "",
      address: "",
      dep_id: 0,
    },
  });

  const onSubmit: SubmitHandler<OffForm> = async (data: OffForm) => {
    const res = await gfat.officer.createOfficer(
      data.dep_id,
      data.off_name,
      data.address
    );
    setRes(
      <div>
        <h3>Result</h3>
        <span>Created Officer {data.off_name}</span>
        <br />
      </div>
    );
  };

  return (
    <div>
      <h1>Create Officer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="off_name"
            control={control}
            render={({ field }) => (
              <TextField label="Officer name" variant="outlined" {...field} />
            )}
          />
        </div>
        <br />
        <div>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                label="Officer address"
                variant="outlined"
                {...field}
              />
            )}
          />
        </div>
        <br />
        <div>
          <DepDropDown
            value={"dep_id"}
            dep_info={dep_info as Array<DepInfo>}
            form_register={register}
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
export default CreateOff;
