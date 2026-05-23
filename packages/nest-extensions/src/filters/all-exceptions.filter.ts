import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import axios from "axios";
import { Prisma } from "@repo/db";

export type ExceptionResponse =
  | string
  | {
      message: string | string[];
      error?: string;
      statusCode?: number;
    };

type ErrorKind = "http" | "axios" | "prisma" | "native" | "unknown";

function getErrorKind(exception: unknown): ErrorKind {
  if (exception instanceof HttpException) return "http";
  if (axios.isAxiosError(exception)) return "axios";
  if (exception instanceof Prisma.PrismaClientKnownRequestError)
    return "prisma";
  if (exception instanceof Error) return "native";
  return "unknown";
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = "Internal server error";

    const kind = getErrorKind(exception);

    switch (kind) {
      case "http": {
        const e = exception as HttpException;

        status = e.getStatus();

        const res = e.getResponse();
        message =
          typeof res === "string" ? res : ((res as any).message ?? e.message);

        break;
      }

      case "axios": {
        const e = exception as any;

        status = e.response?.status ?? 502;
        message =
          e.response?.data?.message ?? e.message ?? "External service error";

        break;
      }

      case "prisma": {
        const e = exception as Prisma.PrismaClientKnownRequestError;

        status = 400;

        switch (e.code) {
          case "P2002":
            message = "Unique constraint violation";
            break;
          case "P2025":
            message = "Record not found";
            break;
          default:
            message = "Database error";
        }

        break;
      }

      case "native": {
        const e = exception as Error;
        message = e.message;
        break;
      }

      case "unknown":
      default: {
        message = "Unknown error occurred";
        break;
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
