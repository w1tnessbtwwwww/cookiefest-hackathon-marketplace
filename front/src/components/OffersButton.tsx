import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface OffersButtonProps {
    id: number;
    imageSrc: string; // Путь к изображению
    offerCount: number; // Количество предложений
}

const OffersButton: React.FC<OffersButtonProps> = ({ id, imageSrc, offerCount }) => {
    return (
        <NavLink to={`/supplierpage/${id}`} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 cursor-pointer">
            <div className="flex items-center">
                <img
                    src={imageSrc}
                    alt="Offer"
                    className="w-12 h-12 object-cover rounded-md mr-4"
                />
                <span className="text-gray-900 text-lg font-medium">
                    Все {offerCount} предложения
                </span>
            </div>
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
        </NavLink>
    );
};

export default OffersButton;
