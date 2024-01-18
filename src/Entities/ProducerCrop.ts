import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { Producer } from './Producer'
import { Crop } from './Crop'

@Entity()
// Producer crop = produtor cultura
// Represent many-to-many for Producer/Crop
export class ProducerCrop extends BaseEntity {
  // Many to one/OneToOne without joinColumn will create auto
  // Foreign key
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToOne(() => Producer, (producer) => producer.producerCrops)
  producer!: Producer

  @ManyToOne(() => Crop, (crop) => crop.producerCrops)
  crop!: Crop

  constructor(data: Partial<ProducerCrop>) {
    super()
    Object.assign(this, data)
  }
}
