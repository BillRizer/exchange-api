module.exports = class Migration1705927093955 {
  name = 'Migration1705927093955'

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "balance" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    )
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "user"`)
  }
}
