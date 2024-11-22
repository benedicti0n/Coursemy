interface CourseCardProps {
    _id: string;
    bannerPicture?: string;
    name: string;
    description?: string;
    price: number;
    totalSold: number;
    onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
    _id,
    bannerPicture,
    name,
    description,
    price,
    totalSold,
    onClick
}) => {
    return (
        <div
            key={_id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={onClick}
        >
            <img
                src={bannerPicture}
                alt="Course Banner"
                className="w-full h-48 object-cover"
            />
            <div className="p-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{name}</h1>
                <p className="text-gray-600 text-sm mb-2">
                    {description || "No description available."}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                    Total Sold: <span className="font-medium">{totalSold}</span>
                </p>
                <div className="flex justify-between items-center border-t pt-4">
                    <h1 className="text-lg font-semibold text-black">
                        Price: <span className="text-xl text-green-500">${price}</span>
                    </h1>
                    <button className="px-4 py-2 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors duration-200">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
