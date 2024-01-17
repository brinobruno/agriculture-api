import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
// export class Producer extends BaseEntity {
export class Producer {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ type: 'varchar' }) // Adjust the type accordingly
  cpfOrCnpj!: string

  // Other columns...
}
