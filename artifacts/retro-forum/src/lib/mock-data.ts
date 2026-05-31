export interface ForumCategory {
  id: string;
  name: string;
  forums: Forum[];
}

export interface Forum {
  id: string;
  name: string;
  description: string;
  threads: number;
  posts: number;
  lastPost?: {
    date: string;
    author: string;
    threadId: string;
    threadTitle: string;
  };
}

export interface Thread {
  id: string;
  forumId: string;
  title: string;
  author: string;
  replies: number;
  views: number;
  isPinned?: boolean;
  isLocked?: boolean;
  lastPost: {
    date: string;
    author: string;
  };
}

export interface Post {
  id: string;
  threadId: string;
  author: {
    name: string;
    joinDate: string;
    posts: number;
    rank: string;
    titleColor?: string;
  };
  date: string;
  content: string;
  signature?: string;
}

export const CATEGORIES: ForumCategory[] = [
  {
    id: "cat1",
    name: "2006BLOX CHAT",
    forums: [
      {
        id: "f1",
        name: "General Discussion",
        description: "This is the place for conversation about all things 2006blox. Posts not pertaining to the community will be mercilessly pruned by moderators.",
        threads: 2456,
        posts: 21419,
        lastPost: {
          date: "Today @ 12:11 AM",
          author: "xX_Blox_Master_Xx",
          threadId: "t1",
          threadTitle: "What are you building right now?"
        }
      },
      {
        id: "f2",
        name: "Creations Gallery",
        description: "Discuss your creations and share the secrets of your success. Post requests for help with building here.",
        threads: 762,
        posts: 4688,
        lastPost: {
          date: "Today @ 12:29 AM",
          author: "BrickBuilder2006",
          threadId: "t8",
          threadTitle: "My new obby is finally done!!"
        }
      },
      {
        id: "f3",
        name: "Support, Bug Reports, Suggestions",
        description: "Having trouble or want to propose a way to make 2006blox better? Share your feedback here. Please post requests for building help in Creations Gallery.",
        threads: 1053,
        posts: 5781,
        lastPost: {
          date: "16 Jun 2007 11:27 PM",
          author: "R0mb0m",
          threadId: "t9",
          threadTitle: "cant log in help plz"
        }
      },
      {
        id: "f4",
        name: "Off Topic",
        description: "Feel like talking about stuff other than 2006blox? Post here.",
        threads: 351,
        posts: 4021,
        lastPost: {
          date: "16 Jun 2007 11:24 PM",
          author: "TREE999",
          threadId: "t10",
          threadTitle: "what grade r u in"
        }
      }
    ]
  },
];

