"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleOAuthProvider = void 0;
const common_1 = require("@nestjs/common");
const google_auth_library_1 = require("google-auth-library");
const lib_1 = require("../../lib");
class GoogleOAuthProvider {
    static client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);
    static async verifyToken(idToken) {
        try {
            const ticket = await this.client.verifyIdToken({
                idToken,
                audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload)
                throw new Error('No payload returned');
            return {
                email: payload.email,
                firstname: payload.given_name || '',
                lastname: payload.family_name || '',
                avatar: payload.picture,
            };
        }
        catch (err) {
            console.error('Google token verification error:', err.message || err);
            throw new common_1.UnauthorizedException(lib_1.AppResponse.getResponse('failed', {
                message: 'Invalid or expired Google token',
            }));
        }
    }
}
exports.GoogleOAuthProvider = GoogleOAuthProvider;
//# sourceMappingURL=oauth.google.js.map