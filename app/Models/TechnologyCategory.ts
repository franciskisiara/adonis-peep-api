import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Technology from './Technology'

export default class TechnologyCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public operational_name: string

  @column()
  public display_name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Technology, {
    foreignKey: 'technology_category_id',
  })
  public technologies: HasMany<typeof Technology>
}
