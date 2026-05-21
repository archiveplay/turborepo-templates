import chalk from "chalk";

export enum LogLevel {
  LOG = "LOG",
  ERROR = "ERROR",
  WARN = "WARN",
  DEBUG = "DEBUG",
  VERBOSE = "VERBOSE",
}

const isBrowser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

type Meta = unknown;

export class Logger {
  constructor(
    private context = "App",
    private appName = "MyApp",
  ) {}

  log(message: string, meta?: Meta) {
    this.print(LogLevel.LOG, message, meta);
  }

  error(message: string, meta?: Meta) {
    this.print(LogLevel.ERROR, message, meta);
  }

  warn(message: string, meta?: Meta) {
    this.print(LogLevel.WARN, message, meta);
  }

  debug(message: string, meta?: Meta) {
    this.print(LogLevel.DEBUG, message, meta);
  }

  verbose(message: string, meta?: Meta) {
    this.print(LogLevel.VERBOSE, message, meta);
  }

  scope(context: string) {
    return new Logger(context, this.appName);
  }

  private print(level: LogLevel, message: string, meta?: Meta) {
    const timestamp = new Date().toLocaleString();

    if (isBrowser) {
      this.printBrowser(level, timestamp, message, meta);
      return;
    }

    this.printNode(level, timestamp, message, meta);
  }

  private printNode(
    level: LogLevel,
    timestamp: string,
    message: string,
    meta?: Meta,
  ) {
    const levelColor = this.getNodeColor(level);

    const prefix =
      chalk.green(`[${this.appName}]`) +
      " " +
      chalk.gray(`[${timestamp}]`) +
      " " +
      chalk.yellow(`[${this.context}]`);
    " " + levelColor(level.padStart(7)) + console.log(`${prefix} ${message}`);

    if (meta) {
      console.dir(meta, { depth: null });
    }
  }

  private printBrowser(
    level: LogLevel,
    timestamp: string,
    message: string,
    meta?: Meta,
  ) {
    const style = this.getBrowserStyle(level);

    console.log(
      `%c[${this.appName}] %c${level} %c[${this.context}] %c${message}`,
      "color: gray",
      style,
      "color: #b58900",
      "color: inherit",
      meta ?? "",
      timestamp,
    );
  }

  private getNodeColor(level: LogLevel) {
    switch (level) {
      case LogLevel.ERROR:
        return chalk.red;
      case LogLevel.WARN:
        return chalk.yellow;
      case LogLevel.DEBUG:
        return chalk.magenta;
      case LogLevel.VERBOSE:
        return chalk.cyan;
      default:
        return chalk.green;
    }
  }

  private getBrowserStyle(level: LogLevel) {
    switch (level) {
      case LogLevel.ERROR:
        return "color: red; font-weight: bold";
      case LogLevel.WARN:
        return "color: orange; font-weight: bold";
      case LogLevel.DEBUG:
        return "color: purple; font-weight: bold";
      case LogLevel.VERBOSE:
        return "color: teal; font-weight: bold";
      default:
        return "color: green; font-weight: bold";
    }
  }
}