export const THREADS: Record<string, Thread[]> = {
  "f1": [
    {
      id: "t0",
      forumId: "f1",
      title: "Forum Rules - READ BEFORE POSTING",
      author: "Administrator",
      replies: 0,
      views: 99999,
      isPinned: true,
      isLocked: true,
      lastPost: { date: "Jan 1, 2006 12:00 AM", author: "Administrator" }
    },
    {
      id: "t1",
      forumId: "f1",
      title: "What are you building right now?",
      author: "xX_Blox_Master_Xx",
      replies: 234,
      views: 8820,
      isPinned: true,
      lastPost: { date: "Today @ 12:11 AM", author: "xX_Blox_Master_Xx" }
    },
    {
      id: "t2",
      forumId: "f1",
      title: "does anyone else think guest should be removed",
      author: "pro_bloxer99",
      replies: 87,
      views: 2340,
      lastPost: { date: "Today @ 12:03 AM", author: "noobslayer2007" }
    },
    {
      id: "t3",
      forumId: "f1",
      title: "i got hacked HELP",
      author: "CoolBrick44",
      replies: 23,
      views: 901,
      lastPost: { date: "Yesterday 11:58 PM", author: "SafetyMod" }
    },
    {
      id: "t4",
      forumId: "f1",
      title: "Rate my username 1-10",
      author: "xXdarkness_lordXx",
      replies: 156,
      views: 4211,
      lastPost: { date: "Yesterday 10:30 PM", author: "BrickGod500" }
    },
    {
      id: "t5",
      forumId: "f1",
      title: "favorite game on 2006blox?? (POLL)",
      author: "GameMaster777",
      replies: 312,
      views: 10500,
      lastPost: { date: "Yesterday 9:45 PM", author: "ObbyCrafter" }
    },
    {
      id: "t6",
      forumId: "f1",
      title: "i think tix should be worth more robux",
      author: "TixTrader55",
      replies: 201,
      views: 5672,
      lastPost: { date: "16 Jun 2007 8:22 PM", author: "EconomyGuy" }
    },
    {
      id: "t7",
      forumId: "f1",
      title: "who was the first person to join 2006blox",
      author: "Historian1337",
      replies: 44,
      views: 1899,
      lastPost: { date: "16 Jun 2007 6:01 PM", author: "OGmember2006" }
    }
  ],
  "f2": [
    {
      id: "t8",
      forumId: "f2",
      title: "My new obby is finally done!!",
      author: "BrickBuilder2006",
      replies: 31,
      views: 870,
      lastPost: { date: "Today @ 12:29 AM", author: "BrickBuilder2006" }
    }
  ],
  "f3": [
    {
      id: "t9",
      forumId: "f3",
      title: "cant log in help plz",
      author: "R0mb0m",
      replies: 5,
      views: 120,
      lastPost: { date: "16 Jun 2007 11:27 PM", author: "R0mb0m" }
    }
  ],
  "f4": [
    {
      id: "t10",
      forumId: "f4",
      title: "what grade r u in",
      author: "TREE999",
      replies: 88,
      views: 2201,
      lastPost: { date: "16 Jun 2007 11:24 PM", author: "TREE999" }
    }
  ],
  "f5": [
    {
      id: "t11",
      forumId: "f5",
      title: "how do i make a door that opens",
      author: "LuaWiz123",
      replies: 12,
      views: 340,
      lastPost: { date: "Today @ 1:05 AM", author: "ScriptKing99" }
    }
  ],
  "f7": [
    {
      id: "t13",
      forumId: "f7",
      title: "hi im new here",
      author: "newkid2007",
      replies: 18,
      views: 444,
      lastPost: { date: "Today @ 12:52 AM", author: "WelcomeBot" }
    }
  ]
};

