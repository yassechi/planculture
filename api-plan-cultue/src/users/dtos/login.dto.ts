import { IsEmail, IsNotEmpty, IsString, Length, MaxLength } from "class-validator";

export class LoginDTO{

   @IsEmail()
   @IsNotEmpty()
   @MaxLength(150)
   email: string;
 
   @IsString()
   @IsNotEmpty()
   @Length(2, 255)
   hpassword: string;
}