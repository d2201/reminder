import dotenv from "dotenv";
dotenv.config();

import "reflect-metadata";
import * as functions from "@google-cloud/functions-framework";
import { Container } from "inversify";
import * as notificationProcessor from "./notification-processor";
import * as notification from "./notification";
import * as reminder from "./reminder";
import { NotificationProcessor } from "./notification-processor";
import { ConsoleNotificationService } from "./notification/services/ConsoleNotificationService";

const setup = (): Container => {
  const container = new Container();

  notificationProcessor.initDi(container);
  notification.initDi(container);
  reminder.initDi(container);

  return container;
};

const main = async () => {
  const container = setup();

  const processor = container.get<NotificationProcessor>(
    notificationProcessor.NOTIFICATION_PROCESSOR_TOKENS.notificationProcessor
  );

  await processor.fetchAndProcessReminders();
};

const dev = async () => {
  const container = setup();

  container
    .rebind(notification.NOTIFICATION_TOKENS.notificationService)
    .to(ConsoleNotificationService);

  const processor = container.get<NotificationProcessor>(
    notificationProcessor.NOTIFICATION_PROCESSOR_TOKENS.notificationProcessor
  );

  await processor.fetchAndProcessReminders();
};

functions.cloudEvent("processNotifications", main);

if (process.env.MODE === "dev") {
  dev();
}

if (process.env.MODE === "prod-like") {
  main();
}
