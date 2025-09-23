/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { UnauthorizedException } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { AppResponse } from 'src/lib';

export class GoogleOAuthProvider {
  private static client = new OAuth2Client(process.env.GOOGLE_OAUTH_CLIENT_ID);

  static async verifyToken(idToken: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload) throw new Error('No payload returned');

      return {
        email: payload.email,
        firstname: payload.given_name || '',
        lastname: payload.family_name || '',
        avatar: payload.picture,
      };
    } catch (err) {
      console.error('Google token verification error:', err.message || err);
      throw new UnauthorizedException(
        AppResponse.getResponse('failed', {
          message: 'Invalid or expired Google token',
        }),
      );
    }
  }
}
