import { MessageOptions } from "../notification";

export interface NotificationJob {
  isReady(): Promise<boolean>;
  toMessage(): Promise<MessageOptions>;
}

export interface NotificationJobsRepository {
  fetchReadyJobs(): Promise<NotificationJob[]>;
}

export const NOTIFICATION_REPOSITORY_TOKENS = {
  repository: Symbol("NotificationJobsRepository"),
};
