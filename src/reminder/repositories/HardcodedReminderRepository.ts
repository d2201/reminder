import { injectable } from "inversify";
import { DateTime } from "luxon";
import { CountdownReminder } from "../reminders/CountdownReminder";
import { Reminder, ReminderRepository } from "../types";

@injectable()
export class HardcodedReminderRepository implements ReminderRepository {
  async fetchReadyReminders(): Promise<Reminder[]> {
    return [
      new CountdownReminder({
        title: "One day closer to your dream car 🔥",
        startDay: DateTime.fromSQL("2022-07-15"),
        endDay: DateTime.fromSQL("2023-02-28"),
      }),
    ];
  }
}
