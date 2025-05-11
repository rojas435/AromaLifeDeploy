import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { EmotionalStateFragrance } from "../../emotional-state_fragrance/entities/emotional-state_fragrance.entity";
import { FragrancePyramid } from "../../fragrance-pyramid/entities/fragrance-pyramid.entity";

@Entity()
export class Fragrance {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    name: string;

    @OneToMany(() => EmotionalStateFragrance, emotionalStateFragrance => emotionalStateFragrance.fragrance, { onDelete: 'CASCADE' })
    emotionalStateFragrance: EmotionalStateFragrance[];

    @OneToMany(() => FragrancePyramid, fragrancePyramid => fragrancePyramid.fragrance, { cascade: true})
    fragrancePyramid: FragrancePyramid[];
}
