import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [UserModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
