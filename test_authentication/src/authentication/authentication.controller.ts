import { Controller, Get, Query } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly tckimlikService: AuthenticationService) {}

  @Get('validate')
  async validate(
    @Query('tckimlikNo') tckimlikNo: string,
    @Query('ad') ad: string,
    @Query('soyad') soyad: string,
    @Query('dogumYili') dogumYili: number,
  ): Promise<{ valid: boolean }> {
    const isValid = await this.tckimlikService.validateTCKimlikNo(tckimlikNo, ad, soyad, dogumYili);
    return { valid: isValid };
  }
}
