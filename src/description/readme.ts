
/* IMPORT */

import * as fs from 'fs';
import * as path from 'path';
import * as pify from 'pify';
import * as remark from 'remark';
import * as strip from 'strip-markdown';

/* FETCH DESCRIPTION README */

async function fetchDescriptionReadme ( repository: string ) {

  const readmes = ['README.md', 'readme.md', 'Readme.md'],
        descriptionRe = /^\s*>?\s*([^#=![<*\n-].*$)/m;

  for ( let readme of readmes ) {

    const readmePath = path.join ( repository, readme );

    try {

      const content = fs.readFileSync ( readmePath ).toString (),
            match = content.match ( descriptionRe );

      if ( !match ) continue;

      const file = await pify ( remark ().use ( strip ).process )( match[1] );

      return file.contents.trim ();

    } catch ( e ) {}

  }

  return;

}

/* EXPORT */

export default fetchDescriptionReadme;
