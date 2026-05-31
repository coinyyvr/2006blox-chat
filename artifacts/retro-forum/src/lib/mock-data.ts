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
    avatarUrl?: string;
  };
  date: string;
  content: string;
}

export const CATEGORIES: ForumCategory[] = [
  {
    id: "cat1",
    name: "General",
    forums: [
      {
        id: "f1",
        name: "General Discussion",
        description: "Talk about anything and everything here.",
        threads: 1245,
        posts: 14502,
        lastPost: {
          date: "Oct 24, 2004 3:45 pm",
          author: "CoolDude99",
          threadId: "t1",
          threadTitle: "What are you listening to right now?"
        }
      },
      {
        id: "f2",
        name: "Introductions",
        description: "New to the forums? Introduce yourself!",
        threads: 852,
        posts: 3410,
        lastPost: {
          date: "Oct 24, 2004 1:12 pm",
          author: "NewbieFan",
          threadId: "t2",
          threadTitle: "Hi from California"
        }
      }
    ]
  },
  {
    id: "cat2",
    name: "Technology",
    forums: [
      {
        id: "f3",
        name: "Hardware & Builds",
        description: "Discuss PC parts, case mods, and cooling solutions.",
        threads: 532,
        posts: 8901,
        lastPost: {
          date: "Oct 23, 2004 11:20 pm",
          author: "Overclockerz",
          threadId: "t3",
          threadTitle: "Pentium 4 vs Athlon 64 - The Ultimate Showdown"
        }
      },
      {
        id: "f4",
        name: "Software & OS",
        description: "Windows XP, Linux, and software troubleshooting.",
        threads: 410,
        posts: 3205,
        lastPost: {
          date: "Oct 22, 2004 9:05 am",
          author: "LinuxGuru",
          threadId: "t4",
          threadTitle: "Help with Ubuntu installation"
        }
      }
    ]
  }
];

export const THREADS: Record<string, Thread[]> = {
  "f1": [
    {
      id: "t1",
      forumId: "f1",
      title: "What are you listening to right now?",
      author: "MusicFan",
      replies: 452,
      views: 12040,
      isPinned: true,
      lastPost: {
        date: "Oct 24, 2004 3:45 pm",
        author: "CoolDude99"
      }
    },
    {
      id: "t5",
      forumId: "f1",
      title: "Forum Rules - READ BEFORE POSTING",
      author: "Admin",
      replies: 0,
      views: 50212,
      isPinned: true,
      isLocked: true,
      lastPost: {
        date: "Jan 1, 2004 12:00 am",
        author: "Admin"
      }
    },
    {
      id: "t6",
      forumId: "f1",
      title: "Did anyone watch Lost last night?",
      author: "TVJunkie",
      replies: 15,
      views: 340,
      lastPost: {
        date: "Oct 24, 2004 2:10 pm",
        author: "IslandBoy"
      }
    },
    {
      id: "t7",
      forumId: "f1",
      title: "Funny flash animation (Numa Numa)",
      author: "InternetGuy",
      replies: 32,
      views: 890,
      lastPost: {
        date: "Oct 23, 2004 8:40 pm",
        author: "LaughingOutLoud"
      }
    }
  ]
};

export const POSTS: Record<string, Post[]> = {
  "t1": [
    {
      id: "p1",
      threadId: "t1",
      author: {
        name: "MusicFan",
        joinDate: "Feb 2003",
        posts: 1450,
        rank: "Senior Member"
      },
      date: "Oct 20, 2004 10:15 am",
      content: "Let's keep this going! I'll start.\n\nGreen Day - American Idiot\n\nWhat about you guys?"
    },
    {
      id: "p2",
      threadId: "t1",
      author: {
        name: "Rocker99",
        joinDate: "Mar 2004",
        posts: 210,
        rank: "Member"
      },
      date: "Oct 20, 2004 11:30 am",
      content: "Linkin Park - Boulevard of Broken Dreams... wait no that's Green Day too lol.\n\nActually listening to The Killers - Meteora... wait.\n\nI mean Evanescence - Mr. Brightside!\n\n_________________\n*~*~ Life is a highway ~*~*"
    },
    {
      id: "p3",
      threadId: "t1",
      author: {
        name: "CoolDude99",
        joinDate: "Aug 2004",
        posts: 42,
        rank: "Junior Member"
      },
      date: "Oct 24, 2004 3:45 pm",
      content: "Outkast - Mr. Brightside haha.\n\nHonestly I'm just listening to some MP3s I downloaded from Kazaa. Don't tell anybody ;)"
    }
  ],
  "t5": [
    {
      id: "p10",
      threadId: "t5",
      author: {
        name: "Admin",
        joinDate: "Jan 2001",
        posts: 5000,
        rank: "Administrator"
      },
      date: "Jan 1, 2004 12:00 am",
      content: "Welcome to the forums!\n\nPlease follow these simple rules:\n1. No flaming or trolling.\n2. Do not double post. Use the edit button.\n3. Keep signatures under 500x100 pixels.\n4. Search before you post!\n\nFailure to comply will result in a ban."
    }
  ]
};

export const FORUM_STATS = {
  totalPosts: 45210,
  totalMembers: 1250,
  newestMember: "Xx_Sniper_xX"
};
