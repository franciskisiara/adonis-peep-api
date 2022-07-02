import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import UserAccount from 'App/Models/UserAccount'
import { 
  column, 
  beforeSave, 
  BaseModel, 
  hasMany,
  HasMany
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

  @column.dateTime({ autoCreate: true, serializeAs: null, })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null, })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => UserAccount, {
    foreignKey: 'user_id',
  })
  public accounts: HasMany<typeof UserAccount>
}
