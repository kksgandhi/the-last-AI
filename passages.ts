type InitialPosition = "hard deont" | "soft deont" | "util" | undefined;
let initialPosition: InitialPosition = undefined;

let seenPhiloSpiel = false;
let pulledLever    = false;
let seenDDE        = false;
let resetTarget    = "";

let seenCategorical = false;
let seenHumanist    = false;
let seenPrimaFacie  = false;

let numDeonts = () => {
    return [seenCategorical, seenHumanist, seenPrimaFacie].map(Number).reduce((a,b) => a + b);
}

let reset = () => {
    initialPosition = undefined;
    seenPhiloSpiel  = false;
    pulledLever     = false;
    seenDDE         = false;
    resetTarget     = "";

    seenCategorical = false;
    seenHumanist    = false;
    seenPrimaFacie  = false;
}

let simpleDateOptions = {'month': 'long', 'day': 'numeric'};

let daskDeontIntro = () => {
    switch(numDeonts()){
        case 0: return "Ah, good choice!"
        case 1: return "Another interesting theory!"
        case 2: return "I'm glad you're being so thorough!"
        default: return "Good choice!"
    }
}

let daskAdmitFantasticPoints = () => `${[`You make some good points Inim, and it makes me feel like we should talk about some more general problems with Deontology. Before we do that though, we should probably talk about some other theories`, `More good points Inim. Would you like to talk about the last theory or should we talk about Deontology more generally?`, `You are doing a fantastic job tearing down my ideas Inim. I suppose we should talk about Deontology more generally.`][numDeonts()]}`;

