import { UsersRepositories } from "../repositories/UsersRepositories"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean
}

class CreateUserService {

    async execute({name, email, admin}:IUserRequest) {
        const usersRepository = new UsersRepositories();

        if(!email) {
            throw new Error("Email incorrect");
        }

        const userAlreadyExists = await usersRepository.findOne({ //Usuario já existe?
          email,
        });

        if (userAlreadyExists) {
            throw new Error("User already exists"); // se existir lança uma excessao/erro
        }

        const user = usersRepository.create({
          name,
          email,
          admin,
        }); // tudo certo, cria a instancia e salva o objeto no BD

        await usersRepository.save(user);
    }
}

export {CreateUserService};
