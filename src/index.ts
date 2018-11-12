
/* IMPORT */

import * as octokit from '@octokit/rest';
import * as username from 'git-username';
import * as path from 'path';
import fetchDescription from './description';

/* GITHUB SYNC DESCRIPTION */

const defaultOptions = {
  token: ''
};

function factory ( customOptions?: Partial<typeof defaultOptions> ) {

  const options = Object.assign ( {}, defaultOptions, customOptions );

  async function githubSyncDescription ( config, repoPath, ctx, task ) {

    if ( !options.token ) return task.skip ( 'You need to provide a GitHub token' );

    const name = path.basename ( repoPath ),
          description = await fetchDescription ( repoPath );

    if ( !description ) return task.skip ( 'Couldn\'t find a description' );

    const owner = username ({ cwd: repoPath });

    if ( !owner ) return task.skip ( 'Couldn\'t find the GitHub owner' );

    const github = new octokit ();

    github.authenticate ({
      type: 'token',
      token: options.token
    });

    try {

      const repo = await github.repos.get ({ owner, repo: name });

      if ( repo.data.description === description ) return task.skip ( 'No need to update the description' );

      try {

        task.output = 'Updating the description...';

        if ( config.dry ) return task.skip ();

        await github.repos.edit ({ owner, repo: name, name, description });

        task.output = `Description updated to "${description}"`;

      } catch ( e ) {

        return task.skip ( 'Couldn\'t update the description' );

      }

    } catch ( e ) {

      return task.skip ( 'Couldn\'t find the GitHub repository' );

    }

  };

  githubSyncDescription['title'] = 'github sync description';

  return githubSyncDescription;

}

/* EXPORT */

export default factory;
