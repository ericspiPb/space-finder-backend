import { AuthService } from "./AuthService";
import { config } from './config';

const authService = new AuthService();

authService.login(config.TEST_USER_NAME, config.TEST_USER_PASSWORD).then(
  user => console.log(user)
);
