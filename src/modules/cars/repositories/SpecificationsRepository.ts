import {
    ICreateSpecificationsDTO,
    ISpecificationsRepository,
} from "./ISpecificationsRepository";
import { Specification } from "../model/Specification";

class SpecificationsRepository implements ISpecificationsRepository {
    private specifications: Specification[];
    constructor() {
        this.specifications = [];
    }

    create({ description, name }: ICreateSpecificationsDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            description,
            name,
            created_at: new Date(),
        });
        this.specifications.push(specification);
    }
    findByName(name: string): Specification {
        const specification = this.specifications.find(
            (spec) => spec.name === name
        );
        return specification;
    }
}

export { SpecificationsRepository };
