import { Container } from "inversify";
import { PushoverNotificationService } from "./services/PushoverNotificationService";
import { NOTIFICATION_TOKENS } from "./types";

export const initDi = (container: Container) => {
  container
    .bind(NOTIFICATION_TOKENS.notificationService)
    .to(PushoverNotificationService);
};
