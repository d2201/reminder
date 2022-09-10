import { injectable } from "inversify";
import { DateTime } from "luxon";
import { ApiFetcherReminder } from "../reminders/ApiFetcherReminder";
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
      new ApiFetcherReminder({
        api: {
          uri: "https://api.apilayer.com/exchangerates_data/convert",
          params: {
            amount: 1,
            from: "USD",
            to: "PLN",
          },
          headers: {
            apikey: process.env.EXCHANGE_RATES_API_KEY ?? "",
          },
        },
        messageFormat: "currency: $1 = {info.rate} zł",
        title: "Currency reporter",
      }),
    ];
  }
}
