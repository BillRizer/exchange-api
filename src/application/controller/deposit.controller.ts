import { Request, Response } from 'express'
import { createDepositDto } from '@/domain/dto/deposit/create-deposit'
import { EmailQueueWrapper } from '@/infra/external/queue/email'

export default class DepositController {
  private emailQueue: EmailQueueWrapper

  constructor(emailQueue: EmailQueueWrapper) {
    this.emailQueue = emailQueue
  }

  deposit = async (req: Request, res: Response) => {
    const data: createDepositDto = req.body
    await this.emailQueue.publish(
      {
        to: 'asee@example.com',
        subject: 'Você recebeu um Depósito na sua conta',
        template: 'geral',
        body: `Deposito recebido, no valor de R$ ${data.amount} reai(s)`,
      },
      true
    )

    res.status(200).send()
  }
}
