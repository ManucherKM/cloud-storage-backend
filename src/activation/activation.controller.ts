import { Controller, Get, Param, Res } from '@nestjs/common';
import { ActivationService } from './activation.service';

@Controller('activation')
export class ActivationController {
  constructor(private readonly activationService: ActivationService) {}

  @Get(':activationKey')
  async activationAccount(
    @Param('activationKey') activationKey: string,
    @Res() res,
  ) {
    await this.activationService.activationAccount(activationKey);
    res.status(302).redirect(process.env.CLIENT_URL);
  }
}
