import { usePostContext } from '@/context/post-context';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './modal.module.css';

export default function FollowingModal({ followings, modalId }) {
  const {
    resetAndCloseFollowingModal,
    setProfilePosts,
    setProfilePage,
    setUserProfileHasMore,
    setReload,
    followingModalRef,
  } = usePostContext();

  const router = useRouter();

  const handleProfileClick = async (userId) => {
    // 清空當前貼文列表和重置頁碼以確保載入新用戶的貼文
    setProfilePosts([]);
    setProfilePage(1);
    setUserProfileHasMore(true);

    await resetAndCloseFollowingModal();
    await followingModalRef.current.close(); // 確保模態窗口關閉

    if (router.query.uid === userId.toString()) {
      // 如果用戶點擊的是已經在的個人檔案頁面，則強制觸發更新
      setReload((prev) => !prev); // 切換 forceUpdate 狀態
    } else {
      router.push(`/community/profile/${userId}`); // 導向新的用戶檔案
    }
  };

  return (
    <>
      <dialog
        id={modalId}
        ref={followingModalRef}
        className="modal modal-bottom sm:modal-middle max-w-full"
      >
        <div
          className="modal-box md:w-[500px] md:h-[500px]"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <p
            className={`${styles['followModalListText']} font-bold text-lg mb-5 text-h5`}
          >
            追蹤中
          </p>

          <ul>
            {followings.map((user, index) => (
              <li
                key={index}
                className="followModalListItem flex flex-row justify-between items-center mb-3 p-2"
              >
                <div className="card-iconListLeft flex flex-row items-center">
                  <div className="avatar mr-3">
                    <div className="w-10 rounded-full">
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          handleProfileClick(user.user_id);
                        }}
                      >
                        <img
                          src={user.avatar || '/unknown-user-image.jpg'}
                          alt={user.username || 'No Image Available'}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleProfileClick(user.user_id);
                    }}
                  >
                    <span
                      className={`${styles['followModalListEmail']} text-h6`}
                    >
                      {user.email.split('@')[0]}
                    </span>
                  </div>

                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleProfileClick(user.user_id);
                    }}
                  >
                    <span
                      className={`${styles['followModalListUsername']} text-[14px] mx-3`}
                    >
                      {user.username}
                    </span>
                  </div>
                </div>

                {/* <div className="card-iconListRight flex justify-end">
                    <FaRegCircleXmark
                      className={`${styles['followModalListItemIcon']} text-h5`}
                    />
                  </div> */}
              </li>
            ))}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              resetAndCloseFollowingModal();
            }}
          >
            close
          </button>
        </form>
      </dialog>
    </>
  );
}
