import {Request, Response} from "express"
import {CreateUserService} from "../services/CreateUserService";

class CreateUserController {

    // controller responsavel por pegar nossa requisição e só enviar para  service.
    
    async handle(request: Request, response: Response){
        const{ name, email, admin } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, admin});
    }
}

export {CreateUserController};