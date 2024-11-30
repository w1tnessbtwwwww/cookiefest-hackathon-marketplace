export interface ProductCardProps {
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


export interface Review {
    name: string;
    reviewRating: number;
    text: string;
}

export interface ProductPageProps {
    articul: number;
    title: string;
    price: number;
    sale: number;
    salePrice: number;
    rating: number;
    quantity: number
    reviews: number;
    description?: string;
    url: string;
    reviewsCount: number
    //reviews: Review[];
    // merchantId: number
}

export interface MerchantOffers {
    articul: number;
    store: string;
    price: number;
    rating: number;
    reviews: number;
}