import EventCard from '@/components/card/eventCard';
import Sidebar from '@/components/sidebar/sidebar';

export default function Index() {
  // 假設有12個假資料的數組
  const posts = Array.from({ length: 12 }); // 創建一個包含12個元素的數組

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="basis-3/12">
            <Sidebar />
          </div>
          <div className="basis-9/12">
            <div className="flex flex-wrap -mx-2">
              {posts.map((_, index) => (
                <div
                  key={index}
                  className="px-2 mb-4 w-full sm:w-full md:w-1/2 lg:w-1/3"
                >
                  <EventCard />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
