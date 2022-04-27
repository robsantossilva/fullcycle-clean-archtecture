import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.products.usecase";

const product = ProductFactory.create({
  name: "Product 1",
  price: 12.34
})

const input = {
    id: product.id,
    name: "Product 1 Updated",
    price: 56.78
}

describe("Unit test for product update use case", () => {

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

  it("should update a product", async () => {
    const repository = new ProductRepository();

    await repository.create(product)

    const useCase = new UpdateProductUseCase(repository);

    const output = await useCase.execute(input);

    expect(output).toEqual(input);
  });
});