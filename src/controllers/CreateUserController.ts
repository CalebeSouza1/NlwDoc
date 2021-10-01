import {Request, Response} from "express"
import {CreateUserService} from "../services/CreateUserService";
import { hash } from "bcryptjs"; // responsavel por criar uma criptografia para senha

class CreateUserController {

    // controller responsavel por pegar nossa requisição e só enviar para  service.
    
    async handle(request: Request, response: Response){
        const{ name, email, admin,password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, admin, password});


        response.status(201).json(user);
    }
}

export {CreateUserController};


/*
* server -> routes -> Controller -> Service (throw new Error)

 
try{//tente fazer algo se não cnseguir, cai no chatch
}catch(err) {
    return response.status(400).jason({error: err.message});

    o try catch fica massante e pode ser esquecido de colocar em algum lugar
}
*/