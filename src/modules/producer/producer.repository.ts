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
  try {
    return await connectDB.manager.find(Producer, {
      relations: {
        producerCrops: true,
      },
    })
  } catch (error) {
    console.error('Error finding producer by id:', error)
    throw error
  }
}
export const findOneProducer = async (id: string) => {
  try {
    return await connectDB.manager.findOne(Producer, {
      where: {
        id,
      },
      relations: {
        producerCrops: true,
      },
    })
  } catch (error) {
    console.error('Error finding producer by id:', error)
    throw error
  }
}
