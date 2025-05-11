import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ComplementaryProduct {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: true })
    image_url: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    price: number;

    @Column({ type: 'int', default: 1 })
    quantity: number; // Nueva columna para manejar la cantidad disponible del producto
}