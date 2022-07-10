import { GFatBuilder, GFAT } from "./gfat";

type Test = () => Promise<void>;
const test: Test = async () => {
  const builder = new GFatBuilder();
  const gfat: GFAT = await builder
    .fromUrl("http://127.0.0.1:8545")
    .login()
    .assign_contract("0x71C324f19f4b32Bb695a51c6F7244C225e529A16")
    .then((builder) => builder.build());
  console.log(`accessed contract : ${gfat.contract.address}`);
  const admin = await gfat.getAdmin();
  console.log(admin);
  const res = await gfat.isAdmin();
  console.log("is admin : ", res);
  // const t_dep=await gfat.department.createDep("Aero Department");
  // console.log("created dep : ",t_dep);
  // const dep =await gfat.department.getDep(1);
  // console.log("Department: " ,dep);
  const off1 = "0xe9562EF19D7a092489d80625f2013Aa51F9B552A";
  const off2 = "0xdffaC064C5184a30e84D325C4D7246cfbE8a082F";
  // await gfat.officer.createOfficer(1,"ravi",off1);
  const isoff = await gfat.officer.isOfficerFromAddr(off2);
  console.log("is Officer :", isoff);
  // await gfat.officer.createOfficer(1,"rahul",off2);
  // await gfat.project.createProject("Mono rail",1,[off1,off2]);
  // const prj=await gfat.project.getProject(1);
  // console.log("Project: ", prj);
  // const officer1=await gfat.officer.getOfficerById(1);
  // const officer2=await gfat.officer.getOfficer(off2);
  // console.log("Officer1 : ",officer1);
  // console.log("officer2 : ",officer2);
  // const statement="Rail: 100 Cr";
  // await gfat.transaction.createTransaction(1,statement,2,off1);
  // const trx=await gfat.transaction.getTransaction(2);
  // console.log("Transaction : ",trx);
  // await gfat.transaction.approveTransaction(2,off1);
};

const res = test().then(() => console.log("Test executed : ) "));
