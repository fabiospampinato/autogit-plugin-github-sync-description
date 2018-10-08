
/* IMPORT */

import fetchDescriptionNPM from './npm';
import fetchDescriptionReadme from './readme';

/* FETCH DESCRIPTION */

async function fetchDescription ( repository: string ) {

  const fetchers = [fetchDescriptionNPM, fetchDescriptionReadme];

  for ( let fetcher of fetchers ) {

    const description = await fetcher ( repository );

    if ( description ) return description;

  }

}

/* EXPORT */

export default fetchDescription;
