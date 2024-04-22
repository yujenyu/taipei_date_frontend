import Search from '../input/search';
import BarTypeSelect from '../input/bar-type-select';

export default function BarListDropdownMobile() {
  return (
    <>
      <div className="dropdown dropdown-end md:hidden">
        <div tabIndex={0} role="button" className="btn m-1">
          進階搜尋
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu bg-base-100 p-2 w-[290px] gap-4 rounded-xl"
        >
          <li>
            <Search />
          </li>
          <li>
            <select className="select select-bordered rounded-xl border-white bg-transparent hover:border-[#A0FF1F] text-white">
              <option disabled selected>
                酒吧區域
              </option>
              <option value="area1">松山區</option>
              <option value="area2">信義區</option>
              <option value="area3">大安區</option>
              <option value="area4">中山區</option>
              <option value="area5">中正區</option>
              <option value="area6">大同區</option>
              <option value="area7">萬華區</option>
              <option value="area8">文山區</option>
              <option value="area9">南港區</option>
              <option value="area10">內湖區</option>
              <option value="area11">士林區</option>
              <option value="area12">北投區</option>
            </select>
          </li>
          <li>
            <BarTypeSelect />
          </li>
        </ul>
      </div>
    </>
  );
}
