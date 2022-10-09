import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { UsersErrorCode } from "./auth-error-code.enum";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { Logger } from "@nestjs/common";

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
  private logger = new Logger('UsersRepository', true);

  usersRepositoryErrorHandling = new UsersRepositoryErrorHandling();

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({ username, password: hashedPassword })
    try {
      await this.save(user);
    } catch (error) {
      this.logger.error(
        `Failed to create sign up "${user.username}"`,
        error.stack,
      );
      this.usersRepositoryErrorHandling.exceptionUserAlreadyExists(error.code);
    }
  }
}