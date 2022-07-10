"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateElement = exports.District = exports.LoginState = exports.TransactionState = void 0;
var TransactionState;
(function (TransactionState) {
    TransactionState[TransactionState["Pending"] = 0] = "Pending";
    TransactionState[TransactionState["Approved"] = 1] = "Approved";
    TransactionState[TransactionState["Ongoing"] = 2] = "Ongoing";
    TransactionState[TransactionState["Completed"] = 3] = "Completed";
})(TransactionState = exports.TransactionState || (exports.TransactionState = {}));
var LoginState;
(function (LoginState) {
    LoginState[LoginState["Admin"] = 0] = "Admin";
    LoginState[LoginState["Officer"] = 1] = "Officer";
    LoginState[LoginState["Observer"] = 2] = "Observer";
})(LoginState = exports.LoginState || (exports.LoginState = {}));
var District;
(function (District) {
    District[District["Thiruvananthapuram"] = 0] = "Thiruvananthapuram";
    District[District["Kollam"] = 1] = "Kollam";
    District[District["Pathanamthitta"] = 2] = "Pathanamthitta";
    District[District["Alappuzha"] = 3] = "Alappuzha";
    District[District["Kottayam"] = 4] = "Kottayam";
    District[District["Idukki"] = 5] = "Idukki";
    District[District["Ernakulam"] = 6] = "Ernakulam";
    District[District["Thrissur"] = 7] = "Thrissur";
    District[District["Palakkad"] = 8] = "Palakkad";
    District[District["Malapuram"] = 9] = "Malapuram";
    District[District["Kozhikode"] = 10] = "Kozhikode";
    District[District["Wayanad"] = 11] = "Wayanad";
    District[District["Kannur"] = 12] = "Kannur";
    District[District["Kasargod"] = 13] = "Kasargod";
})(District = exports.District || (exports.District = {}));
var CreateElement;
(function (CreateElement) {
    CreateElement[CreateElement["Department"] = 0] = "Department";
    CreateElement[CreateElement["Project"] = 1] = "Project";
    CreateElement[CreateElement["Officer"] = 2] = "Officer";
    CreateElement[CreateElement["Transaction"] = 3] = "Transaction";
})(CreateElement = exports.CreateElement || (exports.CreateElement = {}));
