
export default function RatingStar() {
  return (
    <>
      <div className="bar-detail-stars flex gap-1 rating rating-sm">
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-[#A0FF1F]"
        />
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-[#A0FF1F]"
        />
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-[#A0FF1F]"
        />
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-[#A0FF1F]"
        />
        <input
          type="radio"
          name="rating-6"
          className="mask mask-star-2 bg-[#A0FF1F]"
          checked
        />
      </div>
    </>
  );
}
