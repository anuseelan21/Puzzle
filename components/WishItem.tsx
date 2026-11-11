import Image from "next/image";
import Link from "next/link";
import { sanitize } from "@/lib/sanitize";

type WishItemProps = {
  rowNumber: number;
  title: string;
  price: number;
  image: string;
  slug: string;
  stockAvailabillity: number;
};

const WishItem = ({
  rowNumber,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
}: WishItemProps) => {
  const imageSrc = image
    ? image.startsWith("/") || image.startsWith("http")
      ? image
      : `/${image}`
    : "/product_placeholder.jpg";

  return (
    <tr>
      <th scope="row">{rowNumber}</th>
      <td>
        <Image
          src={imageSrc}
          alt={sanitize(title)}
          width={64}
          height={64}
          className="mx-auto h-16 w-16 rounded object-cover"
        />
      </td>
      <td>
        <Link href={`/product/${slug}`} className="font-semibold hover:underline">
          {sanitize(title)}
        </Link>
        <p>£{price.toFixed(2)}</p>
      </td>
      <td>{stockAvailabillity ? "In stock" : "Out of stock"}</td>
      <td>
        <Link
          href={`/product/${slug}`}
          className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          View puzzle
        </Link>
      </td>
    </tr>
  );
};

export default WishItem;
