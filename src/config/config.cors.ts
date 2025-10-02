import {
  CorsOptions,
  CustomOrigin,
} from '@nestjs/common/interfaces/external/cors-options.interface';

const CORS_WHITELIST = ['https://www.setapat.com', 'https://beta.setapat.com'];

const validateCors: CustomOrigin = (origin, callback) => {
  // Allow requests with no origin (e.g., Postman, server-to-server)
  if (!origin) return callback(null, true);

  // Allow localhost during development
  if (origin.includes('localhost')) return callback(null, true);

  // Allow all subdomains of setapat.com
  const url = new URL(origin);
  if (url.hostname.endsWith('.setapat.com')) return callback(null, true);

  // Allow exact origins in the whitelist
  if (CORS_WHITELIST.includes(origin)) return callback(null, true);

  // Reject any other origins
  return callback(new Error(`Origin ${origin} is not allowed by CORS`));
};

export const corsOptions: CorsOptions = {
  origin: validateCors,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
};
