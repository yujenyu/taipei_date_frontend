import { useEffect } from 'react';
import { usePostContext } from '@/context/post-context';
import EventCard from '@/components/community/card/eventCard';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './page.module.css';

export default function Events() {
  const { events, hasMore, getCommunityEvents } = usePostContext();

  useEffect(() => {
    getCommunityEvents();
  }, []);

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
          <div className="flex md:w-10/12 flex-wrap gap-5 justify-center">
            <InfiniteScroll
              dataLength={events.length}
              next={getCommunityEvents}
              hasMore={hasMore}
              loader={
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    textAlign: 'center',
                    minHeight: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <div className={`${styles[`lds-heart`]}`}>
                    <div></div>
                  </div>
                </div>
              }
              // endMessage={<p>No more events</p>}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1.25rem',
              }}
            >
              {events.map((event, i) => (
                <EventCard event={event} key={i} />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
}
