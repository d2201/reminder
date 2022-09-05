import { NotificationJob } from "../notification-jobs-repository/types";

export interface NotificationProcessor {
  fetchAndProcessJobs(): Promise<void>;
  processJobs(jobs: NotificationJob[]): Promise<void>;
}

export const NOTIFICATION_PROCESSOR_TOKENS = {
  notificationProcessor: Symbol("NotificationProcessor"),
};
