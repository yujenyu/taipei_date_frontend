import ExploreModal from '../modal/exploreModal';

export default function PostCardMedium({ post }) {
  // 基於 post_id 的唯一 id
  const modalId = `photo_modal_${post.post_id}`;

  const handleShowModal = () => {
    document.getElementById(modalId).showModal();
  };

  return (
    <>
      <div className="flex aspect-square card w-[330px] h-[330px] overflow-hidden items-center justify-center border border-grayBorder">
        {/* <figure className="card-photo m-0" onDoubleClick={handleLikedClick}> */}
        <figure className="card-photo m-0" onClick={handleShowModal}>
          <img
            src={post.img || '../../../public/unavailable-image.jpg'}
            alt={post.photo_name || 'No Image Available'}
            className="card-photo object-cover w-[330px] h-[330px]"
          />
        </figure>

        <ExploreModal post={post} modalId={modalId} />
      </div>
    </>
  );
}
