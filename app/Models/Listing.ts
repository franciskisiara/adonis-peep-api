import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Company from 'App/Models/Company'
import ListingPoint from 'App/Models/ListingPoint'

export default class Listing extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public company_id: number

  @column()
  public description: string

  @column.dateTime()
  public deactivated_at: DateTime

  @column.dateTime({ autoCreate: true, serializeAs: null, })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null, })
  public updatedAt: DateTime

  @belongsTo(() => Company, {
    foreignKey: 'company_id'
  })
  public company: BelongsTo<typeof Company>

  @hasMany(() => ListingPoint, {
    foreignKey: 'listing_id'
  })
  public points: HasMany<typeof ListingPoint>
}
