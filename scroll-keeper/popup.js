async function executeScriptOnActiveTab(scriptFunction) {
    try {
        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        await browser.tabs.executeScript(tabs[0].id, { code: `(${scriptFunction.toString()})()` });
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

document.getElementById("save").addEventListener("click", () => executeScriptOnActiveTab(saveScrollPosition));
document.getElementById("restore").addEventListener("click", () => executeScriptOnActiveTab(restoreScrollPosition));

function saveScrollPosition() {
    localStorage.setItem('scrollPos', window.scrollY);
    alert("Scroll position saved!");
}

function restoreScrollPosition() {
    const scrollPos = localStorage.getItem('scrollPos');
    if (scrollPos !== null) {
        window.scrollTo(0, parseInt(scrollPos, 10));
    } else {
        alert("No scroll position saved!");
    }
}