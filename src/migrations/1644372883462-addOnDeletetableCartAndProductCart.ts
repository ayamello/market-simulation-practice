import {MigrationInterface, QueryRunner} from "typeorm";

export class addOnDeletetableCartAndProductCart1644372883462 implements MigrationInterface {
    name = 'addOnDeletetableCartAndProductCart1644372883462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_cart" DROP CONSTRAINT "FK_ee7182ab9c1e83456b481856262"`);
        await queryRunner.query(`ALTER TABLE "products_cart" ADD CONSTRAINT "FK_ee7182ab9c1e83456b481856262" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products_cart" DROP CONSTRAINT "FK_ee7182ab9c1e83456b481856262"`);
        await queryRunner.query(`ALTER TABLE "products_cart" ADD CONSTRAINT "FK_ee7182ab9c1e83456b481856262" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
