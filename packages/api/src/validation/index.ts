import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export type ValidationResult<T> = {
    isValide: true;
    data: T;
} | {
    isValide: false;
    errors: { message: string, field: string }[];
}

export async function validateClass<T extends object>(data: any, cls: new () => T): Promise<ValidationResult<T>> {
    const instance = plainToInstance(cls, data);
    const errors = await validate(instance);
    if (errors.length > 0) {
        return {
            isValide: false,
            errors: errors.map(error => ({
                message: Object.values(error.constraints || {}).join(', '),
                field: error.property
            })),
        }
    }
    return {
        isValide: true,
        data: instance,
    }
}
