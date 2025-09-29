import { redirect } from 'next/navigation';
import { Pagination, ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { getPaginatedProductsWithImages } from '@/actions/product/product-pagination';
import { Gender } from '@/generated/prisma';

interface Props {
  params: Promise<{
    gender: string;
  }>
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function GenderByIdPage({ params, searchParams }: Props) {
  const { gender } = await params;  // ✅ unwrap params
  const searchPage = (await searchParams).page;
  const page = searchPage ? parseInt(searchPage) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para ninos',
    'unisex': 'para todos',
  }
  return (
    <>
      <Title
        title={`Ropa - ${labels[gender as Category]}`}
        subtitle="Categorias"
        className="mb-2" />

      <ProductGrid products={products || []} />

      <Pagination totalPages={totalPages} />
    </>
  );
}