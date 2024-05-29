import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of stores', () => {
      const result = service.findAll();
      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe('findAllByIds', () => {
    it('should return an array of stores filtered by ids', () => {
      const storeIdList = [{ idStore: 'S1' }];
      const result = service.findAllByIds(storeIdList);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
      expect(result[0].id).toEqual('S1');
    });
  });

  describe('findOne', () => {
    it('should return the store with the given id', () => {
      const id = 'S1';
      const result = service.findOne(id);
      expect(result).toBeDefined();
    });

    it('should return an error message if the store is not found', () => {
      const id = 'nonexistent_id';
      const result = service.findOne(id);
      expect(result).toEqual({ error: "Tienda no encontrada" });
    });
  });

  describe('create', () => {
    it('should create a new store', () => {
      const id = 'S2';
      const name = 'New Store';
      const city = 'BOG';
      const address = 'Calle 10 #20';
      const result = service.create(id, name, city, address);
      expect(result).toEqual({ id, name, city, address });
    });

    it('should return an error message for invalid city code', () => {
      const id = 'S3';
      const name = 'Invalid Store';
      const city = 'Invalid City';
      const address = 'Calle 5 #10';
      const result = service.create(id, name, city, address);
      expect(result).toEqual({ error: "Código de ciudad inválido" });
    });
  });

  describe('update', () => {
    it('should update an existing store', () => {
      const id = 'S1';
      const newData = { name: 'Updated Store', city: 'MED', address: 'Calle 20 #30' };
      const result = service.update(id, newData);
      expect(result).toEqual({ id, ...newData });
    });
  });

  describe('delete', () => {
    it('should delete the store with the given id', () => {
      const id = 'S1';
      const result = service.delete(id);
      expect(result).toBeDefined();
      expect(service.findOne(id)).toEqual({ error: "Tienda no encontrada" });
    });

    it('should return an error message if the store is not found', () => {
      const id = 'nonexistent_id';
      const result = service.delete(id);
      expect(result).toEqual({ error: "Tienda no encontrada" });
    });
  });

  describe('isValidCityCode', () => {
    it('should return true for valid city code', () => {
      const city = 'BOG';
      const result = service.isValidCityCode(city);
      expect(result).toBe(true);
    });

    it('should return false for invalid city code', () => {
      const city = 'Invalid City';
      const result = service.isValidCityCode(city);
      expect(result).toBe(false);
    });
  });
});
