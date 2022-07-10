import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GFAT } from "../../api/gfat";
import { State, department } from "../../Types/types";
import { useParams } from "react-router-dom";
import DisplayPrjList from "../../components/display/DisplayProj";

function Department() {
  const [depState, setDepartment] = useState<department>();
  const [DepId, setDepId] = useState<number>(0);
  const params = useParams();
  const gfat: GFAT = useSelector((state: State) => state.gfat.value);

  useEffect(() => {
    const setDep = async () => {
      setDepId(Number(params.d_id));
      if (DepId) {
        const dep = await gfat.department.getDep(DepId);
        setDepartment(dep);
      }
    };
    setDep();
  }, [DepId]);

  const proj=()=>{
    return depState?.prj_count==0?
    <h3>No Projects Found.</h3> : 
        <>
        <h1>Projects</h1>
        <DisplayPrjList prjIdList={depState?.projects as number[]} />
        </>
  }
  return (
    <div>
      <div>
        <h3>Department ID : {depState?.dep_id}</h3>
        <h3>Department Name : {depState?.name}</h3>
        <h3>No of Projects : {depState?.prj_count}</h3>
        <h3>No of Officers : {depState?.off_count}</h3>
      </div>
      <div>
        {proj()}
      </div>
    </div>
  );
}
export default Department;
