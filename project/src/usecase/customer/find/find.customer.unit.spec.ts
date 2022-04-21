import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { InputFindCustomerDto } from "./find.customer.dto";
import FindCustomerUseCase from "./find.customer.usecase";

const MockRepository = () => {

    const customer = new Customer("123", "Robson")
    const address = new Address("Street", 123, "06600123", "City");
    customer.changeAddress(address);

    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn()
    }
}

describe("Test find customer use case", () => {

    it("should find a customer", async () => {

        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

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

        const spy = jest.spyOn(customerRepository, 'find');

        expect(result).toEqual(output)
        expect(spy).toBeCalledWith("123")

    });

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            return Promise.reject(new Error("Customer not found"));
        })

        const usecase = new FindCustomerUseCase(customerRepository);

        const input: InputFindCustomerDto = {
            id: "123"
        }

        // try {
        //     await usecase.execute(input); 
        // } catch (error) {
        //     expect(error).toEqual(new Error("Customer not found"))
        // }

        await expect(usecase.execute(input)).rejects.toEqual(new Error("Customer not found"));
    });

})