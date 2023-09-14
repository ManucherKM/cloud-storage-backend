import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserModule } from '@/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Jwt, JwtSchema } from './entities/jwt.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Jwt.name, schema: JwtSchema }]),
    UserModule,
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
