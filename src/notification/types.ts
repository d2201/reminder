export type MessageOptions = {
  message: string;
  title: string;
};

export interface NotificationService {
  sendMessage(options: MessageOptions): Promise<void>;
}

export const NOTIFICATION_TOKENS = {
  notificationService: Symbol("NotificationService"),
};
