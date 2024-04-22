import { useDate } from '@/context/date-context';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import {
  DATE_GET_MOVIE_TYPE,
  DATE_EDIT_MOVIE_TYPE,
} from '@/components/config/api-path';

export default function SelectMovieModal() {
  // // 來自資料庫
  // const mockMovies = [
  //   { movie_type_id: 1, movie_type: '動作片' },
  //   { movie_type_id: 2, movie_type: '喜劇片' },
  //   { movie_type_id: 3, movie_type: '愛情片' },
  //   { movie_type_id: 4, movie_type: '恐怖片' },
  //   { movie_type_id: 5, movie_type: '科幻片' },
  // ];

  const { toggleMovie, setToggleMovie } = useDate();
  const { auth, getAuthHeader } = useAuth();

  const [type, setType] = useState([]);
  const [selectMovie, setSelectedMovie] = useState(null); // 用來記錄用戶的選項

  const getType = async () => {
    const url = `${DATE_GET_MOVIE_TYPE}`;

    try {
      const res = await fetch(url);
      console.log(res);
      const data = await res.json();
      console.log(data);

      if (Array.isArray(data.data)) {
        setType(data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getType();
  }, []);

  const handleTypeChange = (event, movie) => {
    setSelectedMovie(movie); //更新用戶選項，但不更新 toggleMovie
  };

  const handleSubmit = async () => {
    try {
      if (selectMovie) {
        // 如果用戶有選擇選項，則更新 toggleMovie
        setToggleMovie({
          id: selectMovie.movie_type_id,
          name: selectMovie.movie_type,
        });

        const sid = auth.id;
        const urlEdit = `${DATE_EDIT_MOVIE_TYPE}/${sid}`;

        const response = await fetch(urlEdit, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader(),
          },
          body: JSON.stringify({
            movie_type: selectMovie.movie_type,
          }),
        });
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div>
      {/* The button to open modal */}
      <label
        htmlFor="my_modal_10"
        className="min-h-[35px] h-[35px] w-[150px] py-1 my-2 flex items-center justify-center text-black font-bold border-2 rounded-full btn-primary bg-primary border-primary hover:shadow-xl3 cursor-pointer "
      >
        選擇電影
      </label>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_10" className="modal-toggle" />
      <div className="modal " role="dialog">
        <div className="modal-box flex flex-col h-[580px] w-[350px] gap-4 p-10">
          <p>選擇一種喜歡的電影類型</p>

          {type.map((movie) => (
            <div className="form-control" key={movie.movie_type_id}>
              <label className="label cursor-pointer">
                <span className="label-text">{movie.movie_type}</span>

                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-neongreen"
                  value={movie.movie_type_id}
                  onChange={(e) => handleTypeChange(e, movie)}
                />
              </label>
            </div>
          ))}
          <label
            className="btn min-h-[30px] h-[30px] w-[250px] border-2 border-primary rounded-full text-primary mt-5"
            htmlFor="my_modal_10"
            onClick={handleSubmit}
          >
            確認
          </label>
        </div>
      </div>
    </div>
  );
}
