import dotenv from 'dotenv';
import path from 'path';

// Load the initial .env file
dotenv.config();

// Debugging to check if the environment variable is loaded correctly
console.log('GRAFBASE_PROJECT_GRAFBASE_DIR:', process.env.GRAFBASE_PROJECT_GRAFBASE_DIR);

// Resolve the path to the .env file
const envPath = path.join(process.env.GRAFBASE_PROJECT_GRAFBASE_DIR || '', '.env');
console.log('Resolved .env path:', envPath);

// Load the .env file from the resolved path
dotenv.config({
  path: envPath,
  override: true,
});

// grafbase.config.ts
import { config, graph, auth } from '@grafbase/sdk';

const g = graph.Standalone();

const User = g.type('User', {
  id: g.id(),
  name: g.string(),
  email: g.email(),
  avatarUrl: g.url(),
  description: g.string(),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.ref('Project').list().optional(),
});

const Project = g.type('Project', {
  title: g.string(),
  description: g.string(),
  image: g.url(),
  liveSiteUrl: g.url(),
  githubUrl: g.url(),
  category: g.string(),
  createdBy: g.ref('User'),
});

const jwt = auth.JWT({
  issuer: 'grafbase',
  secret: g.env('NEXTAUTH_SECRET'),
});

const authRules = (rules: any) => {
  rules.public().read('User');
  rules.private().create('User');
  rules.private().update('User');
  rules.private().delete('User');
  rules.public().read('Project');
  rules.private().create('Project');
  rules.private().update('Project');
  rules.private().delete('Project');
};

const UserInput = g.input('UserInput', {
  email: g.string(),
});

const UserOutput = g.type('UserOutput', {
  id: g.string(),
  name: g.string(),
  email: g.string(),
  avatarUrl: g.string(),
  description: g.string(),
  githubUrl: g.string(),
  linkedInUrl: g.string(),
});

g.query('user', {
  args: { input: g.inputRef(UserInput) },
  returns: g.ref(UserOutput),
  resolver: 'getUser', // Reference the resolver by name
});

export default config({
  graph: g,
  auth: {
    providers: [jwt],
    rules: authRules,
  },
});

export { User, Project };
