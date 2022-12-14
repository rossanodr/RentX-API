import { Category } from "../model/Category";

//DTO => Data transfer object
interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {

    private categories: Category[];

    constructor() {
        this.categories = [];
    }
    /**
     * It creates a new category and pushes it into the categories array.
     * @param {ICreateCategoryDTO}  - ICreateCategoryDTO =&gt; {
     */

    create({ description, name }: ICreateCategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);
    }

    /**
     * It returns an array of Category objects.
     * @returns An array of Category objects.
     */
    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category| undefined{
        const category = this.categories.find(category => category.name === name);
        return category;
    }
}

export { CategoriesRepository }