import React from 'react';
import Nav from './Nav';
import { useNavigate } from 'react-router-dom';
import './GenerateSprite.css'
// import map thumbnail from /maps/DrewMan_stage/FirstLevelThumnail.png"
import thumbnail from '../../assets/FirstLevelThumbnail.png';

const games = [
    {
        name: 'Space Adventure',
        description: 'A space adventure game',
        thumbnail: thumbnail,
        link: 'SpaceAdventure'
    }
]


const Game = () => {
    const navigate = useNavigate();
    const GetDrawingIdQueryParam = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const drawingID = urlParams.get('drawingID');
        return drawingID;
    }
    const drawingID = GetDrawingIdQueryParam();

    return (
        <div>
            <Nav />
            <div className="bg-white">
            

            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                {
                    games?.map((game) => {
                        return(
                        <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{`${game.name}`}</h2>
                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            <div className="group relative">
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img src={game.thumbnail} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full "
                                />
                                <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-purple-700 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50" onClick={
                        () => {
                            const drawingID = GetDrawingIdQueryParam();
                            navigate(`/${game.link}?drawingID=${drawingID}`);
                        }
                    }></div>
                                </div>
                                <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                    <a href={`/${game.link}?drawingID=${drawingID}`}>
                                        {game.name}
                                    </a>
                                    </h3>
                                </div>
                                </div>
                            </div>

                        </div>
                        </div>
                        )                 
                    })
                }
            </div>
            </div>
        </div>
    );
};

export default Game;
