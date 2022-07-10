import { GFAT } from "../api/gfat";
import { department, officer } from "../Types/types";

export interface DepInfo {
  dep_id: number;
  name: string;
}
export interface OffInfo {
  name: string;
  off_addr: string;
}
export async function depAllInfo(gfat: GFAT): Promise<Array<DepInfo>> {
  let dep_info: Array<DepInfo> = [];
  const dep: department[] = await gfat.department.getAllDep();
  dep.forEach(({ dep_id, name }) =>
    dep_info.push({ dep_id: dep_id, name: name })
  );
  return dep_info;
}

export async function depOffInfo(
  gfat: GFAT,
  dep_id: number
): Promise<Array<OffInfo>> {
  let off_info: Array<OffInfo> = [];
  const off = (await gfat.department.getDep(dep_id)).officers;
  for (const addr of off) {
    const officer: officer = await gfat.officer.getOfficer(addr);
    off_info.push({ off_addr: officer.off_addr, name: officer.name });
  }
  return off_info;
}
