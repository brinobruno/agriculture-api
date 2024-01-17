import { Entity, Column, ManyToMany, JoinTable } from 'typeorm'

import { Base } from './Base'
import { ProducerCrop } from './ProducerCrop'

@Entity()
// Crop = cultura
export class Crop extends Base {
  @Column()
  name!: string

  @ManyToMany(() => ProducerCrop, (producerCrop) => producerCrop.crop)
  @JoinTable()
  producerCrops!: ProducerCrop[]
}
