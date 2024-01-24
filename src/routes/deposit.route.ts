import express from 'express'
import {
  EmailQueueWrapper,
  defaultEmailQueueConfig,
} from '@/infra/external/queue/email'
import DepositController from '@/application/controller/deposit.controller'
import { validationMiddleware } from '@/infra/middleware/validate'
import { createDepositDto } from '@/domain/dto/deposit/create-deposit.dto'

export const depositRoutes = express.Router()

const emailQueue = new EmailQueueWrapper(defaultEmailQueueConfig)
emailQueue.initialize()

const depositController = new DepositController(emailQueue)

depositRoutes.post(
  '/deposit',
  validationMiddleware(createDepositDto),
  depositController.deposit
)
