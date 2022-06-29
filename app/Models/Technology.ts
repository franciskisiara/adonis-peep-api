import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Technology extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public operational_name: string

  @column()
  public display_name: string

  @column()
  public technology_category_id: number

  @column()
  public logo: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
