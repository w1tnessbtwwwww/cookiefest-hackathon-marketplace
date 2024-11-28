import React from "react";

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  averageRating,
  totalReviews,
}) => {
  const ratingDistribution = [2, 1, 0, 0, 0]; // Прямое распределение

  return (
    <div className="mt-12 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Отзывы</h2>
      <div className="mt-4">
        {/* Рейтинг и распределение */}
        <div className="flex items-center space-x-4">
          <div className="text-yellow-500 text-3xl font-bold">
            {averageRating.toFixed(1)}
          </div>
          <div className="text-gray-600">
            <span className="text-sm">На основе {totalReviews} отзывов</span>
            <div className="mt-1 flex space-x-1">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`inline-block w-4 h-4 ${
                    index < Math.round(averageRating)
                      ? "bg-yellow-500"
                      : "bg-gray-300"
                  } rounded-full`}
                ></span>
              ))}
            </div>
          </div>
        </div>

        {/* Гистограмма */}
        <div className="mt-4 space-y-2">
          {ratingDistribution.map((count, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">{5 - index}★</span>
              <div className="flex-1 bg-gray-200 rounded h-2">
                <div
                  className="bg-yellow-500 h-full rounded"
                  style={{
                    width: `${(count / totalReviews) * 100}%`,
                  }}
                ></div>
              </div>
              <span className="text-gray-500 text-xs">
                {((count / totalReviews) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Список отзывов */}
      <div className="mt-8 space-y-6">
        {reviews.slice(0, 3).map((review, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div>
                <h4 className="text-sm font-bold">{review.name}</h4>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`inline-block w-4 h-4 ${
                        i < review.rating ? "bg-yellow-500" : "bg-gray-300"
                      } rounded-full`}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
