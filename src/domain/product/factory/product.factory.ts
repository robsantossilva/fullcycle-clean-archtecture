import Product from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { v4 as uuid } from "uuid";
import ProductFactoryAbstract, { ProductFactoryProps } from "./product.factory.interface";

export default class ProductFactory extends ProductFactoryAbstract {
  static create(props: ProductFactoryProps): ProductInterface {
      const {name, price} = props;
      return new Product(uuid(), name, price);
  }
}