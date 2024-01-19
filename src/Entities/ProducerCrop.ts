import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Producer } from './Producer'

@Entity()
// Producer crop = produtor cultura
export class ProducerCrop extends BaseEntity {
  // Foreign key
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ type: 'varchar', length: 255, nullable: false })
  cropName!: string

  @Column({ type: 'float', nullable: false })
  areaHectares!: number

  @ManyToOne(() => Producer, (producer) => producer.producerCrops, {
    onDelete: 'CASCADE',
  })
  producerId!: Producer

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at!: Date

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at!: Date

  constructor(data: Partial<ProducerCrop>) {
    super()
    Object.assign(this, data)
  }
}
