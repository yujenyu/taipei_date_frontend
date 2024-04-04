import ExploreModal from '../modal/exploreModal';

export default function PostCardMedium(index) {
  const handleShowModal = () => {
    document.getElementById('photo_modal').showModal();
  };

  return (
    <>
      <div className="flex aspect-square card w-[330px] h-[330px] overflow-hidden items-center justify-center border border-grayBorder">
        {/* <figure className="card-photo m-0" onDoubleClick={handleLikedClick}> */}
        <figure className="card-photo m-0" onClick={handleShowModal}>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="car!"
            className="card-photo object-cover w-[330px] h-[330px]"
          />
        </figure>

        <ExploreModal />
      </div>
    </>
  );
}
