export default function Home() {
  return (
    <div>
      <p class="text-2xl">MovieDiary - Это в первую очередь коммьюнити.</p>
      <p class="mb-3 text-sm text-nord3">А во вторую - 3 душных фильма подряд.</p>
      <p>бэкэнд - <Link>https://github.com/datfeelbruh/moviesDiary</Link></p>
      <p>фронтэнд - <Link>https://github.com/antarktidi4/MD-frontend</Link></p>
    </div>
  );
}

function Link({children}) {
  return (
    <a class="hover:underline" href={children}>
      {children}
    </a>
  );
}