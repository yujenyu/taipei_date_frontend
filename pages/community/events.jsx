import { useEffect, useState } from 'react';
import EventCard from '@/components/community/card/eventCard';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './page.module.css';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getCommunityEvents = async () => {
    if (!hasMore) return; // 防止重複請求
    setIsLoading(true); // 開始加載

    try {
      const res = await fetch(
        `http://localhost:3001/community/events?page=${page}&limit=12`
      );
      const data = await res.json();
      if (data.length === 0) {
        setHasMore(false); // 如果返回的數據少於預期，設置hasMore為false
      }
      setEvents((prevPosts) => [...prevPosts, ...data]); // 更新posts狀態
      setPage((prevPage) => prevPage + 1); // 更新頁碼
      setIsLoading(false); // 結束加載
    } catch (error) {
      console.error('Failed to fetch index posts:', error);
      setIsLoading(false); // 確保即使出錯也要結束加載
    }
  };

  useEffect(() => {
    console.log('Component mounted');
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
          {isLoading ? (
            <div className="flex w-full md:basis-6/12 justify-center">
              <div
                className="flex items-center justify-center w-full"
                style={{ minHeight: '100vh' }}
              >
                <div className={`${styles[`lds-heart`]}`}>
                  <div></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex md:w-10/12 flex-wrap gap-5 justify-center">
              <InfiniteScroll
                dataLength={events.length}
                next={getCommunityEvents}
                hasMore={hasMore}
                loader={
                  <p
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      marginTop: '20px',
                    }}
                  >
                    Loading...
                  </p>
                }
                endMessage={<p>No more events</p>}
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
          )}
        </div>
      </div>
    </>
  );
}
