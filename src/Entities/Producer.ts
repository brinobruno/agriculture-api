import { Entity, Column, OneToMany } from 'typeorm'

import { Base } from './Base'
import { ProducerCrop } from './ProducerCrop'

@Entity()
// Producer = produtor (rural)
export class Producer extends Base {
  @Column()
  cpfCnpj!: string

  @Column()
  name!: string

  @Column()
  farmName!: string

  @Column()
  city!: string

  @Column()
  state!: string

  @Column()
  totalAreaHectares!: number

  @Column()
  cultivableAreaHectares!: number

  @Column()
  vegetationAreaHectares!: number

  @OneToMany(() => ProducerCrop, (producerCrop) => producerCrop.producer)
  producerCrops!: ProducerCrop[]
}
