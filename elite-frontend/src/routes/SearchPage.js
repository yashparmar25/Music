import { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../components/shared/SingleSongCard";

const SearchPage = () => {
    const [searchText, setSearchText] = useState("");
    const [songData, setSongData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchSong = async () => {
        setIsLoading(true); // Set loading state to true while fetching data
        try {
            const response = await makeAuthenticatedGETRequest(
                "/song/get/songname/" + searchText
            );
            setSongData(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setIsLoading(false); // Reset loading state after fetching data
        }
    };

    return (
        <LoggedInContainer curActiveScreen="search">
            <div className="w-full py-6">
                <div className="w-1/3 p-3 text-sm rounded-full bg-gray-900 px-5 flex text-white space-x-3 items-center border border-transparent focus-within:border-white">
                    <Icon icon="ic:outline-search" className="text-lg" />
                    <input
                        type="text"
                        placeholder="What do you want to listen to?"
                        className="w-full bg-gray-900 focus:outline-none"
                        value={searchText}
                        onChange={(e) => {setSearchText(e.target.value)}}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                searchSong();
                            }
                        }}
                    />
                </div>
                {isLoading ? (
                    <div className="text-white pt-10">Loading...</div>
                ) : (
                    <>
                        {songData.length > 0 ? (
                            <div className="pt-10 space-y-3">
                                <div className="text-white">
                                    Showing search results for
                                    <span className="font-bold"> {searchText}</span>
                                </div>
                                {songData.map((item) => (
                                    <SingleSongCard
                                        info={item}
                                        key={item.id} // Assuming 'id' is a unique identifier
                                        playSound={() => {}}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-400 pt-10">
                                Nothing to show here.
                            </div>
                        )}
                    </>
                )}
            </div>
        </LoggedInContainer>
    );
};

export default SearchPage;
