import { MigrationInterface, QueryRunner } from "typeorm";

export class Locations11739558341478 implements MigrationInterface {
    name = 'Locations11739558341478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locations" ("id" SERIAL NOT NULL, "city" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_LOCATION_CITY_USER" ON "locations" (LOWER("city"), "userId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "locations"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_LOCATION_CITY_USER"`);
    }

}
