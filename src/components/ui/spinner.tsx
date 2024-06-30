import { ClipLoader } from "react-spinners";

export const Spinner = () => {
    return (
      <div className="flex justify-center w-full py-2">
        <div className="flex items-center gap-3 text-xl italic text-gray-100">
          <p>Loading...</p>
          <ClipLoader
            color="white"
            loading
            size={30}
            aria-label="Loading Spinner"
            data-testid="spinner"
          />
        </div>
      </div>
    );
}