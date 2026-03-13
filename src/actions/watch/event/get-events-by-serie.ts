'use server';

import { cacheTag } from 'next/cache';
import prisma from "@/lib/prisma";

export const getEventsBySerie = async (serieId: string) => {
  'use cache';
  cacheTag(`events-${serieId}`);
  
  try {
    const events = await prisma.event.findMany({
      where: { serieId },
      orderBy: { createdAt: 'asc' },
    });
    return { ok: true, data: events };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener episodios' };
  }
};