"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENVIRONMENT = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.ENVIRONMENT = {
    MAILER: {
        SMTP: process.env.MAILER_SMTP ?? "",
        HOST: process.env.MAILER_HOST ?? "",
        PORT: process.env.MAILER_PORT ? +process.env.MAILER_PORT : 587,
        EMAIL: process.env.MAILER_EMAIL ?? "",
        USER: process.env.MAILER_USER ?? "",
        PASSWORD: process.env.MAILER_PASSWORD ?? "",
    },
    DB: {
        HOST: process.env.DB_HOST ?? "",
        PORT: process.env.DB_PORT ? +process.env.DB_PORT : 41168,
        USERNAME: process.env.DB_USERNAME ?? "",
        PASSWORD: process.env.DB_PASSWORD ?? "",
        NAME: process.env.DB_NAME ?? "",
    },
    SECRETS: {
        JWT_SECRET: process.env.JWT_SECRET ?? ""
    },
    PAYSTACK: {
        PAYSTACK_SECRET: process.env.PAYSTACK_SECRET ?? ""
    },
    SEEDERS: {
        SUPER_DESIGNER_PASSWORD: process.env.SUPER_DESIGNER_PASSWORD ?? ""
    },
    STORAGE: {
        BACKBLAZE_STORAGE_BUCKET: process.env.BACKBLAZE_STORAGE_BUCKET ?? "",
        BACKBLAZE_STORAGE_APP_KEY: process.env.BACKBLAZE_STORAGE_APP_KEY ?? "",
        BACKBLAZE_STORAGE_BUCKET_ID: process.env.BACKBLAZE_STORAGE_BUCKET_ID ?? "",
        BACKBLAZE_STORAGE_APP_KEY_ID: process.env.BACKBLAZE_STORAGE_APP_KEY_ID ?? "",
        BACKBLAZE_STORAGE_BUCKET_ENDPOINT: process.env.BACKBLAZE_STORAGE_BUCKET_ENDPOINT ?? "",
        BUNNY_ACCESS_KEY: process.env.BUNNY_ACCESS_KEY ?? ""
    },
    OAUTH: {
        GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID ?? ""
    }
};
//# sourceMappingURL=config.env.js.map