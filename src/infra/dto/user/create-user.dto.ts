import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator'

export class createUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @MaxLength(4)
  @IsNumber({}, { message: 'deve ser um numero' })
  @IsNotEmpty()
  balance: number
}
