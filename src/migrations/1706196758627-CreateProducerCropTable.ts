import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateProducerCropTable1706196758627
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "producer_crop" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "cropName" character varying(255) NOT NULL,
                "areaHectares" double precision NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "producerIdId" uuid,
                CONSTRAINT "PK_5678" PRIMARY KEY ("id"),
                CONSTRAINT "FK_producerIdId" FOREIGN KEY ("producerIdId") REFERENCES "producer"("id") ON DELETE CASCADE ON UPDATE CASCADE
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "producer_crop"
        `)
  }
}
