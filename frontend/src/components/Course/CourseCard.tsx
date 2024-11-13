interface ICourseCard {
    id: string;
    bannerPicture: string;
    name: string;
    creator: string;
    totalSold: number;
    price: number;
    onClick: () => void;
}

const CourseCard: React.FC<ICourseCard> = (props) => {
    return (
        <div
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={props.onClick}
        >
            <img
                src={props.bannerPicture}
                alt="Course Banner"
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h1 className="text-xl font-semibold text-gray-900 mb-2">{props.name}</h1>
                <p className="text-gray-600 text-sm mb-1">
                    Creator: <span className="font-medium">{props.creator}</span>
                </p>
                <p className="text-gray-500 text-sm mb-4">
                    Total Sold: <span className="font-medium">{props.totalSold}</span>
                </p>
                <div className="border-t pt-3">
                    <h1 className="text-lg font-semibold text-blue-600">
                        Price: <span className="text-xl">${props.price}</span>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
