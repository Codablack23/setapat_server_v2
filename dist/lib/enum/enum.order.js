"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionPageType = exports.SubmissionType = exports.OrderEditStatus = exports.OrderAssignmentStatus = exports.Orientation = exports.designExportFormats = exports.DesignExportFormats = exports.DesignClass = exports.OrderType = exports.DesignPackage = exports.AttachmentTypes = exports.DesignUnits = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DRAFT"] = "DRAFT";
    OrderStatus["PENDING"] = "PENDING";
    OrderStatus["COMPLETED"] = "COMPLETED";
    OrderStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OrderStatus["EDIT"] = "EDIT";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var DesignUnits;
(function (DesignUnits) {
    DesignUnits["mm"] = "mm";
    DesignUnits["cm"] = "cm";
    DesignUnits["inch"] = "inch";
    DesignUnits["px"] = "px";
    DesignUnits["ft"] = "ft";
})(DesignUnits || (exports.DesignUnits = DesignUnits = {}));
var AttachmentTypes;
(function (AttachmentTypes) {
    AttachmentTypes["IMAGE"] = "IMAGE";
    AttachmentTypes["AUDIO"] = "AUDIO";
    AttachmentTypes["VIDEO"] = "VIDEO";
    AttachmentTypes["DOCUMENT"] = "DOCUMENT";
})(AttachmentTypes || (exports.AttachmentTypes = AttachmentTypes = {}));
var DesignPackage;
(function (DesignPackage) {
    DesignPackage["BASIC"] = "BASIC";
    DesignPackage["STANDARD"] = "STANDARD";
    DesignPackage["PREMIUM"] = "PREMIUM";
})(DesignPackage || (exports.DesignPackage = DesignPackage = {}));
var OrderType;
(function (OrderType) {
    OrderType["ONE_OFF"] = "ONE_OFF";
    OrderType["CUSTOMIZED"] = "CUSTOMIZED";
})(OrderType || (exports.OrderType = OrderType = {}));
var DesignClass;
(function (DesignClass) {
    DesignClass["A1"] = "A1";
    DesignClass["A"] = "A";
    DesignClass["B"] = "B";
    DesignClass["C"] = "C";
    DesignClass["D"] = "D";
})(DesignClass || (exports.DesignClass = DesignClass = {}));
var DesignExportFormats;
(function (DesignExportFormats) {
    DesignExportFormats["PNG"] = "PNG";
    DesignExportFormats["JPEG"] = "JPEG";
    DesignExportFormats["PDF"] = "PDF";
    DesignExportFormats["SVG"] = "SVG";
    DesignExportFormats["AI"] = "AI";
})(DesignExportFormats || (exports.DesignExportFormats = DesignExportFormats = {}));
exports.designExportFormats = Object.values(DesignExportFormats);
var Orientation;
(function (Orientation) {
    Orientation["PORTRAIT"] = "PORTRAIT";
    Orientation["LANDSCAPE"] = "LANDSCAPE";
})(Orientation || (exports.Orientation = Orientation = {}));
var OrderAssignmentStatus;
(function (OrderAssignmentStatus) {
    OrderAssignmentStatus["PENDING"] = "PENDING";
    OrderAssignmentStatus["ACCEPTED"] = "ACCEPTED";
    OrderAssignmentStatus["WITHDRAWN"] = "WITHDRAWN";
})(OrderAssignmentStatus || (exports.OrderAssignmentStatus = OrderAssignmentStatus = {}));
var OrderEditStatus;
(function (OrderEditStatus) {
    OrderEditStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OrderEditStatus["COMPLETED"] = "COMPLETED";
})(OrderEditStatus || (exports.OrderEditStatus = OrderEditStatus = {}));
var SubmissionType;
(function (SubmissionType) {
    SubmissionType["ORDER"] = "ORDER";
    SubmissionType["EDIT"] = "EDIT";
})(SubmissionType || (exports.SubmissionType = SubmissionType = {}));
var SubmissionPageType;
(function (SubmissionPageType) {
    SubmissionPageType["PAGE"] = "PAGE";
    SubmissionPageType["RESIZE"] = "RESIZE";
})(SubmissionPageType || (exports.SubmissionPageType = SubmissionPageType = {}));
//# sourceMappingURL=enum.order.js.map