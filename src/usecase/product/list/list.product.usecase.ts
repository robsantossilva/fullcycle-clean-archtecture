import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const customers = await this.productRepository.findAll();
    return OutputMapper.toOutput(customers);
  }
}

class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDto {
    return {
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price
      })),
    };
  }
}