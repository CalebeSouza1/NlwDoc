import {getCustomRepository} from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService{
    async execute(name: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories);


        if (!name) {
            throw new Error("Incorrect name!");
        }
        
        // SELECT * FROM TAGS WHERE NAME = 'name'
        const tagAlreadyExists = await tagsRepositories.findOne({  // verificar se a tag existe
            name,
        });

        if (tagAlreadyExists) { // se ja existir uma tag
            throw new Error("Tag already exists!"); //lança uma execao dizendo tag ja existente
        }

        const tag = tagsRepositories.create({ // criar uma tag
            name,
        });

        await tagsRepositories.save(tag);

        return tag;
    }
}

export {CreateTagService}