'use server';

import prisma from "@/lib/prisma";

export const getEpisodesBySeason = async (serieId: string, seasonNumber: number) => {
  try {
    const episodes = await prisma.episode.findMany({
      where: {
        season: {
          serieId,
          seasonNumber
        }
      },
      orderBy: {
        episodeNumber: 'asc'
      }
    });
    return { ok: true, message: 'Episodios obtenidos correctamente', data: episodes }
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, message: 'Error al obtener episodios' }
  }
};