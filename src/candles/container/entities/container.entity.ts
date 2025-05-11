import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Container {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ nullable: true, type: 'varchar', length: 255 })
    image_url: string;
}

