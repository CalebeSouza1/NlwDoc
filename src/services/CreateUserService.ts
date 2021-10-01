import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({name, email, admin = false, password} :IUserRequest) {
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email) {
            throw new Error("Email incorrect"); //lançando uma excessao
        }

        const userAlreadyExists = await usersRepository.findOne({ //Usuario já existe?
          email,
        });

        if (userAlreadyExists) {
            throw new Error("User already exists"); // se existir lança uma excessao/erro
        }

        const passwordHash = await hash(password, 8)

        const user = usersRepository.create({
          name,
          email,
          admin,
          password: passwordHash,
        }); // tudo certo, cria a instancia e salva o objeto no BD

        await usersRepository.save(user);

        return user;
    }
}

export {CreateUserService};
