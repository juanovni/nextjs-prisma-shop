'use client';

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [sizeSelected, setSizeSelected] = useState<Size | undefined>();

  return (
    <>
      {/* Selector de Tallas */}
      <SizeSelector
        onSizeChange={setSizeSelected}
        selectedSize={sizeSelected}
        availableSizes={product.sizes}
      />


      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={2}
      />


      {/* Button */}
      <button className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  )
}
