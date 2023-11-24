import { ApiProperty } from '@nestjs/swagger';

export class CreateLoginDto {
  @ApiProperty({ example: '张三' })
  name: string;
}
