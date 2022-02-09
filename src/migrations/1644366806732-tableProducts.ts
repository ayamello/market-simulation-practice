import {MigrationInterface, QueryRunner} from "typeorm";

export class tableProducts1644366806732 implements MigrationInterface {
    name = 'tableProducts1644366806732'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "unit_value" integer NOT NULL, "quantity" integer NOT NULL, "createdOn" TIMESTAMP NOT NULL, "updatedOn" TIMESTAMP NOT NULL, CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
