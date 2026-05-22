import { prisma } from '@repo/db';

export async function markEventProcessed(eventId: string) {
  try {
    await prisma.processedEvent.create({
      data: { id: eventId },
    });

    return { inserted: true };
  } catch (e: any) {
    if (e.code === 'P2002') {
      return { inserted: false };
    }
    throw e;
  }
}
