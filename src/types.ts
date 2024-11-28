export interface productProps{
    product: {
        id: number;
        imagesByColor: { [colorName: string]: string[] };
        title: string;
        price: number;
        oldPrice?: number;
        discount?: string;
        rating: number;
        numReviews: number;
        description: string;
        colors: { name: string; hex: string }[];
    }
}