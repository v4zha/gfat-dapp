import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@mui/material";
import DisplayDepList from "../../components/display/DisplayDep";
import { gfatState, LoginState, State } from "../../Types/types";
import { login } from "../../components/gfatSlice";
import { etherLogin } from "../../services/login";
import LandingPage from "./LandingPage";
import "./Home.scss";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginstate: LoginState = useSelector(
    (state: State) => state.gfat.login
  );
  useEffect(() => {
    loginRoute();
  }, [loginstate]);
  async function metalogin() {
    const gfat = await etherLogin();
    let loginstate = LoginState.Observer;
    const is_off = await gfat.officer.isOfficer();
    const is_admin = await gfat.isAdmin();
    if (is_off) {
      loginstate = LoginState.Officer;
    }
    if (is_admin) {
      loginstate = LoginState.Admin;
    }
    const state: gfatState = {
      value: gfat,
      login: loginstate,
    };
    dispatch(login(state));
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

  return (
    <>
      <Button
        variant="outlined"
        className="login-btn"
        onClick={async () => {
          await metalogin();
        }}
      >
        Login
      </Button>
      {<LandingPage />}
      <div>
        <DisplayDepList />
      </div>
    </>
  );
}

export default Home;
