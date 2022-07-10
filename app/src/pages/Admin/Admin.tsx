import { observer } from "../../services/login";
import { CreateElement, gfatState, LoginState, State } from "../../Types/types";
import { obs } from "../../components/gfatSlice";
import "./Admin.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, MouseEvent } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CreateEle from "../../components/creation/CreationController";

function Admin() {
  const dispatch = useDispatch();
  const loginstate: LoginState = useSelector(
    (state: State) => state.gfat.login
  );
  const navigate = useNavigate();
  const [createState, setCreate] = useState<JSX.Element>();
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <h2>Admin</h2>
      <Button onClick={async () => await logout()}>Logout</Button>
      <div>
        <Button
          id="Creation-Menu"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Create
        </Button>
        <Menu
          id="admin-menu-id"
          aria-labelledby="positioned-button"
          elevation={1}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          className="admin-menu"
        >
          <MenuItem
            onClick={() => {
              setCreate(<CreateEle create={CreateElement.Department} />);
            }}
          >
            Department
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCreate(<CreateEle create={CreateElement.Project} />);
            }}
          >
            Project
          </MenuItem>
          <MenuItem
            onClick={() => {
              setCreate(<CreateEle create={CreateElement.Officer} />);
            }}
          >
            Officer
          </MenuItem>
        </Menu>
      </div>
      <div>{createState}</div>
    </div>
  );
}
export default Admin;
