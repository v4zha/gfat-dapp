import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { District, State } from "../../Types/types";
import { GFAT } from "../../api/gfat";
import { DepDropDown } from "./DepdropDown";
import { OffDropDown } from "./OffDropDown";
import { DepInfo, OffInfo, depOffInfo } from "../../services/DataFetch";
import { useDepInfo } from "./CreationHooks";

export interface ProjForm {
  pname: string;
  dep_id: number;
  district: District;
  off_addr: { addr: string }[];
}

function CreateProj() {
  const gfat: GFAT = useSelector((state: State) => {
    return state.gfat.value;
  });

  const dep_info = useDepInfo();

  const [result, setRes] = useState<JSX.Element>();

  const [depId, setDepId] = useState(0);

  //list of officers in department
  const [offInfo, setOffInfo] = useState<Array<OffInfo>>([]);

  //select handler
  const [selectedOff, setSelectedOff] = useState<string>();

  //Assigned officers , Prevents appearing again on dropdown
  const [assignedOff, setAssignedOff] = useState<Array<string>>([]);

  const offCount = useRef(0);

  useEffect(() => {
    const off_info = async () => {
      if (depId == 0) {
        return null;
      }
      const res = await depOffInfo(gfat, depId);
      setOffInfo(res);
    };
    off_info();
  }, [depId]);

  const { register, control, handleSubmit } = useForm<ProjForm>({
    defaultValues: {
      pname: "",
      dep_id: 0,
      off_addr: [{ addr: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "off_addr",
    control,
  });

  const onSubmit: SubmitHandler<ProjForm> = async (data: ProjForm) => {
    const officers = data.off_addr.map((off_addr) => off_addr.addr);
    const res = await gfat.project.createProject(
      data.pname,
      data.dep_id,
      data.district,
      officers
    );
    setRes(
      <div>
        <h1>Result</h1>
        <span>
          Created Project {data.pname} with id : {res}
        </span>
        <br />
      </div>
    );
  };

  const depSelectionHandler = (ele: SelectChangeEvent) => {
    const dep_id = Number(ele.target.value);
    setDepId(dep_id);
  };
  const offSelectionHandler = (ele: SelectChangeEvent) => {
    const off = ele.target.value;
    offCount.current += 1;
    setSelectedOff(off);
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Controller
            name="pname"
            control={control}
            render={({ field }) => (
              <TextField label="Project name" variant="outlined" {...field} />
            )}
          />
        </div>
        <br />
        <div>
          <DepDropDown
            value={"dep_id"}
            dep_info={dep_info as Array<DepInfo>}
            form_register={register}
            onChange={depSelectionHandler}
          />
        </div>
        <br />
        <div>
          <FormControl>
            <InputLabel id="dep_sit_select">District</InputLabel>
            <Select
              style={{ width: 200 }}
              labelId="dep_dist_select"
              label="District"
              {...register("district")}
            >
              <MenuItem value={District.Thiruvananthapuram}>
                Thiruvananthapuram
              </MenuItem>
              <MenuItem value={District.Kollam}>Kollam</MenuItem>
              <MenuItem value={District.Pathanamthitta}>
                Pathanamthitta
              </MenuItem>
              <MenuItem value={District.Alappuzha}>Alappuzha</MenuItem>
              <MenuItem value={District.Kottayam}>Kottayam</MenuItem>
              <MenuItem value={District.Idukki}>Idukki</MenuItem>
              <MenuItem value={District.Ernakulam}>Ernakulam</MenuItem>
              <MenuItem value={District.Thrissur}>Thrissur</MenuItem>
              <MenuItem value={District.Palakkad}>Palakkad</MenuItem>
              <MenuItem value={District.Malapuram}>Malapuram</MenuItem>
              <MenuItem value={District.Kozhikode}>Kozhikode</MenuItem>
              <MenuItem value={District.Wayanad}>Wayanad</MenuItem>
              <MenuItem value={District.Kannur}>Kannur</MenuItem>
              <MenuItem value={District.Kasargod}>Karasgod</MenuItem>
            </Select>
          </FormControl>
          <br />
        </div>
        <br />
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <OffDropDown
                value={`off_addr.${index}.addr` as const}
                form_register={register}
                onChange={offSelectionHandler}
                off_list={offInfo}
                selected_off={assignedOff}
              />
              <Button
                onClick={() => {
                  offCount.current > 0
                    ? (offCount.current -= 1)
                    : remove(index);
                  if (index == 0) {
                    setAssignedOff([]);
                  }
                  if (assignedOff) {
                    let assigned_list = assignedOff;
                    assigned_list.pop();
                    setAssignedOff(assigned_list);
                  }
                }}
              >
                Remove
              </Button>
            </div>
          );
        })}
        <br />
        <Button
          onClick={() => {
            append({
              addr: "",
            });
            if (selectedOff) {
              let off_list = assignedOff;
              off_list.push(selectedOff as string);
              setAssignedOff(off_list);
            }
          }}
        >
          Add Officer
        </Button>
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
export default CreateProj;
