import Product from "../../../domain/product/entity/product";
import { InputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

const MockRepository = () => {

    const product = new Product("123", "Product Name", 12.34)

    return {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn()
    }
}

describe("Test find product use case", () => {

    it("should find a product", async () => {

        const repository = MockRepository();
        const usecase = new FindProductUseCase(repository);

        const input: InputFindProductDto = {
            id: "123"
        }

        const output = {
            id: "123",
            name: "Product Name",
            price: 12.34
        };

        const result = await usecase.execute(input);

        const spy = jest.spyOn(repository, 'find');

        expect(result).toEqual(output)
        expect(spy).toBeCalledWith("123")

    });

    it("should not find a customer", async () => {
        const repository = MockRepository();
        
        repository.find.mockImplementation(() => {
            return Promise.reject(new Error("Product not found"));
        })

        const usecase = new FindProductUseCase(repository);

        const input: InputFindProductDto = {
            id: "123"
        }

        await expect(usecase.execute(input)).rejects.toEqual(new Error("Product not found"));
    });

})