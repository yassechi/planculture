
export type AccessTokenType = {
    accessToken : string;
}

export interface JWTPayloadType {
  id: number;
  email: string;
  role: string; 
  id_role: number;
  nom?: string;
  prenom?: string;
}