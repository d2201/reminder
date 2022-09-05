import { Container } from "inversify";
import { BaseNotificationProcessor } from "./services/BaseNotificationProcessor";
import { NOTIFICATION_PROCESSOR_TOKENS } from "./types";

export const initDi = (container: Container) => {
  container
    .bind(NOTIFICATION_PROCESSOR_TOKENS.notificationProcessor)
    .to(BaseNotificationProcessor);
};
