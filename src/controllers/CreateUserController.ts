import {Request, Response} from "express"
import {CreateUserService} from "../services/CreateUserService";
import { hash } from "bcryptjs";

class CreateUserController {
    
    async handle(request: Request, response: Response){
        const{ name, email, admin,password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, admin, password});


        response.status(201).json(user);
    }
}

export {CreateUserController};