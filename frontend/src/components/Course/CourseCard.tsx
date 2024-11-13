interface ICourseCard {
    id: string;
    bannerPicture: string;
    name: string;
    creator: string;
    totalSold: number;
    price: number;
    onClick: () => void
}

const CourseCard = (props: ICourseCard) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300" onClick={props.onClick}>
            <img src={props.bannerPicture} alt="bannerPicture" className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{props.name}</h1>
            <p className="text-gray-600 mb-1">Creator: <span className="font-semibold">{props.creator}</span></p>
            <p className="text-gray-500 mb-2">Total Sold: <span className="font-semibold">{props.totalSold}</span></p>
            <h1 className="text-lg font-semibold text-green-600">Price: <span className="text-xl">{props.price}</span></h1>
        </div>
    )
}

export default CourseCard