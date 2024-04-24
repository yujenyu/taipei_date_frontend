import PostModal from '../modal/postModal';
import { usePostContext } from '@/context/post-context';
import styles from './card.module.css';

export default function ProfileCard({ post }) {
  const { postModalToggle, setPostModalToggle } = usePostContext();

  // 基於 post_id 的唯一 id
  const modalId = `photo_modal_${post.post_id}`;

  // const handleShowModal = () => {
  //   document.getElementById(modalId).showModal();
  // };

  return (
    <>
      <div className="flex aspect-square card w-[330px] h-[330px] overflow-hidden items-center justify-center border-grayBorder">
        <figure
          className="card-photo m-0"
          onClick={() => {
            setPostModalToggle(modalId);
          }}
        >
          <div className={styles.parallaxContainer}>
            <div className={styles.parallax}>
              <div className={styles.parallaxHoverTopLeft}></div>
              <div className={styles.parallaxHoverTopRight}></div>
              <div className={styles.parallaxHoverBottomLeft}></div>
              <div className={styles.parallaxHoverBottomRight}></div>
              <div className={styles.parallaxContent}>
                <div className="parallaxContentBack">
                  <img
                    src={post.img || '/unavailable-image.jpg'}
                    alt={post.photo_name || 'No Image Available'}
                    className={`${styles.parallaxMedia} card-photo w-[330px] h-[330px] object-cover`}
                  />
                </div>
              </div>
            </div>
          </div>
        </figure>

        <PostModal
          post={post}
          modalId={modalId}
          isOpen={postModalToggle === modalId}
        />
      </div>
    </>
  );
}
