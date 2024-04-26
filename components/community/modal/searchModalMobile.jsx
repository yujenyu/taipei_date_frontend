import { usePostContext } from '@/context/post-context';
import Link from 'next/link';
import styles from './modal.module.css';

export default function SearchModalMobile() {
  const {
    searchTerm,
    searchResults,
    hasSearched,
    getSearchUsers,
    resetAndCloseSearchModal,
  } = usePostContext();

  const handleSearchChange = async (e) => {
    getSearchUsers(e.target.value);
  };

  return (
    <>
      <dialog
        id="search_modal_mobile"
        className="modal modal-bottom sm:modal-middle"
      >
        <div
          className="modal-box flex flex-col"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <p
            className={`${styles['searchModalListItemText']} font-bold text-lg mb-5 text-h5`}
          >
            搜尋
          </p>
          <label className="input input-bordered flex items-center gap-2 mb-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="搜尋......"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </label>
          {/* <p className={`${styles['searchModalListItemText']} text-h6 mb-3`}>
            歷史紀錄
          </p> */}
          <ul>
            {hasSearched && searchResults.length === 0 ? (
              <p className={`${styles['searchModalListText']}`}>未找到结果</p>
            ) : (
              searchResults.map((user) => (
                <li className="searchModalListItem flex flex-row justify-between items-center mb-3 p-2">
                  <div className="card-iconListLeft flex flex-row items-center">
                    <div className="avatar mr-3">
                      <div className="w-10 rounded-full">
                        <Link href={`/community/profile/${user.user_id}`}>
                          <img
                            src={user.avatar || '/unknown-user-image.jpg'}
                            alt={user.username || 'No Image Available'}
                          />
                        </Link>
                      </div>
                    </div>
                    <Link href={`/community/profile/${user.user_id}`}>
                      <span
                        className={`${styles['searchModalListEmail']} text-h6`}
                      >
                        {user.email.split('@')[0]}
                      </span>
                    </Link>

                    <Link href={`/community/profile/${user.user_id}`}>
                      <span
                        className={`${styles['searchModalListUsername']} text-[14px] mx-3`}
                      >
                        {user.username}
                      </span>
                    </Link>
                  </div>

                  {/* <div className="card-iconListRight flex justify-end">
                    <FaRegCircleXmark
                      className={`${styles['searchModalListItemIcon']} text-h5`}
                    />
                  </div> */}
                </li>
              ))
            )}
          </ul>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={resetAndCloseSearchModal}>close</button>
        </form>
      </dialog>
    </>
  );
}
