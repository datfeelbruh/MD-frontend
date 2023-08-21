import usePopularTitleRequest from "@api/movie/popularMovieRequest";
import { useEffect } from "preact/hooks";
import { toast } from "react-toastify";
import Loading from "./Loading";
import Error from "./Error";
import FoldedMovieCard from "@components/movieCards/FoldedMovieCard";

export default function Home() {
  return (
    <div>
      <Header />
      <PopularMovies />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div>
      <p class="text-2xl text-center">MovieDiary - Это в первую очередь коммьюнити.</p>
      <p class="text-sm text-nord3 -mt-1 text-center">А во вторую - 3 душных фильма подряд.</p>
    </div>
  );
}

function PopularMovies() {
  const { call, response, isLoading, isError } = usePopularTitleRequest(() => { }, error => toast.error(error.message));

  useEffect(() => isLoading && call(), [isLoading]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div class="flex flex-row flex-wrap justify-center">
      {response.success.map(r => <FoldedMovieCard {...r} />)}
    </div>
  );
}

function Footer() {
  return (
    <div class="flex flex-row w-full fixed bottom-0 left-0 bg-nord-1 justify-center p-1">
      { /* u can ask what a hell is that, simple answer: thats a SPA problem... i can't update page so swagger does not appear */}
      <a class="basis-1/3 flex justify-center hover:underline" onClick={() => window.location.replace("/swagger-ui/index.html")}>api docs</a>
      <a class="basis-1/3 flex justify-center hover:underline after:content-['datfeelbruh/movieDiary'] hover:after:content-['backend']" href="https://github.com/datfeelbruh/moviesDiary" />
      <a class="basis-1/3 flex justify-center hover:underline after:content-['antarktidi4/MD-frontend'] hover:after:content-['frontend']" href="https://github.com/antarktidi4/MD-frontend" />
    </div>
  );
}
