import { useState, useEffect } from "react";
import { GFAT } from "../../api/gfat";
import { useSelector } from "react-redux";
import { State } from "../../Types/types";
import { depAllInfo, DepInfo } from "../../services/DataFetch";

export function useDepInfo(): Array<DepInfo> {
  const gfat: GFAT = useSelector((state: State) => {
    return state.gfat.value;
  });
  const [depInfo, setDepInfo] = useState<Array<DepInfo>>();
  useEffect(() => {
    const dep_info = async () => {
      const res = await depAllInfo(gfat);
      setDepInfo(res);
    };
    dep_info();
  }, []);
  return depInfo as Array<DepInfo>;
}
