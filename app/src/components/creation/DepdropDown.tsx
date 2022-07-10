import { DepInfo } from "../../services/DataFetch";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface DepDropDownProps<T extends FieldValues> {
  value: string;
  dep_info: Array<DepInfo>;
  form_register: UseFormRegister<T>;
  onChange?: (event: SelectChangeEvent) => void;
}
const OptList = (dep_list: Array<DepInfo>): Array<JSX.Element> | null => {
  if (!dep_list) {
    return null;
  }
  let list: Array<JSX.Element> = [];
  dep_list.forEach(({ dep_id, name }) => {
    list.push(
      <MenuItem key={`select-${dep_id}`} value={dep_id}>
        {name}
      </MenuItem>
    );
  });
  return list;
};
export function DepDropDown<T extends FieldValues>(props: DepDropDownProps<T>) {
  return (
    <>
      <FormControl>
        <InputLabel id="dep_DropDown">Department</InputLabel>
        <Select
          style={{ width: 200 }}
          labelId="dep_DropDown"
          label="Department"
          {...props.form_register(props.value as Path<T>)}
          onChange={props.onChange}
        >
          {OptList(props.dep_info as Array<DepInfo>)}
        </Select>
      </FormControl>
    </>
  );
}
