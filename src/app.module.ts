import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './accounts/user/user.module';
import { FragranceModule } from './fragrance/fragrance/fragrance.module';
import { ContainerModule } from './candles/container/container.module';
import { ConceptualCategoryModule } from './scent_profiles/conceptual-category/conceptual-category.module';
import { OptionsModule } from './scent_profiles/options/options.module';
import { EmotionalStateModule } from './scent_profiles/emotional-state/emotional-state.module';
import { FragrancePyramidModule } from './fragrance/fragrance-pyramid/fragrance-pyramid.module';
import { ComplementaryProductModule } from './candles/complementary-product/complementary-product.module';
import { CustomCandleModule } from './candles/custom-candle/custom-candle.module';
import { CustomCandleComplementaryProductModule } from './candles/custom-candle_complementary-product/custom-candle_complementary-product.module';
import { OrdersModule } from './order_process/orders/orders.module';
import { OrderItemModule } from './order_process/order-item/order-item.module';
import { SubscriptionModule } from './order_process/subscription/subscription.module';
import { EmotionalStateFragranceModule } from './fragrance/emotional-state_fragrance/emotional-state_fragrance.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard'; 
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        synchronize: process.env.NODE_ENV !== 'production',
        autoLoadEntities: true,
        ssl: process.env.NODE_ENV === 'production' // Habilita SSL solo en producción
          ? { rejectUnauthorized: false } // Necesario para Render y otros PaaS
          : false,
      }),
    }),

    ContainerModule,  
    FragranceModule, 
    UserModule, ConceptualCategoryModule, OptionsModule, EmotionalStateModule, 
    FragrancePyramidModule, ComplementaryProductModule, 
    CustomCandleModule, CustomCandleComplementaryProductModule, OrdersModule, OrderItemModule, 
    SubscriptionModule, EmotionalStateFragranceModule, AuthModule
  
  ],
  controllers: [AppController],
  providers: [
    AppService,
  
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, 
    },
  ],
})
export class AppModule {}