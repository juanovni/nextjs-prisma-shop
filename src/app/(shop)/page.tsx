import { redirect } from "next/navigation";
import { getPaginatedProductsWithImages } from "@/actions/product/get-product-pagination";
import { ProductGrid, Title, Pagination } from "@/components";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function Home({ searchParams }: Props) {
  const searchPage = await searchParams as string;
  const page = searchPage ? parseInt(searchPage) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

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
