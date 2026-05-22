import { prisma } from '@repo/db';

export async function markEventProcessed(eventId: string) {
  try {
    await prisma.processedEvent.create({
      data: { id: eventId },
    });
    return true;
  } catch {
    return false;
  }
}
