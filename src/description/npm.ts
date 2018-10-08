
/* IMPORT */

import * as path from 'path';

/* FETCH DESCRIPTION NPM */

async function fetchDescriptionNPM ( repository: string ) {

  const pkgPath = path.join ( repository, 'package.json' );

  try {

    const pkg = require ( pkgPath );

    return pkg.description;

  } catch ( e ) {}

}

/* EXPORT */

export default fetchDescriptionNPM;
