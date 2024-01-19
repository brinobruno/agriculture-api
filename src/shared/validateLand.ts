type validateUsedLandArgs = {
  cultivableArea: number
  vegetationArea: number
  totalArea: number
}

type validateProducerCrop = {
  cropName: string
  areaHectares: number
}

type validateProducerCropArgs = {
  producerCrops: validateProducerCrop[]
}

export const validateUsedLand = ({
  cultivableArea,
  vegetationArea,
  totalArea,
}: validateUsedLandArgs) => {
  const usedLandAreaHectares = cultivableArea + vegetationArea

  if (usedLandAreaHectares > totalArea)
    throw new Error('Used land area cannot be bigger than total area')
}

export const validateProducerCrops = ({
  producerCrops,
}: validateProducerCropArgs) => {
  if (!producerCrops) throw new Error('Producer must provide crops')
}
