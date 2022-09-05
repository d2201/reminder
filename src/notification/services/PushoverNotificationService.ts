import { injectable } from "inversify";
import { MessageOptions, NotificationService } from "../types";
import axios from "axios";

@injectable()
export class PushoverNotificationService implements NotificationService {
  private readonly apiKey: string = process.env.PUSHOVER_API_KEY ?? "";
  private readonly groupKey: string = process.env.PUSHOVER_GROUP_KEY ?? "";

  private readonly axiosInstance = axios.create({
    baseURL: "https://api.pushover.net",
  });

  async sendMessage(options: MessageOptions): Promise<void> {
    await this.axiosInstance.post("/1/messages.json", undefined, {
      params: {
        token: this.apiKey,
        user: this.groupKey,
        message: options.message,
        title: options.title,
      },
    });
  }
}
