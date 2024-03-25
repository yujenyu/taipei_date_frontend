import Feed from '@/components/feed/feed';
import SuggestionBar from '@/components/suggestionbar/suggestionbar';
import Sidebar from '@/components/sidebar/sidebar';
import TabbarMobile from '@/components/tabbar/tabbarMobile';

export default function Index() {
  return (
    <>
      {/* sidebar for mobile */}
      <div className="block md:hidden">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full pt-16">
        <div className="flex flex-wrap">
          <div className="w-full hidden md:block md:basis-3/12">
            <Sidebar />
          </div>
          <div className="w-full md:basis-6/12">
            <Feed />
          </div>
          <div className="w-full md:basis-3/12 flex justify-end">
            <SuggestionBar />
          </div>
        </div>
      </div>
    </>
  );
}
