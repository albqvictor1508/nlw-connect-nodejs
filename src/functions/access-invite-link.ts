import { redis } from "../redis/client";

interface AcessInviteLinkParams {
	subscriberId: string;
}

export async function acessInviteLink({ subscriberId }: AcessInviteLinkParams) {
	await redis.hincrby("referral:access-count", subscriberId, 1);
}

/*
REDIS - Tipos de dados: 

chave / valor

lists = []

hashes = {}

sorted sets = [] -> funcionam como as lists, mas com ordenação baseada em um valor, pode ser usado pra likes em comentários, em indicações para eventos, como no nosso caso, e pra diversas utilidades


*/
