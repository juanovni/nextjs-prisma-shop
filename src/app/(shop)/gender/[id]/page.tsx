
import React from 'react';
import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";

const products = initialData.products;


interface Props {
  params: Promise<{
    id: Category;
  }>
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;  // ✅ unwrap params

  if (!['men', 'women', 'kid', 'unisex'].includes(id)) {
    return <h1>Categoría no encontrada</h1>;
  }

  const productsByGender = products.filter(prod => prod.gender === id);

  const labels: Record<Category, string> = {
    'men': 'para hombres',
    'women': 'para mujeres',
    'kid': 'para ninos',
    'unisex': 'para todos',
  }
  return (
    <>
      <Title
        title={`Ropa - ${labels[id as Category]}`}
        subtitle="Categorias"
        className="mb-2" />

      <ProductGrid products={productsByGender || []} />
    </>
  );
}