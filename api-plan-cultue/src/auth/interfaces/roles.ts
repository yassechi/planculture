import { ProfileDto } from "../dtos/profile.dto";

export enum Role{
    ADMIN = 'admin',
    FORMATEUR = 'formateur',
    STAGIAIRE = 'stagiaire',
}

export interface IAuthentificate{
    profile: ProfileDto;
    token:string;
}