export interface IJwtPayload {
  id: string;
  username: string;
}

export interface IJwtResponse extends IJwtPayload {
  accessToken: string;
}
