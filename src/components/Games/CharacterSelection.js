import React, { useEffect, useRef, Fragment } from 'react';
import Nav from "./Nav";
import { useSelector } from 'react-redux';

const characters = [
    {
        name: "Astronaut",
        image: "https://utoon-animator.s3.amazonaws.com/Characters/Donny.png",
        description: "Astronaut is a character that is very strong and can jump very high",
    },
    {
        name: "Space Princess",
        image: "https://utoon-animator.s3.amazonaws.com/Characters/Piggy.png",
        description: "Space Princess is a character that is very strong and can jump very high",
    },
    {
        name: "Alien",
        image: "https://utoon-animator.s3.amazonaws.com/Characters/Ginger.jpg",
        description: "Alien is a character that is very strong and can jump very high",
    }
]

const Game = () => {

    return (
        <Fragment>
            <Nav />
            <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

            {
                
                characters?.map((character) => {
                    return (
                        <div>
                                    <div className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                        <img src={`${character.image}`} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />

                                        </div>
                                        <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                            <a href="#">
                                                <span aria-hidden="true" className="absolute inset-0"></span>
                                                {character.description}
                                            </a>
                                            </h3>
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

        </Fragment>
    );
};

export default Game;
