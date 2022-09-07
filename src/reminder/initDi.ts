import { Container } from "inversify";
import { HardcodedReminderRepository } from "./repositories/HardcodedReminderRepository";
import { REMINDER_TOKENS } from "./types";

export const initDi = (container: Container) => {
  container.bind(REMINDER_TOKENS.repository).to(HardcodedReminderRepository);
};
