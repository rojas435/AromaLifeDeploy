import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { CustomCandle } from "src/candles/custom-candle/entities/custom-candle.entity";
import { ComplementaryProduct } from "src/candles/complementary-product/entities/complementary-product.entity";

@Entity()
export class CustomCandleComplementaryProduct {
    @PrimaryGeneratedColumn('increment') 
    id: number;

    @ManyToOne(() => CustomCandle, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'custom_candle_id' })
    customCandle: CustomCandle;

    @ManyToOne(() => ComplementaryProduct, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'complementary_product_id' })
    complementaryProduct: ComplementaryProduct;
}