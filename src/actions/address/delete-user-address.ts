'use server';

import { prisma } from "@/lib/prisma"

export const deleteUserAddress = async (userId: string) => {

  try {
    const deleteAddress = await prisma.userAddress.deleteMany({ where: { userId } });

    if (deleteAddress) {
      return {
        'ok': true
      }
    }
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo eliminar la direccion'
    }
  }

}