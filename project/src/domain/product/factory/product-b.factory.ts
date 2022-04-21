import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductB from "../entity/product-b";
import ProductFactoryAbstract, { ProductFactoryProps } from "./product.factory.interface";

export default class ProductBFactory extends ProductFactoryAbstract {
  static create(props: ProductFactoryProps): ProductInterface {
      const {name, price} = props;
      return new ProductB(uuid(), name, price);
  }
}