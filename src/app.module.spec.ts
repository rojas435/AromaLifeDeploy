import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';

describe('AppModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [AppService], // Asegúrate de incluir AppService
    }).compile();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
  });

  it('should load all providers', async () => {
    const appService = module.get<AppService>(AppService);
    expect(appService).toBeDefined();
  });
});