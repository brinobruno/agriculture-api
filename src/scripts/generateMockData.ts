import { faker } from '@faker-js/faker'

import { mockCpfCnpj } from '../shared/mockCpfCnpj'

// Function to generate a random crop
const generateCrop = () => ({
  cropName: faker.helpers.arrayElement([
    'Soybean',
    'Corn',
    'Wheat',
    'Rice',
    'Cotton',
  ]),
})

// Function to generate mock producer data
const generateProducer = () => ({
  name: faker.person.fullName(),
  cpfCnpj: mockCpfCnpj(), // Custom function
  farmName: faker.company.name,
  city: faker.location.city,
  state: faker.location.streetAddress,
  totalAreaHectares: faker.number.float({ min: 1, max: 1000 }),
  cultivableAreaHectares: faker.number.float({ min: 1, max: 1000 }),
  vegetationAreaHectares: faker.number.float({ min: 1, max: 1000 }),
  producerCrops: Array.from(
    { length: faker.number.int({ min: 1, max: 5 }) },
    generateCrop,
  ),
})

// Generate an array of mock producers
const mockProducers = Array.from({ length: 10 }, generateProducer)

console.log(mockProducers)
