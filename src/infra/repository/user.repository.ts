import { Repository } from 'typeorm'
import User from '@/domain/user'
import UserEntity from '@/infra/database/typeorm/entity/user.entity'
import { AppDataSource } from '@/infra/database/typeorm/data-source'

export interface IUserRepository {
  saveUser: (user: User) => Promise<User>
  findByEmail: (email: string) => Promise<User | null>
}

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<UserEntity>

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserEntity)
  }

  saveUser = async (user: User): Promise<User> => {
    return this.ormRepository.save(user)
  }

  findByEmail = async (email: string): Promise<User | null> => {
    return this.ormRepository.findOne({ where: { email } })
  }
}
