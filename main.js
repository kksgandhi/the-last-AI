"use strict";
let delay = baseDelay;
// given a string passageName, get the appropriate passage
let getPassage = (passageName) => {
    if (passageName in passages)
        return passages[passageName];
    else {
        // error out if the passage doesn't exist
        alert("This passage doesn't lead anywhere");
        return passages[startingPassageTitle];
    }
};
// reverse search, given a passage, get its title
let getPassageTitle = (passage) => Object.keys(passages).find(key => passages[key] === passage);
let scrollToBottom = () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
// whether you are using typewriter passage rendering or not, the links are rendered in the same way through this function.
let renderLinksGeneric = (main, passage) => {
    var _a, _b, _c;
    // Check for an autolink
    let autoLinkTarget = (_a = passage.autoLink) === null || _a === void 0 ? void 0 : _a.call(passage);
    if (autoLinkTarget) {
        (_b = passage.onExit) === null || _b === void 0 ? void 0 : _b.call(passage);
        onAnyExit(passage);
        // if it exists, go there
        renderPassageGeneric(getPassage(autoLinkTarget));
    }
    else {
        // Autolink didn't exist or returned an empty string, let's render the links
        passage.links.forEach(link => {
            var _a;
            // render the link only if the link has no "showLink" hook or if the showLink hook passes
            if (!('showLink' in link) || link.showLink()) {
                let linkElem = document.createElement("a");
                linkElem.innerHTML = ((_a = link.dynamicText) === null || _a === void 0 ? void 0 : _a.call(link)) || link.text;
                // Set the onclick property to render the next passage
                linkElem.onclick = () => {
                    var _a, _b, _c;
                    // don't do anything if the link has been clicked in the past (or if the link was unclicked, but part of a group of links where another one was clicked)
                    if (linkElem.getAttribute("class") === "clicked")
                        return false;
                    if (linkElem.getAttribute("class") === "old-link")
                        return false;
                    else {
                        (_a = link.onLinkClick) === null || _a === void 0 ? void 0 : _a.call(link);
                        // set this link as clicked
                        linkElem.setAttribute("class", "clicked");
                        // either remove all the other unclicked links, or mark them as an old links
                        Array.from(document.getElementsByClassName("unclicked"))
                            .forEach(elem => {
                            if (clearOldLinks)
                                elem.remove();
                            else
                                elem.setAttribute("class", "old-link");
                        });
                        // run the onExit hooks
                        (_b = passage.onExit) === null || _b === void 0 ? void 0 : _b.call(passage);
                        onAnyExit(passage);
                        // render the passage this points to. Use the dynamicReference if it exists, or just the normal reference
                        renderPassageGeneric(getPassage(((_c = link.dynamicReference) === null || _c === void 0 ? void 0 : _c.call(link)) || link.passageTitle));
                        scrollToBottom();
                        return false;
                    }
                };
                // set as unclicked and append to the main flow
                linkElem.setAttribute("class", "unclicked");
                main.appendChild(linkElem);
                main.appendChild(document.createElement("br"));
                main.appendChild(document.createElement("br"));
                scrollToBottom();
            }
        });
    }
    // run links rendering hook
    (_c = passage.onLinkRender) === null || _c === void 0 ? void 0 : _c.call(passage);
    onAnyLinkRender(passage);
};
let sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
// rendering the passage without a typewriter effect
let renderPassageSimple = async (passage) => {
    var _a;
    let main = document.getElementById("main");
    // simple append of all the passages
    for (let idx in passage.utterances) {
        let utterance = passage.utterances[idx];
        // render the utterance only if the utterance has no "showUtterance" hook or if the showUtterance hook passes
        if (!('showUtterance' in utterance) || utterance.showUtterance()) {
            let utteranceElem = document.createElement("p");
            utteranceElem.setAttribute("class", `${utterance.speaker} fade-in`);
            // Use the dynamic text if it exists, else use the normal text
            utteranceElem.innerHTML = ((_a = utterance.dynamicText) === null || _a === void 0 ? void 0 : _a.call(utterance)) || utterance.text;
            main.appendChild(utteranceElem);
            // if the passage has additionalDelay, delay that much as well
            if ('additionalDelay' in utterance) {
                console.log("ADDITIONAL DELAY NO TYPEWRITER");
                await sleep(utterance.additionalDelay());
            }
        }
    }
    renderLinksGeneric(main, passage);
};
// render passage with a typewriter effect.
let renderPassageTypewriter = async (passage) => {
    var _a;
    let main = document.getElementById("main");
    // unfortunately we have to use for loops because the lambdas in map don't work easily with async
    // for every utterance...
    for (let idx in passage.utterances) {
        let utterance = passage.utterances[idx];
        // render the utterance only if the utterance has no "showUtterance" hook or if the showUtterance hook passes
        if (!('showUtterance' in utterance) || utterance.showUtterance()) {
            let utteranceElem = document.createElement("p");
            utteranceElem.setAttribute("class", utterance.speaker);
            main.appendChild(utteranceElem);
            // Use the dynamic text if it exists, else use the normal text
            let characters = ((_a = utterance.dynamicText) === null || _a === void 0 ? void 0 : _a.call(utterance)) || utterance.text;
            // if noTypewriter, just set it and move on.
            if (utterance.noTypewriter) {
                utteranceElem.innerHTML = characters;
                utteranceElem.setAttribute("class", `${utterance.speaker} fade-in`);
            }
            else
                // for every character index...
                for (let charidx = 0; charidx < characters.length; charidx++) {
                    // convert the innerHTML into the substring upto that index
                    utteranceElem.innerHTML = characters.slice(0, charidx + 1);
                    let character = characters[charidx];
                    // if the character was a comma wait a bit
                    if (character === ",")
                        await sleep(delayComma * delay);
                    // if the character was other punctuation, wait a bit longer
                    if (".:;!?-".split('').includes(character))
                        await sleep(delayPunctuation * delay);
                    scrollToBottom();
                    // wait between characters
                    await sleep(delay);
                }
            // wait between speakers
            await sleep(delay * delayBetweenSpeakers);
            // if the passage has additionalDelay, delay that much as well
            if ('additionalDelay' in utterance)
                await sleep(utterance.additionalDelay());
            scrollToBottom();
        }
    }
    // render the links
    renderLinksGeneric(main, passage);
};
// the entrypoint function for rendering any passage
let renderPassageGeneric = (passage) => {
    var _a;
    // run the hooks
    (_a = passage.onEnter) === null || _a === void 0 ? void 0 : _a.call(passage);
    onAnyEnter(passage);
    // render based on whether configuration asks for a typewriter effect or not
    if (doTypewriterEffect)
        renderPassageTypewriter(passage);
    else
        renderPassageSimple(passage);
};
// render the starting passage
renderPassageGeneric(passages[startingPassageTitle]);
// Ensure there are no typos, hanging passages etc.
let validatePassages = () => {
    let doAlertIf = (doAlert, alertMsg) => {
        if (!doAlert)
            return;
        else {
            if (debug)
                alert(`${alertMsg}
                       
To silence this message, set "debug = false" in configuration.js or add ignoreDebug to the link / passage referenced`);
            else
                console.warn(alertMsg);
        }
    };
    // all the titles except for 'empty'. Maybe this could be a configuration var, but it's fine for now
    let titlesNonEmpty = Object.keys(passages)
        .filter(title => title !== "empty");
    titlesNonEmpty
        .forEach(title => {
        // for each passage...
        let passage = passages[title];
        // and the linkReferences in the passage
        let linkReferences = passage.links
            .filter(link => !link.ignoreDebug)
            .map(link => link.passageTitle);
        // is each linkReference included in the list of titles?
        linkReferences.forEach(linkReference => doAlertIf(!titlesNonEmpty.includes(linkReference), `Passage with title "${title}" contains link that leads to "${linkReference}" which does not exist`));
    });
    // make a mega list of all link references
    let allLinkReferences = Object
        .values(passages)
        .map(passage => {
        let simpleLinks = passage.links.map(link => link.passageTitle);
        if (simpleLinks.length === 0 && 'autoLink' in passage)
            return passage.autoLink();
        else
            return simpleLinks;
    })
        // This is a list of lists, so let's flatten it
        .flat();
    let allLinksAndIntro = allLinkReferences.concat([startingPassageTitle]);
    // is every title accounted for in the list of all the references?
    titlesNonEmpty.forEach(title => doAlertIf(!(allLinksAndIntro.includes(title) || passages[title].ignoreDebug), `No way to get to passage with title "${title}"`));
};
validatePassages();
let textSpeedSlider = document.getElementById("textSpeedSlider");
let setDelayToSliderVal = () => {
    // Rather than a linear speed up or down, it'll feel better if it's a curve
    // https://www.desmos.com/calculator/ntlhlbmqiz
    let sliderVal = parseInt(textSpeedSlider.value);
    let piece1 = (x) => ((2 * baseDelay * (x ** 2)) / 250000) - (2 * baseDelay * x / 250) + 3 * baseDelay;
    let piece2 = (x) => ((-1 * baseDelay * (x ** 2)) / 250000) + (baseDelay * x / 250);
    // the curve is piecewise, and switches at 500 (halfway down the slider)
    let pieceOfPiecewiseFunctionToUse = sliderVal < 500 ? piece1 : piece2;
    delay = Math.round(pieceOfPiecewiseFunctionToUse(sliderVal));
};
textSpeedSlider.oninput = setDelayToSliderVal;
let colorSchemeChanger = document.getElementById("colorSchemeChanger");
let swapColorScheme = () => {
    let cssElement = document.getElementById("colorSchemeCSS");
    // what is the current theme, aka what css file is the main css pointing at?
    let curTheme = cssElement.getAttribute("href");
    // depending, decide on the new color changer icon and the new main css file
    let newTheme = curTheme === "solarized-dark.css" ? "solarized-light.css" : "solarized-dark.css";
    let newImg = curTheme === "solarized-dark.css" ? "imgs/moon-black.png" : "imgs/sun-warm.png";
    // Actually set the values
    cssElement.setAttribute("href", newTheme);
    colorSchemeChanger.setAttribute("src", newImg);
};
colorSchemeChanger.onclick = swapColorScheme;
if (defaultColorScheme === "light")
    swapColorScheme();
document.title = title;
let saveIcon = document.getElementById("saveIcon");
saveIcon.onclick = () => {
    downloadToFile(saveInfo, "last-AI-progress.txt", "text/plain");
    existsUnsavedInfo = false;
};
const downloadToFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
};
window.onbeforeunload = () => existsUnsavedInfo ? "Unsaved Information, please save" : null;
document.addEventListener('keydown', event => { if (event.key === " ")
    delay = 0; });
document.addEventListener('keyup', event => { if (event.key === " ")
    setDelayToSliderVal(); });
