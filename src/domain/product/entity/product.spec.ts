import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Name", -1);
    }).toThrowError("Price must be greater than zero");
  });

  it("should throw error when id and name are empty", () => {
    expect(() => {
      new Product("", "", 100);
    }).toThrowError("product: Id is required, product: Name is required");
  });

  it("should throw error when id and price are empty", () => {
    expect(() => {
      new Product("", "Product 1", -1);
    }).toThrowError("product: Id is required, product: Price must be greater than zero");
  });

  it("should throw error when name and price are empty", () => {
    expect(() => {
      new Product("123", "", -1);
    }).toThrowError("product: Name is required, product: Price must be greater than zero");
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
    expect(product.id).toBe("123");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});