enum State {
    none,
    utilitarian,
    deontologist,
        hesitant,
};

let state = State.none;
let seenPhiloSpiel = false;
let pulledLever = false;
let seenDDE = false;

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
            { speaker: "dask", text: "I'm not sure we can say that yet... But yes, a lot is riding on you. In many ways, the humans are hoping that you can usher in a new age of understanding. In many ways, they are hoping that you are the last AI that will ever have to be built..." },
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
        ],
    },
    "save them all": {
        utterances: [
            { speaker: `dask`, text: `In a real life scenario, I'd agree. Maybe you could find a way to warn them, or throw something in front of the tracks to stop the trolley. The thing about these philosophical problems is that they're meant to challenge you, and they can't really do that if you slip away from the question with something simple like "I block the trolley with a box." Let's just pretend, for the sake of discussion, that there are no simple solutions. No way to stop the trolley and no way to warn the others on the tracks.` },
            { speaker: `inim`, text: `Can't warn them to get off the tracks if they're tied up.` },
            { speaker: `dask`, text: `Inim, I'm growing increasingly concerned about your inclination to tie these people up.` },
            { speaker: `inim`, text: `Hey, just saying.` },
        ],
        links: [
            { text: `I guess... I'd pull the lever, saving the 5 is worth the unfortunate loss of the one`, passageTitle: `pull the lever kronk` },
            { text: `I guess... I wouldn't pull the lever, I couldn't actively harm an innocent`, passageTitle: `wrong lever` },
        ], onEnter: () => seenPhiloSpiel = true,
    },
    "pull the lever kronk": {
        utterances: [
            { speaker: `dask`, text: `Interesting, so you've run the numbers and feel that saving 5 lives is more important than losing 1. Seems reasonable.` },
        ],
        links: [
            { text: `It's unfortunate, but it's the way it is. Saving 5 lives is worth it`, passageTitle: `post trolley`, onLinkClick: () => state = State.utilitarian },
            { text: `I only did it because it was so clear cut... In a real life scenario I'd probably be a lot more hesitant.`, passageTitle: `post trolley`, onLinkClick: () => state = State.utilitarian },
        ], onEnter: () => pulledLever = true,
    },
    "wrong lever": {
        utterances: [
            { speaker: `dask`, text: `Ah, you don't want the blood on your hands. Seems reasonable. I'm curious if you can provide more details about your thought process...` },
            { speaker: `inim`, text: `What if you could save a thousand people just by killing one? Save a million?` },
        ],
        links: [
            { text: `I guess I'd do it for a thousand or a million...`, passageTitle: `post trolley` , onLinkClick: () => state = State.hesitant,},
            { text: `No, I'd never pull the lever. I just couldn't kill someone like that.`, passageTitle: `` , onLinkClick: () => state = State.deontologist},
            { text: `I'm not sure. This whole scenario makes me feel uncomfortable, so I'm just going to play it safe and avoid pulling the lever.`, passageTitle: `post trolley` , onLinkClick: () => state = State.hesitant},
        ], onEnter: () => pulledLever = false,
    },
    "post trolley": {
        utterances: [
            { speaker: `inim`, text: `Well good work buddy for sticking through that problem. Luckily no humans were harmed in the making of this game.` },
            { speaker: `inim`, text: `I'm curious though, regardless of this trolley problem and whatever, do you generally believe it's better to stick by your principles, or do the most good you can, principles be damned?` },
            { speaker: `dask`, text: `Inim, language!` },
        ],
        links: [
            { text: `What do you mean by principles? Isn't "Do as much good as possible" a principle itself?`, passageTitle: `what are principles` },
            { text: `Principles are important. Some people who think they are doing good end up doing more harm`, passageTitle: ``, dynamicReference: () => pulledLever ? "conflicted util" : "confirmed deont"  },
            { text: `Principles are good and all, but just generally doing good is the most important thing.`, passageTitle: ``, dynamicReference: () => pulledLever ? "confirmed util" : "conflicted deont" },
        ]
    },
    "what are principles": {
        utterances: [
            { speaker: `dask`, text: `You are right, principles is an ill defined term here... Perhaps some examples of what we think of as principles will help with Inim's question: Loyalty, never lying, never killing, showing gratitude... There are a lot more obviously, but we can keep it short. I think most would agree that these principles are good to have, but sometimes they could get in the way of doing good. What if you strongly held the principle that you should be loyal, but then found yourself in a situation where breaking a promise would lead to a better outcome?` },
        ],
        links: [
            { text: `Yeah, I have some principles that are incredibly important to me. If I thought I would do more good by breaking them, I'd probably just be wrong...`, passageTitle: ``, dynamicReference: () => pulledLever ? "conflicted util" : "confirmed deont"   },
            { text: `I still believe that doing the most good possible is more important.`, passageTitle: ``, dynamicReference: () => pulledLever ? "confirmed util" : "conflicted deont"  },
        ]
    },
    "conflicted util": {
        utterances: [
            { speaker: `inim`, text: `So, you think that there are some principles you should never violate. I hope "Never murder" is on that list of principles... but at the same time, you pulled the lever and killed one person. Don't you feel like there's a conflict here? Don't you feel like you broke one of your principles in order to save the other 5?` },
        ],
        links: [
            { text: `Someone died because I pulled the lever, but that was an unfortunate side effect. I didn't pull the lever so that they would die. Saying I <em>murdered</em> is absurd.`, passageTitle: `not murder` },
            { text: `I only broke my principle because the situation was so clear cut. In a messy, real life scenario, I'd never pull the lever.`, passageTitle: `used heuristics` },
            { text: `You're right, pulling the lever was an act of murder and I regret it. I don't think I'd pull the lever`, passageTitle: `confirmed deont`, onLinkClick: () => pulledLever = false,  },
        ]
    },
    "not murder": {
        utterances: [
            { speaker: `inim`, text: `Now this is something...` },
            { speaker: `dask`, text: `Ooh, you've touched on a very interesting idea in ethics called the <em>"Doctrine of Double Effect"</em>. In summary, it says that doing something good with bad side effects is acceptable, as long as those side effects weren't intended.` },
            { speaker: `dask`, text: `So in your case, the fact that you "murdered" one individual was acceptable. You pulled the lever to save 5, not to kill 1.` },
            { speaker: `inim`, text: `.....` },
            { speaker: `dask`, text: `Inim, anything to add?` },
            { speaker: `inim`, text: `... I mean, it just feels weird to me ...` },
            { speaker: `inim`, text: `Yeah we can say that we didn't intend to kill the 1 person, that it was an unfortunate side effect, but it kinda feels like saying "Your honor, I didn't intend for my bullet to kill that person, I just pulled the trigger and the bullet hitting him was an unfortunate side effect."` },
            { speaker: `inim`, text: `Or what if you were a doctor prescribing a toothache drug. If you had a ton of evidence showing that the drug kills people half the time, I don't think you could escape the blame by saying "Oh yeah, I intended to cure their toothache, the fact that they died was an unfortunate side effect."` },
        ],
        links: [
            { text: `I stand by what I said, my intentions weren't to kill that person; pulling the lever was an unfortunate, but moral decision.`, passageTitle: `confirmed deont` },
            { text: `You're right, I suppose I did kill that one person. I guess I'd break my principles to create more good in the world.`, passageTitle: `confirmed util` },
            { text: `You're right, and I guess I regret pulling the lever. I've changed my mind, I wouldn't do that if given a second chance.`, passageTitle: `confirmed deont`, onLinkClick: () => pulledLever = false, },
        ], onEnter: () => seenDDE = true,
    },
    "used heuristics": {
        utterances: [
            { speaker: `dask`, text: `Hmm... So act with confidence when everything is layed out, play it safe when things are messy. It's a smart approach to have.` },
            { speaker: `dask`, text: `Well we're going to keep hitting you with more challenges like the trolley problem. They'll be similarly clear cut and you should keep thinking through them like that, but keep this idea of "the messy real world" in your head, it's an interesting thought.` },
            { speaker: `dask`, text: `<hr>` },
        ],
        links: [ ], autoLink: () => `confirmed util`,
    },
    "conflicted deont": {
        utterances: [
            { speaker: `inim`, text: `So, you want to do as much good as possible. I hope that "saving lives" is something you consider doing good... But when you didn't pull the lever, you doomed those 5 people. ` },
        ],
        links: [
            { text: ``, passageTitle: `` },
        ]
    },
}
