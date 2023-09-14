import { Controller, Get, Param, Res } from '@nestjs/common';
import { ActivationService } from './activation.service';

@Controller('activation')
export class ActivationController {
  constructor(private readonly activationService: ActivationService) {}

  @Get(':key')
  async activationAccount(@Param('key') key: string, @Res() res) {
    await this.activationService.activationAccount(key);
    res.status(302).redirect(process.env.CLIENT_URL);
  }
}
