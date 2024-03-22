import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesUsersService } from './properties_users.service';

describe('PropertiesUsersService', () => {
  let service: PropertiesUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertiesUsersService],
    }).compile();

    service = module.get<PropertiesUsersService>(PropertiesUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
