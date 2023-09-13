import { Module } from '@nestjs/common';
import { ActivationService } from './activation.service';
import { ActivationController } from './activation.controller';

@Module({
  controllers: [ActivationController],
  providers: [ActivationService],
})
export class ActivationModule {}
