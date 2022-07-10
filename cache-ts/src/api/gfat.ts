import contract_data from "../assets/GFAT.json";
import { ethers } from "ethers";
import {
  department,
  officer,
  transaction,
  project,
  ABI,
  Bytecode,
  address,
  Gfat,
  Window,
  District,
} from "../Types/types";
import { Result } from "ethers/lib/utils";
declare let window: Window;

export class GFatBuilder {
  provider:
    | ethers.providers.JsonRpcProvider
    | ethers.providers.Web3Provider
    | undefined;
  signer: ethers.providers.JsonRpcSigner | ethers.Wallet | undefined;
  abi: ABI;
  bytecode: Bytecode;
  contract: ethers.Contract | undefined;

  constructor() {
    this.abi = contract_data.abi;
    this.bytecode = contract_data.bytecode;
  }

  async fromMetaMask(): Promise<GFatBuilder> {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    await this.provider.send("eth_requestAccounts", []);
    return this;
  }

  fromUrl(url: string): GFatBuilder {
    this.provider = new ethers.providers.JsonRpcProvider(url);
    this.signer = this.provider.getSigner();
    return this;
  }

  login(): GFatBuilder {
    if (this.provider) {
      this.signer = this.provider.getSigner();
    }
    return this;
  }

  loginFromAddr(addr: address): GFatBuilder {
    if (this.provider) {
      this.signer = this.provider.getSigner(addr);
    }
    return this;
  }

  asObserver(): GFatBuilder {
    if (this.provider) {
      let wallet = ethers.Wallet.createRandom();
      wallet = wallet.connect(this.provider);
      this.signer = wallet;
    }
    return this;
  }
  async deploy_contract(): Promise<GFatBuilder> {
    const factory = new ethers.ContractFactory(
      this.abi,
      this.bytecode,
      this.signer
    );
    const contract = await factory.deploy("GFAT");
    await contract.deployTransaction.wait();
    this.contract = contract;
    return this;
  }

  async assign_contract(address: string): Promise<GFatBuilder> {
    const contract = new ethers.Contract(address, this.abi, this.signer);
    this.contract = contract;
    return this;
  }

  build(): GFAT {
    return new GFAT(
      this.contract as ethers.Contract,
      this.provider as
        | ethers.providers.JsonRpcProvider
        | ethers.providers.Web3Provider
    );
  }
}
export class GFAT implements Gfat {
  contract: ethers.Contract;
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider;
  department: Department;
  officer: Officer;
  project: Project;
  transaction: Transaction;

  constructor(
    contract: ethers.Contract,
    provider: ethers.providers.JsonRpcProvider
  ) {
    this.contract = contract;
    this.provider = provider;
    this.department = new Department(contract);
    this.officer = new Officer(contract, provider);
    this.project = new Project(contract);
    this.transaction = new Transaction(contract, provider);
  }

  async getAdmin(): Promise<address> {
    const admin = await this.contract.admin();
    return admin as address;
  }

  async isAdmin(): Promise<boolean> {
    const res = await this.contract.isAdmin();
    return res;
  }
}
class Department {
  contract: ethers.Contract;
  constructor(contract: ethers.Contract) {
    this.contract = contract;
  }
  async createDep(dep_name: string): Promise<number> {
    const id: number = await this.contract.callStatic.createDep(dep_name);
    await this.contract.createDep(dep_name);
    return id;
  }
  async getDep(dep_id: number): Promise<department> {
    const res = await this.contract.departments(dep_id - 1);
    let projects: Array<number> = [];
    for (let i = 1; i <= res.prj_count; i++) {
      const res = await this.getDepProject(dep_id, i);
      projects.push(res);
    }
    let officers: Array<address> = [];
    for (let i = 1; i <= res.off_count; i++) {
      const res = await this.getDepOfficer(dep_id, i);
      officers.push(res);
    }
    const dep: department = {
      ...res,
      ["projects"]: projects,
      ["officers"]: officers,
    };
    return dep;
  }
  async getDepProject(dep_id: number, prj_index: number): Promise<number> {
    const res = await this.contract.getDepPrj(dep_id, prj_index);
    return res;
  }
  async getDepOfficer(dep_id: number, off_index: number): Promise<address> {
    const res = await this.contract.getDepOff(dep_id, off_index);
    return res as address;
  }

  async getDepCount(): Promise<number> {
    const res = await this.contract.getDepCount();
    return res;
  }

  async getAllDep(): Promise<Array<department>> {
    let dep: Array<department> = [];
    const count = await this.getDepCount();
    for (let i = 1; i <= count; i++) {
      dep.push(await this.getDep(i));
    }
    return dep;
  }
}
class Project {
  contract: ethers.Contract;
  constructor(contract: ethers.Contract) {
    this.contract = contract;
  }

