import { useEffect } from 'react';
import { usePostContext } from '@/context/post-context';
import { useAuth } from '@/context/auth-context';
import PostCardMedium from '@/components/community/card/postCardMedium';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './page.module.css';

export default function Explore() {
  const { auth } = useAuth();

  const { randomPosts, exploreHasMore, getCommunityExplorePost } =
    usePostContext();

  useEffect(() => {
    if (auth.id) {
      getCommunityExplorePost();
    }
  }, [auth.id]);

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden">
        <TabbarMobile />
      </div>

      <div className="flex pt-28 items-center justify-center">
        <div className="flex flex-row items-center justify-center min-h-screen">
          <div className="hidden md:flex md:w-2/12">
            <Sidebar />
          </div>

          {/* <div className="flex w-full md:basis-6/12 justify-center">
            <div
              className="flex items-center justify-center w-full"
              style={{ minHeight: '100vh' }}
            >
              <div className={`${styles[`lds-heart`]}`}>
                <div></div>
              </div>
            </div>
          </div> */}

          <div className="flex flex-wrap md:w-10/12 gap-5 justify-center">
            <div className="flex flex-wrap gap-5 justify-center">
              <InfiniteScroll
                dataLength={randomPosts.length}
                next={getCommunityExplorePost}
                hasMore={exploreHasMore}
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
                {randomPosts.map((post, i) => (
                  <PostCardMedium post={post} key={i} />
                ))}
              </InfiniteScroll>
            </div>
            {/* <div className="md:flex md:flex-wrap md:gap-5 md:justify-center hidden">
              {posts.map((_, index) => (
                <PostCardMedium key={index} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-5 mx-5 md:hidden">
              {posts.map((_, index) => (
                <PostCardMedium key={index} />
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
