export interface Photo {
    id: string;
    postDate: Date;
    url: string;
    description: string;
    allowComments: boolean;
    likes: number;
    comments: string;
    userId: string;
}