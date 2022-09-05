import { Container } from "inversify";
import { HardcodedJobsRepository } from "./services/HardcodedJobsRepository";
import { NOTIFICATION_REPOSITORY_TOKENS } from "./types";

export const initDi = (container: Container) => {
  container
    .bind(NOTIFICATION_REPOSITORY_TOKENS.repository)
    .to(HardcodedJobsRepository);
};
