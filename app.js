/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  const response = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${query}`
  );
  console.log(response.data);
  return response.data;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let i = 0; i < 10; i++) {
    console.log(shows[i]);
    let showName = shows[i]["show"]["name"];
    let showID = shows[i]["show"]["id"];
    let showSummary = shows[i]["show"]["summary"];
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${showID}">
         <div class="card" data-show-id="${showID}">
           <div class="card-body">
             <h3 class="card-title">${showName}</h5>
             <p class="card-text">${showSummary}</p>
           </div>
         </div>
       </div>
      `
    );

    $showsList.append($item);
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  const response = await axios.get(
    `http://api.tvmaze.com/shows/${id}/episodes`
  );
  return response.data;
}
