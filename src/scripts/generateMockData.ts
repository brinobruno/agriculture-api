import { faker } from '@faker-js/faker'

import { mockCpfCnpj } from '../shared/mockCpfCnpj'

export const generateCrop = () => ({
  id: faker.string.uuid(),
  cropName: faker.helpers.arrayElement([
    'Soybean',
    'Corn',
    'Wheat',
    'Rice',
    'Cotton',
  ]),
  areaHectares: faker.number.float({ min: 1, max: 1000 }),
})

export const generateProducer = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  cpfCnpj: mockCpfCnpj(), // Custom function
  farmName: faker.company.name(),
  city: faker.location.city(),
  state: faker.location.streetAddress(),
  totalAreaHectares: faker.number.float({ min: 1000, max: 2000 }),
  cultivableAreaHectares: faker.number.float({ min: 1, max: 500 }),
  vegetationAreaHectares: faker.number.float({ min: 1, max: 500 }),
})
