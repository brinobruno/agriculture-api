import connectDB from '../../config/ormconfig'
import { Producer } from '../../Entities/Producer'

const producerRepository = connectDB.manager.getRepository(Producer)

export const saveProducer = async (
  producerData: Partial<Producer>,
): Promise<Producer> => {
  const producer = producerRepository.create(producerData)
  return producerRepository.save(producer)
}

export const findAllProducers = async () => {
  return connectDB.manager.find(Producer)
}
