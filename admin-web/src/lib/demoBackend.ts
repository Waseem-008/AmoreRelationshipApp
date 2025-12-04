// Demo Mode Backend Service - Simulates Supabase for local development

interface User {
  id: string;
  email: string;
  created_at: string;
  intake_completed_at: string | null;
  couple_id: string | null;
  partner_email?: string;
}

interface Couple {
  id: string;
  user1_id: string;
  user2_id: string;
  shared_streak: number;
  last_session_at: string | null;
  created_at: string;
  user1_email?: string;
  user2_email?: string;
}

interface Session {
  id: string;
  user_id: string;
  couple_id: string | null;
  mode: 'voice' | 'chat';
  status: 'in_progress' | 'completed' | 'failed';
  started_at: string;
  completed_at: string | null;
  transcript: string | null;
  user_email?: string;
}

// In-memory storage
let users: User[] = [
  {
    id: '1',
    email: 'alice@example.com',
    created_at: '2024-11-15T10:30:00Z',
    intake_completed_at: '2024-11-15T10:45:00Z',
    couple_id: 'c1',
  },
  {
    id: '2',
    email: 'bob@example.com',
    created_at: '2024-11-16T14:20:00Z',
    intake_completed_at: '2024-11-16T14:35:00Z',
    couple_id: 'c1',
  },
  {
    id: '3',
    email: 'carol@example.com',
    created_at: '2024-11-20T09:00:00Z',
    intake_completed_at: '2024-11-20T09:15:00Z',
    couple_id: 'c2',
  },
  {
    id: '4',
    email: 'david@example.com',
    created_at: '2024-11-21T16:45:00Z',
    intake_completed_at: '2024-11-21T17:00:00Z',
    couple_id: 'c2',
  },
  {
    id: '5',
    email: 'eve@example.com',
    created_at: '2024-11-25T11:30:00Z',
    intake_completed_at: '2024-11-26T09:20:00Z',
    couple_id: 'c3',
  },
  {
    id: '6',
    email: 'frank@example.com',
    created_at: '2024-11-25T14:15:00Z',
    intake_completed_at: '2024-11-26T10:00:00Z',
    couple_id: 'c3',
  },
  {
    id: '7',
    email: 'grace@example.com',
    created_at: '2024-11-28T08:45:00Z',
    intake_completed_at: '2024-11-28T09:30:00Z',
    couple_id: 'c4',
  },
  {
    id: '8',
    email: 'henry@example.com',
    created_at: '2024-11-28T11:20:00Z',
    intake_completed_at: '2024-11-28T12:10:00Z',
    couple_id: 'c4',
  },
  {
    id: '9',
    email: 'iris@example.com',
    created_at: '2024-11-30T15:00:00Z',
    intake_completed_at: '2024-11-30T15:45:00Z',
    couple_id: 'c5',
  },
  {
    id: '10',
    email: 'jack@example.com',
    created_at: '2024-11-30T16:30:00Z',
    intake_completed_at: '2024-11-30T17:00:00Z',
    couple_id: 'c5',
  },
  {
    id: '11',
    email: 'kate@example.com',
    created_at: '2024-12-01T10:15:00Z',
    intake_completed_at: '2024-12-01T11:00:00Z',
    couple_id: 'c6',
  },
  {
    id: '12',
    email: 'liam@example.com',
    created_at: '2024-12-01T13:45:00Z',
    intake_completed_at: '2024-12-01T14:20:00Z',
    couple_id: 'c6',
  },
  {
    id: '13',
    email: 'mia@example.com',
    created_at: '2024-12-02T09:30:00Z',
    intake_completed_at: '2024-12-02T10:15:00Z',
    couple_id: null,
  },
  {
    id: '14',
    email: 'noah@example.com',
    created_at: '2024-12-03T14:00:00Z',
    intake_completed_at: null,
    couple_id: null,
  },
  {
    id: '15',
    email: 'olivia@example.com',
    created_at: '2024-12-04T08:30:00Z',
    intake_completed_at: '2024-12-04T09:00:00Z',
    couple_id: null,
  },
];

let couples: Couple[] = [
  {
    id: 'c1',
    user1_id: '1',
    user2_id: '2',
    shared_streak: 7,
    last_session_at: '2024-12-04T19:00:00Z',
    created_at: '2024-11-16T15:00:00Z',
  },
  {
    id: 'c2',
    user1_id: '3',
    user2_id: '4',
    shared_streak: 5,
    last_session_at: '2024-12-04T18:30:00Z',
    created_at: '2024-11-21T17:30:00Z',
  },
  {
    id: 'c3',
    user1_id: '5',
    user2_id: '6',
    shared_streak: 4,
    last_session_at: '2024-12-03T21:15:00Z',
    created_at: '2024-11-26T12:00:00Z',
  },
  {
    id: 'c4',
    user1_id: '7',
    user2_id: '8',
    shared_streak: 3,
    last_session_at: '2024-12-04T17:45:00Z',
    created_at: '2024-11-28T13:00:00Z',
  },
  {
    id: 'c5',
    user1_id: '9',
    user2_id: '10',
    shared_streak: 2,
    last_session_at: '2024-12-03T20:30:00Z',
    created_at: '2024-11-30T18:00:00Z',
  },
  {
    id: 'c6',
    user1_id: '11',
    user2_id: '12',
    shared_streak: 1,
    last_session_at: '2024-12-04T16:00:00Z',
    created_at: '2024-12-01T15:00:00Z',
  },
];

