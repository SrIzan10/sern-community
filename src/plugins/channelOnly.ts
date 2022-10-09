import { CommandType, EventPlugin, PluginType } from "@sern/handler";

export function channelOnly(
	channelIds: string[],
	onFail?: string
): EventPlugin<CommandType.Both> {
	return {
		type: PluginType.Event,
		description: "Runs the command only in certain channels",
		execute([ctx], controller) {
			if (!ctx.channel) throw new Error("Channel not found!");

			if (
				!channelIds.includes(ctx.channel.id) &&
				ctx.channel.isThread() &&
				!channelIds.includes(ctx.channel.parentId!)
			) {
				onFail ? ctx.reply({ content: onFail, ephemeral: true }) : null;
				return controller.stop();
			}

			return controller.next();
		},
	};
}
