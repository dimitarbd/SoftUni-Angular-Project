export interface Part {
    _id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number | string;
    quantity?: number | string;
    ownerId?: string;
    createdAt?: Date;
    _createdOn?: number;
    rating: number | string;
    category: string;
    brand?: string;
    year?: number | string;
}