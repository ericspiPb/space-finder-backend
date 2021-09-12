import Amplify, { Auth } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth';

import { config } from './config';

Amplify.configure({
  Auth: {
    mandatorySignIn: false,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
    authenticationFLowType: 'USER_PASSWORD_AUTH',
  },
})

export class AuthService {
  public async login(username: string, password: string) {
    return await Auth.signIn(username, password) as CognitoUser;
  }
}