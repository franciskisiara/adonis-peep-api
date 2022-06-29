import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'technologies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('operational_name').unique().notNullable()
      table.string('display_name').unique().notNullable()
      table.integer('technology_category_id').notNullable().unsigned().references('id').inTable('technology_categories').onDelete('CASCADE')
      table.text('logo', 'longText').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
