"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRole = exports.DesignerRanks = exports.DesignerRole = exports.Gender = exports.userTypeList = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType["USER"] = "USER";
    UserType["DESIGNER"] = "DESIGNER";
    UserType["BILLERS"] = "BILLERS";
    UserType["ADMIN"] = "ADMIN";
})(UserType || (exports.UserType = UserType = {}));
exports.userTypeList = Object.values(UserType);
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));
var DesignerRole;
(function (DesignerRole) {
    DesignerRole["DESIGNER"] = "DESIGNER";
    DesignerRole["SUPER_DESIGNER"] = "SUPER_DESIGNER";
    DesignerRole["SUPERVISOR"] = "SUPERVISOR";
})(DesignerRole || (exports.DesignerRole = DesignerRole = {}));
var DesignerRanks;
(function (DesignerRanks) {
    DesignerRanks["JUNIOR"] = "JUNIOR";
    DesignerRanks["MID"] = "MID";
    DesignerRanks["SENIOR"] = "SENIOR";
})(DesignerRanks || (exports.DesignerRanks = DesignerRanks = {}));
var AdminRole;
(function (AdminRole) {
    AdminRole["ADMIN"] = "ADMIN";
    AdminRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    AdminRole["HR"] = "HR";
    AdminRole["ACCOUNTANT"] = "ACCOUNTANT";
})(AdminRole || (exports.AdminRole = AdminRole = {}));
//# sourceMappingURL=enum.user.js.map