export const POSTS: Record<string, Post[]> = {
  "t1": [
    {
      id: "p1",
      threadId: "t1",
      author: {
        name: "xX_Blox_Master_Xx",
        joinDate: "Mar 2006",
        posts: 3241,
        rank: "Senior Member",
        titleColor: "#cc6600"
      },
      date: "Jun 14, 2007 8:00 PM",
      content: "ok so i thought we could have a thread where everyone says what theyre working on right now\n\nill start: im making a huge castle with working doors and cannons. been working on it for 3 weeks. its gonna be so cool\n\nwhat about you guys",
      signature: "xX_Blox_Master_Xx | Leader of the Shadow Clan | 3000+ posts!"
    },
    {
      id: "p2",
      threadId: "t1",
      author: {
        name: "ObbyCrafter",
        joinDate: "Aug 2006",
        posts: 891,
        rank: "Member"
      },
      date: "Jun 14, 2007 8:14 PM",
      content: "im working on stage 47 of my mega obby!! its gonna have lava and moving platforms. already have 46 stages done :D\n\nalso i put a secret room in stage 23 that nobody found yet lol",
      signature: "my obby place id: 12345 || check it out!!"
    },
    {
      id: "p3",
      threadId: "t1",
      author: {
        name: "BrickGod500",
        joinDate: "Jan 2007",
        posts: 102,
        rank: "Junior Member"
      },
      date: "Jun 14, 2007 9:02 PM",
      content: "working on a sword fighting game. i got a working kill script from scriptinghelp forum. its pretty laggy tho idk how to fix it\n\ncan someone help with lag??"
    },
    {
      id: "p4",
      threadId: "t1",
      author: {
        name: "LuaWiz123",
        joinDate: "Jun 2006",
        posts: 1567,
        rank: "Veteran Member",
        titleColor: "#006600"
      },
      date: "Jun 14, 2007 9:18 PM",
      content: "For lag with kill scripts, try putting a wait() in your loops. A lot of beginners forget this and it freezes everything.\n\nAlso I'm currently working on a roleplaying game with working NPCs. Scripted a whole dialog system from scratch. Took forever but it actually works now!",
      signature: "Lua scripter since 2006 | will help with scripts for free | just ask"
    },
    {
      id: "p5",
      threadId: "t1",
      author: {
        name: "noobslayer2007",
        joinDate: "Apr 2007",
        posts: 28,
        rank: "Newbie"
      },
      date: "Jun 15, 2007 12:33 AM",
      content: "im not building anything rn because i dont know how to script :( i just play other peoples games. can someone make me a game"
    },
    {
      id: "p6",
      threadId: "t1",
      author: {
        name: "xX_Blox_Master_Xx",
        joinDate: "Mar 2006",
        posts: 3241,
        rank: "Senior Member",
        titleColor: "#cc6600"
      },
      date: "Today @ 12:11 AM",
      content: "noobslayer2007 wrote:\nim not building anything rn because i dont know how to script\n\nlol dude go watch some tutorials first before asking people to make you stuff\n\nanyways update on my castle: i added a working moat with water physics!! it actually slows you down when you walk through it",
      signature: "xX_Blox_Master_Xx | Leader of the Shadow Clan | 3000+ posts!"
    }
  ],
  "t0": [
    {
      id: "p0",
      threadId: "t0",
      author: {
        name: "Administrator",
        joinDate: "Jan 2006",
        posts: 999,
        rank: "Administrator",
        titleColor: "#cc0000"
      },
      date: "Jan 1, 2006 12:00 AM",
      content: "Welcome to 2006blox Chat! Please follow these rules or face a ban.\n\n1. No flaming, trolling, or personal attacks.\n2. No spam. Do not double post - use the Edit button.\n3. Keep signatures under 500x100 pixels.\n4. No inappropriate content of any kind.\n5. Search before you post - your question may already be answered!\n6. Do not beg for items, tix, or robux.\n7. Report hackers to mods, do not post their usernames publicly.\n8. English only in the main forums. Other languages in Off Topic.\n\nViolations will result in a warning, then a temporary ban, then a permanent ban.\n\nHave fun and be excellent to each other!",
      signature: "2006blox Chat Administration Team"
    }
  ],
  "t11": [
    {
      id: "p20",
      threadId: "t11",
      author: {
        name: "LuaWiz123",
        joinDate: "Jun 2006",
        posts: 1567,
        rank: "Veteran Member",
        titleColor: "#006600"
      },
      date: "Today @ 1:05 AM",
      content: "To make a door that opens you need to use a ClickDetector and a script like this:\n\nscript.Parent.ClickDetector.MouseClick:connect(function()\n    script.Parent.CFrame = script.Parent.CFrame * CFrame.Angles(0, math.rad(90), 0)\nend)\n\nPut that script inside the door brick. The ClickDetector makes it so players can click it. The CFrame line rotates it 90 degrees when clicked.\n\nHope that helps! Let me know if you have questions.",
      signature: "Lua scripter since 2006 | will help with scripts for free | just ask"
    },
    {
      id: "p21",
      threadId: "t11",
      author: {
        name: "ScriptKing99",
        joinDate: "Feb 2007",
        posts: 445,
        rank: "Member"
      },
      date: "Today @ 1:05 AM",
      content: "what LuaWiz said but also u might wanna add a debounce so people cant spam click it and glitch through walls. debounce is basically a variable that stops the script from running twice at once\n\nlocal db = false\nscript.Parent.ClickDetector.MouseClick:connect(function()\n    if not db then\n        db = true\n        -- door opening code here\n        wait(1)\n        db = false\n    end\nend)"
    }
  ],
  "t13": [
    {
      id: "p30",
      threadId: "t13",
      author: {
        name: "newkid2007",
        joinDate: "Jun 2007",
        posts: 3,
        rank: "Newbie"
      },
      date: "Today @ 12:01 AM",
      content: "hi everyone!! im new to 2006blox and this forum. i found this site from my friend at school. looks really cool. my favorite thing to do is play obbies and sword fights. hope to make some friends here!!\n\nmy username is newkid2007 if anyone wants to play sometime"
    },
    {
      id: "p31",
      threadId: "t13",
      author: {
        name: "WelcomeBot",
        joinDate: "Jan 2006",
        posts: 5021,
        rank: "Community Helper",
        titleColor: "#006699"
      },
      date: "Today @ 12:52 AM",
      content: "Welcome to 2006blox Chat, newkid2007!! :D\n\nHere are some tips for getting started:\n- Read the forum rules before posting\n- Check out the Creations Gallery for cool builds\n- Go to Scripting Help if you want to learn how to make games\n- Join a clan in the Clans & Groups forum\n\nSee you around the forums! Don't be afraid to ask if you need help.",
      signature: "Community Helper since 2006 | Here to help new players!"
    }
  ]
};

export const FORUM_STATS = {
  totalPosts: 58043,
  totalMembers: 3872,
  newestMember: "newkid2007",
  mostOnline: 412
};
