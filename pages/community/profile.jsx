import Sidebar from '@/components/community/sidebar/sidebar';
import ProfileCard from '@/components/community/card/profileCard';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import ProfileInfo from '@/components/community/profileInfo/profileInfo';

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

      <div className="flex flex-col w-full items-center justify-center sm:w-full pt-28">
        <div className="flex flex-wrap justify-center">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>

          <div className="flex flex-col w-full md:w-10/12 items-center">
            <div className="flex flex-col items-center">
              {/* info area */}
              <ProfileInfo />
              {/* post area */}
              <div className="flex flex-wrap gap-5 justify-center">
                {posts.map((_, index) => (
                  <ProfileCard key={index} />
                ))}
              </div>
              {/* <div className="md:flex md:flex-wrap md:gap-5 md:justify-center hidden">
                {posts.map((_, index) => (
                  <ProfileCard key={index} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-5 mx-5 md:hidden">
                {posts.map((_, index) => (
                  <ProfileCard key={index} />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
