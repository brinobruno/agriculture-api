import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'

import { ProducerCrop } from './ProducerCrop'

@Entity()
// Producer = produtor (rural)
export class Producer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: number

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

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.producer)
  producerCrops!: ProducerCrop[]

  constructor(data: Partial<Producer>) {
    super()

    // Assign properties
    Object.assign(this, data)
  }
}
