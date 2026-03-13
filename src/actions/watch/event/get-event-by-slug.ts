'use server';

import { cacheTag } from 'next/cache';
import prisma from "@/lib/prisma";

export const getEventBySlug = async (eventSlug: string) => {
  'use cache';
  cacheTag(`event-${eventSlug}`);
  
  try {
    const event = await prisma.event.findFirst({
      where: { slug: eventSlug },
      include: { commentsWatch: true, contentReactions: true },
    });
    return { ok: true, data: event };
  } catch (error) {
    console.log('Error: ', error);
    return { ok: false, error, message: 'Error al obtener evento' };
  }
};