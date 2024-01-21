import { dashboardRepository } from './dashboard.repository'

export const dashboardService = {
  getFarmsTotalQuantity: async () => {
    const producers = await dashboardRepository.getTotalFarms()
    return producers.length
  },

  getFarmsTotalHectares: async () => {
    const producers = await dashboardRepository.getTotalFarms()
    const totalHectares = producers.reduce(
      (total, producer) => total + producer.totalAreaHectares,
      0,
    )
    return totalHectares
  },

  getFarmsByState: async () => {
    return await dashboardRepository.getFarmsByState()
  },

  getFarmsByCrop: async () => {
    return await dashboardRepository.getFarmsByCrop()
  },

  getLandUsageRatio: async () => {
    // Implement logic to calculate land usage ratio
    // Example:
    const producers = await dashboardRepository.getTotalFarms()
    const totalCultivableArea = producers.reduce(
      (total, producer) => total + producer.cultivableAreaHectares,
      0,
    )
    const totalVegetationArea = producers.reduce(
      (total, producer) => total + producer.vegetationAreaHectares,
      0,
    )
    const totalArea = producers.reduce(
      (total, producer) => total + producer.totalAreaHectares,
      0,
    )

    const landUsageRatio = {
      cultivableArea: totalCultivableArea,
      vegetationArea: totalVegetationArea,
      totalArea,
    }

    return landUsageRatio
  },
}
