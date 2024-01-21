import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { ProducerCrop } from './ProducerCrop'

// Producer = produtor (rural)
@Entity()
export class Producer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  cpfCnpj!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  farmName!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  city!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  state!: string

  @Column({ type: 'float', nullable: false })
  totalAreaHectares!: number

  @Column({ type: 'float', nullable: false })
  cultivableAreaHectares!: number

  @Column({ type: 'float', nullable: false })
  vegetationAreaHectares!: number

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.producerId, {
    cascade: true,
  })
  producerCrops!: ProducerCrop[]

  constructor(data: Partial<Producer>) {
    super()

    // Assign properties
    Object.assign(this, data)
  }
}
