import { Entity, ManyToOne } from 'typeorm'

import { Base } from './Base'
import { Producer } from './Producer'
import { Crop } from './Crop'

@Entity()
// Producer crop = produtor cultura
// Represent many-to-many for Producer/Crop
export class ProducerCrop extends Base {
  // Many to one/OneToOne without joinColumn will create auto
  // Foreign key

  @ManyToOne(() => Producer, (producer) => producer.producerCrops)
  producer!: Producer

  @ManyToOne(() => Crop, (crop) => crop.producerCrops)
  crop!: Crop
}
