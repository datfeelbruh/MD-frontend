interface CardProps {
  header?: string | JSX.Element;
  imageURL?: string;
  imageInfo?: string | JSX.Element;
  children: string | JSX.Element;
}

export default function Card({ header = null, imageURL = null, imageInfo = null, children }: CardProps) {
  return (
    <div class="flex flex-col mb-1 w-full break-words rounded shadow-sm text bg-nord1">
      {header &&
        <div class="flex flex-row w-full rounded-t shadow-sm ps-1 bg-nord2">
          {header}
        </div>
      }
      <div class="flex flex-row m-2">
        {imageURL &&
          <div class="flex flex-col w-2/12 me-2">
            <img class="w-full rounded shadow-sm" src={imageURL} />
            {imageInfo &&
              <div class="mt-1 h-full">
                {imageInfo}
              </div>
            }
          </div>
        }
        <div class="-mt-1 w-10/12 break-words">
          {children}
        </div>
      </div>
    </div>
  );
}
