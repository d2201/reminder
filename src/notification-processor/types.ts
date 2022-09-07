import { Reminder } from "../reminder";

export interface NotificationProcessor {
  fetchAndProcessReminders(): Promise<void>;
  processReminders(reminders: Reminder[]): Promise<void>;
}

export const NOTIFICATION_PROCESSOR_TOKENS = {
  notificationProcessor: Symbol("NotificationProcessor"),
};
