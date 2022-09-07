import { inject, injectable } from "inversify";
import {
  NotificationService,
  NOTIFICATION_TOKENS,
} from "../../notification/types";
import { Reminder, ReminderRepository, REMINDER_TOKENS } from "../../reminder";
import { NotificationProcessor } from "../types";

@injectable()
export class BaseNotificationProcessor implements NotificationProcessor {
  constructor(
    @inject(NOTIFICATION_TOKENS.notificationService)
    private readonly notificationService: NotificationService,
    @inject(REMINDER_TOKENS.repository)
    private readonly reminderRepository: ReminderRepository
  ) {}

  async fetchAndProcessReminders(): Promise<void> {
    const jobs = await this.reminderRepository.fetchReadyReminders();
    await this.processReminders(jobs);
  }

  async processReminders(reminders: Reminder[]): Promise<void> {
    for (const reminder of reminders) {
      await this.notificationService.sendMessage(await reminder.toMessage());
    }
  }
}
