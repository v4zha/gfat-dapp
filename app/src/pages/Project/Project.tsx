import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GFAT } from "../../api/gfat";
import { LoginState, State, project } from "../../Types/types";
import { useParams } from "react-router-dom";
import DisplayTrxList from "../../components/display/DisplayTrx";
import CreateTrx from "../../components/creation/CreateTrx";

function Project() {
  interface OfficerDetail {
    login: LoginState;
    addr: string;
    assinged: boolean;
  }
  const [prjState, setProject] = useState<project>();
  const [PrjId, setPrjId] = useState<number>(0);
  const [OffAddr, setOffAddr] = useState<OfficerDetail>();
  const params = useParams();
  const [loginState, gfat]: [LoginState, GFAT] = useSelector((state: State) => [
    state.gfat.login,
    state.gfat.value,
  ]);
  useEffect(() => {
    const setPrj = async () => {
      setPrjId(Number(params.prj_id));
      if (PrjId > 0) {
        const prj = await gfat.project.getProject(PrjId);
        setProject(prj);
      }
      const addr = await gfat.contract.signer.getAddress();
      const login = loginState;
      let assinged = false;
      if (prjState && prjState.assigned_officers) {
        if (
          login == LoginState.Officer &&
          prjState.assigned_officers.includes(addr)
        )
          assinged = true;
      }
      setOffAddr({
        login: login,
        addr: addr,
        assinged: assinged,
      });
    };
    setPrj();
  }, [PrjId, prjState]);

  const isOfficer = (): JSX.Element => {
    if (OffAddr && OffAddr.assinged && prjState) {
      return <CreateTrx sender={OffAddr.addr} pid={prjState.prj_id} />;
    }
    return <></>;
  };
  const Transaction = (): JSX.Element => {
    if (prjState) {
      return prjState.trx_count==0?<h2>No Transactions found</h2>:<><h2>Transactions</h2><DisplayTrxList trxIdList={prjState.transactions as number[]} /></>;
    }
    return <></>;
  };

  return (
    <div>
      <div>
        <h3>Project ID : {prjState?.prj_id}</h3>
        <h3>Project Name : {prjState?.name}</h3>
        <h3>Disctrict : {prjState?.prj_district}</h3>
      </div>
      {Transaction()}
      {isOfficer()}
    </div>
  );
}
export default Project;
