import { observer } from "../../services/login";
import { gfatState, LoginState, State, officer } from "../../Types/types";
import { obs } from "../../components/gfatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DisplayPrjList from "../../components/display/DisplayProj";
import { GFAT } from "../../api/gfat";
import {Button} from "@mui/material";

function Officer() {
  const dispatch = useDispatch();
  const [loginstate, gfat]: [LoginState, GFAT] = useSelector((state: State) => [
    state.gfat.login,
    state.gfat.value,
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    loginRoute();
  }, [loginstate]);

  async function logout() {
    const gfat = await observer();
    let loginstate: LoginState = LoginState.Observer;
    const state: gfatState = {
      value: gfat,
      login: loginstate,
    };
    dispatch(obs(state));
  }

  function loginRoute() {
    switch (loginstate) {
      case LoginState.Admin:
        navigate("/admin");
        break;
      case LoginState.Officer:
        navigate("/officer");
        break;
      default:
        navigate("/");
        break;
    }
  }

  const [officerState, setState] = useState<officer>({
    off_addr: "",
    dep_id: 0,
    name: "",
    prj_count: 0,
    assigned_proj: [],
  });
  useEffect(() => {
    const setOff = async () => {
      const off_addr = await gfat.contract.signer.getAddress();
      const Officer = await gfat.officer.getOfficer(off_addr);
      const newstate: officer = { ...Officer };
      setState(newstate);
    };
    setOff();
  }, [loginstate]);
  return (
    <div>
      <div>
        <h2>Officer</h2>
        <Button onClick={async () => await logout()}>Logout</Button>
      </div>
      <h1>Projects</h1>
      <DisplayPrjList prjIdList={officerState.assigned_proj} />
    </div>
  );
}
export default Officer;
