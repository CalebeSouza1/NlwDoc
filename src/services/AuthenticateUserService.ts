import { getCustomRepository } from "typeorm"

import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

import { UsersRepositories } from "../repositories/UsersRepositories"



interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        const user = await usersRepositories.findOne({
            email,
        });
        
        if(!user) {
            throw new Error("Email/Password incorrect")
        }
    


        //12345/$634682u65#@#$567&$%#$
        const passwordMatch = compare(password, user.password);

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect")
        }
    
        const token = sign(
        {
            email: user.email
        },
         "aedb1991-6df7-42d4-842a-81b62eb3702c",
        { 
        subject: user.id,
            expiresIn:"1d",                         
        } 
     );

     return token; 
    }
}

export{AuthenticateUserService}