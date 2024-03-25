import EventCard from '@/components/card/eventCard';
import Sidebar from '@/components/sidebar/sidebar';
import TabbarMobile from '@/components/tabbar/tabbarMobile';

export default function Index() {
  // 假設有12個假資料的數組
  const posts = Array.from({ length: 12 }); // 創建一個包含12個元素的數組

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      <div className="flex md:hidden">
        <TabbarMobile />
      </div>

      <div className="flex pt-16">
        <div className="flex flex-row ">
          <div className="hidden md:flex md:w-3/12 md:basis-3/12">
            <Sidebar />
          </div>
          <div className="flex md:flex md:w-9/12 md:basis-9/12">
            <div className="flex flex-wrap -mx-2">
              {posts.map((_, index) => (
                <EventCard />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
