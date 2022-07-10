import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { State } from "../../Types/types";
import { GFAT } from "../../api/gfat";
import { useState } from "react";

function CreateDep() {
  const [result, setRes] = useState<JSX.Element>();

  const gfat: GFAT = useSelector((state: State) => {
    return state.gfat.value;
  });

  interface DepForm {
    dep_name: string;
  }

  const { control, handleSubmit } = useForm<DepForm>({
    defaultValues: {
      dep_name: "",
    },
  });

  const onSubmit: SubmitHandler<DepForm> = async (data: DepForm) => {
    const res = await gfat.department.createDep(data.dep_name);
    setRes(
      <div>
        <h3>Result</h3>
        <span>
          Created Department {data.dep_name} with id : {res}
        </span>
        <br />
      </div>
    );
  };

  return (
    <div>
      <h1>Create Department</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="dep_name"
            control={control}
            render={({ field }) => (
              <TextField
                label="department name"
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
export default CreateDep;
