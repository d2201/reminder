import { injectable } from "inversify";
import { CarNotificationJob } from "../jobs/CarNotificationJob";
import { NotificationJob, NotificationJobsRepository } from "../types";

@injectable()
export class HardcodedJobsRepository implements NotificationJobsRepository {
  async fetchReadyJobs(): Promise<NotificationJob[]> {
    return [new CarNotificationJob()];
  }
}
