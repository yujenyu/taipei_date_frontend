import Sidebar from '@/components/sidebar/sidebar';
import PostCardMedium from '@/components/card/postCardMedium';
import SidebarMobile from '@/components/sidebar/sidebarMobile';
import ProfileInfo from '@/components/profileInfo/profileInfo';

export default function Profile() {
  // 假設有12個假資料的數組
  const posts = Array.from({ length: 12 }); // 創建一個包含12個元素的數組

  return (
    <>
      {/* sidebar for mobile */}
      <div className="block md:hidden">
        <SidebarMobile />
      </div>

      <div className="flex flex-col w-full items-center">
        <div className="flex flex-wrap">
          <div className="w-full hidden md:block basis-3/12">
            <Sidebar />
          </div>

          <div className="w-full md:basis-9/12 mt-8 items-center">
            <div className="flex flex-col">
              {/* info area */}
              <ProfileInfo />
              {/* post area */}
              <div className="w-full basis-9/12 ">
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
