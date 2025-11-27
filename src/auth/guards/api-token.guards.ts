import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTokenService } from 'src/api-token/api-token.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly apiTokenService: ApiTokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const tokenValue = request.headers['api-token'] as string | undefined;

    if (!tokenValue) {
      throw new UnauthorizedException('Missing api-token header');
    }
    await this.apiTokenService.validateAndConsumeByToken(tokenValue);

    return true;
  }
}
