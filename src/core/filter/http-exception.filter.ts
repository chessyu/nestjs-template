import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
  } from '@nestjs/common';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp(); //获取请求上下文
      const response = ctx.getResponse(); //获取请求上下文中的 response 对象
      const status = exception.getStatus(); //获取异常状态码
  
      const message = exception.message
        ? exception.message
        : `${status >= 500 ? 'Service Error' : 'Client Error'} `;
  
      const errorResponse = {
        data: {},
        message,
        code: -1,
        success: false,
      };
  
      //设置返回状态码， 请求头，发送错误信息
      response.status(status);
      response.header('Content-Type', 'application/json; charset=utf-8');
      response.send(errorResponse);
    }
  }
  