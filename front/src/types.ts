export interface Product{
    product: {
        articul: number;
        title: string;
        price: number;
        sale: number;
        salePrice: number;
        rating: number;
        quantity: number
        numReviews: number;
        description?: string;
        url: string;
        merchantId: number
        
    }
}