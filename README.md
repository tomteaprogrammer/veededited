VEED: Customized Transitions Hider

This Chrome extension automatically removes selected transition cards from the VEED editor. It is useful when you do not want to see certain built-in transitions in the list. The extension runs on page load and also watches for VEED re-renders, so the removed transitions stay hidden. 

manifest

What it does

Detects transition cards in the VEED editor

Compares each card’s name to an internal block list

Removes any transition whose name is on that list

Keeps watching the page so the removed transitions do not come back when VEED re-renders the panel
