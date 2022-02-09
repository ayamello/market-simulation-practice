import {MigrationInterface, QueryRunner} from "typeorm";

export class tableCartAndProductCart1644372425516 implements MigrationInterface {
    name = 'tableCartAndProductCart1644372425516'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products_cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_id" character varying NOT NULL, "quantity" integer NOT NULL, "price" double precision NOT NULL, "createdOn" TIMESTAMP NOT NULL, "updatedOn" TIMESTAMP NOT NULL, "cartId" uuid, CONSTRAINT "PK_7c95fcc4daa413b26c0e49ac0c5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdOn" TIMESTAMP NOT NULL, "updatedOn" TIMESTAMP NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "products_cart" ADD CONSTRAINT "FK_ee7182ab9c1e83456b481856262" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_cart" DROP CONSTRAINT "FK_ee7182ab9c1e83456b481856262"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "products_cart"`);
    }

}
