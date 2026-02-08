declare module "@rails/actioncable" {
  export interface Subscription {
    perform(action: string, data?: Record<string, unknown>): void
    send(data: Record<string, unknown>): void
    unsubscribe(): void
  }

  export interface SubscriptionCallbacks {
    connected?(): void
    disconnected?(): void
    received?(data: unknown): void
    initialized?(): void
    rejected?(): void
  }

  export interface Subscriptions {
    create(
      channel: string | { channel: string; [key: string]: unknown },
      callbacks: SubscriptionCallbacks,
    ): Subscription
  }

  export interface Consumer {
    subscriptions: Subscriptions
    disconnect(): void
  }

  export function createConsumer(url?: string): Consumer
}
