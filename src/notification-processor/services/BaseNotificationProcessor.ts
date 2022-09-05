import { inject, injectable } from "inversify";
import {
  NotificationJob,
  NotificationJobsRepository,
  NOTIFICATION_REPOSITORY_TOKENS,
} from "../../notification-jobs-repository/types";
import {
  NotificationService,
  NOTIFICATION_TOKENS,
} from "../../notification/types";
import { NotificationProcessor } from "../types";

@injectable()
export class BaseNotificationProcessor implements NotificationProcessor {
  constructor(
    @inject(NOTIFICATION_TOKENS.notificationService)
    private readonly notificationService: NotificationService,
    @inject(NOTIFICATION_REPOSITORY_TOKENS.repository)
    private readonly notificationRepository: NotificationJobsRepository
  ) {}

  async fetchAndProcessJobs(): Promise<void> {
    const jobs = await this.notificationRepository.fetchReadyJobs();
    await this.processJobs(jobs);
  }

  async processJobs(jobs: NotificationJob[]): Promise<void> {
    for (const job of jobs) {
      await this.notificationService.sendMessage(await job.toMessage());
    }
  }
}
