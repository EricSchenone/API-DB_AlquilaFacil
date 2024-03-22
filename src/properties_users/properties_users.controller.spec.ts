import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesUsersController } from './properties_users.controller';
import { PropertiesUsersService } from './properties_users.service';

describe('PropertiesUsersController', () => {
  let controller: PropertiesUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesUsersController],
      providers: [PropertiesUsersService],
    }).compile();

    controller = module.get<PropertiesUsersController>(PropertiesUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
