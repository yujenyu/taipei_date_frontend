import EventCard from '@/components/community/card/eventCard';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';

export default function Index() {
  // 假設有12個假資料的數組
  const posts = Array.from({ length: 12 }); // 創建一個包含12個元素的數組

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      <div className="flex md:hidden">
        <TabbarMobile />
      </div>
      <div className="flex pt-28 items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>
          <div className="flex md:w-10/12 flex-wrap gap-8 justify-center">
            {posts.map((_, index) => (
              <EventCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
