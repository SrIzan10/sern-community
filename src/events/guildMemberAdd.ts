import { eventModule, EventType } from "@sern/handler";
import type { GuildMember } from "discord.js";

export default eventModule({
	type: EventType.Discord,
	name: "guildMemberAdd",
	async execute(member: GuildMember) {
		// TODO: This should be inferred
		if (member.pending) return;
		const requiredRoles = ["980118655738212407"];
		await member.roles.add(requiredRoles);
	},
});
