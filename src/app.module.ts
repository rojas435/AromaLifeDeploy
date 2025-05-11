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

//Entidades para typeORM
import { User } from './accounts/user/entities/user.entity';
import { Fragrance } from './fragrance/fragrance/entities/fragrance.entity';
import { Container } from './candles/container/entities/container.entity';
import { ConceptualCategory } from './scent_profiles/conceptual-category/entities/conceptual-category.entity'; // Asumo que tienes una entidad aquí
import { Option } from './scent_profiles/options/entities/option.entity'; // Asumo 'Option' y no 'Options' para la clase entidad
import { EmotionalState } from './scent_profiles/emotional-state/entities/emotional-state.entity'; // Asumo que tienes una entidad aquí
import { FragrancePyramid } from './fragrance/fragrance-pyramid/entities/fragrance-pyramid.entity'; // Asumo que tienes una entidad aquí
import { ComplementaryProduct } from './candles/complementary-product/entities/complementary-product.entity'; // Asumo que tienes una entidad aquí
import { CustomCandle } from './candles/custom-candle/entities/custom-candle.entity'; // Asumo que tienes una entidad aquí
import { CustomCandleComplementaryProduct } from './candles/custom-candle_complementary-product/entities/custom-candle_complementary-product.entity'; // Asumo que tienes una entidad aquí
import { Order } from './order_process/orders/entities/order.entity'; // Asumo 'Order' y no 'Orders' para la clase entidad
import { OrderItem } from './order_process/order-item/entities/order-item.entity'; // Asumo que tienes una entidad aquí
import { Subscription } from './order_process/subscription/entities/subscription.entity'; // Asumo que tienes una entidad aquí
import { EmotionalStateFragrance } from './fragrance/emotional-state_fragrance/entities/emotional-state_fragrance.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        const nodeEnv = configService.get<string>('NODE_ENV'); // Obtener NODE_ENV desde ConfigService también
        const isProduction = nodeEnv === 'production';

        // Logging para depurar
        console.log(`[AppModule] DATABASE_URL: ${dbUrl ? '**** (set)' : 'NOT SET'}`); // No loguear la URL completa por seguridad
        console.log(`[AppModule] NODE_ENV: ${nodeEnv}`);
        console.log(`[AppModule] Is Production: ${isProduction}`);
        console.log(`[AppModule] SSL setting for DB: ${isProduction && dbUrl && dbUrl.includes('render.com')}`);
        console.log(`[AppModule] Synchronize setting for DB: true (TEMPORALMENTE para crear tablas)`);

        return {
          type: 'postgres',
          url: dbUrl,
          entities: [
            UserModule,
            FragranceModule,
            ContainerModule,
            ConceptualCategoryModule,
            OptionsModule, 
            EmotionalStateModule,
            FragrancePyramidModule,
            ComplementaryProductModule,
            CustomCandleModule,
            CustomCandleComplementaryProductModule,
            OrdersModule,
            OrderItemModule,
            SubscriptionModule,
            EmotionalStateFragranceModule,
          ],
          // autoLoadEntities: true, // Comentado porque listar explícitamente es mejor
          
          synchronize: true, // ¡MUY IMPORTANTE PARA ESTE PASO!
          // Una vez que las tablas se creen, cambia esto a:
          // synchronize: !isProduction, // o synchronize: false, para producción

          ssl: isProduction && dbUrl && dbUrl.includes('render.com') 
            ? { rejectUnauthorized: false } 
            : false,
          
          logging: true, // Habilitar logging de TypeORM para ver qué hace. Desactiva en producción si es muy verboso.
        };
      },
    }),

    // Tus otros módulos
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
    // Si RolesGuard es global, necesita estar aquí:
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
    // Pero si se usa con @UseGuards() en controladores/métodos, no se provee globalmente.
  ],
})
export class AppModule {}
