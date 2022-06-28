import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import AccountGroup from 'App/Models/AccountGroup'

import { 
  column, 
  beforeSave, 
  BaseModel, 
  ManyToMany, 
  manyToMany 
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime()
  public verified_at: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @manyToMany(() => AccountGroup, {
    pivotTable: 'user_account_group',
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'account_group_id',
  })
  public accountGroups: ManyToMany<typeof AccountGroup>
}
