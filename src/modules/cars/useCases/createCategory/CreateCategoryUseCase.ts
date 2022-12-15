import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}
/**
 * Definir o tipo de retorno
 * Alterar o retorno de erro
 * Acessar o repositório
 
 */
/* CreateCategoryService is a class that receives a CategoriesRepository in its constructor and has a
method called execute that receives an object with the properties name and description and returns
void. */
class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({ description, name }: IRequest): void {
        //void é o retorno

        const categoryAlreadyExists =
            this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new Error("Category already exists");
        }
        this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
