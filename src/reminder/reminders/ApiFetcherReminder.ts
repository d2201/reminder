import { MessageOptions } from "../../notification";
import { Reminder } from "../types";
import axios from "axios";
import pupa from "pupa";

type Options = {
  api: {
    uri: string;
    headers?: Record<string, string>;
    params?: Record<string, string | number>;
  };
  /**
   * The response data from api is piped into formatting engine.
   *
   * Example usage:
   *
   * API responds with:
   * ```json
   * {
   *   "user": "Daniel"
   * }
   * ```
   *
   * Then you can format it in message like this:
   * ```
   * "{user} has birthday today. Happy birthday!"
   * ```
   */
  messageFormat: string;
  title: string;
};

export class ApiFetcherReminder implements Reminder {
  constructor(private readonly options: Options) {}

  async isReady(): Promise<boolean> {
    return true;
  }

  async toMessage(): Promise<MessageOptions> {
    return {
      title: this.options.title,
      message: pupa(this.options.messageFormat, await this.fetch()),
    };
  }

  private async fetch() {
    const result = await axios.get(this.options.api.uri, {
      headers: this.options.api.headers,
      params: this.options.api.params,
    });

    return result.data;
  }
}
