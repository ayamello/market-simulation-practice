import { EntityRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async getUsers(): Promise<User[] | undefined> {
    const users = await this.find();

    return users;
  }

  public async emailAlreadyExists(email: string): Promise<boolean> {
    const user = await this.findOne({ email });

    if (user) {
      return true;
    }

    return false;
  }
  
  public async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ email });

    return user;
  }

  public async findUserbyId(id: string): Promise<User | undefined> {
    const user = await this.findOne({ id });
  
    return user;
  }
}

export default UserRepository;
