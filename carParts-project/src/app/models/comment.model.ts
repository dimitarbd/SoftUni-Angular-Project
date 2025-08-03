import { User } from "./user.model";

export interface Comment {
    _id: string;
    partId: string;
    userId: User;
    content: string;
    createdOn: Date;
}