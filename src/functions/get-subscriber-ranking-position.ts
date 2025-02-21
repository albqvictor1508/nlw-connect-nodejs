import { redis } from "../redis/client";

interface GetSubscriberRankingPositionParams {
	subscriberId: string;
}

export async function getSubscriberRankingPosition({
	subscriberId,
}: GetSubscriberRankingPositionParams) {
	const rank = await redis.zrevrank("referral:ranking", subscriberId);

	//nunca pontuou, pra n colocar dentro do ranking quem pontuou zero
	if (rank === null) {
		return { position: null };
	}

	return { position: rank + 1 };
}