let sessions: Session[] = [
  {
    id: 's1',
    user_id: '1',
    couple_id: 'c1',
    mode: 'voice',
    status: 'completed',
    started_at: '2024-12-04T19:00:00Z',
    completed_at: '2024-12-04T19:14:00Z',
    transcript: 'Discussed upcoming holiday plans and quality time together. User expressed excitement about shared traditions.',
  },
  {
    id: 's2',
    user_id: '2',
    couple_id: 'c1',
    mode: 'voice',
    status: 'completed',
    started_at: '2024-12-04T19:20:00Z',
    completed_at: '2024-12-04T19:33:00Z',
    transcript: 'Reflected on partner appreciation and daily small moments. Committed to more intentional date nights.',
  },
  {
    id: 's3',
    user_id: '3',
    couple_id: 'c2',
    mode: 'voice',
    status: 'completed',
    started_at: '2024-12-04T18:30:00Z',
    completed_at: '2024-12-04T18:42:00Z',
    transcript: 'Explored communication patterns during stress. Identified need for active listening during conflicts.',
  },
  {
    id: 's4',
    user_id: '4',
    couple_id: 'c2',
    mode: 'chat',
    status: 'completed',
    started_at: '2024-12-04T18:50:00Z',
    completed_at: '2024-12-04T19:05:00Z',
    transcript: 'Discussed work-life balance and making time for relationship. Set boundaries for work hours.',
  },
  {
    id: 's5',
    user_id: '5',
    couple_id: 'c3',
    mode: 'voice',
    status: 'completed',
    started_at: '2024-12-03T21:15:00Z',
    completed_at: '2024-12-03T21:28:00Z',
    transcript: 'Shared gratitude for partner support during family challenges. Discussed building stronger trust.',
  },
  {
    id: 's6',
    user_id: '7',
    couple_id: 'c4',
    mode: 'voice',
    status: 'completed',
    started_at: '2024-12-04T17:45:00Z',
    completed_at: '2024-12-04T17:59:00Z',
    transcript: 'Reflected on love languages and ways to show appreciation. Committed to weekly check-ins.',
  },
  {
    id: 's7',
    user_id: '8',
    couple_id: 'c4',
    mode: 'voice',
    status: 'completed',
    started_at: '2024-12-04T18:05:00Z',
    completed_at: '2024-12-04T18:18:00Z',
    transcript: 'Discussed future goals and aligned on financial planning. Felt closer after vulnerable conversation.',
  },
  {
    id: 's8',
    user_id: '9',
    couple_id: 'c5',
    mode: 'chat',
    status: 'completed',
    started_at: '2024-12-03T20:30:00Z',
    completed_at: '2024-12-03T20:44:00Z',
    transcript: 'Explored intimacy and emotional connection. Identified areas for growth and mutual support.',
  },
  {
    id: 's9',
    user_id: '11',
    couple_id: 'c6',
    mode: 'voice',
    status: 'completed',
    started_at: '2024-12-04T16:00:00Z',
    completed_at: '2024-12-04T16:13:00Z',
    transcript: 'First session as a couple! Discussed relationship goals and what brought them together.',
  },
  {
    id: 's10',
    user_id: '1',
    couple_id: 'c1',
    mode: 'voice',
    status: 'failed',
    started_at: '2024-12-03T20:00:00Z',
    completed_at: null,
    transcript: null,
  },
  {
    id: 's11',
    user_id: '6',
    couple_id: 'c3',
    mode: 'voice',
    status: 'in_progress',
    started_at: '2024-12-04T21:30:00Z',
    completed_at: null,
    transcript: null,
  },
  {
    id: 's12',
    user_id: '10',
    couple_id: 'c5',
    mode: 'voice',
    status: 'completed',
    started_at: '2024-12-03T20:50:00Z',
    completed_at: '2024-12-03T21:02:00Z',
    transcript: 'Shared thoughts on building daily rituals together. Excited about growing closer through intentional practice.',
  },
];

// Simulate admin user
const adminUser = {
  id: 'admin-1',
  email: 'admin@amora.app',
  role: 'admin',
};

let currentUser: typeof adminUser | null = null;

