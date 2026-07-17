import { User } from "./user.model";

export interface Comment {
    partId: string;
    text: string;
    rating: number;
    currentDate: Date;
}