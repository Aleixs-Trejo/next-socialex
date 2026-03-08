'use server';

import prisma from "@/lib/prisma";

export const getAllSeries = async () => {
  try {
    const series = await prisma.serie.findMany({ orderBy: { createdAt: 'desc' } });
    return { ok: true, message: 'Series obtenidas correctamente', data: series }
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al obtener series' }
  }
};