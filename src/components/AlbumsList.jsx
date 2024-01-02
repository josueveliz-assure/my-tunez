import React from "react";

const AlbumsList = ({ albums }) => {
    return (
        <div className="overflow-y-auto max-h-full max-w-full">
            <ul className="menu bg-base-200">
                {albums.map((album, index) => (
                    <div className="">
                        <div className="flex flex-row">
                            <div className="mt-4 mb-4 mr-3">
                                <img className="object-cover h-48 w-48 rounded-md" src={album.albumCover}/>
                            </div>
                            <li key={index} className="flex-grow block-item">
                                <h2 className="menu-title">{album.title}</h2>
                                <ul className="overflow-y-auto max-h-48">
                                    {album.musicList.map((music, index) => (
                                        <li key={index}>
                                            <a className="pt-3 pb-3">{music.title}</a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </div>
                        <hr/>
                    </div>
                ))}
                {albums.length === 0 && (
                    <li>
                        <a className='pt-3 pb-3 text-xl'>No Albums </a>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default AlbumsList;