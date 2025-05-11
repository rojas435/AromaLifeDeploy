// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard'; 
// RolesGuard, si no es global, no se importa aquí

// --- IMPORTACIONES DE MÓDULOS (ESTAS ESTÁN BIEN COMO LAS TENÍAS) ---
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

// --- IMPORTACIONES DE LAS CLASES DE ENTIDAD (¡MANTENER ESTAS IMPORTACIONES!) ---
import { User } from './accounts/user/entities/user.entity';
import { Fragrance } from './fragrance/fragrance/entities/fragrance.entity';
import { Container } from './candles/container/entities/container.entity';
import { ConceptualCategory } from './scent_profiles/conceptual-category/entities/conceptual-category.entity';
import { Option } from './scent_profiles/options/entities/option.entity';
import { EmotionalState } from './scent_profiles/emotional-state/entities/emotional-state.entity';
import { FragrancePyramid } from './fragrance/fragrance-pyramid/entities/fragrance-pyramid.entity';
import { ComplementaryProduct } from './candles/complementary-product/entities/complementary-product.entity';
import { CustomCandle } from './candles/custom-candle/entities/custom-candle.entity';
import { CustomCandleComplementaryProduct } from './candles/custom-candle_complementary-product/entities/custom-candle_complementary-product.entity';
import { Order } from './order_process/orders/entities/order.entity';
import { OrderItem } from './order_process/order-item/entities/order-item.entity';
import { Subscription } from './order_process/subscription/entities/subscription.entity';
import { EmotionalStateFragrance } from './fragrance/emotional-state_fragrance/entities/emotional-state_fragrance.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL');
        const nodeEnv = configService.get<string>('NODE_ENV', 'development'); // Default a development si no está seteada
        const isProduction = nodeEnv === 'production';

        // Logging reducido para producción (opcional)
        if (isProduction) {
          console.log(`[AppModule-Prod] Initializing DB connection. NODE_ENV: ${nodeEnv}`);
        } else {
          // Logs más detallados para desarrollo si quieres
          console.log(`[AppModule-Dev] DATABASE_URL: ${dbUrl ? '**** (set)' : 'NOT SET'}`);
          console.log(`[AppModule-Dev] NODE_ENV: ${nodeEnv}`);
          console.log(`[AppModule-Dev] Is Production: ${isProduction}`);
          console.log(`[AppModule-Dev] SSL setting for DB: ${isProduction && dbUrl && dbUrl.includes('render.com')}`);
        }

        return {
          type: 'postgres',
          url: dbUrl,
          entities: [ // ¡SEGUIR LISTANDO LAS ENTIDADES EXPLÍCITAMENTE ES BUENA PRÁCTICA!
            User,
            Fragrance,
            Container,
            ConceptualCategory,
            Option, 
            EmotionalState,
            FragrancePyramid,
            ComplementaryProduct,
            CustomCandle,
            CustomCandleComplementaryProduct,
            Order,
            OrderItem,
            Subscription,
            EmotionalStateFragrance,
          ],
          
          // --- CAMBIO MÁS IMPORTANTE PARA PRODUCCIÓN ---
          synchronize: false, // ¡NUNCA true en producción después del setup inicial!
                              // Alternativa: synchronize: !isProduction, (sería true para dev, false para prod)

          ssl: isProduction && dbUrl && dbUrl.includes('render.com') 
            ? { rejectUnauthorized: false } 
            : false,
          
          logging: isProduction ? ['error'] : true, // En producción, loguear solo errores de DB. En dev, todo.
                                                   // O `logging: false` para producción si no quieres logs de TypeORM.

          // --- PREPARACIÓN PARA MIGRACIONES (Siguiente paso recomendado) ---
          // migrationsTableName: 'migrations_history', // Nombre opcional para la tabla de historial de migraciones
          // migrations: [__dirname + '/../migrations/*{.ts,.js}'], // Ajusta esta ruta cuando tengas migraciones
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
  ],
})
export class AppModule {}