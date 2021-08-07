import * as alt from 'alt';
import * as chat from 'chat';
import * as config from './config.mjs';

if (config.COMMAND_ENABLED) {
	chat.registerCmd(config.COMMAND_NAME, (player, arg) => {
		alt.emitClient(player, 'Clipboard:ToggleMenu');
	});
}