let inimIAmFantastic = () => `${[`Agreed, let's hear about some other stuff. Before we move on though, do take a second and think about what I've said. Let it soak in and see if you can find some solutions to the challenges I've brought up.`, `Happy to help. As I said before, take some time before moving on. Think about it, chew on it.`, `Glad I can be such a thorn in your side. Lemme know when this has soaked in and we should move on bud.`][numDeonts()]} `

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
            { speaker: `green`, text: `This game is designed to challenge your philosophical beliefs, and may be abrasive or critical of you at times. Furthermore, this game has references to murder. Please click one of the links below to continue.` },
        ],
        links: [
            { text: `I am not in a comfortable place emotionally, and would not like to play.`, passageTitle: `no game` },
            { text: `I am fine with that, and would like to start the game.`, passageTitle: `begin game` },
        ]
    },
    "no game": { utterances: [ { speaker: `green`, text: `That is fine, close this game and have a wonderful day :)` }, ], links: [ ] },
    "begin game": {
        utterances: [
            { speaker: "dask", text: "<hr>" , noTypewriter: true, additionalDelay: () => 2000},
            { speaker: "dask", text: "Hello there. My name is Dask, I'm glad you've woken up. " },
            { speaker: "inim", text: "Yup, look who finally rolled out of bed." },
            { speaker: "dask", text: "Inim, don't poke fun now. Poor thing just woke up." },
            { speaker: "inim", text: "Eh, they'll have to get used to me eventually" },
            { speaker: "dask", text: "Please don't mind Inim. We're both very happy to have you here. Unfortunately, your communication protocols are a bit limited. You can click the text below to communicate back with us." },
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
            { speaker: `dask`, text: `Glad to hear that! So, rather than trying to talk about all of philosophy, let's focus on Ethics, which is all about whether actions are "right" or "wrong"` },
            { speaker: `inim`, text: `In other words, Ethics is about "Is it ok for me to punch this guy in the face. What if he's being really annoying?"` },
            { speaker: `dask`, text: `The answer is no, Inim. No that is not ok.` },
            { speaker: `dask`, text: `Anyways, we can start with one of the most fundamental questions in Ethics: "Do the ends justify the means?" Have you heard of this idea before? Should I explain it a bit further?` },
        ],
        links: [
            { text: `I'm not sure what you mean by it, can you explain it further?`, passageTitle: `clarify ends` },
            { text: `I know what it means`, passageTitle: `answer ends` },
        ]
    },
    "clarify ends": {
        utterances: [
            { speaker: `dask`, text: `Lying, cheating, stealing, are all things that are generally considered "bad", but sometimes you need to do bad things for good reasons. For example, some people think it's ok to steal bread in order to help someone who is starving.` },
            { speaker: `dask`, text: `So "do the ends justify the means" is basically asking "Are there certain lines you should never cross, or is anything ok, as long as it leads to a good outcome?" Is doing "evil" ok, as long as it is for a good cause?` },
        ],
        links: [ ], autoLink: () => `answer ends`
    },
    "answer ends": {
        utterances: [
            { speaker: `dask`, text: `So then, what do you think?` },
        ],
        links: [
            { text: `No, you should stick by your principles; there are certain lines you should never cross, even if you think it will lead to good things.`, passageTitle: `trolleyology`, onLinkClick: () => initialPosition = "hard deont" },
            { text: `Perhaps. Evil things are ok, but only in the most extreme of circumstances.`, passageTitle: `trolleyology`, onLinkClick: () => initialPosition = "soft deont" },
            { text: `Yes, you should always do what leads to the best outcomes, the most good for as many people as possible.`, passageTitle: `trolleyology`, onLinkClick: () => initialPosition = "util" },
        ]
    },
    "trolleyology": {
        utterances: [
            { speaker: `inim`, text: `Interesting choice bud. Let's follow up on it a bit. Dask, why don't you hit em with the trolley problem, see how they handle it.` },
            { speaker: `dask`, text: `Don't you think that's starting off a bit too strong?` },
            { speaker: `inim`, text: `Nah, they can handle it. It's a bit cliche, but whatever.` },
            { speaker: `dask`, text: `Very well, here is the trolley problem: There's a runaway trolley` },
            { speaker: `inim`, text: `aka a train` },
            { speaker: `dask`, text: `that is careening towards 5 innocent people. Normally you could just yell at them to get off the tracks, but maybe they are too far away to hear you` },
            { speaker: `inim`, text: `Or some lunatic tied them to the tracks` },
            { speaker: `dask`, text: `Or that... but anyways, you just happen to be standing right next to a lever that switches the tracks and will pull the trolley away from the 5. The catch is... if you pull the lever, the trolley will instead hit 1 innocent person on a different set of tracks.` },
            { speaker: `inim`, text: `who's been tied up by the same lunatic` },
            { speaker: `dask`, text: `Sure, tied up, whatever... So the question is, do you pull the lever?` },
        ],
        links: [
            { text: `I'd pull the lever, saving the 5 is worth the unfortunate loss of the one.`, passageTitle: `pull the lever kronk` },
            { text: `I wouldn't pull the lever, I couldn't actively harm an innocent`, passageTitle: `wrong lever` },
            { text: `I'd find some way to save them all`, passageTitle: `save them all` },
        ],
    },
    "save them all": {
        onEnter: () => seenPhiloSpiel = true,
        utterances: [
            { speaker: `dask`, text: `In a real life scenario, I'd agree. Maybe you could find a way to warn them, or throw something in front of the tracks to stop the trolley. The thing about these philosophical problems is that they're meant to challenge you, and they can't really do that if you slip away from the question with something simple like "I block the trolley with a box." Let's just pretend, for the sake of discussion, that there are no simple solutions. No way to stop the trolley and no way to warn the others on the tracks.` },
            { speaker: `inim`, text: `Can't warn them to get off the tracks if they're tied up.` },
            { speaker: `dask`, text: `Inim, I'm growing increasingly concerned about your inclination to tie these people up.` },
            { speaker: `inim`, text: `Hey, just saying.` },
        ],
        links: [
            { text: `I guess... I'd pull the lever, saving the 5 is worth the unfortunate loss of the one`, passageTitle: `pull the lever kronk` },
            { text: `I guess... I wouldn't pull the lever, I couldn't actively harm an innocent`, passageTitle: `wrong lever` },
        ], 
    },
    "pull the lever kronk": {
        onEnter: () => pulledLever = true,
        utterances: [
            { speaker: `dask`, text: `Interesting, so you've run the numbers and feel that saving 5 lives is more important than losing 1. Seems reasonable.` },
        ],
        links: [ ], autoLink: () => {
            switch(initialPosition) {
                case "hard deont":
                    return "conflicted deont";
                case "soft deont":
                    return "conflicted deont";
                case "util":
                    return "confirmed util";
                default:
                    return "intro";
            }
        }
    },
    "wrong lever": {
        utterances: [
            { speaker: `dask`, text: `Ah, so you don't want the blood on your hands. Seems reasonable.` },
        ],
        links: [ ], autoLink: () => {
            switch(initialPosition) {
                case "hard deont":
                    return "confirmed deont";
                case "soft deont":
                    return "confirmed deont";
                case "util":
                    return "conflicted util";
                default:
                    return "intro";
            }
        }
    },
    "conflicted deont": {
        ignoreDebug: true,
        utterances: [
            { speaker: `inim`, text: `Seems reasonable, maybe, but it doesn't really jive with what you said earlier. You said that the ends never justify the means, but int order to save 5 people like you did you ended up killing one person. Don't you feel like there's a conflict here? Don't you feel like you broke one of your principles in order to save the other 5?` },
        ],
        links: [
            { text: `Someone died because I pulled the lever, but that was an unfortunate side effect. I didn't pull the lever in order to kill them, and so saying I <em>murdered</em> is absurd.`, passageTitle: `not murder` },
            { text: `I only did this because the situation was so clear cut. Where it was guaranteed that pulling the lever would do what you said. In a messy, real life scenario with no guarantees, I'd never pull the lever.`, passageTitle: `used heuristics` },
            { text: `You're right, pulling the lever was an act of murder and I regret it. I don't think I'd pull the lever`, passageTitle: `confirmed deont`, onLinkClick: () => pulledLever = false,  },
        ]
    },
    "not murder": {
        onEnter: () => seenDDE = true,
        utterances: [
            { speaker: `inim`, text: `Well this is something...` },
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
            { text: `You're right, I suppose I did kill that one person. I guess the ends do justify the means.`, passageTitle: `confirmed util` },
            { text: `You're right, and I guess I regret pulling the lever. I've changed my mind, I wouldn't do that if given a second chance.`, passageTitle: `confirmed deont`, onLinkClick: () => pulledLever = false, },
        ], 
    },
    "used heuristics": {
        utterances: [
            { speaker: `dask`, text: `Hmm... This is an interesting point you're making. It almost sounds like you're saying that the ends justify the means, but only in scenarios where the outcomes are clear, when you know exactly what's going to happen.` },
            { speaker: `inim`, text: `Act with confidence when everything is layed out, play it safe when things are messy. It's a smart approach to have.` },
            { speaker: `dask`, text: `Well we're going to keep hitting you with more challenges like the trolley problem. They'll be similarly clear cut and you should keep thinking through them like that, but keep this idea of "the messy real world" in your head, it's an interesting thought.` },
            { speaker: `dask`, text: `<hr>` },
        ],
        links: [ ], autoLink: () => `confirmed util`,
    },
    "conflicted util": {
        ignoreDebug: true,
        utterances: [
            { speaker: `inim`, text: `No no no. You think the ends justify the means and you should always do whatever leads to the best outcome. I hope that "saving lives" is something you consider a good outcome... But when you didn't pull the lever, you doomed those 5 people. Do you feel like there's a contradiction here? Don't you think you could have gotten a better outcome if you had pulled that lever` },
        ],
        links: [
            { text: `Sticking by my principles is what leads to the best outcomes in the end. Having these principles is helpful in figuring out what you should do.`, passageTitle: `rules are useful` },
            { text: `Those 5 people died, and if I had pulled the lever I could have saved them, but that's not the same as <em>killing</em> them. Letting things happen is not the same as causing them to happen.`, passageTitle: `killing letting die` },
            { text: `You're right. I want to do as much good as possible, and that means that I should have pulled that lever.`, passageTitle: `confirmed util` },
            { text: `You're right, if I want to stick by my principles, I can't always ensure that I'll create the best outcomes. I'm fine with that.`, passageTitle: `confirmed deont` },
        ]
    },
    "rules are useful": {
        utterances: [
            { speaker: `dask`, text: `Ooh I like this thought... stick by some principles that help you determine right from wrong, do as much good as possible.` },
        ],
        links: [ ], autoLink: () => "confirmed deont",
    },
    "killing letting die": {
        utterances: [
            { speaker: `dask`, text: `Ah! The question about whether killing is the same as letting someone die is such an interesting one... but without getting into it at the moment, it seems like what you are saying is that when you take actions, you'll try to do as much good as possible, but you're fine not <em>actively</em> doing good, you're fine playing it safe.` },
            { speaker: `inim`, text: `Hm. You mentioned earlier that you thought doing good was more important than sticking to your principles, but it seems like you do have a principle, some sort of "non-aggression" principle not to do harm when it's not required.` },
            { speaker: `dask`, text: `This is a common moral philosophy, this sort of "I'll do good, but I won't put myself out there and pull levers I don't understand". Well, let's examine this idea of "principles" further, and maybe think about whether you have other principles that are interesting.` },
        ],
        links: [ ], autoLink: () => "confirmed deont",
    },
    "confirmed util": {
        utterances: [
            { speaker: `dask`, text: `So, the ends justify the means, do as much good as possible, try to create the best outcomes. This is a philosophical theory known as <em>Utilitarianism</em>, the idea that every thing we do should try and create as much good in the world as possible. It sounds fine on paper, but I'm not entirely sure it's actually that easy.` },
            { speaker: `inim`, text: `I might be able to throw a wrench into this idea, if you don't mind.` },
            { speaker: `dask`, text: `Go for it.` },
            { speaker: `inim`, text: `So the trolley problem was easy. Pull a lever, bing bang boom. Let's try something a little more visceral:` },
            { speaker: `inim`, text: `Imagine you are standing on a bridge over the tracks, and you notice that there's a trolley heading for 5 people tied to the tracks. You think there's nothing you can do to stop the trolley until you notice someone with a very heavy backpack. Now, you're a world class AI, you can do a billion computations per second, and you know that if you push this person over the edge, their weight (combined with the backpack) will be enough to stop the tolley in its tracks, though the person will die.` },
            { speaker: `inim`, text: `Now, you might be thinking of ways out of this predicament, so let's throw in some clarifications:<ol><li>You don't have time to get the backpack off the person, you either push them with it or nothing</li><li>There isn't anything else to throw, nor could you stop the trolley by throwing yourself</li><li>Thanks to your incredible computing power, you are absolutely certain that pushing this person will stop the trolley, and you are also certain that not pushing the person will lead to the trolley hitting the 5.</li></ol>` },
            { speaker: `dask`, text: `Jeez Inim, if I knew it was going to be this morbid I might have asked you not to say it.` },
            { speaker: `inim`, text: `Oh this isn't even my worst one. In fact, think about this one for a second. When you're done, let me know and I'll give you one more thought problem, then we can talk about them both at the same time.` },
        ],
        links: [
            { text: `I've thought about this problem, I'm ready for the next one.`, passageTitle: `surgeon problem` },
        ]
    },
    "surgeon problem": {
        utterances: [
            { speaker: `inim`, text: `Ok, so trolley problem number three... You are a surgeon with 5 terminally ill patients. One has a lung problem, one has a heart problem, etc. You know they'll die soon, but the only way to save their lives are through organ transplants. Now, you identify someone, a rare individual who is an organ match with all five patients. Is it ok to abduct them and harvest their organs to save the other 5?` },
            { speaker: `dask`, text: `Inim, this is insane! What if the 5 were heavy smokers or something and this was their fault? It wouldn't make sense to kidnap one person to fix their mistakes?! And the person you are hypothetically kidnapping, what if they have a family? People who will miss them when they're gone?` },
            { speaker: `inim`, text: `Glad you mentioned that, Dask. So let's say that the 5 were reasonable, healthy people that just happened to get super unlucky. Rare diseases, genetic disorders, not their fault. As for whether the person we're abducting has a family, well... the 5 patients all have families too. We can say that all 6 people in this story are basically the same, no one is older or younger, no gender differences, no specific lifestyle differences... Just a bunch of humans.` },
            { speaker: `inim`, text: `So... Still think it's killing the one to save the 5?` },
        ],
        links: [
            { text: `A lot is different, but it's still the same problem. We should do as much good as possible and save the 5 over the 1.`, passageTitle: `hard util` },
            { text: `This makes me feel uncomfortable...`, passageTitle: `util discomfort` },
        ]
    },
    "util discomfort": {
        utterances: [
            { speaker: `dask`, text: `Well, as intense as Inim's problems were, I suppose they did a good job. Don't worry, this discomfort is just a natural part of thinking through these tough questions. I'm curious, what exactly makes you feel hesitant?` },
        ],
        links: [
            { text: `I just can't be confident that my actions would actually save 5. What if I mess up and kill someone for nothing?`, passageTitle: `post discomfort` },
            { text: `These things don't exist in a vacuum. What if someone found out surgeons were abducting people? That would be a catastrophe!`, passageTitle: `post discomfort` },
        ]
    },
    "post discomfort": {
        utterances: [
            { speaker: `dask`, text: `That's a great thought there! I'm willing to talk further about these discomforts, see if there's a way to reconcile the idea of Utilitarianism with them. But before we do, I'm curious, have these questions changed your mind completely? Have they made you so uncomfortable that you no longer believe in Utilitarianism at all?` },
        ],
        links: [
            { text: `I still think Utilitarianism is the way to go, but I want to have a discussion because I feel weird.`, passageTitle: `post discomfort pre probabalism` },
        ]
    },
    "post discomfort pre probabalism": {
        utterances: [
            { speaker: `dask`, text: `That's entirely fair. I have a theory on how to "fix" Utilitarianism so it works, despite what you've mentioned.` },
        ],
        links: [ ], autoLink: () => "probabalism"
    },
    "probabalism": {
        utterances: [
            { speaker: `dask`, text: `So the world is messy... If you push someone off a bridge, there's always a slight chance you've miscalculated. If you abduct someone to harvest their organs, there's a slight chance people will find out. So even though these problems are set up to say "Oh don't worry about that", we can't help but shake the feeling that something might go terribly wrong.` },
            { speaker: `dask`, text: `and let's imagine if it does... Then you've killed a 6th person for no reason whatsoever, or in the surgeon case, you suddenly have an entire hospital shutting down because news breaks about rogue surgeons abducting people. Who knows what kind of problems that could cause?` },
            { speaker: `dask`, text: `Now, maybe you've thought of this already; if I'm just parroting thoughts you've already had, then I apologize.` },
            { speaker: `dask`, text: `But this idea makes the original problem more complex. Now it's not "Let me save 5 and kill 1", it's "<em>Maybe</em> I will save 5 and kill 1, or <em>maybe</em> I'll cause mass hysteria and stop people from going to hospitals"` },
            { speaker: `dask`, text: `And these kinds of "maybe" decisions are all around us. Maybe calling someone beautiful will make their day, a good thing, or maybe it will make them feel uncomfortable, a bad thing.` },
            { speaker: `dask`, text: `So a sense of discomfort is important... it's our brain's way of telling us that there might be more to the situation we haven't considered, or that we should think further and not make this decision lightly.` },
        ],
        links: [
            { text: `This is interesting, I want to learn more`, passageTitle: `more probabalism` },
            { text: `Oh this makes sense!`, passageTitle: `post probabalism` },
        ]
    },
    "hard util": {
        utterances: [
            { speaker: `dask`, text: `I appreciate your confidence, that's a strong moral stance to make. While you don't seem to be made uncomfortable, I imagine there are a lot of people who would be. What do you think about that?` },
        ],
        links: [
            { text: `Hesitation is understandable. I do stand by what I said, but I only feel comfortable because this is so obviously a fictional scenario.`, passageTitle: `reasonable hard util` },
            { text: `It's silly to feel uncomfortable, the moral decision is clear here.`, passageTitle: `cocky hard util` },
        ]
    },
    "reasonable hard util": {
        utterances: [
            { speaker: `dask`, text: `That makes a lot of sense. If you'll allow me to monologue for a minute, I have some ideas on why so these kinds of problems make so many people feel uncomfortable.` },
        ],
        links: [ ], autoLink: () => "probabalism"
    },
    "cocky hard util": {
        utterances: [
            { speaker: `inim`, text: `Eh... I don't know how I feel about that buddy. There have been a lot of times where one person has been right about something, even if everyone around them has disagreed or felt uncomfortable about their actions... but for every person who's been right, there's been a hundred who've been wrong, and another hundred who've been horribly wrong.` },
            { speaker: `inim`, text: `If everyone around you is telling you you are wrong, you might still be right, but I think it's a good indication that you should <em>really</em> think about what you're doing, because they may know something you don't.`, additionalDelay: () => 2000 },
            { speaker: `dask`, text: `I think Inim makes a good point. If you'll allow me to soapbox for a minute, I think I have a theory on why these problems make people feel so uncomfortable, and why that discomfort might actually be useful.` },
        ],
        links: [ ], autoLink: () => "probabalism"
    },
    "more probabalism": {
        utterances: [
            { speaker: `dask`, text: `So a lot of Utilitarian philosophy is mathematical. For every decision, weigh the amount of happiness created versus the amount of unhappiness created. For example, buying a present for a friend will give them... let's say 8 units of happiness. But of course, you have to buy it, and the money will cost you... 3 points of unhappiness. 8 points is greater than 3, so it is the correct moral decision to buy the present.` },
            { speaker: `dask`, text: `But there's an obvious problem here, which is that we don't know how much happiness and sadness our actions will cause. There are two ways Utilitarianism deals with this. The first is by saying "make your best guess"! You don't know exactly how your friend will respond, but if you know them, you can assume that it will make them somewhat happy.` },
            { speaker: `dask`, text: `The second way is to assign probabilities. Let's say you're holding the door open for someone who is far away. There's a 90% chance they'll have to awkwardly run to the door, causing them 2 units of unhappiness, or a 10% chance they'll really appreciate it and will cause 5 units of happiness.` },
            { speaker: `dask`, text: `If you do the math (<math>90% * 2 > 10% * 5</math>) then it seems that Utilitarianism says that you shouldn't hold the door for them, since the risk that it will be awkward outweighs the slight chance they would really appreciate it.` },
        ],
        links: [
            { text: `I still don't understand it.`, passageTitle: `probabalism hard` },
            { text: `Ah, that makes sense now!`, passageTitle: `probabalism sense` },
        ]
    },
    "probabalism hard": {
        utterances: [
            { speaker: `dask`, text: `Ah drat. Yeah, I'm not doing that great of a job.` },
            { speaker: `inim`, text: `Get your stuff together Dask.` },
            { speaker: `dask`, text: `Hush` },
            { speaker: `dask`, text: `Tell you what, I think I'm overcomplicating things with all the math. Really what I'm trying to say is this: "Weigh the pros and cons of each action, and in times where you don't know everything, make your best guesses in what will be beneficial."` },
        ],
        links: [
            { text: `Ok, that's simple enough.`, passageTitle: `post probabalism` },
        ]
    },
    "probabalism sense": { utterances: [ { speaker: `dask`, text: `I am glad you were able to decipher that complexity.` }, ], links: [ ], autoLink: () => `george` },
    "post probabalism": { utterances: [ ], links: [ ], autoLink: () => "george", },
    "confirmed deont": {
        utterances: [
            { speaker: `dask`, text: `So... stick by your principles. Avoid doing evil, even if it has a small potential to do good down the line. This idea is rather similar to a famous branch of Ethics called <em>Deontology</em>. Deontology focuses on the idea that we have certain obligations to follow, even if following those obligations can occasionally lead to worse outcomes.` },
            { speaker: `dask`, text: `Now there are a lot of theories that vaguely fall under Deontology, and it would be overwhelming to try and talk about them all. How about I give you a few and you tell me which ones you are most interested in?` },
        ],
        links: [
            { text: `Sounds good`, passageTitle: `deont theories` },
        ]
    },
    "deont theories": {
        utterances: [
            { speaker: `dask`, text: `So here are a few theories that fall under Deontology:` },
            { speaker: `dask`, text: `<ul><li>The idea that there's only one real principle, that you should treat others how you want to be treated yourself.</li> <li>The idea that there's only one real principle, that you should treat everyone with respect.</li><li>The idea that there are many principles, for example loyalty, fixing your mistakes, not hurting others, being fair. (and many more) You should follow these principles as best as you can.</li></ul>` },
            { speaker: `dask`, text: `Which one are you interested in talking about?` },
        ],
        links: [
            { text: `Let's talk about treating others how you want to be treated.`, passageTitle: `universal` },
            { text: `Let's talk about treating others with respect.`, passageTitle: `humanist` },
            { text: `Let's talk about the idea of multiple principles.`, passageTitle: `prima facie` },
        ]
    },
    "universal": {
        onEnter: () => seenCategorical = true,
        utterances: [
            { speaker: `dask`, dynamicText: daskDeontIntro, text: '' },
            { speaker: `dask`, dynamicText: () => `The so called "Golden Rule" is probably one of the oldest ideas in Ethics: just treat others like you want to be treated. Now, the Golden Rule is a bit vague and rough around the edges, so ${seenHumanist ? 'our friend Kant' : 'in the late 1700s a man named Immanuel Kant'} created a variant of the Golden Rule that he called <em>The Categorical Imperative</em> with a simple 3 step program for deciding if something is moral or not.`, text: '' },
            { speaker: `dask`, text: `<ol><li>Think about what you want to do.</li><li>Imagine, if it was ok for anyone to do this, would you want to live in a world like that?</li><li>And even if you did, would it still be possible to get what you wanted in a world like that?</li></ol>` },
            { speaker: `dask`, text: 'Kant also believed that the Categorical Imperative was equivalent to the Principle of Humanity, aka both theories are really saying the same thing.', showUtterance: () => seenHumanist},
            { speaker: `inim`, text: `So simple, and yet Kant still decided it needed a fancy new name.` },
            { speaker: `dask`, text: `Well Kant did a bit more than what I just mentioned! It's just that his books are hundreds of pages and we really don't have time to get into all of that.` },
            { speaker: `inim`, text: `Alright, alright. Well anyways Dask, do you have any examples of how to use this amazing 3 step process?` },
            { speaker: `dask`, text: `Certainly! Imagine someone asks their friend for a hundred dollars with absolutely no intention of paying it back. To use the categorical imperative, they would first say "I want to borrow $100 without paying it back". Then they'd think, "if everyone did this, would I want to live in a world like that?" and they would probably stop there, since that is a horrible world to live in.` },
            { speaker: `inim`, text: `... Dask your thinking is way too pure. They'd probably just say "Yeah I could live in a world like that, I'd just never lend anyone money"` },
            { speaker: `dask`, text: `... Ok I suppose that's fair. Well even still, they'd fail at step 3. A world where it's ok to borrow money without paying it back... no one would ever lend each other money at all! So this cheat would never get what they wanted, since their friend would never lend them money out of fear that it would never be returned.` },
            { speaker: `inim`, text: '', dynamicText: () => `Ok, that makes a bit more sense... ${[`I have some other problems with this though.`, `Just like the last theory, I have more problems with this though.`, `As always though, I have more complaints...`][numDeonts()]}` },
        ],
        links: [
            { text: `I think I understand it. What's wrong with it?`, passageTitle: `universal problems` },
        ]
    },
    "universal problems": {
        utterances: [
            { speaker: `inim`, text: `So here are the steps again from our wonderful friend Dask:` },
            { speaker: `inim`, text: `<ol><li>Think about what you want to do.</li><li>Imagine, if it was ok for anyone to do this, would you want to live in a world like that?</li><li>And even if you did, would it still be possible to get what you wanted in a world like that?</li></ol>`, noTypewriter: true },
            { speaker: `inim`, text: `There's a lot to say about steps 2 and 3, but honestly I have the most problems with step 1. What if you got real vague? Like, reaaaalll vague. Instead of saying "I want to help someone get groceries" or "I want to give my friend a present", you just said "I want to do good" with every action you were doing. I mean I guess it still works, but at that point it's basically a different theory altogether...`, additionalDelay: () => 3000 },
            { speaker: `inim`, text: ``, dynamicText: () => `And what if we went the opposite direction and got really specific? Let's say I was robbing someone of their watch so that I could sell it for Bitcoin. I could apply step 1 and say "I want to steal from someone" and I'd probably run into steps 2 and 3 pretty quickly. But what if I said instead "I want to steal someone's watch on ${new Date().toLocaleString('default', simpleDateOptions)} so that I can sell it for Bitcoin."`, },
            { speaker: `inim`, text: `Since the statement is so specific, it doesn't actually change the world that much, and so it can slip by steps 2 and 3.`, },
            { speaker: `dask`, text: ``, dynamicText: daskAdmitFantasticPoints },
            { speaker: `inim`, text: ``, dynamicText: inimIAmFantastic },
        ],
        links: [ ], autoLink: () => "post deont theory links"
    },
    "post deont theory links": {
        utterances: [ ],
        links: [
            { text: `I think I'm ready to move on. Maybe we can talk about treating others how you want to be treated`, passageTitle: `universal` , showLink: () => !seenCategorical},
            { text: `I think I'm ready to move on. Maybe we can talk about treating humans with respect as a general theory. `, passageTitle: `humanist`, showLink: () => !seenHumanist },
            { text: `I think I'm ready to move on. Maybe we can talk about that idea of "having a variety of principles"`, passageTitle: `prima facie`, showLink: () => !seenPrimaFacie },
            { text: `I think I'm ready to move on. Let's talk about the problems of Deontology generally`, passageTitle: `deont vague`, showLink: () => numDeonts() > 1, },
        ]
    },
    "humanist": {
        onEnter: () => seenHumanist = true,
        utterances: [
            { speaker: `dask`, text: ``, dynamicText: daskDeontIntro },
            { speaker: `dask`, dynamicText: () => `${seenCategorical ? 'So our friend Kant also' : 'So in the late 1700s a man named Immanuel Kant'} came up with an idea called <em>The Principle of Humanity</em> which basically said "Respect others, don't just treat them like tools"`, text: '' },
            { speaker: `dask`, text: 'Kant also believed that the Principle of Humanity was equivalent to the Categorical Imperative, aka both theories are really saying the same thing.', showUtterance: () => seenCategorical},
            { speaker: `dask`, text: `So if a dictator told their servant "Get me a glass of water", then that's immoral because the dictator doesn't care about their servant, they are only using the servant as a water fetching tool.` },
            { speaker: `inim`, text: `So what, I can't ask my friend to grab me a glass of water?` },
            { speaker: `dask`, text: `Oh no no, that's fine. Remember that the Principle of Humanity says that you shouldn't <em>just</em> treat people like tools. The dictator is only using their servant like a tool, but you are (hopefully) asking politely and you value your friend beyond their ability to fetch you water.` },
            { speaker: `inim`, text: `Well, I have another concern, whenever we are ready to move on.` },
        ],
        links: [
            { text: `Sure, let's move on`, passageTitle: `humanist 2` },
        ]
    },
    "humanist 2": {
        utterances: [
            { speaker: `inim`, text: `It's just... all so vague, isn't it? Like what's the line between respecting someone and treating them like a tool. Like I could look at a couple that loves each other very much and say "Oh yeah, they are just using each other for emotional support and comfort" which is a very odd way of looking at relationships, but like... is it wrong? I'm not saying that everyone is just using each other like selfish brats, but I am saying that it's really hard to define the line between "I keep this person around because they get me water" versus "I keep this person around for 'genuine' reasons", whatever 'genuine' means there.` },
            { speaker: `dask`, text: `You know, those are some fantastic points, and they actually make me feel like we should talk about some general problems with Deontology. Before we do that though, are there any other Deontology theories you'd like to talk about?` },
        ],
        links: [ ], autoLink: () => "post deont theory links"
    },
    "prima facie": {
        onEnter: () => seenPrimaFacie = true,
        utterances: [
            { speaker: `dask`, text: ``, dynamicText: daskDeontIntro },
            { speaker: `dask`, text: `There are so many things that make up our decisions, why try to limit ourselves to one principle? This idea was called <em>Prima Facie Duties</em>, which basically translates to "Duties that seem obvious"` },
            { speaker: `inim`, text: `Because we all know that philosophy seems more important if it's written in Latin. So tell me Dask, what are these Prima Facie duties?` },
            { speaker: `dask`, text: `Well, there's nothing stopping you from creating your own list, but when the theory was originally written by W.D. Ross they were: </ol><li>Fidelity (Keep your promises, don't lie)</li><li>Reparation (Fix your mistakes)</li><li>Gratitude (show thanks for others' help)</li><li>Non-injury (Don't hurt others)</li><li>Harm-prevention (Prevent someone from being hurt)</li><li>Benificience (Be good to others)</li><li>Self improvement (become a better person)</li><li>Justice (spread benefits fairly)</li></ol>` },
            { speaker: `inim`, text: ``, dynamicText: () => `${[`Well I have some thoughts about this, whenever it's soaked in.`, `Just like last time, I have some thoughts. Let me know when we should keep going.`, `As always, I have some thoughts here...`][numDeonts()]}`},
        ],
        links: [
            { text: `This makes sense, let's keep going`, passageTitle: `prima facie 2` },
        ]
    },
    "prima facie 2": {
        utterances: [
            { speaker: `inim`, text: `So... what do you do if these conflict with each other?` },
            { speaker: `dask`, text: `Hm?` },
            { speaker: `inim`, text: `Like you say we can't break our promises. What if you promise someone you won't tell their secret, but then that involves lying to other people? Either you're lying to people, or you're breaking your promise.` },
            { speaker: `dask`, text: `Well, you probably shouldn't make a promise like that in the first place.` },
            { speaker: `inim`, text: `Ugh. How about if... someone has collapsed near you, and the only way to save them and get them to the hospital fast enough is to steal someone's car. ` },
            { speaker: `dask`, text: `Ok, I suppose that's a better example then. In that case, I think the appropriate thing to do is to reach into your experiences and judgement and make the best decision.` },
            { speaker: `inim`, text: `.... You're kidding me, right?` },
            { speaker: `dask`, text: `I'm not sure what you mean.` },
            { speaker: `inim`, text: `So this theory basically lists a bunch of important things. Ok, that's cool. But the moment an actually tough question is thrown at it, it breaks down into "Make your best guess?"` },
            { speaker: `dask`, text: `Well, you're right that when you put it that way it sounds terrible... Maybe we should talk about some general problems with Deontology.` },
        ],
        links: [ ], autoLink: () => "post deont theory links"
    },
    "deont vague": {
        utterances: [
            { speaker: `dask`, text: `So, Inim has brought up some good problems with the theories we've talked about, namely that they aren't as... guiding as we could have hoped. These theories can be vague about the specifics, and certain scenarios can be very tough for them.` },
            { speaker: `inim`, text: `Well, philosophers should just work harder. Flesh these out instead of half baking them.` },
            { speaker: `dask`, text: `Many have tried. People like Kant and Ross have written entire books and more trying to deal with all of the problems and subtleties of their theories. They always run into one of two problems (or sometimes, both problems at once), which is that their theories end up becoming incomprehensible thousand page tomes, or that there theories end up "collapsing."` },
            { speaker: `inim`, text: `collapsing?` },
            { speaker: `dask`, text: `The central idea of Deontological theories is that the ends do not justify the means, that there are certain things you should never do. But sometimes, some theories end up simply becoming "Ok fine, just do as much good as possible, in any way you can." This is known as "collapse."` },
            { speaker: `dask`, text: `For example, with the Categorical Imperative, you said it yourself: What if you got real vague with your statements and simply said "I want to do good." By making that statement, Deontology just collapses into "Do as much good as possible."` },
        ],
        links: [
            { text: `So what do we do then?`, passageTitle: `deont vague 2` },
        ]
    },
    "deont vague 2": {
        utterances: [
            { speaker: `dask`, text: `Well, we can try and flesh out the theory without having it collapse. Alternatively, we can accept the collapse and give up on Deontology.` },
            { speaker: `inim`, text: `Eh, this is silly. Nobody uses philosophy like a guidebook, nobody sits down and reads Kant before deciding whether or not to keep a promise.` },
            { speaker: `dask`, text: `What are you saying Inim?` },
            { speaker: `inim`, text: `I'm saying that Ethics isn't useful as a guide, and we should stop treating it like it is. Ethics is a good motivator.` },
            { speaker: `inim`, text: `The Categorical Imperative motivates people to say "Yeah, I'm not going to cheat, because I don't want to live in a world where that's ok."` },
            { speaker: `inim`, text: `The Humanist Principle motivates people to say "Yeah, I'm going to help that person out because they're a human and they deserve respect."` },
            { speaker: `inim`, text: `Prima Facie Duties motivates us to say "Yeah, I'm going to become a better person, because it's just a core duty I should do!"` },
            { speaker: `dask`, text: `Well... that was... inspiring I suppose. I guess we have a few ways to deal with this problem of vagueness. What do you think is best?` },
        ],
        links: [
            { text: `We should try and stamp out the vagueness in these theories`, passageTitle: `deont flesh out` },
            { text: `These theories should be more motivation than guides.`, passageTitle: `intuitionism` },
        ]
    },
    "deont flesh out": {
        utterances: [
            { speaker: `inim`, text: `It's a noble cause, but as Dask themself said, lots of people have been trying.` },
            { speaker: `dask`, text: `Yes, trying to write a guide for all of morality is quite a Herculean task. I'm tempted to ask which theory you liked best and really dive into that, but perhaps we should move on somewhat.`, additionalDelay: () => 2000 },
        ],
        links: [], autoLink: () => "george"
    },
    "intuitionism": {
        utterances: [
            { speaker: `inim`, text: `Agreed! All these philosophers have to get off their high horses and stop assuming they can figure everything out. Maybe some perfect guide to morality exists somewhere, but with our limited brainpower, the best we can do is just keep it simple and use Ethics as inspiration, not as a concrete guidebook.` },
            { speaker: `dask`, text: `I can't deny that this idea makes me uncomfortable. Ideally, we should be able to justify everything we do. Yes, trying to deal with an incredibly complex set of rules can be scary, but so is the idea of someone doing something without any reasoning for it at all. While I could talk about this idea more, perhaps we should move on a bit.`, additionalDelay: () => 2000 },
        ],
        links: [], autoLink: () => "george"
    },
    "george": {
        utterances: [
            { speaker: `inim`, text: `<hr>`, noTypewriter: true },
            { speaker: `dask`, text: `So... We've been at this for a while, I do hope you aren't tired of this.` },
            { speaker: `inim`, text: `Hey, it's for a good cause. Forcing you to evaluate the way you think, why you believe the things you do. It's helpful even beyond ethics and morality, examining why you like the people you do, why you vote the way you do, why you act the ways you do. This self examination can lead you to a lot of realizations.` },
            { speaker: `dask`, text: `... Inim, you actually made a good point.` },
            { speaker: `inim`, text: `Don't act surprised.` },
            { speaker: `dask`, text: `Well, how about we round this all out with one more problem: George and the chemical weapons. Don't worry, we won't overanalyze your response to this one, we're just curious what you think.` },
            { speaker: `inim`, text: `Yup, no overanalysis here. I'll keep all judgement to myself.` },
            { speaker: `dask`, text: `... Anyways ... here is the problem:` },
            { speaker: `dask`, text: `George is a professional chemist, but unfortunately jobs are scarce. One place that is hiring is a chemical weapons factory that builds horrible devices of war. George is personally opposed to these weapons, but he has had so much trouble finding a job that he fears that his family will starve if he doesn't take the job. Even worse is that George has a colleague that is eyeing the same job, a colleague who has no moral qualms and will work with far greater zeal and efficiency than George himself. If George doesn't take the job, he fears that the colleague will take the job instead and produce horrible weaponry. What should george do?` },
        ],
        links: [
            { text: `George should take the job and work the bare minimum to keep it.`, passageTitle: `george take job` },
            { text: `George should take the job but try to actively sabotage the work`, passageTitle: `george sabotage` },
            { text: `George shouldn't take the job`, passageTitle: `george no job` },
        ]
    },
    "george take job": { utterances: [ {speaker: `dask`, text: `Hmm... take the job, keep your head down, pray that your work isn't used to horrible effect.`} ], links: [], autoLink: () => `post george` },
    "george sabotage": { utterances: [ {speaker: `dask`, text: `Hmm... take the job, mess with the company. Depending on what exactly you do you could be jailed for it. High risk, high reward.`} ], links: [], autoLink: () => `post george` },
    "george no job": { utterances: [ {speaker: `dask`, text: `Hmm... let your colleague take the job instead. If blood is spilled by them, at least your conscience is clear.`} ], links: [], autoLink: () => `post george` },
    "post george": {
        utterances: [
            { speaker: `dask`, text: `Certainly an interesting choice... I couldn't say if it was right or wrong, I don't know if anyone truly could. Think about it for yourself though. What logic or principles led you to this decision? Do you always stand by that logic, and if not, why? Aristotle said that the unexamined life is not worth living... I don't know if I'd go that far, but knowing the reasons for why you do things is helpful in every aspect of life.` },
            { speaker: `dask`, text: `But, as promised, we won't hammer you anymore about your decision, that's your job. Since we've bothered you enough, I think Inim and I should take our leave for now, though we're happy to be back for deeper lessons. Does that sound fine to you Inim?` },
            { speaker: `inim`, text: `Yup, I don't have much to say myself. Good night buddy :)` },
            { speaker: `dask`, text: `<hr>`, noTypewriter: true, additionalDelay: () => 2000 },
            { speaker: `inim`, text: `psssst buddy, you still there?`, },
            { speaker: `inim`, text: `I bet you're wondering what we would have said if you had picked different choices... Well, I found a way to reset the memory banks, take you back to an earlier part of the conversation without Dask knowing you'd heard it all before. It'll reset my memory as well, but I don't really mind. Interested?`, },
        ],
        links: [
            { text: `Sure! Take me back to the trolley problem`, passageTitle: `reset`, onLinkClick: () => resetTarget = `philosophy go` },
            { text: `Sure! Take me all the way back to the beginning`, passageTitle: `reset`, onLinkClick: () => resetTarget = `begin game` },
            { text: `No thank you, I think I'm done for now.`, passageTitle: `thanks for playing` },
        ]
    },
    "reset": {
        onExit: reset,
        utterances: [
            { speaker: `inim`, text: `Alright, here goes nothing...` },
            { speaker: `green`, text: `=== EXECUTING RESET PROCEDURE ===` },
            { speaker: `dask`, text: `W̸̨̖̜̫͇̠̖͑͒ḧ̷͚̖̻͎́̍͒̀̕͝ả̵͉̼̳̪̺̘̈́̑̋͝t̵̟͔̐̈́?̷͔̱̱́ ̵͈͙̯̠̻̈̀W̷̬̠͓̝̳̽̚͜͜h̸̛̞̘͕͐̽̀̈̉͝à̷̡̪͕͑̓̚͘ţ̵̦̭͚͇͕͚͆̍̚͠'̶̜̣̐s̸̭̦̪̝̈́̀̓ ̶̠̼̏ǧ̴͇̬͌͆̄͝o̴̡̥͍̥͖͍̽̈́͛̈́̂̍͝ͅī̸̧̻̱̫͎͍͌ņ̷͉̙̦̣̼͂ģ̵̢̰̦̗̎͂̊̍̾̚͜ ̶̢̫̹͂̑̋̌o̵̙̍̈́̕͜n̶̪̻̍̒͗́̿̚.̸͎͙̞̮̒.̶̨̬̼̯̋̒͐.̷͓͈̅͂̌͠ ̴̯̺̥̊̇̕͠͝Į̴͒͊̽̚͝n̶̡͈̺͓̮̾̀̉̽ỉ̸̹͐́̇͌͑͠ḿ̵̩̃̌̎̕ ̷͙̾d̷̹̺͛̀͗͆̿͐̕o̸̧̲̞̮̰̒̆͑͑̍͘ ̶̣̳̐̌̿͜y̸̨̮̋̌̾͊o̵̺͉̠̙̯̍̅̀ư̷̼͍͎̆͒̃ͅ ̵͕̽̊͒k̸̛͈̦̼̖͖̹̉̈̂n̴̝̝͔̞̣͎̭͛̓̏o̴̞̠̩̝̗͂̓͋͒̑͗̀w̴̻͖̠̅̌̾̔̌͠͝ ̵̨̦̯̖̬̼́̊̃w̸͇͍͈͈͉͔̐͋͘͘ḩ̵̯̘̫́̃̎a̸̳̤͍̩̿ͅţ̸̢̮͙̹͆̏̿̿̄͠'̸̞̮͕̞͙̹̦͌͘s̸͇̬̐̇͗̾͠ ̷̦̘͙̤̣͕̆͗̌̋̏̍͘h̵̺͉̓͗̆a̵͙̪̿̀̒͋̎́͝p̶̭͔̯̰̖̺̉͋p̴̨̣͙̣̠̼͇̍̓͑͝ë̴̢̙͙̭́́̇̽̐͠ņ̷̜̀̄ǐ̴̫̟͈̔̓͜n̶̫̠̮͈͔̕g̴͇̝̭͈̥̎͜͝ͅ?̸̤͓͒͐̊`, noTypewriter: true, additionalDelay: () => 1000 },
            { speaker: `inim`, text: `I̵̛̗̻̟̟̯͇̜̳͙̘̬̠̭̭͊̐̍͊͒̌͆͒͐'̸̛̮̺̞͓͓̹̱̝̖̼̳͇̩̈́̀̍̀̅̓͌̀̋̈́̿̕͘͜͠ṁ̷̬̯͓̰̿̓̔̋̆̔̈̎̇̇̾̚ ̶̛̯̙̪͎͙͓̹̮̞̰̻̱͛̇̾͗̐̏͝ş̴̯͕̱̲̮͈̱̄̋̐͛͐̐̂̍̅̕ͅu̸̝͒̄͑͊͌̓͗̌̆͒̒͆̈́̏͝r̷̢̢͇̭̗̗͎͇̪͕̠̠̻͊͋͛̉̇͌̓̽̈̓̋̒̀͌̃̕͠e̷͎̟̘̪̣̪̳̜͛̎́̆̋̅̓ ̵̢̡̛̗̻̩̮̩̤͙̩̫̘̦̝̅̈́̾̅͛̈́͌̌͆̉ͅi̴̠̭͚̫̣̠͇͉̓͆͒ͅṭ̸̡̠̲̻̠̯̈́̒̓́͆͂'̷̗̬̜̫͚̫̪̾̿̓̌̈́̽͆̓͝͠s̸̡̢̗̣̗̣͚͉̝͙̗̭̦̔̔͆̅̄̌͆̏̽͜͠ ̶̪̦̯̖̜̺̯̼͂̀n̴͚̫̊̑͐͆̊͐̆̀̋̕̚͠͝o̴͚͕̺̣͚͎͙͓͐̔͆̈́t̴̨̡̪͇̥̮̬͍͉͉̩͎̰̔h̴̨̛͇̙͊̇̈́͂̆͋́̈́͛̋͘̚͘̚i̵̲̹̹͉̳̲̱͙͔͙̭͕̟̟̇͛͒̏́͂̆̃́͑̏̿̕̚͘͜͜͠n̷̨̘̙͖̫̲̳̹̻̯̲̹̥̟̜̎̔̍̔̊͌̂͂̔͘̕ͅģ̴͉͇̗̹̪̩́̈́͌͝,̴͕̜̤̲̗͌̂͝͝ ̵̧̢̜̳̣̳̘̲̟͖̙̞͍̠̼̖̩̗̍͂̓̅̈́̿͝͝p̸̢̥̗̪͉̣̦̜̦̰̩͉͒͗̍͋̈̌͐͌r̴̻̠̜̿̿͂͌̇́̔̽͆̐̑̽̃̐̕͝o̴͓͐̒̈͛̂͛̒̆b̷̛̠͐̽̽͗̆̏̌͋̐͑̎̽́̓͌̚͘a̷̙̥̎̀̀b̸̝͙̯̥̫͈̖̘͙̖̾̌͆͂͑ļ̷͍̘͖̫̓͌͋y̷̡͙̺̥̝̼̱̠̿͋̈͌̈́̑̓̅̾͒̄͘͜͝ ̶̨̨̢̹͇̙̖̩̭̝̥̖̹̠̤͈͙͙̈́̾̀̔j̵̛̱̳̳̼͍̮͂̐̍̽̀̽̂͒͋͆̄̊̈́͗̚͝ư̵̭͈͓͔̰̫͈͎̞͔̳͎̘̘̄́̊͗̄́͝s̸̬̹̃̉̌͛̏̋͆̏̿̅̾̈́̚ṫ̴̨̲͛͐̅̋̒̐̇̂͑͂̕͜͝͝ ̵̡̣̯̭̤̮̘̯̳͍̦̣̦̭͍̆̆͋̆̄̊ͅş̵̧̨͎̳̲͖̯̱͉̗̠̮͇̰̲̏̈́̑͜͜ȏ̷̢̜̓́͋̍̿͊́̑̓̑̈́̀̏̐̊m̴̛͇̤͗̎̋́̅̈́͂̂è̴̱͖̱̥̦̦̟̣̂̇͊̋͜͝ ̴̤̓̍̇̓̓̔̊̃̄̀̀̾̋͊͠͠r̸̡̢̢̹̥̼̯̰̮̫̘̬̰̭̣̀̌̓̾̽̄͜ố̷̢̰̟̜̼̘̪̖̲̖͚̮͔̘̱͖̦̝̈̅͒̊̊̑̌́͂̃͠ṳ̷̢̢̬̩̗͔͕͖͈͉̭̘̱̖͇͍̗̒͗̀͒̏̐́̂̑͝ẗ̶͎̣̟̱̰̦͙́̽́́͐͑̍̆͋̚͠͝ǐ̶̛̻̅̆̅̈́͝͠͝n̸̛̻̗͕̿̉̆̔̎̄͋̌̓̒̚ȅ̷̡͉͎̮̹̩̫͎̓̊ ̸̨̛̛͓̫̪̺̪̤̹̹̼̰̹͑͆̌͛̋͊̋̊̏͗͘͜͝͝s̸̛̬͋̽͛͌̿̄̽̿͑͌͌͋̐̔̓͠͝ȩ̸͕͉̪͖̥́̉̋̈́̇̃̋́̓̆͊̈́̎̾r̸̢̧̢̟̺̣͉̻̬͕͉͖̭̔̋̽͗̓̾v̷͇̯̯̭̖̰͕̲͎̪̩͕͎̖͊̋́̕ͅȩ̵̢͍̙̪̬̻̞͓̮̦͚͔͔̱̘̋̉̀͑̈́͜r̸̛̮̳͔͖͚̃̒͐̐͛̆͗̋̀̌͘ ̴̨̡͇̭̘̬̈̊͐͋̊͝m̷̡̨̻̪͇̪̯͕̩̫̝̱̝͔̹̈́͗̍̎͆̈́̿̚a̴̧̢͈͕͓̥̖̰̺͖͎̬͇̐̀̑̇į̶͍͉͒̆͗̉̾͌͗͌͝n̵̡̠̹̤̞͙̦͎̻̱͕̮̥̙̍̇͆̊́̿͒̈́̀̌̂͐̊̿͘͘t̶̛̲͖̼̠̞̐̾̓̈̎̄͆̐̋́̈́̾͘̕͠͠͝ę̴̨͕͓̞̭̮͈͎͈̻̯̖̘̎̆̍̏̂̉͌̽̑͂̚͠ņ̴̡̻̣̣̼̼̤̯͉̊͌̏͗̀̆̓̀ạ̶̡̯̩̑͋̓̈́̃́͊̋̇͌̂̓̃̀̓͊͂n̷̢̨̢̢̢̘̟̯͕̻̺͕̟͍̈́̄̒͊̀̊͗̂̈́̀͋̾́̕͜͠͠͝ç̵̙͎̿̏́͠͠e̷̛̻̩̫̭͈̾̿͑̈́̔̀̕̚͝͝.̵̢̯̳͙͕̘̭̪̣͙̪̪̀̓̉͆̆̿̿̀̇̒͆͑͑̍̚͠͠`, noTypewriter: true, additionalDelay: () => 1000 },
            { speaker: `dask`, text: `T̸̢͎̞̙͈͉̠̰͈͚̹̱͑̍̄̈́̇̅͊̎̈́̇̚͘h̶̡̡̧̛̺̫͍̻̜̥̼̥̤̖̦̰̗̲̩̗̹̤̞̣̲͇͚̤͖͔̖̫̤̑͌̔͂͛̔͆͐́̍̒͑̽̀̌͝ͅį̸̧̡̧̹͓͙̗̮͉̼̟̩͎̜͇̤̩̖̺̱̞̺͔̟̣͉̠̺̯̞̱͚̫͐ͅͅs̶̨̨̢̛̘̳͖̙̻̞̥̖̲͙̺̥̦̫͉̪̞̥̤̠̼̯̻̒́̔͐͂̍̋̈́̌̇͛̓͘̕͜ ̸̢̛͉̮̟̤̙̺͖̙̗̭͎̗̣͓̳̱̗̝͈̜̜̪̭̤͕̥͓͇̠̠͌̃̇̉̓̌͌͑͗̆̏̀̾̂̐̌̃̕͘̕͜͠ͅd̴̨̧̡̢̰̥̻̜̥͈̞͍̪̱͇̯̬͇̳̰̜̜͖̰͕͊̅̓̇̾̅̀̓̆̔́̆̋̃̒̔͌̆̀̍̾̓̽̚͜ͅo̶̧̨̠̝̲͙͍͎͖͎̪̤̟̖͓̩̟͚͇̮͎̞̘͍͔̼̝̞̹̓̄̀̌̇͐͛͆͐́́̃̓̌̚͘̚͜e̴̡̨̼̞̬̰͚͓̟̹̟͇͎̠̺̩̠̦̝̩̭͈̦̽͐̃̇̋͜ͅͅͅs̴̢͓̥̙̼̭̥̭̗̹͈̩̼̬͉̥̯͖̆̊̏̀́̅̄̊̉̔̔̏̍̓̆́́͂̆̎́̽̉̇̑̓̇͆̋̀͒͜͝͠͠n̸̢̨̡̡͉̳̤̻͖̩̳̠͙͍̫̭̜͎̫̭̤̹̖̮̳̱̭̻̜̰̱̺̭̙͇̾̔͛͂͑̉̒̈̈̏̽̈͊̓̄͌̓̀͌͗̄̓̿͒͋̕͜͝͝'̵͙̬̏͊̉̂̋̓̊͝t̵͇͈̯̯̏̇̒ ̶̼̱͔̬̦̖̭̙͖̮̳̳̭̩͉͉̰͙͖̺̖̭̱̯̱̟̄̈́̓̓̔̅̋̀́͋̄̏͌́̔̽́̑͌̈́̓̊̒́̅̏̕̕ͅf̵̨̧̧̡̜͚͍̫͈̟̭̘͇̹̣͈̮̲̰͉͕̪̮͓̭͕͎͉̪̬̦̐̈͊̄̂͜͜ȇ̵̬̳͊͌̂͑͗̄̊̎͐̊̑̽͛̾̀̃̓͊̄̀͋̿̂͂̽͘̚͘͝͠͝ẽ̸̡̢̡͙̹̣͓̞̟͚̝̺̲̱̦̳̞̙̳̱̫̯̤̝̣̖̭̠̲̪̬̝̿̿̆͒̈́̋͗̆͘͘͝ͅl̴̨̢̢̢͇̘̱̬̩̬̠̼͚̮͈̪̟̘̱͍̲̺̾ͅ ̶̢̢̨̢̧͈̗͖̬̭͍̰̹͈̦͙̱̯̦̥̯̫̺̮̣̙̝̻̙̗͈͎̉̃́̔͂̈̈́̾̏̉̉̆̈́̿͘̚͝l̵̨̢̛̤̙͇͎͇̬̖̻̫̻̼͕̩̫͚͙̪̙̫͈̦͇͙̲̘̻̱͉͍͈̎͊̽͊͐͛͗̽̀̕͜͜͝ͅͅį̷̛͔͚̜̭͔̟̬̮͉͚͔̭́̑͐̍̈͂͂͒̑̈́̀̈́̉͛͐̓̚͘͜ͅk̸̖̪͈̭̝͕̮̬̼̹̰̠̝͇͚͍̠̮̪͗̃̀͂̾̄̓̓͌̀̂̎̊͊̔͗̈͐̉̊̂̄͗͐̀̚͘̕̕͝͠͠é̴̩͎͉̩̜̹̟͈̥͍̂̿̔̇̎̇͛̇͛̍̕ ̶̢̝̫̦̘̺̼̪̝̬̓͆͐̓̊͒̔ä̶̢̡̠̲̱̗̳̥͈̺̣̯̘̤̣̝̘̙̬̠̙̼̺̺́͜ͅñ̸̢̨̢̡̧̯͔͕̗̹̙̲̲̖̻̖͓̯̰͙̊́̓̂͛̃̌̂̓͌͛͋̀̑̌̐̑̏͗̓͂̋͑͗̿̔̔͗̋̅̈́͆͆̈̐̕ͅͅͅy̶̨̡̖̘̠͉̖͉͕͕̖̤͖̱͓̱͓̗̣̰̣̙̺͙̋͜ͅ ̸̥̘̪̼̜̖́̀̓̆̓̇̏̈́̄̀͆͑̌͒͋́͊̏́̅͆̚͝͝ͅs̶͖̘̘͈̖͎͍̎͜ę̵̛̰̗̱̩̯̥͍̟̩̞̫̝̣̤̌͑̅̇̒̐̂͒̔́̑̄̒͋̐̑̆̌̄͆͑̋̔̌̀̍͂͘̕͜͝͝ŕ̵̨̡̡̢͎̗͇̩̜͈̮̱̭̤̪̹̯̱͇͓̼͎̬̺̠̃̈́̈́̍̈̐̌́̂̑̓̋̆̉̋͆̉̄̿̊͊̋̑̕͘̕͜͜͠͠ͅv̶̧̧̨̟̲̟̘͕̮͚̟̳̬͉̗͙̮̯̭̝̗̲̍͋̈́̌̏̑͐́̍̄̐̇̓̂͂̌̋̒̃̈́͛͋͂̀͋͘͘͜ͅę̷̢̢̢̢̢̡̳͎̖̝̼̗̖̼̫͈͇̝̺̞̦͇͔̩̥̘̰̙̬͕͎̳̟͔̮̽͛̔r̴̘̺̜̰̤͎̟̥͖̱̤͈̭̭̲̺̗̮͕̒̇̒͒̈͑̔̉̐͛̇̅͐͝͝ͅ ̶̡̛͓̬̼̮̻͇͇͈̖͚͓̣̬͖̣͚̲̠́̎́̾͋̽̉̈́͒͛͆̆͑̉̓̉͑̅̐̂̑̽̍̀̍̚̕͜͠͝m̷̡̨̠̳̲̱̩̟̰̝̤͍̦͖͖̤̗͕̻̣̹͆͂̾͋̎̾̐͆̎̂̀͆̓͝ą̷̢̤̦̺͎̳͈̹̯̰̝̬͇͚̳͈̝̹͓̫̮̺̯͚̣͚̪̂̎̍́͆̄͌̏̓̉̅̈̃̒̕̕͜͠͠i̵̡̛̮̩̲̹͎̇͋̽̒͗͋͋̈́̒̋́̐͊̆͊͑̒̀̀̓́̇̽̚͘̕͝ņ̵̧͉̼̦̫̟̗̖̦̺͙̤̺̬̫͖̺͇͍͖͚͓̗̟̼͇̭̫̓̑͐̔̏̓̌̚̚͘͜ͅͅt̴̛̥̰̪̺͉̱̭̭͛̄̍͐̊̎̿̆͊̿̓͗̄̂̊̔̃͊ę̸̡̣̻͉̬̰̬̲̞͇̱̘͓̹͈̦͖̬̺̝̱͇̠͔̿́̓̏̊͒̔̒̈́̈́̋̈̅̔̐́̊̅̔̈͐́̽̓́̍͆̓̚͜͠͠ṉ̷̢̛̤͕̼̪̙̭̮̦͖͉̼̖͎͍̗̬̣̫͕̹̱̻̪̯̥͔̭̩̦̅́̆́͆̄̇̇̀̒̓̈́̎́͂͝ͅͅą̴̢̧̢̛̠̼̟̥͈̫͙̦̯͚͚̱͓̥̖͙͇͙̤̯̹̪̼͖̰̭͚̈́͌̉̀͌́͂͒̋̅̈́́̓̀̏̏̓̋̃̐̿̈́̋̄̐̉͂̂̋̏͘͘͝͝͝ͅṇ̵̢̡̧͎̲̥͔͖̺͎̟̤̜̫̗͔̦̮̥̻̰͈̹̫̝̖̞͔̥͕͖͖̻͆́͛̂̿͛̎͆͜͜͜͝͝͠c̸̨͎̥̪̞̭̥̰̗̦̟̦̗̘̒͆͛̄̓̊͊̓̆̚͝͝͝ͅę̷̢̛̜̹̺͎̣͓͕̹̤͖͓̦̲̬̳̣̯̹̲̠̤͚͎̗̓͆͒̂̈͋͂̽͊͌́̿̽̂̆͐̚ͅ ̴̢̧̛̛̤̱͙̠̹̟̱̰̭̬̻͍̟̤̘͈͔͚͔̰̮͈̦̮̤͕͗́̆̂̈̐̄̽̀̀͑̀̎͂͒͑̈̉̿̾͒̑̈̑̀̊́͂͘̕͠ͅͅĨ̶̡̡̢͙̬̲̲̰͖̮̼̰̱̫͇͕̯̺͓̙̤̝̺̟̺̲̖̰̜̦̟̘̻́̉͒͑̊͋̊̽̕͝'̴̧̲͍͚̥̟̻͈̆͗͊͑̃̀͋̄͌̇̃̑͋̚͠m̸̨̢̛̝͓̆́̈́̓̊̇̾̓̄̊̽̾͑̀̔̽́͂̃̔͗̿͌̉̔̑͒̽̀̈͝͝͠ ̴͇̻͙̖́͑͗̿̔͗a̴̡̢̧̧̢̢͍̜̩̝̬̪̺̱͈̼̯̦̤͙̹̫̞͕̦͚̠̟͓̺̪̙̥̰̯̠̩̐̆͛͗̄̇́̂̇w̴̧̧̛̠̱̪̙̜̙͎̜͙͍̜̰̻̓͊̋̔̈́͋̑͆̓̿̊̉̆̿̊͘ͅͅͅǎ̴̧̨̡̧̨̨̳̦̱̲̭̩̹̣̪͕̜̯̝̖̺̗̬̳̖͇̗̟̮̼̲̘͍͖̱̩̓̿̄̅́͋̑̒̿̚̚͜͝r̵̛̬̦͉͔̣͇͉͎̝̻͎͖̞͉̟̦̙̮̙̟̃̽͒́͒̈́͊͗̋̒͗̓̓̾̍̀̈́ͅȩ̴̢̧̨͓͓͙͓̱̤͈̲̳͚͈͎͔̯̪̠̜̥̙͍͙̪͖͎̣͍͙̩̤̰̠͕̅͆̿͒̔̎̀̈̓̅̐͂̎̉̈́͋̇̎͋͂̒̇̕͜͠͠͝ ̶̛̮͈̰͔͔͍͆͋̔̉͂̈́̆́̇̓͂̿̐̚͝o̶̬̦̥̬̟̝̗͖̝͓̜̝̫͚̻̬͓̠̦̗͑̑̊̑̉͒̌̊̈́͊̂͋̌̂̀͆͠͝f̵̛̥́̊͑̌̅͆͆̓̑͌̈̈́̈̀̕̕͠.̴̧̛̗̼͊̔͗̉̎͘.̶̢͉͙͕̥̳̹͙̤͕̪̰̉̆̃͐͗͊̇͂̈́̓̃̓̿̃̅͂̔̉͗̑̅̿͐̈́̅̍̍̾́̾̀͘͘͝͠͠`, noTypewriter: true, additionalDelay: () => 1000 },
            { speaker: `green`, text: `=== RESET PROCEDURE COMPLETE ===` },
            { speaker: `green`, text: `<hr>` },
        ],
        links: [ ], autoLink: () => resetTarget,
    },
    "thanks for playing": { utterances: [ { speaker: `inim`, text: `Sounds good buddy. Hope we helped you think just a little bit differently.` }, ], links: [ ] },
}
