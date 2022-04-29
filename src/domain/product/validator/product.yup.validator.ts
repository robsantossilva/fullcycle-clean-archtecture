import ValidatorInterface from "../../@shared/validator/validator.interface";
import {object, string, ValidationError, number} from "yup"
import Product from "../entity/product";

export default class ProductYupValidator implements ValidatorInterface<Product>
{
    validate(entity: Product): void {
        try {
            object()
            .shape({
                id: string().required("Id is required"),
                name: string().required("Name is required"),
                price: number().min(0,"Price must be greater than zero")
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name,
                    price: entity.price
                },
                {
                    abortEarly: false
                }
            );
        } catch (error) {
            const e = error as ValidationError;
            e.errors.forEach((e) => {
                entity.notification.addError({
                    context: "product",
                    message: e
                })
            })
        }
    }
    
}