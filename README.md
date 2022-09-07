# Reminder

Reminder - one tooling for everything I need to remember about

## How it works

Everything is hosted on GCP:

```
Cloud Scheduler pushes message on PubSub topic every day at 10:05 AM
Messages on that topic trigger Cloud Functions
Cloud Functions processes and send through Pushover.net notification to my cell-phone
```

## Structure

- `notification-processor` - orchestrates the job
- `notification` - (in specific: `notification service`) - handles the notifcation distribution
- `reminder` - provides the reminders for processor

## TODO

- [ ] Repository connected to some db
- [ ] Add interval to job
