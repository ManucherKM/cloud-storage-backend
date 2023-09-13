import { Controller, Get, Param } from '@nestjs/common';
import { ActivationService } from './activation.service';

@Controller('activation')
export class ActivationController {
  constructor(private readonly activationService: ActivationService) {}

  @Get(':activationKey')
  async activationAccount(@Param('activationKey') activationKey: string) {
    return await this.activationService.activationAccount(activationKey);
  }
}
