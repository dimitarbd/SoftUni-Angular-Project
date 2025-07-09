import { Subscriber } from ".";

export interface Theme {
    name: string;
    userId: string;
    subscribers: Subscriber[];
}