  async createProject(
    pname: string,
    dep_id: number,
    prj_dst: District,
    off_id: Array<address>
  ): Promise<number> {
    const id: number = await this.contract.callStatic.createProj(
      pname,
      dep_id,
      prj_dst,
      off_id
    );
    await this.contract.createProj(pname, dep_id, prj_dst, off_id);
    return id;
  }
  async getProject(pid: number): Promise<project> {
    const res = await this.contract.projects(pid - 1);
    let transactions: Array<number> = [];
    for (let i = 1; i <= res.trx_count; i++) {
      const res = await this.getPrjTransaction(pid, i);
      transactions.push(res);
    }
    let officers: Array<address> = [];
    for (let i = 1; i <= res.assigned_off_count; i++) {
      const res = await this.getPrjOfficer(pid, i);
      officers.push(res);
    }
    const prj: project = {
      ...res,
      ["transactions"]: transactions,
      ["assigned_officers"]: officers,
    };
    return prj;
  }
  async getPrjTransaction(prj_id: number, trx_index: number): Promise<number> {
    const res = await this.contract.getPrjTrx(prj_id, trx_index);
    return res;
  }
  async getPrjOfficer(prj_id: number, off_index: number): Promise<address> {
    const res = await this.contract.getPrjOff(prj_id, off_index);
    return res;
  }
  async getPrjCount(): Promise<number> {
    const res = await this.contract.getPrjCount();
    return res;
  }
  async getAllPrj(): Promise<Array<project>> {
    let prj: Array<project> = [];
    const count = await this.getPrjCount();
    for (let i = 1; i <= count; i++) {
      prj.push(await this.getProject(i));
    }
    return prj;
  }
}
class Officer {
  contract: ethers.Contract;
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider;

  constructor(
    contract: ethers.Contract,
    provider: ethers.providers.JsonRpcProvider
  ) {
    this.contract = contract;
    this.provider = provider;
  }
  async createOfficer(
    d_id: number,
    name: string,
    addr: address
  ): Promise<Result> {
    const res = await this.contract.addOfficer(d_id, name, addr);
    return res;
  }

  async getOfficer(off_addr: address): Promise<officer> {
    const res = await this.contract.officers(off_addr);
    let assigned_proj: Array<number> = [];
    for (let i = 1; i <= res.prj_count; i++) {
      const res = await this.getOffProject(off_addr, i);
      assigned_proj.push(res);
    }
    const off: officer = { ...res, ["assigned_proj"]: assigned_proj };
    return off;
  }

  async getOfficerById(off_id: number): Promise<officer> {
    const address = this.contract.getOffAddr(off_id);
    const off = this.getOfficer(address);
    return off;
  }

  async getOffProject(off_addr: address, prj_index: number): Promise<number> {
    const res = await this.contract.getOffPrj(off_addr, prj_index);
    return res;
  }

  async getOffIdProject(off_id: number, prj_index: number): Promise<number> {
    const res = await this.contract.getOffIdProject(off_id, prj_index);
    return res;
  }
  async getOffCount(): Promise<number> {
    const res = await this.contract.getOffCount();
    return res;
  }
  async isOfficerFromAddr(off_addr: address): Promise<boolean> {
    const signer = this.provider.getSigner(off_addr);
    const off_contract = this.contract.connect(signer);
    const res = await off_contract.isOfficer();
    return res;
  }
  async isOfficer(): Promise<boolean> {
    const res = await this.contract.isOfficer();
    return res;
  }
    async getAllOfficer(): Promise<Array<officer>> {
    let off: Array<officer> = [];
    const count = await this.getOffCount();
    for (let i = 1; i <= count; i++) {
      off.push(await this.getOfficerById(i));
    }
    return off;
  }
}
class Transaction {
  contract: ethers.Contract;
  provider: ethers.providers.JsonRpcProvider | ethers.providers.Web3Provider;

  constructor(
    contract: ethers.Contract,
    provider: ethers.providers.JsonRpcProvider
  ) {
    this.contract = contract;
    this.provider = provider;
  }

  async createTransaction(
    pid: number,
    trx_from: string,
    trx_to: string,
    trx_amt: number,
    statement: string,
    req_votes: number,
    sender: address
  ): Promise<number> {
    const signer = this.provider.getSigner(sender);
    const trx_contract = this.contract.connect(signer);
    const id: number = await trx_contract.callStatic.createTrx(
      pid,
      trx_from,
      trx_to,
      trx_amt,
      statement,
      req_votes
    );
    await trx_contract.createTrx(
      pid,
      trx_from,
      trx_to,
      trx_amt,
      statement,
      req_votes
    );
    return id;
  }

  async approveTransaction(tid: number, off_addr: address): Promise<Result> {
    const signer = this.provider.getSigner(off_addr);
    const trx_contract = this.contract.connect(signer);
    const res = await trx_contract.approveTrx(tid);
    return res;
  }

  async getTransaction(tid: number): Promise<transaction> {
    const res = await this.contract.transactions(tid - 1);
    let approved_off: Array<address> = [];
    for (let i = 1; i <= res.approval_votes; i++) {
      const res = await this.getTrxApprovedOff(tid, i);
      approved_off.push(res);
    }
    const trx: transaction = { ...res, ["approved_officers"]: approved_off };
    return trx;
  }

  async getTrxApprovedOff(tid: number, off_index: number): Promise<address> {
    const res = this.contract.getTrxAppOff(tid, off_index);
    return res;
  }

  async getTrxCount(): Promise<number> {
    const res = await this.contract.getTrxCount();
    return res;
  }
  async getAllTrx(): Promise<Array<transaction>> {
    let trx: Array<transaction> = [];
    const count = await this.getTrxCount();
    for (let i = 1; i <= count; i++) {
      trx.push(await this.getTransaction(i));
    }
    return trx;
  }
}
