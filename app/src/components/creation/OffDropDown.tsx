import { OffInfo } from "../../services/DataFetch";
import {
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface OffDropDownProps<T extends FieldValues> {
  off_list: Array<OffInfo>;
  selected_off: Array<string>;
  form_register: UseFormRegister<T>;
  value: string;
  onChange?: (event: SelectChangeEvent) => void;
}
const OptList = (
  off_list: Array<OffInfo>,
  selected_off: Array<string>
): Array<JSX.Element> | null => {
  if (!off_list) {
    return null;
  }
  let list: Array<JSX.Element> = [];
  off_list
    // .filter(({ off_addr, name }) => !selected_off.includes(off_addr))
    .map(({ off_addr, name }) => {
      list.push(
        <MenuItem key={`off-${name}`} value={off_addr}>
          {name}
        </MenuItem>
      );
    });
  return list;
};
export function OffDropDown<T extends FieldValues>(props: OffDropDownProps<T>) {
  if (!props.off_list) {
    return null;
  }
  return (
    <>
      <FormControl>
        <InputLabel id="off_DropDown">Officers</InputLabel>
        <Select
          style={{ width: 200 }}
          labelId="off_DropDown"
          label="officers"
          {...props.form_register(props.value as Path<T>)}
          onChange={props.onChange}
        >
          {OptList(props.off_list, props.selected_off)}
        </Select>
      </FormControl>
    </>
  );
}
