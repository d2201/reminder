import { DateTime } from "luxon";
import { MessageOptions } from "../../notification";
import { Reminder } from "../types";

type Options = {
  startDay: DateTime;
  endDay: DateTime;
  title: string;
};

export class CountdownReminder implements Reminder {
  constructor(private readonly options: Options) {}

  async isReady(): Promise<boolean> {
    const totalDuration = this.calculateTotalDuration();
    const hasStarted = DateTime.local().diff(this.options.startDay).days >= 0;
    const hasEnded = this.calculateDaysCompleted() > totalDuration;

    return hasStarted && !hasEnded && totalDuration !== 0;
  }

  async toMessage(): Promise<MessageOptions> {
    await this.assertReady();

    const totalDuration = this.calculateTotalDuration();
    const daysCompleted = this.calculateDaysCompleted();

    const completedPercentage = ((daysCompleted * 100) / totalDuration).toFixed(
      1
    );

    return {
      title: this.options.title,
      message: `[${daysCompleted}/${totalDuration}] ${completedPercentage}% wait completed ✅`,
    };
  }

  private async assertReady() {
    if (!(await this.isReady())) {
      throw new Error("CountdownReminder is not ready");
    }
  }

  private calculateTotalDuration(): number {
    return Math.floor(
      this.options.endDay.diff(this.options.startDay).as("days")
    );
  }

  private calculateDaysCompleted(): number {
    return Math.floor(DateTime.local().diff(this.options.startDay).as("days"));
  }
}
