export interface ProductCardProps{
    product: {
        articul: number;
        title: string;
        price: number;
        sale: number;
        salePrice: number;
        rating: number;
        reviews: number
        quantity: number
        numReviews: number;
        description?: string;
        url: string;
        merchantId: number
        
    }
}
