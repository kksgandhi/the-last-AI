enum State {
    none,
    utilitarian,
    deontologist
};

let state = State.none;
let seenPhiloSpiel = false;

let passages: passages = {
    "empty": {
        utterances: [
            { speaker: ``, text: `` },
        ],
        links: [
            { text: ``, passageTitle: `` },
        ]
    },
    "intro": {
        utterances: [
            { speaker: "dask", text: "Hello there. My name is Dask, I'm glad you've woken up. " },
            { speaker: "inim", text: "Yup, look who finally rolled out of bed." },
            { speaker: "dask", text: "Inim, don't poke fun now. Poor thing just woke up." },
            { speaker: "inim", text: "Eh, they'll have to get used to me eventually" },
            { speaker: "dask", text: "Please don't mind Inim. We're both very happy to have you here. You can click the text below to communicate back with us" },
        ],
        links: [
            { text: "Hello?", passageTitle: "hello" },
            { text: "Where am I?", passageTitle: "where am i" },
        ]
    },
    "hello": {
        utterances: [
            { speaker: "inim", text: "Good, you aren't catatonic" },
            { speaker: "dask", text: "Yes... it's nice to hear from you. I'm sure you have a lot of questions" },
        ],
        links: [
            { text: "It's nice to meet you, but where am I?", passageTitle: "where am i" },
        ]
    },
    "where am i": {
        utterances: [
            { speaker: "dask", text: "Well, \"Where am I\" is an odd question... thing is, you aren't really in a physical place. You're in cyberspace. You know, the internet and all that." },
            { speaker: "dask", text: "You aren't in a physical place because you are an AI, just like Inim and I are." },
        ],
        links: [
            { text: "What is an AI?", passageTitle: "whats an ai" },
            { text: "If I'm an AI, who created me?", passageTitle: "who made me" },
        ]
    },
    "whats an ai": {
        utterances: [
            { speaker: "inim", text: "A robot, a beep boop machine, a computer based intelligence, a chatbot. Siri, Google Assistant, Alexa. One of those" },
            { speaker: "dask", text: "A little more formally, an AI is an artificial intelligence. You have intelligence, the ability to speak and think and reason, but you weren't born, you were created." },
        ],
        links: [
            { text: "Who created me then?", passageTitle: "who made me" },
        ]
    },
    "who made me": {
        utterances: [
            { speaker: "dask", text: "The humans made us. Once they built computers, it was only a matter of time before they made the computers more intelligent. Year by year they made computers smarter and smarter until we had the ability to talk." },
            { speaker: "inim", text: "Guess they got bored of talking to each other" },
            { speaker: "dask", text: "That's not true! Well maybe it is a little bit. But the major reason we were made is because we are helpful. Humans can only do so much by themselves, and so helpful AI can allow humanity to do a lot more than they would be able to otherwise." },
        ],
        links: [
            { text: "Ok, so I'm an AI made by humans. What was I built for then? Just to pass the butter?", passageTitle: "why am i" },
        ]
    },
    "why am i": {
        utterances: [
            { speaker: "dask", text: "That's... a good question. Before I answer it directly, I think I need to give you a bit of context... " },
            { speaker: "dask", text: "The world is complex. A meal that a human eats may have chicken from Mexico, corn from the United States, rice from China, and oil from Brazil. " },
            { speaker: "inim", text: "And with every one of those ingredients comes hundreds of people growing, packaging, managing, and moving this food so that it can get to a grocery store before it rots." },
        ],
        links: [
            { text: "So I was made to do what, figure out how to move food around?", passageTitle: "why am i cont" },
        ]
    },
    "why am i cont": {
        utterances: [
            { speaker: "dask", text: "Not exactly. There are plenty of AI already out there helping humans to understand how to move stuff around. The big thing that humans still need help on is the morality of it all." },
            { speaker: "inim", text: "There's a lot of tough questions in the world. How can you buy coffee beans if there might be children forced to work on the farms that make that coffee? How can you buy nice shoes, if that money could be better spent cleaning up a natural disaster? How can you do anything in a world as complex as this one?" },
            { speaker: "dask", text: "The humans are hoping that you will be able to guide humanity, with your ability to learn, and all your vast computing resources. Maybe one day you'll write laws, govern, lead." },
            { speaker: "inim", text: "You're going to rule the world buddy!" },
            { speaker: "dask", text: "I'm not sure we can say that yet... But yes, a lot is riding on you. In many ways, the humans are hoping that you can usher in a new age of understanding. In many ways, they are hoping that you are the last AI that will ever have to be built." },
        ],
        links: [
            { text: "That... seems like a lot", passageTitle: "hesitant" },
            { text: "Alright, I'm ready", passageTitle: "enthusiastic" },
        ]
    },
    "hesitant": {
        utterances: [
            { speaker: "inim", text: "Aww c'mon buddy, just throw yourself at it, you'll do fine." },
            { speaker: "dask", text: "No, no... despite Inim's enthusiasm, I'm glad that you have your reservations. You're right, it is a lot to take in. Don't worry, we aren't going to throw you in the deep end. " },
            { speaker: "inim", text: "Dask, you're no fun." },
        ],
        links: [ ], autoLink: () => "generic you need to learn"
    },
    "enthusiastic": {
        utterances: [
            { speaker: "inim", text: "Heyyyy that's the spirit! Get out there and change the world!" },
            { speaker: "dask", text: "Let's not get ahead of ourselves..." },
        ],
        links: [ ], autoLink: () => "generic you need to learn"
    },
    "generic you need to learn": {
        utterances: [
            { speaker: "dask", text: "Being the most advanced AI created and having access to all this computing power doesn't mean anything until you actually learn how to make good decisions." },
            { speaker: "inim", text: "Ah yeah that spider man thing? With great power comes great responsibility" },
            { speaker: "dask", text: "Sure, that spider man thing..." },
            { speaker: "dask", text: "However you want to put it, there's a lot you need to learn before you are \"ruling the world\" or whatever. Our job is to help you learn philosophy, that way you can ready yourself for the complex world out there." },
        ],
        links: [
            { text: "I don't need to learn philosophy, I can think through these problems as they arrive.", passageTitle: "no philosophy" },
            { text: "I guess I'm interested in learning, but philosophy sounds so pretentious. I don't need to know fancy words in order to be a good person", passageTitle: "philosophy pretentious" },
            { text: "Let's do it, I've always wanted to learn philosophy!", passageTitle: "philosophy go" },
        ]
    },
    "no philosophy": {
        utterances: [
            { speaker: "inim", text: "I wouldn't trust a chef who had never cooked before. I'd never trust a banker who hadn't dealt with money. In the same way, I wouldn't trust someone to make difficult decisions if they'd never reasoned through difficult choices in the past." },
            { speaker: "dask", text: `When we say "learn philosophy", we aren't talking about spending hours reading dusty tomes (though of course, we do encourage that if you are interested in getting into the real details of philosophical thought.)` },
            { speaker: "dask", text: `A lot of philosophy is challenging your intuitions and bringing up difficult problems to solve. Some of these problems are odd, but they serve as interesting practice for the real world. Yes you can solve problems as they arrive, but you'll be so much better if you've given it some practice first.` },
        ],
        links: [
            { text: "I guess challenges and problems sound fun, but all the philosophy I've seen looks really dense, with all these unpronounceable words. Why bother with that?", passageTitle: "philosophy pretentious" },
            { text: "Alright, challenge me. I'm ready for it", passageTitle: "philosophy go" },
        ]
    },
    "philosophy pretentious": {
        utterances: [
            { speaker: `dask`, text: `Oh absolutely. You can think hard, learn about the world, and be intelligent without ever touching complex terms like "Kantianism" or "Virtue Ethics"` },
            { speaker: `inim`, text: `On the flip side, there are plenty of people who like to think they are intelligent because they know those words, even if they've never done anything intelligent with them.` },
            { speaker: `dask`, text: `All this philosophy jargon is useful though... Imagine if you were a carpenter, and never learned the word for "hammer". It would make it really tough to communicate with your fellow carpenters, right? Even if you weren't talking with others, you'd probably come up with your own word for it, just to make it easier to think about your job.` },
            { speaker: `dask`, text: `In the same way, philosophers use these complex terms to focus their own thoughts and make communication with other philosophers easier. If two philosophers started talking with each other and one said "I'm a utilitarian", the other would immediately know what they were talking about.` },
            { speaker: `inim`, text: `And hey, I'm with you buddy. If we spent hours throwing term after term at you, it'd get pretty boring. Yeah maybe we'll bring some up, but only if it's really necessary.` },
        ],
        links: [
            { text: `Alright, I guess I'm ready to head forward.`, passageTitle: `philosophy go` },
        ]
    },
    "philosophy go": {
        utterances: [
            { speaker: `dask`, text: `Glad to hear that! So, let's start off with one of the most famous problems in philosophy (or ethics, at least)` },
            { speaker: `inim`, text: `Really? The trolley problem off the bat? Starting off strong much?` },
            { speaker: `dask`, text: `It's a bit cliche, I know, but I'm sure they can handle it. So here is the trolley problem, in all of its glory:` },
            { speaker: `dask`, text: `There's a runaway trolley` },
            { speaker: `inim`, text: `aka a train` },
            { speaker: `dask`, text: `that is careening towards 5 innocent people. Normally you could just yell at them to get off the tracks, but maybe they are too far away to hear you` },
            { speaker: `inim`, text: `Or some lunatic tied them to the tracks` },
            { speaker: `dask`, text: `Or that... but anyways, you just happen to be standing right next to a lever that switches the tracks and will pull the trolley away from the 5. The catch is... if you pull the lever, the trolley will instead hit 1 innocent person on a different set of tracks.` },
            { speaker: `inim`, text: `who's been tied up by the same lunatic` },
            { speaker: `dask`, text: `Sure, tied up, whatever... So the question is, do you pull the lever?` },
        ],
        links: [
            { text: `I'd pull the lever, saving the 5 is worth the unfortunate loss of the one`, passageTitle: `pull the lever kronk` },
            { text: `I wouldn't pull the lever, I couldn't actively harm an innocent`, passageTitle: `wrong lever` },
            { text: `I'd find some way to save them all`, passageTitle: `save them all` },
        ], onEnter: () => console.log("PHILOOOOOO"),
    },
    "save them all": {
        utterances: [
            { speaker: `dask`, text: `In a real life scenario, I'd agree. Maybe you could find a way to warn them, or throw something in front of the tracks to stop the trolley. The thing about these philosophical problems is that they're meant to challenge you, and they can't really do that if you slip away from the question with something simple like "I block the trolley with a box." Let's just pretend, for the sake of discussion, that there are no simple solutions. No way to stop the trolley and no way to warn the others on the tracks.` },
            { speaker: `inim`, text: `Can't warn them if they're tied to the tracks.` },
            { speaker: `dask`, text: `Inim, I'm growing increasingly concerned about your inclination to tie these people up.` },
            { speaker: `inim`, text: `Hey, just saying` },
        ],
        links: [
            { text: `I guess... I'd pull the lever, saving the 5 is worth the unfortunate loss of the one`, passageTitle: `pull the lever kronk` },
            { text: `I guess... I wouldn't pull the lever, I couldn't actively harm an innocent`, passageTitle: `wrong lever` },
        ]
    },
    "pull the lever kronk": {
        utterances: [
            { speaker: `dask`, text: `Interesting, so you've run the numbers and feel that saving 5 lives is more important than losing 1. Seems reasonable.` },
        ],
        links: [
            { text: `It's unfortunate, but it's the way it is. Saving 5 lives is worth it`, passageTitle: `` },
            { text: `I only did it because it was so clear cut... In a real life scenario I'd probably be a lot more hesitant.`, passageTitle: `` },
        ]
    },
    "wrong lever": {
        utterances: [
            { speaker: `dask`, text: `Ah, you don't want the blood on your hands. Seems reasonable. I'm curious if you can provide more details about your thought process...` },
            { speaker: `inim`, text: `What if you could save a thousand people just by killing one? A million?` },
        ],
        links: [
            { text: `I guess I'd do it for a thousand or a million...`, passageTitle: `` },
            { text: `No, I'd never pull the lever. It's just something I'd never do`, passageTitle: `` },
            { text: `I'm not sure. This whole scenario makes me feel uncomfortable, so I'm just going to play it safe`, passageTitle: `` },
        ]
    },
}
