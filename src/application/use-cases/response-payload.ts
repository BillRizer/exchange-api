export interface IResponsePayload {
  success: boolean
  errors?: string | string[]
  message?: string | string[]
  data?: any
}

export abstract class BaseResponse implements IResponsePayload {
  success: boolean

  constructor(props: Partial<IResponsePayload>, defaultSuccess: boolean) {
    this.success = defaultSuccess
    Object.assign(this, props)
  }
}

export class ErrorResponse extends BaseResponse {
  constructor(props: Partial<IResponsePayload>) {
    super(props, false)
  }
}

export class SuccessResponse extends BaseResponse {
  constructor(props: Partial<IResponsePayload>) {
    super(props, true)
  }
}
