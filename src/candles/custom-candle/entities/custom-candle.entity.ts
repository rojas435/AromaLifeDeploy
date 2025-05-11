import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { User } from "../../../accounts/user/entities/user.entity";
import { Fragrance } from "src/fragrance/fragrance/entities/fragrance.entity";
import { Container } from "src/candles/container/entities/container.entity";
import { EmotionalState } from "src/scent_profiles/emotional-state/entities/emotional-state.entity";

@Entity()
export class CustomCandle {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Container)
    @JoinColumn({ name: 'container_id' })
    container: Container;

    @ManyToOne(() => Fragrance)
    @JoinColumn({ name: 'fragrance_id' })
    fragrance: Fragrance;

    @ManyToOne(() => EmotionalState)
    @JoinColumn({ name: 'emotional_state_id' })
    emotionalState: EmotionalState;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    price: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ type: 'text', nullable: true })
    customImageUrl: string;

    @Column({ type: 'text', nullable: true })
    notes: string;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 50, default: 'pending' })
    status: string;
}
