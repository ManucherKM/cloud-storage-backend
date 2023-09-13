import { Injectable } from '@nestjs/common';

@Injectable()
export class ActivationService {
  async activationAccount(activationKey: string) {
    console.log(activationKey);
  }
}
