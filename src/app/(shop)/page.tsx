import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { ProductGrid, Title, Pagination } from "@/components";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect('/');
  }

  return (
    <>
      <Title title="Prueba" subtitle="Prueba subtitle" className="mb-2" />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
