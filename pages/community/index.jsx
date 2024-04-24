import { useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { usePostContext } from '@/context/post-context';
import SuggestionBar from '@/components/community/suggestionbar/SuggestionBar';
import Sidebar from '@/components/community/sidebar/sidebar';
import TabbarMobile from '@/components/community/tabbar/tabbarMobile';
import PostCardLarge from '@/components/community/card/postCardLarge';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './page.module.css';

export default function Index() {
  const { auth } = useAuth();

  const {
    posts,
    currentKeyword,
    filteredPosts,
    hasMore,
    filteredPage,
    isFilterActive,
    handleFilterClick,
    getCommunityIndexPost,
    getCommunityIndexFilteredPost,
  } = usePostContext();

  useEffect(() => {
    if (auth.id === 0) {
      return;
    }

    if (filteredPage === 1 && isFilterActive) {
      getCommunityIndexFilteredPost(currentKeyword);
    }

    if (!isFilterActive) {
      getCommunityIndexPost();
    }
  }, [auth.id, filteredPage, isFilterActive, currentKeyword]);

  return (
    <>
      <title>{'Community - Taipei Date'}</title>

      {/* sidebar for mobile */}
      <div className="block md:hidden w-full">
        <TabbarMobile />
      </div>

      <div className="flex flex-col w-full pt-28">
        <div className="flex flex-wrap min-h-screen">
          <div className="hidden md:flex md:basis-3/12">
            <Sidebar />
          </div>
          <div className="flex w-full md:basis-6/12 justify-center">
            <div className="grid grid-cols-1 gap-8 min-h-screen">
              {/* <div className="filterBtn join grid grid-cols-3 w-[480px] mx-auto">
                <button
                  className="join-item btn-sm btn-outline hover:bg-primary border"
                  onClick={() => {
                    handleFilterClick('約會');
                  }}
                >
                  約會
                </button>
                <button
                  className="join-item btn-sm btn-outline hover:bg-primary border"
                  onClick={() => {
                    handleFilterClick('酒吧');
                  }}
                >
                  酒吧
                </button>
                <button
                  className="join-item btn-sm btn-outline hover:bg-primary border"
                  onClick={() => {
                    handleFilterClick('電影');
                  }}
                >
                  電影
                </button>
              </div> */}
              <div className="filterBtn flex w-[480px] mx-auto justify-center gap-10">
                <button
                  className="bg-dark border rounded-full hover:bg-primary hover:text-black w-32 h-8"
                  onClick={() => {
                    handleFilterClick('約會');
                  }}
                >
                  約會
                </button>
                <button
                  className="bg-dark border rounded-full hover:bg-primary hover:text-black w-32 h-8"
                  onClick={() => {
                    handleFilterClick('酒吧');
                  }}
                >
                  酒吧
                </button>
                <button
                  className="bg-dark border rounded-full hover:bg-primary hover:text-black w-32 h-8"
                  onClick={() => {
                    handleFilterClick('電影');
                  }}
                >
                  電影
                </button>
              </div>

              <InfiniteScroll
                dataLength={
                  isFilterActive ? filteredPosts.length : posts.length
                }
                next={
                  isFilterActive
                    ? () => getCommunityIndexFilteredPost(currentKeyword)
                    : getCommunityIndexPost
                }
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
                {(isFilterActive ? filteredPosts : posts).map((post, i) => (
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
