import { IsNumber } from 'class-validator'

export class createDepositDto {
  @IsNumber()
  amount: string
}
