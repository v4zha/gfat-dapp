// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.7.0 <0.9.0;

contract GFAT {
    //GFAT DATA
    Department[] public departments;
    Project[] public projects;
    Transaction[] public transactions;
    mapping(address => Officer) public officers;
    address[] public officers_list;
    address public admin;

    uint32 MAX_PROJECTS;
    uint32 MAX_OFFICERS;
    uint32 MAX_TX_COUNT;
    uint32 MAX_ASSIGNS;

    constructor() {
        admin = msg.sender;
        MAX_PROJECTS = 30;
        MAX_OFFICERS = 30;
        MAX_TX_COUNT = 30;
        MAX_ASSIGNS = 10;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == admin,
            "This operation can only be executed by Admin"
        );
        _;
    }

    modifier onlyAssigned(uint32 tid) {
        Transaction memory t = transactions[tid - 1];
        Project memory p = projects[t.pid - 1];
        address[] memory offid_list = p.assigned_officers;
        bool flag = false;
        for (uint32 i = 0; i < offid_list.length; i++) {
            if (msg.sender == offid_list[i]) {
                flag = true;
                break;
            }
        }
        require(flag == true, "Officer not Assigned to project .");
        address[] memory approved_off = t.approved_officers;
        bool approved = false;
        for (uint32 i = 0; i < approved_off.length; i++) {
            if (msg.sender == approved_off[i]) {
                approved = true;
                break;
            }
        }
        require(approved == false, "Officer already Approved the project .");
        _;
    }

    modifier onlyPermitted(uint32 pid) {
        Project memory p = projects[pid - 1];
        address[] memory offid_list = p.assigned_officers;
        bool flag = false;
        for (uint32 i = 0; i < offid_list.length; i++) {
            if (msg.sender == offid_list[i]) {
                flag = true;
                break;
            }
        }
        require(flag == true, "Officer not Assigned to project .");
        _;
    }

    struct Department {
        uint32 dep_id;
        uint32 prj_count;
        uint32 off_count;
        string name;
        uint32[] projects;
        address[] officers;
    }

    struct Transaction {
        uint32 tid;
        uint32 pid;
        uint32 required_votes;
        uint32 approval_votes;
        address[] approved_officers;
        string trx_from;
        string trx_to;
        uint32 trx_amt;
        string statement;
        TransactionState state;
    }

    struct Project {
        uint32 prj_id;
        uint32 dep_id;
        uint32 trx_count;
        uint32 assigned_off_count;
        string name;
        District prj_district;
        uint32[] transactions;
        address[] assigned_officers;
    }

    enum TransactionState {
        Pending,
        Approved,
        Ongoing,
        Completed
    }

    enum District {
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
        Kasargod
    }

    struct Officer {
        string name;
        uint32 dep_id;
        uint32 prj_count;
        uint32[] assigned_proj;
        address off_addr;
    }

    //Getters
    function isAdmin() public view returns (bool) {
        return msg.sender == admin;
    }

    //DEP
    function getDepPrj(uint32 dep_id, uint32 prj_index)
        public
        view
        returns (uint32)
    {
        require(departments.length >= dep_id, "Invalid Dep id");
        Department memory dep = departments[dep_id - 1];
        require(dep.prj_count >= prj_index, "Invalid Project id");
        return dep.projects[prj_index - 1];
    }

    function getDepOff(uint32 dep_id, uint32 off_index)
        public
        view
        returns (address)
    {
        require(departments.length >= dep_id, "Invalid Dep id");
        Department memory dep = departments[dep_id - 1];
        require(dep.off_count >= off_index, "Invalid Officer id");
        return dep.officers[off_index - 1];
    }

    function getDepCount() public view returns (uint32) {
        return uint32(departments.length);
    }

    //---
    //PRJ
    function getPrjTrx(uint32 prj_id, uint32 trx_index)
        public
        view
        returns (uint32)
    {
        require(projects.length >= prj_id, "Invalid Project id");
        Project memory prj = projects[prj_id - 1];
        require(prj.trx_count >= trx_index, "Invalid Transaction id");
        return prj.transactions[trx_index - 1];
    }

    function getPrjOff(uint32 prj_id, uint32 off_index)
        public
        view
        returns (address)
    {
        require(projects.length >= prj_id, "Invalid Project id");
        Project memory prj = projects[prj_id - 1];
        require(prj.assigned_off_count >= off_index, "Invalid Officer id");
        return prj.assigned_officers[off_index - 1];
    }

    function getPrjCount() public view returns (uint32) {
        return uint32(projects.length);
    }

    //---
    //OFF

    function isOfficer() public view returns (bool) {
        return officers[msg.sender].dep_id > 0;
    }

    function getOffPrj(address off_addr, uint32 prj_index)
        public
        view
        returns (uint32)
    {
        Officer memory off = officers[off_addr];
        require(off.prj_count >= prj_index, "Invalid project id");
        return off.assigned_proj[prj_index - 1];
    }

    function getOffIdPrj(uint32 off_id, uint32 prj_index)
        public
        view
        returns (uint32)
    {
        require(officers_list.length >= off_id, "Invalid Officer id");
        address off_addr = officers_list[off_id];
        Officer memory off = officers[off_addr];
        require(off.prj_count >= prj_index, "Invalid project id");
        return off.assigned_proj[prj_index - 1];
    }

    function getOffAddr(uint32 off_id) public view returns (address) {
        require(officers_list.length >= off_id, "Invalid Officer id");
        address off_addr = officers_list[off_id - 1];
        return off_addr;
    }

    function getOffCount() public view returns (uint32) {
        return uint32(officers_list.length);
    }

    //---
    //TRX
    function getTrxAppOff(uint32 tid, uint32 off_index)
        public
        view
        returns (address)
    {
        require(transactions.length >= tid, "Invalid Transaction id");
        Transaction memory trx = transactions[tid - 1];
        require(trx.approval_votes >= off_index, "Invalid Approved Officer id");
        return trx.approved_officers[off_index - 1];
    }

    function getTrxCount() public view returns (uint32) {
        return uint32(transactions.length);
    }

    //-------

    //Setters : )
    function createDep(string memory dep_name)
        external
        onlyAdmin
        returns (uint32)
    {
        Department memory dep = Department({
            dep_id: uint32(departments.length) + 1,
            prj_count: 0,
            off_count: 0,
            name: dep_name,
            projects: new uint32[](MAX_PROJECTS),
            officers: new address[](MAX_OFFICERS)
        });
        departments.push(dep);
        uint32 len = uint32(departments.length);
        emit CreateDepartment(len);
        return len;
    }

    function addOfficer(
        uint32 d_id,
        string memory name,
        address addr
    ) external onlyAdmin {
        Officer memory o = Officer({
            name: name,
            dep_id: d_id,
            prj_count: 0,
            assigned_proj: new uint32[](MAX_ASSIGNS),
            off_addr: addr
        });
        officers[addr] = o;
        officers_list.push(addr);
        Department storage d = departments[d_id - 1];
        d.officers[d.off_count] = addr;
        d.off_count += 1;
        emit CreateOfficer(addr);
    }

    function createProj(
        string memory pname,
        uint32 dep_id,
        District prj_district,
        address[] memory off_id
    ) external onlyAdmin returns (uint32) {
        Project memory p = Project({
            prj_id: uint32(projects.length) + 1,
            trx_count: 0,
            name: pname,
            dep_id: dep_id,
            prj_district: prj_district,
            assigned_officers: off_id,
            transactions: new uint32[](MAX_TX_COUNT),
            assigned_off_count: uint32(off_id.length)
        });
        projects.push(p);
        uint32 len = uint32(projects.length);
        Department storage d = departments[dep_id - 1];
        d.projects[d.prj_count] = len;
        d.prj_count += 1;
        assignOfficers(len, dep_id, off_id);
        emit CreateProject(len);
        return len;
    }

    function assignOfficers(
        uint32 pid,
        uint32 dep_id,
        address[] memory off_id
    ) internal {
        for (uint32 i = 0; i < off_id.length; i++) {
            Officer storage o = officers[off_id[i]];
            require(
                o.dep_id == dep_id,
                "Officer Belongs to another department"
            );
            o.assigned_proj[o.prj_count] = pid;
            o.prj_count += 1;
            emit OfficerAssignedtoProject(pid, off_id[i]);
        }
    }

    function createTrx(
        uint32 pid,
        string memory tx_from,
        string memory tx_to,
        uint32 amt,
        string memory statement,
        uint32 req_votes
    ) external onlyPermitted(pid) returns (uint32) {
        Project storage p = projects[pid - 1];
        require(
            p.assigned_officers.length >= req_votes,
            "Not Enough Officers assigned to Project"
        );
        Transaction memory t = Transaction({
            pid: pid,
            tid: uint32(transactions.length) + 1,
            trx_from: tx_from,
            trx_to: tx_to,
            trx_amt: amt,
            statement: statement,
            required_votes: req_votes,
            approval_votes: 0,
            approved_officers: new address[](p.assigned_officers.length),
            state: TransactionState.Pending
        });
        transactions.push(t);
        uint32 tid = uint32(transactions.length);
        p.transactions[p.trx_count] = tid;
        p.trx_count += 1;
        emit CreateTransaction(pid, tid);
        return tid;
    }

    //-------
    function approveTrx(uint32 tid) external onlyAssigned(tid) {
        Transaction storage t = transactions[tid - 1];
        if (t.state != TransactionState.Approved) {
            t.approval_votes += 1;
            if (t.approval_votes >= t.required_votes) {
                t.state = TransactionState.Approved;
                emit TransactionApproved(t.pid, tid);
            }
            t.approved_officers[t.approval_votes - 1] = msg.sender;
            emit SendApproval(tid, t.pid, msg.sender);
        } else {
            revert("Transaction already Approved");
        }
    }

    //events
    event CreateDepartment(uint32 id);
    event CreateOfficer(address add);
    event CreateProject(uint32 pid);
    event OfficerAssignedtoProject(uint32 pid, address off_id);
    event CreateTransaction(uint32 pid, uint32 tid);
    event SendApproval(uint32 pid, uint32 tid, address off_id);
    event TransactionApproved(uint32 pid, uint32 tid);
}
