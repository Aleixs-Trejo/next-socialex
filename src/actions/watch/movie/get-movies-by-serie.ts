'use server';

import { cacheTag } from 'next/cache';
import prisma from "@/lib/prisma";

export const getMoviesBySerie = async (serieId: string) => {
  'use cache';
  cacheTag(`movies-${serieId}`);
  
  try {
    const movies = await prisma.movie.findMany({
      where: { serieId },
      orderBy: { createdAt: 'asc' },
    });
    return { ok: true, data: movies };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener episodios' };
  }
};