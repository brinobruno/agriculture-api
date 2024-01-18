import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'

import { ProducerCrop } from './ProducerCrop'

@Entity()
// Crop = cultura
export class Crop extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.crop)
  producerCrops!: ProducerCrop[]
}
