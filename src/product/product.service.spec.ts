import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product, ProductType } from './product.entity';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return the product with the given id', () => {
      const id = 'P1';
      const result = service.findOne(id);
      expect(result).toBeDefined();
      expect(result.id).toEqual(id);
    });

    it('should return an error message if the product is not found', () => {
      const id = 'nonexistent_id';
      const result = service.findOne(id);
      expect(result).toEqual({ error: "Producto no encontrado" });
    });
  });

  describe('create', () => {
    it('should create a new product', () => {
      const id = 'P2';
      const name = 'New Product';
      const price = 500;
      const type = ProductType.PERECEDERO;
      const result = service.create(id, name, price, type);
      expect(result).toEqual({ id, name, price, type });
    });

    it('should return an error message for invalid product type', () => {
      const id = 'P3';
      const name = 'Invalid Product';
      const price = 100;
      const type = 'Invalid Type';
      const result = service.create(id, name, price, type);
      expect(result).toEqual("El tipo de producto debe ser: Perecedero o No perecedero");
    });
  });

  describe('update', () => {
    it('should update an existing product', () => {
      const id = 'P1';
      const newData = { name: 'Updated Product', price: 400 };
      const result = service.update(id, newData);
      expect(result).toEqual({ id, name: newData.name, price: newData.price, type: ProductType.PERECEDERO });
    });
  });

  describe('delete', () => {
    it('should delete the product with the given id', () => {
      const id = 'P1';
      const result = service.delete(id);
      expect(result).toEqual("Producto eliminado exitosamente");
      expect(service.findOne(id)).toEqual({ error: "Producto no encontrado" });
    });

    it('should return an error message if the product is not found', () => {
      const id = 'nonexistent_id';
      const result = service.delete(id);
      expect(result).toEqual({ error: "Producto no encontrado" });
    });
  });
});
