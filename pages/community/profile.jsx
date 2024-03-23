import Sidebar from '@/components/sidebar/sidebar';
import PostCardMedium from '@/components/card/postCardMedium';
import SidebarMobile from '@/components/sidebar/sidebarMobile';

export default function Profile() {
  // 假設有12個假資料的數組
  const posts = Array.from({ length: 12 }); // 創建一個包含12個元素的數組

  return (
    <>
      {/* sidebar for mobile */}
      <div className="md-hidden">
        <SidebarMobile />
      </div>

      <div className="flex">
        <div className="flex flex-row">
          <div className="basis-3/12">
            <Sidebar />
          </div>

          <div className="basis-9/12 mt-8">
            <div className="flex flex-col">
              {/* info area */}
              <div className="basis-3/12">
                <div className="flex flex-row">
                  {/* Profile avatar */}
                  <div className="basis-3/12">
                    <div className="avatar mr-3 ml-3">
                      <div className="w-32 rounded-full">
                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </div>
                  </div>
                  {/* Profile info */}
                  <div className="basis-8/12 flex flex-col justify-between">
                    <div className="flex items-center">UserId</div>
                    <div className="flex flex-row">
                      <div className="basis-1/3">999貼文</div>
                      <div className="basis-1/3">999追蹤者</div>
                      <div className="basis-1/3">999追蹤中</div>
                    </div>

                    <div className="flex items-center">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Saepe velit dolores accusamus rem delectus laboriosam
                      dignissimos alias. Animi, maxime! Ipsa laboriosam
                      asperiores incidunt reprehenderit laborum vitae eveniet
                      facilis error perspiciatis!
                    </div>
                  </div>
                </div>
              </div>

              {/* post area */}
              <div className="basis-9/12">
                <div className="flex flex-wrap -mx-2">
                  {posts.map((_, index) => (
                    <div
                      key={index}
                      className="px-2 mb-4 w-full sm:w-full md:w-1/2 lg:w-1/3"
                    >
                      <PostCardMedium />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
