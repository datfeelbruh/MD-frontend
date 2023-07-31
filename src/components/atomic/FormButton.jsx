import LoadingSvg from "./LoadingSpin";

export default function FormButton({ text, isLoading = false, type = "submit", ...props }) {
  return (
    <button
      {...props}
      className={`w-full rounded bg-nord2 p-1 placeholder:text-nord9 ${!isLoading && "hover:bg-nord3"} flex items-center`}
      type={type}
      disabled={isLoading}
    >
    <div class="flex mx-auto text-nord6">
      {isLoading && <LoadingSvg size={17} />}{text}
    </div> 
    </button>
  );
}