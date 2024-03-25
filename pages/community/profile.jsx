import Sidebar from '@/components/sidebar/sidebar';
import PostCardMedium from '@/components/card/postCardMedium';
import TabbarMobile from '@/components/tabbar/tabbarMobile';
import ProfileInfo from '@/components/profileInfo/profileInfo';

export default function Profile() {
  // 假設有12個假資料的數組
  const posts = Array.from({ length: 12 }); // 創建一個包含12個元素的數組

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full items-center pt-16">
        <div className="flex flex-wrap">
          <div className="hidden md:flex md:w-3/12 md:basis-3/12">
            <Sidebar />
          </div>

          <div className="w-full md:basis-9/12 mt-8 items-center">
            <div className="flex flex-col">
              {/* info area */}
              <ProfileInfo />
              {/* post area */}
              <div className="flex md:flex md:w-9/12 md:basis-9/12 ">
                <div className="flex flex-wrap -mx-2">
                  {posts.map((_, index) => (
                    <PostCardMedium />
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
