import { MessageOptions } from "../notification";

export interface Reminder {
  isReady(): Promise<boolean>;
  toMessage(): Promise<MessageOptions>;
}

export interface ReminderRepository {
  fetchReadyReminders(): Promise<Reminder[]>;
}

export const REMINDER_TOKENS = {
  repository: Symbol("ReminderRepository"),
};
