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

  getFarmsByCulture: async () => {
    return await dashboardRepository.getFarmsByCulture()
  },

  getSoilUsageRatio: async () => {
    // Implement logic to calculate soil usage ratio
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

    const soilUsageRatio = {
      cultivableArea: totalCultivableArea,
      vegetationArea: totalVegetationArea,
      totalArea,
    }

    return soilUsageRatio
  },
}