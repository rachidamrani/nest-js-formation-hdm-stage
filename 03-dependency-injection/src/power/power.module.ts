import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService],
  exports: [PowerService], // list of services available now outside of this module
})
export class PowerModule {}
