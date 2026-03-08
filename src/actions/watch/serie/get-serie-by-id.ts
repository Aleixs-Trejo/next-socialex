'use server';

import prisma from "@/lib/prisma";

export const getSerieById = async (serieId: string) => {
  try {
    const serie = await prisma.serie.findUnique({
      where: { id: serieId },
      include: {
        seasons: {
          include: {
            episodes: true,
          }
        }
      },
    });
    return { ok: true, message: 'Series obtenidas correctamente', data: serie }
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al obtener series' }
  }
};