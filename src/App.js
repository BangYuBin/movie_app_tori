import React from "react";
import axios from "axios";
import Movie from "./Movie";
import "./App.css";

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    this.setState({ movies, isLoading: false });
  };
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      // Loading이 끝나면 Movie컴포넌트로 받아온 필요한 정보를 넘겨주고 렌더한다.
      /* map함수는 배열을 대상으로 요소 하나하나에 접근하면서 요소에 대해 무언가 처리를 해줌
        movie데이터를 저장해놓은 movies요소 하나하나에 접근해서 접근한 요소 하나를 movie(매개변수)로 처리
        map함수는 return을 무조건 해줘야함
        즉 map함수를 통해 영화 하나하나 접근해서 Movie컴포넌트로 데이터를 전달, 렌더링 함 */
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">"Loading..."</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => {
              return (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default App;
