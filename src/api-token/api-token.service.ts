import { Injectable } from '@nestjs/common';
import { CreateApiTokenDto } from './dto/create-api-token.dto';
import { UpdateApiTokenDto } from './dto/update-api-token.dto';

@Injectable()
export class ApiTokenService {
  onstructor(
    @InjectRepository(ApiToken)
    private readonly apiTokenRepository: Repository<Key>,
  ) {}

  async generateKey() {
    const token = randomUUID();
    const key = this.apiTokenRepository.create({ token });
    return await this.apiTokenRepository.save(key);
  }

  async validateKey(token: string) {
    return this.apiTokenRepository.findOne({
      where: { token, active: true },
    });
  }
}