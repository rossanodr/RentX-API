import { Category } from "../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../repositories/ICategoriesRepository";

//DTO => Data transfer object

class CategoriesRepository implements ICategoriesRepository {

    private categories: Category[];

    private static INSTANCE: CategoriesRepository;

    private constructor() {
        this.categories = [];
    }
    
 /**
  * If the INSTANCE variable is not set, then create a new instance of the CategoriesRepository class
  * and assign it to the INSTANCE variable. Otherwise, return the INSTANCE variable.
  * @returns The instance of the class.
  */
    public static getInstance(): CategoriesRepository {
        if(!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE;
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

    findByName(name: string): Category | undefined {
        const category = this.categories.find(category => category.name === name);
        return category;
    }
}

export { CategoriesRepository }