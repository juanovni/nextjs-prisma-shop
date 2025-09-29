'use client';

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components"
import { Product, Size } from "@/interfaces";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [sizeSelected, setSizeSelected] = useState<Size | undefined>();
  const [quantitySelected, setQuantitySelected] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);

    if (!sizeSelected) return;

  }
  return (
    <>
      {posted && !sizeSelected && (
        <span className="mt-2 text-red-500 fade-in">
          Debe de seleccionar una talla*
        </span>
      )}

      {/* Selector de Tallas */}
      <SizeSelector
        onSizeChange={setSizeSelected}
        selectedSize={sizeSelected}
        availableSizes={product.sizes}
      />


      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantitySelected}
        onQuantityChange={setQuantitySelected}
      />


      {/* Button */}
      <button
        onClick={addToCart}
        className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  )
}
