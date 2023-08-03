export default function({ placeholder, register, registerName = null, ...props }) {
  return (
    <input
      {...props}
      class="p-1 mb-1 w-full rounded bg-nord2 placeholder:text-nord9 hover:bg-nord3 focus:bg-nord3 focus:outline-none text-nord6"
      placeholder={placeholder}
      {...register(registerName !== null ? registerName : placeholder)}
    />
  );
}
