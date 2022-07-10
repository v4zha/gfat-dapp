"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GFAT = exports.GFatBuilder = void 0;
const GFAT_json_1 = __importDefault(require("../assets/GFAT.json"));
const ethers_1 = require("ethers");
class GFatBuilder {
    constructor() {
        this.abi = GFAT_json_1.default.abi;
        this.bytecode = GFAT_json_1.default.bytecode;
    }
    async fromMetaMask() {
        this.provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
        await this.provider.send("eth_requestAccounts", []);
        return this;
    }
    fromUrl(url) {
        this.provider = new ethers_1.ethers.providers.JsonRpcProvider(url);
        this.signer = this.provider.getSigner();
        return this;
    }
    login() {
        if (this.provider) {
            this.signer = this.provider.getSigner();
        }
        return this;
    }
    loginFromAddr(addr) {
        if (this.provider) {
            this.signer = this.provider.getSigner(addr);
        }
        return this;
    }
    asObserver() {
        if (this.provider) {
            let wallet = ethers_1.ethers.Wallet.createRandom();
            wallet = wallet.connect(this.provider);
            this.signer = wallet;
        }
        return this;
    }
    async deploy_contract() {
        const factory = new ethers_1.ethers.ContractFactory(this.abi, this.bytecode, this.signer);
        const contract = await factory.deploy("GFAT");
        await contract.deployTransaction.wait();
        this.contract = contract;
        return this;
    }
    async assign_contract(address) {
        const contract = new ethers_1.ethers.Contract(address, this.abi, this.signer);
        this.contract = contract;
        return this;
    }
    build() {
        return new GFAT(this.contract, this.provider);
    }
}
exports.GFatBuilder = GFatBuilder;
class GFAT {
    constructor(contract, provider) {
        this.contract = contract;
        this.provider = provider;
        this.department = new Department(contract);
        this.officer = new Officer(contract, provider);
        this.project = new Project(contract);
        this.transaction = new Transaction(contract, provider);
    }
    async getAdmin() {
        const admin = await this.contract.admin();
        return admin;
    }
    async isAdmin() {
        const res = await this.contract.isAdmin();
        return res;
    }
}
exports.GFAT = GFAT;
class Department {
    constructor(contract) {
        this.contract = contract;
    }
    async createDep(dep_name) {
        const id = await this.contract.callStatic.createDep(dep_name);
        await this.contract.createDep(dep_name);
        return id;
    }
    async getDep(dep_id) {
        const res = await this.contract.departments(dep_id - 1);
        let projects = [];
        for (let i = 1; i <= res.prj_count; i++) {
            const res = await this.getDepProject(dep_id, i);
            projects.push(res);
        }
        let officers = [];
        for (let i = 1; i <= res.off_count; i++) {
            const res = await this.getDepOfficer(dep_id, i);
            officers.push(res);
        }
        const dep = Object.assign(Object.assign({}, res), { ["projects"]: projects, ["officers"]: officers });
        return dep;
    }
    async getDepProject(dep_id, prj_index) {
        const res = await this.contract.getDepPrj(dep_id, prj_index);
        return res;
    }
    async getDepOfficer(dep_id, off_index) {
        const res = await this.contract.getDepOff(dep_id, off_index);
        return res;
    }
    async getDepCount() {
        const res = await this.contract.getDepCount();
        return res;
    }
    async getAllDep() {
        let dep = [];
        const count = await this.getDepCount();
        for (let i = 1; i <= count; i++) {
            dep.push(await this.getDep(i));
        }
        return dep;
    }
}
class Project {
    constructor(contract) {
        this.contract = contract;
    }
    async createProject(pname, dep_id, prj_dst, off_id) {
        const id = await this.contract.callStatic.createProj(pname, dep_id, prj_dst, off_id);
        await this.contract.createProj(pname, dep_id, prj_dst, off_id);
        return id;
    }
    async getProject(pid) {
        const res = await this.contract.projects(pid - 1);
        let transactions = [];
        for (let i = 1; i <= res.trx_count; i++) {
            const res = await this.getPrjTransaction(pid, i);
            transactions.push(res);
        }
        let officers = [];
        for (let i = 1; i <= res.assigned_off_count; i++) {
            const res = await this.getPrjOfficer(pid, i);
            officers.push(res);
        }
        const prj = Object.assign(Object.assign({}, res), { ["transactions"]: transactions, ["assigned_officers"]: officers });
        return prj;
    }
    async getPrjTransaction(prj_id, trx_index) {
        const res = await this.contract.getPrjTrx(prj_id, trx_index);
        return res;
    }
    async getPrjOfficer(prj_id, off_index) {
        const res = await this.contract.getPrjOff(prj_id, off_index);
        return res;
    }
    async getPrjCount() {
        const res = await this.contract.getPrjCount();
        return res;
    }
    async getAllPrj() {
        let prj = [];
        const count = await this.getPrjCount();
        for (let i = 1; i <= count; i++) {
            prj.push(await this.getProject(i));
        }
        return prj;
    }
}
class Officer {
    constructor(contract, provider) {
        this.contract = contract;
        this.provider = provider;
    }
    async createOfficer(d_id, name, addr) {
        const res = await this.contract.addOfficer(d_id, name, addr);
        return res;
    }
    async getOfficer(off_addr) {
        const res = await this.contract.officers(off_addr);
        let assigned_proj = [];
        for (let i = 1; i <= res.prj_count; i++) {
            const res = await this.getOffProject(off_addr, i);
            assigned_proj.push(res);
        }
        const off = Object.assign(Object.assign({}, res), { ["assigned_proj"]: assigned_proj });
        return off;
    }
    async getOfficerById(off_id) {
        const address = this.contract.getOffAddr(off_id);
        const off = this.getOfficer(address);
        return off;
    }
    async getOffProject(off_addr, prj_index) {
        const res = await this.contract.getOffPrj(off_addr, prj_index);
        return res;
    }
    async getOffIdProject(off_id, prj_index) {
        const res = await this.contract.getOffIdProject(off_id, prj_index);
        return res;
    }
    async getOffCount() {
        const res = await this.contract.getOffCount();
        return res;
    }
    async isOfficerFromAddr(off_addr) {
        const signer = this.provider.getSigner(off_addr);
        const off_contract = this.contract.connect(signer);
        const res = await off_contract.isOfficer();
        return res;
    }
    async isOfficer() {
        const res = await this.contract.isOfficer();
        return res;
    }
    async getAllOfficer() {
        let off = [];
        const count = await this.getOffCount();
        for (let i = 1; i <= count; i++) {
            off.push(await this.getOfficerById(i));
        }
        return off;
    }
}
class Transaction {
    constructor(contract, provider) {
        this.contract = contract;
        this.provider = provider;
    }
    async createTransaction(pid, trx_from, trx_to, trx_amt, statement, req_votes, sender) {
        const signer = this.provider.getSigner(sender);
        const trx_contract = this.contract.connect(signer);
        const id = await trx_contract.callStatic.createTrx(pid, trx_from, trx_to, trx_amt, statement, req_votes);
        await trx_contract.createTrx(pid, trx_from, trx_to, trx_amt, statement, req_votes);
        return id;
    }
    async approveTransaction(tid, off_addr) {
        const signer = this.provider.getSigner(off_addr);
        const trx_contract = this.contract.connect(signer);
        const res = await trx_contract.approveTrx(tid);
        return res;
    }
    async getTransaction(tid) {
        const res = await this.contract.transactions(tid - 1);
        let approved_off = [];
        for (let i = 1; i <= res.approval_votes; i++) {
            const res = await this.getTrxApprovedOff(tid, i);
            approved_off.push(res);
        }
        const trx = Object.assign(Object.assign({}, res), { ["approved_officers"]: approved_off });
        return trx;
    }
    async getTrxApprovedOff(tid, off_index) {
        const res = this.contract.getTrxAppOff(tid, off_index);
        return res;
    }
    async getTrxCount() {
        const res = await this.contract.getTrxCount();
        return res;
    }
    async getAllTrx() {
        let trx = [];
        const count = await this.getTrxCount();
        for (let i = 1; i <= count; i++) {
            trx.push(await this.getTransaction(i));
        }
        return trx;
    }
}
