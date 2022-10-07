import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UsersErrorCode } from "./auth-error-code.enum";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

class UsersRepositoryErrorHandling {
  public exceptionUserAlreadyExists(errorCode: string): void {
    if (errorCode === UsersErrorCode.USER_EXISTS) {
      throw new ConflictException('Username already exists');
    } else {
      throw new InternalServerErrorException();
    }
  }
  // TODO: other error exceptions.
}

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  exceptionErrorGenerated = new UsersRepositoryErrorHandling();
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password })
    try {
      await this.save(user);
    } catch (error) {
      this.exceptionErrorGenerated.exceptionUserAlreadyExists(error.code);
    }
  }
}