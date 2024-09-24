import { graph, config } from '@grafbase/sdk';

const User = graph.model('User', {
  name: graph.string({ length: { min: 2, max: 20 } }),
  email: graph.string({ unique: true }),
  avatarUrl: graph.string().optional(),
  description: graph.string().optional(),
  graphithubUrl: graph.string().optional(),
  LinkedInUrl: graph.string().optional(),
  projects: graph.relation('Project'),
});

const Project = graph.model('Project', {
  title: graph.string({ length: { min: 3 } }),
  description: graph.string(),
});

export default config({
  models: { User, Project }, // Use 'models' instead of 'schema'
});
