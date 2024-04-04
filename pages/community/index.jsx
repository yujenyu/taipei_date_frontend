import Feed from '@/components/community/feed/feed';
import SuggestionBar from '@/components/community/suggestionbar/SuggestionBar';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';

export default function Index() {
  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden w-full">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full pt-28">
        <div className="flex flex-wrap">
          <div className="hidden md:flex md:basis-3/12">
            <Sidebar />
          </div>
          <div className="flex w-full md:basis-6/12 justify-center">
            <Feed />
          </div>
          <div className="hidden md:flex w-full md:basis-3/12 justify-end pr-10">
            <SuggestionBar />
          </div>
        </div>
      </div>
    </>
  );
}
