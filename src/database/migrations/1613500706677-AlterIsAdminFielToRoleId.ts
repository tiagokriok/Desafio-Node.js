import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterIsAdminFielToRoleId1613500706677
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isAdmin');

    await queryRunner.addColumn(
      'users',
      new TableColumn({ name: 'role_id', type: 'uuid' }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'UserRole',
        columnNames: ['role_id'],
        referencedTableName: 'roles',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'UserRole');

    await queryRunner.dropColumn('users', 'role_id');

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'isAdmin',
        type: 'bool',
      }),
    );
  }
}
