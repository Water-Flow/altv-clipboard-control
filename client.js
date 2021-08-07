/// <reference types="@altv/types-client" />

import * as alt from 'alt-client';
import * as NativeUI from './includes/NativeUI/NativeUI';
import * as config from './config.mjs';

const webView = new alt.WebView('http://resource/index.html', false);
var menuOpen = false;

const menu = new NativeUI.Menu('AltV-Clipboard', '', new NativeUI.Point(50, 50));
menu.GetTitle().Scale = 0.8;
menu.GetTitle().DropShadow = true;
menu.GetTitle().Font = NativeUI.Font.ChaletLondon;
let items = ['X', 'Y', 'Z', 'Yaw', 'Pitch', 'Roll'];
for (var i=0; i<items.length; i++) { menu.AddItem(new NativeUI.UIMenuItem(items[i])); }

alt.onServer('Clipboard:ToggleMenu', () => toggleMenu());
alt.onServer('Clipboard:CopyText', text => webView.emit('Copy', text));
alt.on('keyup', (key) => {
    if (!config.KEY_ENABLED || key !== config.KEY_CODE) return;
    toggleMenu();
});

function toggleMenu() {
    if (menuOpen)
        menu.Close();
    else
        menu.Open();
    
    menuOpen = !menuOpen;
}

menu.ItemSelect.on((item, selectedItemIndex) => {
	if (!(item instanceof NativeUI.UIMenuItem)) return;
	
    var pos = alt.Player.local.pos;
    webView.focus();
    switch (item.Text) {
        case 'X':
            webView.emit('Copy', pos.x.toString());
            break;
        case 'Y':
            webView.emit('Copy', pos.y.toString());
            break;
        case 'Z':
            webView.emit('Copy', pos.z.toString());
            break;
    }
});
