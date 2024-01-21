import { connectDB } from '../../config/ormconfig'
import { Producer } from '../../Entities/Producer'

const producerRepository = connectDB.manager.getRepository(Producer)

export const dashboardRepository = {
  getTotalFarms: async () => {
    try {
      return await producerRepository.find({
        relations: {
          producerCrops: true,
        },
      })
    } catch (error) {
      console.error('Error finding producers', error)
      throw error
    }
  },

  async getFarmsByState(): Promise<{ [state: string]: number }> {
    const result = await producerRepository
      .createQueryBuilder('producer')
      .select('producer.state, COUNT(*) as count')
      .groupBy('producer.state')
      .getRawMany()

    // returns: "farmsByState": [
    //   { "state": "state X", "count": "2" }
    // ]

    return Object.fromEntries(
      result.map((item) => [item.state, Number(item.count)]),
    ) as { [state: string]: number }
  },

  async getFarmsByCrop(): Promise<{ [crop: string]: number }> {
    const result = await producerRepository
      .createQueryBuilder('producer')
      .innerJoinAndSelect('producer.producerCrops', 'crop')
      .select('crop.cropName as crop, COUNT(*) as count')
      .groupBy('crop.cropName')
      .getRawMany()

    return Object.fromEntries(
      result.map((item) => [item.crop, Number(item.count)]),
    ) as { [crop: string]: number }
  },
}
