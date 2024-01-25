import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProducerTable1706196703456 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "producer" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "cpfCnpj" character varying(255) NOT NULL,
                "name" character varying(255) NOT NULL,
                "farmName" character varying(255) NOT NULL,
                "city" character varying(255) NOT NULL,
                "state" character varying(255) NOT NULL,
                "totalAreaHectares" double precision NOT NULL,
                "cultivableAreaHectares" double precision NOT NULL,
                "vegetationAreaHectares" double precision NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_1234" PRIMARY KEY ("id")
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "producer"
        `)
  }
}
