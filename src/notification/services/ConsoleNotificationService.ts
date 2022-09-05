import { injectable } from "inversify";
import { MessageOptions, NotificationService } from "../types";

@injectable()
export class ConsoleNotificationService implements NotificationService {
  async sendMessage(options: MessageOptions): Promise<void> {
    console.log(options);
  }
}
