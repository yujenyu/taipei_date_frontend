import { useState } from 'react';
import { FiSend, FiMessageCircle } from 'react-icons/fi';
import { FaRegHeart, FaHeart, FaRegBookmark, FaBookmark } from 'react-icons/fa';

export default function ExploreModal() {
  const mockData = {
    userId: 'USERID',
    context:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur corrupti aspernatur quas Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur corrupti aspernatur quas',
  };

  // fake data
  const mockComments = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    userId: `User ${i + 1}`,
    content: `Comment content ${i + 1}`,
  }));

  const [isLiked, setIsLiked] = useState(false);

  const handleLikedClick = () => {
    setIsLiked(!isLiked);
  };

  const [isSaved, setIsSaved] = useState(false);

  const handleSavedClick = () => {
    setIsSaved(!isSaved);
  };

  return (
    <>
      <dialog id="photo_modal" className="modal">
        <div
          className="flex modal-box w-[90vw] max-w-[90vw] h-[90vh] overflow-auto"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
        >
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-h3">
              ✕
            </button>
          </form>

          <div className="container flex flex-col md:flex-row">
            <figure className="flex flex-col w-full md:w-1/2 card-photo m-0 ">
              <img
                src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                alt="car!"
                className="object-contain h-full w-full"
              />
            </figure>

            <div className="flex flex-col card-body h-full w-full md:w-1/2 p-0 overflow-auto px-5">
              <div className="flex flex-row first-letter:card-user h-10  items-center gap-2 m-2">
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </div>
                <span>{mockData.userId}</span>
              </div>
              <div className="context flex mb-10">
                <p>{mockData.context}</p>
              </div>

              <div className="flex flex-col comment space-y-4 ">
                {mockComments.map((mockComments) => (
                  <div key={mockComments.id} className="comment">
                    <div className="card-user flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            alt={`Avatar ${mockComments.userId}`}
                          />
                        </div>
                      </div>
                      <span>{mockComments.userId}</span>
                      <p className="text-right">{mockComments.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="my-5 h-auto">
                <div className="card-iconList text-h4 flex flex-row justify-between ">
                  <div className="card-iconListLeft flex flex-row gap-2">
                    {isLiked ? (
                      <FaHeart
                        className="card-ico hover:text-neongreen"
                        onClick={handleLikedClick}
                      />
                    ) : (
                      <FaRegHeart
                        className="card-icon hover:text-neongreen"
                        onClick={handleLikedClick}
                      />
                    )}
                    <FiMessageCircle className="card-icon hover:text-neongreen" />
                    <FiSend className="card-icon hover:text-neongreen" />
                  </div>
                  <div className="card-iconListRight flex justify-end">
                    {isSaved ? (
                      <FaBookmark
                        className="card-icon hover:text-neongreen"
                        onClick={handleSavedClick}
                      />
                    ) : (
                      <FaRegBookmark
                        className="card-icon hover:text-neongreen"
                        onClick={handleSavedClick}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-row card-actions justify-center">
                  <textarea
                    className="textarea textarea-ghost w-full h-16 resize-none"
                    placeholder="新增回覆"
                  />
                  <button className="btn bg-neongreen hover:bg-neongreen text-light w-24 flex justify-center">
                    分享
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
