'use client';

import { useState } from "react";
import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store/cart/cart-store";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore(state => state.addProductTocart);
  const [sizeSelected, setSizeSelected] = useState<Size | undefined>();
  const [quantitySelected, setQuantitySelected] = useState<number>(1);
  const [posted, setPosted] = useState(false);


  const addToCart = () => {
    setPosted(true);

    if (!sizeSelected) return;
    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantitySelected,
      size: sizeSelected,
      image: product.images[0]
    }

    //Guardar los datos con zustand
    addProductToCart(cartProduct);

    setPosted(false);
    setQuantitySelected(1);
    setSizeSelected(undefined);
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
