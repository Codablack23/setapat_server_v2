import { Request } from 'express';

export interface CustomerRequest extends Request {
  user: any;
}
