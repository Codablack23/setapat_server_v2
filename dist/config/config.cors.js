"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const CORS_WHITELIST = ['https://www.setapat.com', 'https://beta.setapat.com'];
const validateCors = (origin, callback) => {
    if (!origin)
        return callback(null, true);
    if (origin.includes('localhost'))
        return callback(null, true);
    const url = new URL(origin);
    if (url.hostname.endsWith('.setapat.com'))
        return callback(null, true);
    if (CORS_WHITELIST.includes(origin))
        return callback(null, true);
    return callback(new Error(`Origin ${origin} is not allowed by CORS`));
};
exports.corsOptions = {
    origin: validateCors,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
};
//# sourceMappingURL=config.cors.js.map