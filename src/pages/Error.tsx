interface ErrorProps {
  message?: string;
}

export default function Error({ message = "Something went wrong..." }: ErrorProps) {
  return (
    <div class="mx-auto">
      {message}
    </div>
  );
};
