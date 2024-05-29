import { Test, TestingModule } from '@nestjs/testing';
import { ProductStoreService } from './product-store.service';
import { ProductService } from '../product/product.service';
import { StoreService } from '../store/store.service';

describe('ProductStoreService', () => {
  let service: ProductStoreService;
  let productService: ProductService;
  let storeService: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductStoreService,
        {
          provide: ProductService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: StoreService,
          useValue: {
            findOne: jest.fn(),
            findAllByIds: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductStoreService>(ProductStoreService);
    productService = module.get<ProductService>(ProductService);
    storeService = module.get<StoreService>(StoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addStoreToProduct', () => {
    it('should add store to product', async () => {
      const idProduct = 'P1';
      const idStore = 'S1';
      productService.findOne = jest.fn().mockReturnValue({ id: idProduct });
      storeService.findOne = jest.fn().mockReturnValue({ id: idStore });
      
      const result = service.addStoreToProduct(idProduct, idStore);
      
      expect(result).toEqual({ idProduct, idStore });
    });
  });

  describe('findStoresFromProduct', () => {
    it('should find stores from product', async () => {
      const idProduct = 'P1';
      const storeIdList = [{ idStore: 'S1' }];
      storeService.findAllByIds = jest.fn().mockReturnValue([{ id: 'S1' }]);
      
      const result = service.findStoresFromProduct(idProduct);
      
      expect(result).toEqual([{ id: 'S1' }]);
    });
  });

  describe('findStoreFromProduct', () => {
    it('should find store from product if associated', async () => {
      const idProduct = 'P1';
      const idStore = 'S1';
      productService.findOne = jest.fn().mockReturnValue({ id: idProduct });
      storeService.findOne = jest.fn().mockReturnValue({ id: idStore });
      service.addStoreToProduct(idProduct, idStore);

      const result = service.findStoreFromProduct(idProduct, idStore);
      expect(result).toEqual({ id: idStore });
    });

    it('should return error message if store is not associated with product', async () => {
      const idProduct = 'P1';
      const idStore = 'S1';
      
      const result = service.findStoreFromProduct(idProduct, idStore);
      expect(result).toEqual("El producto con id P1 No está asociado a la tienda con id S1");
    });
  });

  describe('updateStoresFromProduct', () => {
    it('should update stores from product', async () => {
      const idProduct = 'P1';
      const newData = { city: 'Updated City' };
      const storeList = [{ id: 'S1' }, { id: 'S2' }];
      service.findStoresFromProduct = jest.fn().mockReturnValue(storeList);
      storeService.update = jest.fn().mockReturnValue(newData);

      const result = service.updateStoresFromProduct(idProduct, newData);

      expect(result).toEqual([newData, newData]);
    });
  });

  describe('deleteStoresFromProduct', () => {
    it('should delete stores from product', async () => {
      const idProduct = 'P1';
      const storeList = [{ id: 'S1' }, { id: 'S2' }];
      service.findStoresFromProduct = jest.fn().mockReturnValue(storeList);
      storeService.delete = jest.fn().mockReturnValue({ id: 'S1' });

      const result = service.deleteStoresFromProduct(idProduct);

      expect(result).toEqual([{ id: 'S1' }, { id: 'S1' }]);
    });
  });

});
