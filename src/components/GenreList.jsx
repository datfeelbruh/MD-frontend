export default function GenreList({ genres }) {
  return (
    <div class="flex flex-row flex-wrap gap-1">
      {genres.map(g => <Genre name={g.name} />)}
    </div>
  );
}

function Genre({ name }) {
  return (
    <a class="p-0.5 px-2 rounded bg-nord2 hover:bg-nord3 hover:cursor-default shadow-sm" href={`/genre/${name}`}>
      {name}
    </a>
  )
}
