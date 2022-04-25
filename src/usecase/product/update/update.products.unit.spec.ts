import ProductFactory from "../../../domain/product/factory/product.factory";
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

const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
    };
  };

  describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
      const repository = MockRepository();
      const useCase = new UpdateProductUseCase(repository);
  
      const output = await useCase.execute(input);
  
      expect(output).toEqual(input);
    });
  });