export default function Paginator({ page, setPage, maxPage }) {
  return (
    <div class="flex flex-row mb-2">
      <PaginatorButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        &#60;
      </PaginatorButton>
      <div class="w-2/12 text-center">
        {page}/{maxPage}
      </div>
      <PaginatorButton onClick={() => setPage(page + 1)} disabled={page >= maxPage}>
        &#62;
      </PaginatorButton>
    </div>
  );
}

function PaginatorButton({ children, onClick, disabled }) {
  return (
    <button
      className={`rounded ${disabled ? "bg-nord0 text-nord1" : "bg-nord1 hover:bg-nord2"} w-5/12 shadow-sm`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
