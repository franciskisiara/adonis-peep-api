import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'account_group_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').notNullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('account_group_id').notNullable().unsigned().references('id').inTable('account_groups').onDelete('CASCADE')
      table.string('account_group_unit_uid').nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
