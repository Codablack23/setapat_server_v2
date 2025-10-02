"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParticipantStatus = exports.MessageType = exports.ConversationType = exports.ConversationStatus = void 0;
var ConversationStatus;
(function (ConversationStatus) {
    ConversationStatus["OPEN"] = "OPEN";
    ConversationStatus["CLOSED"] = "CLOSED";
})(ConversationStatus || (exports.ConversationStatus = ConversationStatus = {}));
var ConversationType;
(function (ConversationType) {
    ConversationType["ORDER"] = "ORDER";
})(ConversationType || (exports.ConversationType = ConversationType = {}));
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "TEXT";
    MessageType["ATTACHMENT"] = "ATTACHMENT";
    MessageType["VOICE_NOTE"] = "VOICE_NOTE";
    MessageType["SUBMISSION"] = "SUBMISSION";
})(MessageType || (exports.MessageType = MessageType = {}));
var ParticipantStatus;
(function (ParticipantStatus) {
    ParticipantStatus["PENDING"] = "PENDING";
    ParticipantStatus["ACTIVE"] = "ACTIVE";
    ParticipantStatus["INACTIVE"] = "INACTIVE";
})(ParticipantStatus || (exports.ParticipantStatus = ParticipantStatus = {}));
//# sourceMappingURL=enum.conversation.js.map