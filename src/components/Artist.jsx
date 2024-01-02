import band from '../assets/band.svg';

const Artist = ({image, name}) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="avatar placeholder">
        <div className="bg-neutral text-neutral-content rounded-full w-10">
          <picture>
            <source srcset={image}/>
            <img src={band}/>
          </picture>
        </div>
      </div>
      <p className="font-bold">{name}</p>
    </div>
  );
}

export default Artist;