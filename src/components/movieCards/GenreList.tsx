interface Genre {
  name: string;
}

interface GenreListProps {
  genres: Array<Genre>;
}

export default function GenreList({ genres }: GenreListProps) {
  return (
    <div class="flex flex-row flex-wrap gap-1">
      {genres.map((g, i) => <Genre name={g.name} id={i} />)}
    </div>
  );
}

// won't work with several movies on a page
// i think, tbh idk Jokerge
// (i mean keys, idk how it work, like 
// if they "global" in DOM that wouldn't work
// as a something that will boost efficiency)
interface GenreProps extends Genre {
  id: number;
}

function Genre({ name, id }: GenreProps) {
  return (
    <a class="p-0.5 pb-1 px-2 rounded bg-nord2 hover:bg-nord3 hover:cursor-default shadow-sm" href={`/genre/${name}`} key={id}>
      {name}
    </a>
  );
}
