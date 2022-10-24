import { IJwtResponse } from 'types';

export class JwtResponse implements IJwtResponse {
  id: string;
  username: string;
  accessToken: string;
}
