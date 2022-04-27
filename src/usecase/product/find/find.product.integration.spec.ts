import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductDto } from "./find.product.dto";
import FindProductUseCase from "./find.product.usecase";

describe("Test find product use case", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true}
        })

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {

        const repository = new ProductRepository();

        const spy = jest.spyOn(repository, 'find');

        const product = new Product("123", "Product Name", 12.34)
        await repository.create(product) 

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

        expect(result).toEqual(output)
        expect(spy).toBeCalledWith("123")

    });

    it("should not find a product", async () => {
        const repository = new ProductRepository();

        const product = new Product("123", "Product Name", 12.34)
        await repository.create(product) 

        const usecase = new FindProductUseCase(repository);

        const input: InputFindProductDto = {
            id: "321"
        }

        //await usecase.execute(input)
        await expect(usecase.execute(input)).rejects.toEqual(new Error("Product not found"));
    });

})