import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

interface SubscribeToEventParams {
	name: string;
	email: string;
	referrerId?: string | null;
}

export async function subscribeToEvent({
	name,
	email,
	referrerId,
}: SubscribeToEventParams) {
	const subscribers = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.email, email));

	//se esse select retornar alguma inscrição, faz de conta que inscreveu ele dnv e retorna o ID dele
	if (subscribers.length > 0) {
		return { subscriberId: subscribers[0].id };
	}

	//insert retorna um array
	const result = await db
		.insert(subscriptions)
		.values({
			name,
			email,
		})
		.returning();

	if (referrerId) {
		await redis.zincrby("referral:ranking", 1, referrerId); //aumentando 1 no rank do usuário que
	}

	const subscriber = result[0];

	return { subscriberId: subscriber.id };
}
