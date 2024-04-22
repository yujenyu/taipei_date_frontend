export default function BarTypeSelect() {
  return (
    <>
      <select className="select select-bordered rounded-xl border-white bg-transparent hover:border-[#A0FF1F] text-white">
        <option disabled selected>
          酒吧種類
        </option>
        <option value="type1">運動酒吧</option>
        <option value="type2">音樂酒吧</option>
        <option value="type3">異國酒吧</option>
        <option value="type4">特色酒吧</option>
        <option value="type5">其他酒吧</option>
      </select>
    </>
  );
}
