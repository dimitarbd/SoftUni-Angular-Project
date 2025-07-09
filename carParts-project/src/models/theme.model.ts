import { Subscriber } from "./subscriber.model";

export interface Theme {
    name: string;
    userId: string;
    subscribers: Subscriber[];
}