import { Entity, Column, OneToMany } from 'typeorm'

import { Base } from './Base'
import { ProducerCrop } from './ProducerCrop'

@Entity()
// Crop = cultura
export class Crop extends Base {
  @Column()
  name!: string

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.crop)
  producerCrops!: ProducerCrop[]
}
