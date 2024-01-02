import MusicForm from "./MusicForm";
import AlbumForm from "./AlbumForm";
import ArtistForm from "./ArtistForm";

const ModalForm = ({ typeForm }) => {
  let titleForm = 'Add';
  switch (typeForm) {
    case 'music':
      titleForm = 'Add Music';
      break;
    case 'album':
      titleForm = 'Add Album';
      break;
    case 'artist':
      titleForm = 'Add Artist';
      break;
  }
  console.log(typeForm);
  return (
    <dialog id="form_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <h3 className="font-bold text-lg">{titleForm}</h3>
        {
          typeForm === 'music' && <MusicForm /> ||
          typeForm === 'album' && <AlbumForm /> ||
          typeForm === 'artist' && <ArtistForm />
        }
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ModalForm;