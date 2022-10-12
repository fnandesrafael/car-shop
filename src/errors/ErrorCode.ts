/**
 * Referência utilizada para construção da classe ErrorCode obtida do repositório da estudante Débora Serra
 * repo: https://github.com/tryber/sd-019-b-project-car-shop/pull/20
 * 
 * obs: IDEIA EXTREMAMENTE INTELIGENTE!
 */

class ErrorCode extends Error {
  private _statusCode: number;

  constructor(message: string, code: number) {
    super(message);
    this._statusCode = code;
  }

  get statusCode() { return this._statusCode; }
}

export default ErrorCode;