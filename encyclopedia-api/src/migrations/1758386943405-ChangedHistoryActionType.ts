import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangedHistoryActionType1758386943405 implements MigrationInterface {
    name = 'ChangedHistoryActionType1758386943405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."history_actiontype_enum" AS ENUM('CREATION', 'UPDATING', 'DELETING', 'RESTORING')`);
        await queryRunner.query(`
            ALTER TABLE "history"
            ALTER COLUMN "actionType" TYPE "public"."history_actiontype_enum"
            USING CASE "actionType"::text
                WHEN '0' THEN 'CREATION'::"public"."history_actiontype_enum"
                WHEN '1' THEN 'UPDATING'::"public"."history_actiontype_enum"
                WHEN '2' THEN 'DELETING'::"public"."history_actiontype_enum"
                WHEN '3' THEN 'RESTORING'::"public"."history_actiontype_enum"
            END
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "history"
            ALTER COLUMN "actionType" TYPE integer
            USING CASE "actionType"::text
                WHEN 'CREATION' THEN 0
                WHEN 'UPDATING' THEN 1
                WHEN 'DELETING' THEN 2
                WHEN 'RESTORING' THEN 3
            END
        `);
        await queryRunner.query(`DROP TYPE "public"."history_actiontype_enum"`);
    }

}
