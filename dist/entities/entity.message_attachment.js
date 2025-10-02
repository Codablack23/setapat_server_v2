"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAttachmentEntity = void 0;
const lib_1 = require("../lib");
const typeorm_1 = require("typeorm");
const entity_messages_1 = require("./entity.messages");
let MessageAttachmentEntity = class MessageAttachmentEntity {
    id;
    type;
    name;
    extension;
    file_size;
    audio_length;
    file_url;
    message;
};
exports.MessageAttachmentEntity = MessageAttachmentEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MessageAttachmentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: lib_1.AttachmentTypes,
    }),
    __metadata("design:type", String)
], MessageAttachmentEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: '',
        nullable: false,
    }),
    __metadata("design:type", String)
], MessageAttachmentEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        default: 'png',
        nullable: false,
    }),
    __metadata("design:type", String)
], MessageAttachmentEntity.prototype, "extension", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        name: 'file_size',
    }),
    __metadata("design:type", Number)
], MessageAttachmentEntity.prototype, "file_size", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        name: 'audio_length',
    }),
    __metadata("design:type", Number)
], MessageAttachmentEntity.prototype, "audio_length", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false,
        name: 'file_url',
    }),
    __metadata("design:type", String)
], MessageAttachmentEntity.prototype, "file_url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_messages_1.MessageEntity, (message) => message.attachments),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", entity_messages_1.MessageEntity)
], MessageAttachmentEntity.prototype, "message", void 0);
exports.MessageAttachmentEntity = MessageAttachmentEntity = __decorate([
    (0, typeorm_1.Entity)('message_attachments')
], MessageAttachmentEntity);
//# sourceMappingURL=entity.message_attachment.js.map