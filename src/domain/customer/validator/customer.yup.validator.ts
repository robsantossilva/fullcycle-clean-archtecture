import ValidatorInterface from "../../@shared/validator/validator.interface";
import Customer from "../entity/customer";
import {object, string, ValidationError} from "yup"

export default class CustomerYupValidator implements ValidatorInterface<Customer>
{
    validate(entity: Customer): void {
        try {
            object()
            .shape({
                id: string().required("Id is required"),
                name: string().required("Name is required")
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name
                },
                {
                    abortEarly: false
                }
            );
        } catch (error) {
            const e = error as ValidationError;
            e.errors.forEach((e) => {
                entity.notification.addError({
                    context: "customer",
                    message: e
                })
            })
        }
    }
    
}