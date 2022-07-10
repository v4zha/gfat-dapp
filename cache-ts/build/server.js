"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const login_1 = require("./api/login");
const redis_1 = require("redis");
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
const client = (0, redis_1.createClient)();
client.on("error", (err) => console.log("Redis Client Error", err));
app.get("/get_admin", async (_req, res) => {
    const gfat = await (0, login_1.observer)();
    const admin = await gfat.getAdmin();
    res.send({
        message: admin,
    });
});
app.get("/departments", async (_req, res) => {
    const gfat = await (0, login_1.observer)();
    const dep = await (await gfat.department.getAllDep()).map((ele) => JSON.stringify(ele));
    try {
        await client.connect();
    }
    catch (_a) { }
    await client.del("deparments");
    await client.lPush("departments", dep);
    res.send({
        message: dep,
    });
});
app.get("/get_dep", async (_req, res) => {
    try {
        await client.connect();
    }
    catch (_a) { }
    const gfat = await (0, login_1.observer)();
    const dep_count = await gfat.department.getDepCount();
    const dep = await client.lRange("departments", 0, dep_count);
    res.send({
        message: dep,
    });
});
app.get("/projects", async (_req, res) => {
    const gfat = await (0, login_1.observer)();
    const prj = await (await gfat.project.getAllPrj()).map((ele) => JSON.stringify(ele));
    console.log("prj : >> " + prj);
    try {
        await client.connect();
    }
    catch (_a) { }
    await client.del('projects');
    await client.lPush("projects", prj);
    res.send({
        message: prj,
    });
});
app.get("/get_prj", async (_req, res) => {
    try {
        await client.connect();
    }
    catch (_a) { }
    const gfat = await (0, login_1.observer)();
    const prj_count = await gfat.project.getPrjCount();
    const prj = await client.lRange("projects", 0, prj_count);
    res.send({
        message: prj,
    });
});
app.get("/officers", async (_req, res) => {
    const gfat = await (0, login_1.observer)();
    const off = await (await gfat.officer.getAllOfficer()).map((ele) => JSON.stringify(ele));
    console.log("off : >> " + off);
    try {
        await client.connect();
    }
    catch (_a) { }
    await client.del('officers');
    await client.lPush("officers", off);
    res.send({
        message: off,
    });
});
app.get("/get_off", async (_req, res) => {
    try {
        await client.connect();
    }
    catch (_a) { }
    const gfat = await (0, login_1.observer)();
    const off_count = await gfat.officer.getOffCount();
    const off = await client.lRange("officers", 0, off_count);
    res.send({
        message: off,
    });
});
app.get("/transactions", async (_req, res) => {
    const gfat = await (0, login_1.observer)();
    const trx = await (await gfat.transaction.getAllTrx()).map((ele) => JSON.stringify(ele));
    try {
        await client.connect();
    }
    catch (_a) { }
    await client.del("transactions");
    await client.lPush("transactions", trx);
    res.send({
        message: trx,
    });
});
app.get("/get_trx", async (_req, res) => {
    try {
        await client.connect();
    }
    catch (_a) { }
    const gfat = await (0, login_1.observer)();
    const trx_count = await gfat.transaction.getTrxCount();
    const trx = await client.lRange("transactions", 0, trx_count);
    res.send({
        message: trx,
    });
});
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
