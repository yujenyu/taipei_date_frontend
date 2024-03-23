import Feed from '@/components/feed/feed';
import Recbar from '@/components/recbar/recbar';
import Sidebar from '@/components/sidebar/sidebar';
import SidebarMobile from '@/components/sidebar/sidebarMobile';

export default function Index() {
  return (
    <>
      {/* sidebar for mobile */}
      <div className="md-hidden">
        <SidebarMobile />
      </div>

      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="basis-3/12">
            <Sidebar />
          </div>
          <div className="basis-6/12">
            <Feed />
          </div>
          <div className="basis-3/12 flex justify-end">
            <Recbar />
          </div>
        </div>
      </div>
    </>
  );
}
