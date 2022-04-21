import ProductInterface from "../entity/product.interface";

export interface ProductFactoryProps {
  name: string;
  price: number;
}

export default abstract class ProductFactoryAbstract {
  static create(props: ProductFactoryProps): ProductInterface {
      throw new Error("Method not implemented.");
  }
}