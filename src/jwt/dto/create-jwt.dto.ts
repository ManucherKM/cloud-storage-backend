import { Types } from 'mongoose';

export class CreateJwtDto {
  userId: Types.ObjectId;
  payload: any;
}
