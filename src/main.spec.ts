import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      useGlobalPipes: jest.fn(),
      listen: jest.fn(),
    }),
  },
}));

describe('Main bootstrap', () => {
  it('should initialize the application', async () => {
    const mockApp = await NestFactory.create(AppModule);
    const useGlobalPipesSpy = jest.spyOn(mockApp, 'useGlobalPipes');
    const listenSpy = jest.spyOn(mockApp, 'listen');

    await import('./main');

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    expect(useGlobalPipesSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        validatorOptions: expect.objectContaining({
          whitelist: true,
          forbidNonWhitelisted: true,
        }),
      }),
    );
    expect(listenSpy).toHaveBeenCalledWith(process.env.PORT ?? 3000);
  });
});