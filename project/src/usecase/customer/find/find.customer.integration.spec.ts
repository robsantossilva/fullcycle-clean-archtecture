import { Sequelize } from "sequelize-typescript"
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { InputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a customer", async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "Robson")
        const address = new Address("Street", 123, "06600123", "City");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input: InputFindCustomerDto = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Robson",
            address: {
                street: "Street",
                number: 123,
                zip: "06600123",
                city: "City",
            }
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output)

    });

})