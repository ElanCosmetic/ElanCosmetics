import { LoadingSpinner } from "./components/LoadingSpinner";
const Loading = () => {
    return (
        <div className="text-gray-700 h-screen flex justify-center items-center">
            <LoadingSpinner className="w-14 h-14 lg:w-20 lg:h-20" />
        </div>
    )
}
export default Loading;