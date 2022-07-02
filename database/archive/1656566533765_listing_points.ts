import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'listing_points'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('listing_id').notNullable().unsigned().references('id').inTable('listings').onDelete('CASCADE')
      table.integer('technology_id').notNullable().unsigned().references('id').inTable('technologies').onDelete('CASCADE')
      table.integer('backend_points').notNullable().defaultTo(0)
      table.integer('frontend_points').notNullable().defaultTo(0)
      table.integer('mobile_points').notNullable().defaultTo(0)

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
