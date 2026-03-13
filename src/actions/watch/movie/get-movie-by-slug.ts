'use server';

import { cacheTag } from 'next/cache';
import prisma from "@/lib/prisma";

export const getMovieBySlug = async (movieSlug: string) => {
  'use cache';
  cacheTag(`movie-${movieSlug}`);
  
  try {
    const movie = await prisma.movie.findFirst({
      where: { slug: movieSlug },
      include: { commentsWatch: true, contentReactions: true },
    });
    return { ok: true, data: movie };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener episodio' };
  }
};