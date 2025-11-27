import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTokenService } from 'src/api-token/api-token.service';

@Injectable()
export class ApiTokenGuard implements CanActivate {
  constructor(private readonly keysService: ApiTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const token = request.headers['api-token'];

    if (!token) {
      throw new UnauthorizedException('Missing api-token header');
    }

    const valid = await this.keysService.validateKey(token as string);

    if (!valid) {
      throw new UnauthorizedException('Invalid or inactive API token');
    }

    return true;
  }
}
