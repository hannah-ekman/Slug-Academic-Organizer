import React, { Component } from 'react';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Highlight,
    RefinementList,
    Pagination,
    CurrentRefinements,
    ClearRefinements,
    Configure,
    PoweredBy
} from 'react-instantsearch-dom';
import 'instantsearch.css/themes/reset.css';
import './SearchCourse.css';
import { CollapsibleComponent, CollapsibleHead, CollapsibleContent } from 'react-collapsible-component'
import algoliasearch from 'algoliasearch';

/*
const chunk = require('lodash.chunk')
const client = algoliasearch('Z4ZULV1BRS', '1b0bac00d91c1064ed69c2b075bdc690');
const index = client.initIndex('fall18');
function fetchDataFromDatabase() {
    const fall18 = new mongoose.Schema({
        description: { type: String, required: true, algoliaIndex: true },
        prereqs: { type: String, required: true, algoliaIndex: true },
        lecture: { type: Object, required: true, algoliaIndex: true },
        sections: { type: Array, required: true, algoliaIndex: true },
        courseTitle: { type: String, required: true, algoliaIndex: true },
        courseID: { type: String, required: true, algoliaIndex: true },
        meta: { type: Object, required: true, algoliaIndex: true },
      });
    return fall18;
}
const records = fetchDataFromDatabase();
const chunks = chunk(records, 1000);
chunks.map(function(batch) {
  return index.addObjects(batch);
});
*/

/*
*Used to display course information (course Title, description, instructor, days, times, room)
*parts of the course will highlight when user is searching in searchbar
*/
function Course({ hit }) {
    return (
        <div style={{ padding: '10px' }}>
            <span className="hit-name">
                <Highlight attribute="courseTitle" hit={hit} tagName="mark" />
                <p><Highlight attribute="description" hit={hit} tagName="mark" /></p>
                <p>
                    Instructor: <Highlight attribute="lecture.Instructor" hit={hit} tagName="mark" />
                    <br />Days and Times: <Highlight attribute="lecture.DaysTimes" hit={hit} tagName="mark" />
                    <br />Room: <Highlight attribute="lecture.Room" hit={hit} tagName="mark" />
                </p>
            </span>
        </div>
    );
}

/*
*Used to implement widgets
*Refinment List in collapsible menus, Current Refinements, Pagination
*Collapsile Menu: https://www.npmjs.com/package/react-collapsible-component
*/
function Search() {
    return (
        <div className="container">
            <SearchBox />
            <h3>Filters</h3>
            <CollapsibleComponent>
                <CollapsibleHead>Career</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="meta.career" /></CollapsibleContent>

                <CollapsibleHead>Type</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="meta.type" /></CollapsibleContent>

                <CollapsibleHead>Credits</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="meta.credits" /></CollapsibleContent>

                <CollapsibleHead>Status</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="meta.status" /></CollapsibleContent>

                <CollapsibleHead>Days and Times</CollapsibleHead>
                <CollapsibleContent><RefinementList attribute="lecture.DaysTimes" /></CollapsibleContent>
            </CollapsibleComponent>
            <div className="Filters">
                <CurrentRefinements />
            </div>
            <button className="clear"><ClearRefinements /></button>
            <Hits hitComponent={Course} />
            <Configure hitsPerPage={10} />
            <div className="pages">
                <Pagination showLast={true} />
            </div>
            <div className="poweredBy">
                <PoweredBy />
            </div>
        </div>
    );
}

//Used for the search
const App = () => (
    <InstantSearch
        apiKey="e0f4e3542265d408d5be8de22d00a12e"
        appId="Z4ZULV1BRS"
        indexName="Slug Academic Organizer"
    >
        <Search />
    </InstantSearch>
)

//renders the search
class SearchCourse extends Component {
    render() {
        return (
            <App />
        );
    }
}

export default SearchCourse