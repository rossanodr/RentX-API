import fs from "fs";
import { parse as csvParse } from "csv-parse";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

/* It takes a file, creates a read stream, creates a csv parser, pipes the stream to the parser, and
then returns a promise that resolves with an array of categories */
class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IImportCategory[] = [];
            const parseFile = csvParse();

            stream.pipe(parseFile);

            parseFile
                .on("data", async (line) => {
                    const [name, description] = line;
                    categories.push({
                        name,
                        description,
                    });
                })
                .on("end", () => {
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

   /**
    * It takes a file, loads the categories from the file, maps over the categories, and creates a new
    * category if it doesn't exist
    * @param file - Express.Multer.File
    */
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map((category) => {
            const { name, description } = category;
            const existCategory = this.categoriesRepository.findByName(name);
            if (!existCategory) {
                this.categoriesRepository.create({ name, description });
            }
        });
    }
}
export { ImportCategoryUseCase };
