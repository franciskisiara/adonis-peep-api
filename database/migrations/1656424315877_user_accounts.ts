import Config from '@ioc:Adonis/Core/Config'
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'user_accounts'

  public async up() {
    const accountGroups = Config.get('peep.settings.account_groups')

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.enum('account_group', accountGroups).notNullable()
      table.string('account_unit_uid').notNullable()
      table.boolean('is_active').defaultTo(false)

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()

      table.unique([
        'user_id',
        'account_group',
        'account_unit_uid',
      ])
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
