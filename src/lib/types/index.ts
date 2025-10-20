import { Request } from 'express';
import { OrderSubmissionEntity, UserEntity } from 'src/entities';
import { DesignExportFormats } from '../enum';

export type AuthRequest = Request & {
  user: UserEntity;
};

export interface RevisionObject {
  [page: string]: {
    total: number;
    count: number;
  };
}

type PartialFormats = Partial<
  Record<DesignExportFormats, OrderSubmissionEntity>
>;

export type OrderSubmissions = {
  [page: string]: {
    formats: PartialFormats;
    resize?: {
      [page: string]: {
        formats: PartialFormats;
      };
    };
  };
};

export interface RevisionPerPage {
  [page: string]: {
    count: number;
    resize?: {
      [page: string]: {
        count: number;
      };
    };
  };
}

export interface RevisionsPerPage {
  [page: string]: {
    total: number;
    count: number;
    resize?: {
      [page: string]: {
        total: number;
        count: number;
      };
    };
  };
}
