import PostCardLarge from '../card/postCardLarge';

export default function Feed() {
  return (
    <>
      <div className="grid grid-cols-1 gap-8 min-h-screen">
        {Array.from({ length: 5 }).map((_, index) => (
          <PostCardLarge key={index} />
        ))}
      </div>
    </>
  );
}
