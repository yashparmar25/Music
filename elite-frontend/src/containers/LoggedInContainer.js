import {useContext, useState, useLayoutEffect, useRef} from "react";
import {Howl, Howler} from "howler";
import {Icon} from "@iconify/react";
import logo2 from "../files/logo3.png";

import '../index.css';
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import songContext from "../contexts/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import {makeAuthenticatedPOSTRequest} from "../utils/serverHelpers";
import { Routes ,Route} from "react-router-dom";

const LoggedInContainer = ({children, curActiveScreen}) => {
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen] =
        useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen] = useState(false);

    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        // the following if statement will prevent the useEffect from running on the first render.
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong && currentSong.track]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if(response._id){
            setAddToPlaylistModalOpen(false)
        }
    };

    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };


    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };

    const nextSong = () => {
        
    };

    return (
        <div className="h-full w-full bg-slate-800">
            {createPlaylistModalOpen && (
                <CreatePlaylistModal
                    closeModal={() => {
                        setCreatePlaylistModalOpen(false);
                    }}
                />
            )}
            {addToPlaylistModalOpen && (
                <AddToPlaylistModal
                    closeModal={() => {
                        setAddToPlaylistModalOpen(false);
                    }}
                    addSongToPlaylist={addSongToPlaylist}
                />
            )}
            <div className={`${currentSong ? "h-5/6 bg-black" : "h-full"} w-full flex`}>
                {/* This first div will be the left panel */}
                <div className="navbar h-500 w-1/5 pb-5  bg-black flex flex-col justify-between pb-10">
                    <div>
                        {/* This div is for logo */}
                        <div className="logoDiv p-6">
                            <img
                                src={logo2}
                                alt="spotify logo"
                                width={150}
                            />
                        </div>
                        <div className="py-5">
                            <IconText
                                iconName={"material-symbols:home"}
                                displayText={"Home"}
                                targetLink={"/"}
                                active={curActiveScreen === "home"}
                            />
                            <IconText
                                iconName={"material-symbols:search-rounded"}
                                displayText={"Search"}
                                active={curActiveScreen === "search"}
                                targetLink={"/search"}
                            />
                            <IconText
                                iconName={"icomoon-free:books"}
                                displayText={"Library"}
                                active={curActiveScreen === "library"}
                                targetLink={"/library"}
                            />
                            <IconText
                                iconName={
                                    "material-symbols:library-music-sharp"
                                }
                                displayText={"My Music"}
                                targetLink="/myMusic"
                                active={curActiveScreen === "myMusic"}
                            />
                        </div>
                        <div className="pt-5">
                            <IconText
                                iconName={"material-symbols:add-box"}
                                displayText={"Create Playlist"}
                                onClick={() => {
                                    setCreatePlaylistModalOpen(true);
                                }}
                            />
                            <IconText
                                iconName={"mdi:cards-heart"}
                                displayText={"Liked Songs"}
                            />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
                            <Icon icon="carbon:earth-europe-africa" />
                            <div className="ml-2 text-sm font-semibold">
                                English
                            </div>
                        </div>
                    </div>
                </div>
                {/* This second div will be the right part(main content) */}
                <div className="h-130 pb-1  w-5/6 bg-slate-800 overflow-auto ">
                    <div className="navbar w-full  bg-black bg-opacity-30 p-3 flex items-center justify-end">
                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            <div className="w-1/3 flex justify-around h-full items-center">
                              
                             <TextWithHover displayText={"Upload Song"} targetLink={"/uploadSong"} />
                                
                                <div className="bg-white w-11 h-11 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                YP
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
            {/* This div is the current playing song */}
            {currentSong && (
                <div className=" w-full h-1/7  bg-neutral-900 bg-opacity-30 text-white flex items-center pt-3">
                    <div className="w-1/4 flex items-center">
                        <img
                            src={currentSong.thumbnail}
                            alt="currentSongThumbail"
                            className="pl-5 h-12 w-13 rounded"
                        />
                        <div className="pl-5">
                            <div className="text-sm hover:underline cursor-pointer">
                                {currentSong.name}
                            </div>
                            <div className="text-xs text-gray-500 hover:underline cursor-pointer">
                                {currentSong.artist.firstName +
                                    " " +
                                    currentSong.artist.lastName}
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 m-7  flex justify-center h-full flex-col items-center">
                        <div className="flex w-1/3 justify-between items-center">
                            {/* controls for the playing song go here */}
                            <Icon
                                icon="ph:shuffle-fill"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon="mdi:skip-previous-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                            <Icon
                                icon={
                                    isPaused
                                        ? "ic:baseline-play-circle"
                                        : "ic:baseline-pause-circle"
                                }
                                fontSize={50}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={togglePlayPause}
                            />
                            <Icon
                            //next song
                                icon="mdi:skip-next-outline"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                                onClick={nextSong}
                            />
                            <Icon
                                icon="ic:twotone-repeat"
                                fontSize={30}
                                className="cursor-pointer text-gray-500 hover:text-white"
                            />
                        </div>
                        {/* <div>Progress Bar Here</div> */}
                    </div>
                    <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                        <Icon
                            icon="ic:round-playlist-add"
                            fontSize={30}
                            className="cursor-pointer text-gray-500 hover:text-white"
                            onClick={() => {
                                setAddToPlaylistModalOpen(true);
                            }}
                        />
                        <Icon
                            icon="ph:heart-bold"
                            fontSize={25}
                            className="cursor-pointer text-gray-500 hover:text-white"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoggedInContainer;