import { ethers } from "ethers";
import { Result } from "ethers/lib/utils";
import { abi, bytecode } from "../assets/GFAT.json";
import { GFAT } from "../api/gfat";

export type ABI = typeof abi;
export type Bytecode = typeof bytecode;

export type address = string;

export interface department {
  dep_id: number;
  prj_count: number;
  off_count: number;
  name: string;
  projects: Array<number>;
  officers: Array<address>;
}

export interface project {
  prj_id: number;
  dep_id: number;
  trx_count: number;
  assigned_off_count: number;
  name: string;
  prj_district: District;
  transactions: Array<number>;
  assigned_officers: Array<address>;
}

export interface officer {
  name: string;
  dep_id: number;
  prj_count: number;
  assigned_proj: Array<number>;
  off_addr: address;
}

export interface transaction {
  tid: number;
  pid: number;
  required_votes: number;
  approval_votes: number;
  approved_officers: Array<address>;
  trx_from: string;
  trx_to: string;
  trx_amt: number;
  statement: string;
  state: TransactionState;
}

export enum TransactionState {
  Pending,
  Approved,
  Ongoing,
  Completed,
}

export enum LoginState {
  Admin,
  Officer,
  Observer,
}

export enum District {
  Thiruvananthapuram,
  Kollam,
  Pathanamthitta,
  Alappuzha,
  Kottayam,
  Idukki,
  Ernakulam,
  Thrissur,
  Palakkad,
  Malapuram,
  Kozhikode,
  Wayanad,
  Kannur,
  Kasargod,
}

export interface Window {
  ethereum: any;
}

export interface DepFns {
  createDep(dep_name: string): Promise<number>;
  getDepProject(dep_id: number, prj_index: number): Promise<number>;
  getDepOfficer(dep_id: number, off_index: number): Promise<address>;
  getDepCount(): Promise<number>;
  getDep(dep_id: number): Promise<department>;
  getAllDep(): Promise<Array<department>>;
}

export interface PrjFns {
  createProject(
    pname: string,
    dep_id: number,
    prj_dst: District,
    off_id: Array<address>
  ): Promise<number>;
  getPrjTransaction(prj_id: number, trx_index: number): Promise<number>;
  getPrjOfficer(prj_id: number, off_index: number): Promise<address>;
  getPrjCount(): Promise<number>;
  getProject(pid: number): Promise<project>;
}

export interface TrxFns {
  createTransaction(
    pid: number,
    tx_from: string,
    tx_to: string,
    amt: number,
    statement: string,
    req_votes: number,
    sender: address
  ): Promise<number>;
  approveTransaction(tid: number, off_addr: address): Promise<Result>;
  getTrxApprovedOff(tid: number, off_index: number): Promise<address>;
  getTrxCount(): Promise<number>;
}

export interface OffFns {
  createOfficer(d_id: number, name: string, addr: address): Promise<Result>;
  getOffProject(off_addr: address, prj_index: number): Promise<number>;
  getOffIdProject(off_id: number, prj_index: number): Promise<number>;
  getOfficer(off_addr: address): Promise<officer>;
  getOfficerById(off_id: number): Promise<officer>;
  getOffCount(): Promise<number>;
  isOfficer(): Promise<boolean>;
  isOfficerFromAddr(off_addr: address): Promise<boolean>;
}

export interface Gfat {
  contract: ethers.Contract;
  provider: ethers.providers.JsonRpcProvider;
  department: DepFns;
  officer: OffFns;
  project: PrjFns;
  transaction: TrxFns;
  getAdmin(): Promise<address>;
  isAdmin(): Promise<boolean>;
}

export interface gfatState {
  value: GFAT | any;
  login: LoginState;
}
export interface State {
  gfat: gfatState;
}

export enum CreateElement {
  Department,
  Project,
  Officer,
  Transaction,
}

export interface CreateProp {
  create: CreateElement;
}
