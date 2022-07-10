import express, { Application } from "express";
import "dotenv/config";
import { observer } from "./api/login";
import { createClient } from "redis";

const PORT = process.env.PORT || 8000;

const app: Application = express();
const client = createClient();
client.on("error", (err) => console.log("Redis Client Error", err));

app.get("/get_admin", async (_req, res) => {
  const gfat=await observer();
  const admin=await gfat.getAdmin();
  res.send({
    message: admin,
  });
});

app.get("/departments", async (_req, res) => {
  const gfat = await observer();
  const dep = await (
    await gfat.department.getAllDep()
  ).map((ele) => JSON.stringify(ele));
  try {
    await client.connect();
  } catch {}
  await client.del("deparments");
  await client.lPush("departments", dep);
  res.send({
    message: dep,
  });
});
app.get("/get_dep", async (_req, res) => {
  try {
    await client.connect();
  } catch {}
  const gfat = await observer();
  const dep_count = await gfat.department.getDepCount();
  const dep = await client.lRange("departments", 0, dep_count);
  res.send({
    message: dep,
  });
});

app.get("/projects", async (_req, res) => {
  const gfat = await observer();
  const prj = await (
    await gfat.project.getAllPrj()
  ).map((ele) => JSON.stringify(ele));
  console.log("prj : >> " + prj);
  try {
    await client.connect();
  } catch {}
  await client.del('projects');
  await client.lPush("projects", prj);
  res.send({
    message: prj,
  });
});
app.get("/get_prj", async (_req, res) => {
  try {
    await client.connect();
  } catch {}
  const gfat = await observer();
  const prj_count = await gfat.project.getPrjCount();
  const prj = await client.lRange("projects", 0, prj_count);
  res.send({
    message: prj,
  });
});

app.get("/officers", async (_req, res) => {
  const gfat = await observer();
  const off = await (
    await gfat.officer.getAllOfficer()
  ).map((ele) => JSON.stringify(ele));
  console.log("off : >> " + off);
  try {
    await client.connect();
  } catch {}
  await client.del('officers');
  await client.lPush("officers", off);
  res.send({
    message: off,
  });
});
app.get("/get_off", async (_req, res) => {
  try {
    await client.connect();
  } catch {}
  const gfat = await observer();
  const off_count = await gfat.officer.getOffCount();
  const off = await client.lRange("officers", 0, off_count);
  res.send({
    message: off,
  });
});
app.get("/transactions", async (_req, res) => {
  const gfat = await observer();
  const trx = await (
    await gfat.transaction.getAllTrx()
  ).map((ele) => JSON.stringify(ele));
  try {
    await client.connect();
  } catch {}
  await client.del("transactions");
  await client.lPush("transactions", trx);
  res.send({
    message: trx,
  });
});

app.get("/get_trx", async (_req, res) => {
  try {
    await client.connect();
  } catch {}
  const gfat = await observer();
  const trx_count = await gfat.transaction.getTrxCount();
  const trx = await client.lRange("transactions", 0, trx_count);
  res.send({
    message: trx,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
