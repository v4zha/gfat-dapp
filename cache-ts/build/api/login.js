"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observer = exports.etherLogin = void 0;
const gfat_1 = require("./gfat");
const contract_add = process.env.CONTRACT_ADDR;
async function etherLogin() {
    let builder = new gfat_1.GFatBuilder();
    builder = await builder.fromMetaMask();
    const gfat = (await builder.login().assign_contract(contract_add)).build();
    return gfat;
}
exports.etherLogin = etherLogin;
async function observer() {
    let builder = new gfat_1.GFatBuilder();
    const provider_url = process.env.PROVIDER_URL;
    builder = await builder.fromUrl(provider_url);
    const gfat = (await builder.asObserver().assign_contract(contract_add)).build();
    return gfat;
}
exports.observer = observer;
