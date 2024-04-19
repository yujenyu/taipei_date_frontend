import { useEffect } from 'react';
import { usePostContext } from '@/context/post-context';
import SuggestionBar from '@/components/community/suggestionbar/SuggestionBar';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import PostCardLarge from '@/components/community/card/postCardLarge';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './page.module.css';

export default function Index() {
  const { posts, hasMore, getCommunityIndexPost } = usePostContext();

  useEffect(() => {
    getCommunityIndexPost();
  }, []);

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
            <div className="grid grid-cols-1 gap-8 min-h-screen">
              <InfiniteScroll
                dataLength={posts.length}
                next={getCommunityIndexPost}
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
                // endMessage={<p>No more posts</p>}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '1.25rem',
                }}
              >
                {posts.map((post, i) => (
                  <PostCardLarge post={post} key={i} />
                ))}
              </InfiniteScroll>
            </div>
          </div>

          <div className="hidden lg:flex w-full lg:basis-3/12 justify-end pr-10">
            <SuggestionBar />
          </div>
        </div>
      </div>
    </>
  );
}