// Helper to simulate async delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Supabase Client
export const demoBackend = {
  auth: {
    signIn: async (email: string, password: string) => {
      await delay(500);
      if (email === 'admin@amora.app' && password === 'demo123') {
        currentUser = adminUser;
        return { data: { user: adminUser }, error: null };
      }
      return { data: null, error: { message: 'Invalid credentials' } };
    },
    signOut: async () => {
      await delay(300);
      currentUser = null;
      return { error: null };
    },
    getUser: async () => {
      return { data: { user: currentUser }, error: null };
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Simulate initial session check
      setTimeout(() => {
        callback('INITIAL_SESSION', currentUser ? { user: currentUser } : null);
      }, 100);
      return { data: { subscription: { unsubscribe: () => { } } } };
    },
  },

  from: (table: string) => ({
    select: (columns?: string) => {
      const query = {
        data: [] as any[],
        error: null as any,

        execute: async function () {
          await delay(300);

          if (table === 'users') {
            // Add partner emails to users
            const enrichedUsers = users.map(user => {
              if (user.couple_id) {
                const couple = couples.find(c => c.id === user.couple_id);
                if (couple) {
                  const partnerId = couple.user1_id === user.id ? couple.user2_id : couple.user1_id;
                  const partner = users.find(u => u.id === partnerId);
                  return { ...user, partner_email: partner?.email };
                }
              }
              return user;
            });
            this.data = enrichedUsers;
          } else if (table === 'couples') {
            // Add user emails to couples
            const enrichedCouples = couples.map(couple => {
              const user1 = users.find(u => u.id === couple.user1_id);
              const user2 = users.find(u => u.id === couple.user2_id);
              return {
                ...couple,
                user1_email: user1?.email,
                user2_email: user2?.email,
              };
            });
            this.data = enrichedCouples;
          } else if (table === 'sessions') {
            // Add user emails to sessions
            const enrichedSessions = sessions.map(session => {
              const user = users.find(u => u.id === session.user_id);
              return { ...session, user_email: user?.email };
            });
            this.data = enrichedSessions;
          }

          return this;
        },

        eq: function (column: string, value: any) {
          this.data = this.data.filter((item: any) => item[column] === value);
          return this;
        },

        order: function (column: string, options?: { ascending?: boolean }) {
          const ascending = options?.ascending ?? true;
          this.data.sort((a: any, b: any) => {
            if (a[column] < b[column]) return ascending ? -1 : 1;
            if (a[column] > b[column]) return ascending ? 1 : -1;
            return 0;
          });
          return this;
        },

        limit: function (count: number) {
          this.data = this.data.slice(0, count);
          return this;
        },
      };

      return query.execute();
    },

    insert: async (data: any) => {
      await delay(300);
      const id = `${table}-${Date.now()}`;
      const newItem = { ...data, id, created_at: new Date().toISOString() };

      if (table === 'users') {
        users.push(newItem);
      } else if (table === 'couples') {
        couples.push(newItem);
      } else if (table === 'sessions') {
        sessions.push(newItem);
      }

      return { data: newItem, error: null };
    },

    update: async (data: any) => ({
      eq: async (column: string, value: any) => {
        await delay(300);
        let updated = null;

        if (table === 'users') {
          const index = users.findIndex((u: any) => u[column] === value);
          if (index !== -1) {
            users[index] = { ...users[index], ...data };
            updated = users[index];
          }
        } else if (table === 'couples') {
          const index = couples.findIndex((c: any) => c[column] === value);
          if (index !== -1) {
            couples[index] = { ...couples[index], ...data };
            updated = couples[index];
          }
        } else if (table === 'sessions') {
          const index = sessions.findIndex((s: any) => s[column] === value);
          if (index !== -1) {
            sessions[index] = { ...sessions[index], ...data };
            updated = sessions[index];
          }
        }

        return { data: updated, error: null };
      },
    }),

    delete: async () => ({
      eq: async (column: string, value: any) => {
        await delay(300);

        if (table === 'users') {
          users = users.filter((u: any) => u[column] !== value);
        } else if (table === 'couples') {
          const couple = couples.find((c: any) => c[column] === value);
          if (couple) {
            // Unpair users
            users = users.map(u =>
              u.id === couple.user1_id || u.id === couple.user2_id
                ? { ...u, couple_id: null }
                : u
            );
            couples = couples.filter((c: any) => c[column] !== value);
          }
        } else if (table === 'sessions') {
          sessions = sessions.filter((s: any) => s[column] !== value);
        }

        return { data: null, error: null };
      },
    }),
  }),

  // RPC calls for special operations
  rpc: async (functionName: string, params?: any) => {
    await delay(400);

    if (functionName === 'unpair_couple') {
      const couple = couples.find(c => c.id === params.couple_id);
      if (couple) {
        users = users.map(u =>
          u.id === couple.user1_id || u.id === couple.user2_id
            ? { ...u, couple_id: null }
            : u
        );
        couples = couples.filter(c => c.id !== params.couple_id);
        return { data: { success: true }, error: null };
      }
    }

    return { data: null, error: null };
  },
};

// Analytics helper
export const getDemoAnalytics = () => {
  const totalUsers = users.length;
  const completedIntakes = users.filter(u => u.intake_completed_at).length;
  const totalCouples = couples.length;
  const pairedUsers = users.filter(u => u.couple_id).length;
  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.status === 'completed').length;
  const activeToday = sessions.filter(s => {
    const sessionDate = new Date(s.started_at);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  }).length;

  return {
    totalUsers,
    completedIntakes,
    totalCouples,
    pairedUsers,
    totalSessions,
    completedSessions,
    completionRate: totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0,
    activeToday,
  };
};
