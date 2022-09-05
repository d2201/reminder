import { MessageOptions } from "../../notification/types";
import { NotificationJob } from "../types";
import { DateTime } from "luxon";

export class CarNotificationJob implements NotificationJob {
  private readonly CAR_RECEIVE_DAY = DateTime.fromSQL("2023-02-28");
  private readonly CAR_ORDER_DAY = DateTime.fromSQL("2022-07-15");

  async isReady(): Promise<boolean> {
    return true;
  }

  async toMessage(): Promise<MessageOptions> {
    const daysLeft = Math.floor(
      this.CAR_RECEIVE_DAY.diffNow("days").as("days")
    );
    const orderDurationInDays = this.CAR_RECEIVE_DAY.diff(
      this.CAR_ORDER_DAY,
      "days"
    ).as("days");

    const daysCompleted = orderDurationInDays - daysLeft;

    const completedInPercentage = (
      (daysCompleted * 100) /
      orderDurationInDays
    ).toFixed(1);

    return {
      title: "One day closer to your dream car 🔥",
      message: `[${daysCompleted}/${orderDurationInDays}] ${completedInPercentage}% wait completed`,
    };
  }
}
