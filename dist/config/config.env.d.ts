export interface IEnvironment {
    MAILER: {
        SMTP: string;
        HOST: string;
        USER: string;
        PORT: number;
        EMAIL: string;
        PASSWORD: string;
    };
    SEEDERS: {
        SUPER_DESIGNER_PASSWORD: string;
    };
    DB: {
        HOST: string;
        PORT: number;
        USERNAME: string;
        NAME: string;
        PASSWORD: string;
    };
    OAUTH: {
        GOOGLE_OAUTH_CLIENT_ID: string;
    };
    STORAGE: {
        BACKBLAZE_STORAGE_BUCKET: string;
        BACKBLAZE_STORAGE_APP_KEY: string;
        BACKBLAZE_STORAGE_BUCKET_ID: string;
        BACKBLAZE_STORAGE_APP_KEY_ID: string;
        BACKBLAZE_STORAGE_BUCKET_ENDPOINT: string;
        BUNNY_ACCESS_KEY: string;
    };
    SECRETS: {
        JWT_SECRET: string;
    };
    PAYSTACK: {
        PAYSTACK_SECRET: string;
    };
}
export declare const ENVIRONMENT: IEnvironment;
