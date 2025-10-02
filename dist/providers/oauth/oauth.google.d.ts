export declare class GoogleOAuthProvider {
    private static client;
    static verifyToken(idToken: string): Promise<{
        email: string | undefined;
        firstname: string;
        lastname: string;
        avatar: string | undefined;
    }>;
}
