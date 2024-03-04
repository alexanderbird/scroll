import { h } from 'preact';
import debounce from 'debounce';
import { useState, useEffect } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { tokenizeForSearch, searchIndex, shortIdentifier, reference } from 'scroll-core';
import { buildClient, defaultTimeProvider, wrapFetch } from 'scroll-api-sdk';

import Button from '@mui/material/Button';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';

import { Tiles } from '../components/tiles';
import { Loading } from '../components/loading';
import { LearnMoreSection } from '../components/learnMore';
import { useRelatedVerses } from '../hooks/useRelatedVerses';
import { LicenseSummary } from '../components/license';
import { FeedbackLink } from '../components/feedbackLink';

const Search = ({ query: initialQuery, setPageTitle }) => {
  const [query, setQuery] = useState(initialQuery);
  const [searchTokens, setSearchTokens] = useState([]);
  const client = buildClient({ timeProvider: defaultTimeProvider, httpGet: wrapFetch(fetch), log: console.info });

  const {
    isLoading: isLoadingRelatedVerses,
    relatedVerses: items,
    canLoadNextPage: canLoadMoreRelatedVerses,
    loadNextPage: loadNextPageOfRelatedVerses,
    ids: searchResults,
    setIds: setSearchResults,
  } = useRelatedVerses({ client, ids: [] });

  const onQueryChange = query => {
    setQuery(query);
    const { results, tokens } = search(query);
    setSearchTokens(tokens);
    setSearchResults(results);
  }

  const onInputChange = e => {
    const newQuery = e.target.value;
    window.history.replaceState({}, window.location.title, '/search/' + encodeURIComponent(newQuery));
    onQueryChange(newQuery);
  };

  useEffect(() => {
    onQueryChange(initialQuery);
  }, []);

  const debouncedOnInputChange = debounce(onInputChange, 1000);

  setPageTitle("Search by keyword");
  const ResultTiles = () => (
    <>
      <Tiles items={items} />
      { isLoadingRelatedVerses ? <Loading /> : null }
      { !canLoadMoreRelatedVerses ? null : (
        <Stack direction='row' justifyContent='center'>
          <Button onClick={loadNextPageOfRelatedVerses}><KeyboardDoubleArrowDownIcon/></Button>
        </Stack>
      ) }
    </>
  )
  return (
    <>
      <Input
        fullWidth={true}
        value={query}
        autoFocus={true}
        onKeyUp={debouncedOnInputChange}
        startAdornment={<InputAdornment position="start"><SearchIcon /></InputAdornment>}
        placeholder="words to search for"/>
      <div>
        <br/>
        { searchResults.length
          ? <ResultTiles />
          : <NoResultsNotice searchTokens={searchTokens} query={query} />
        }
      </div>
    </>
  );
}

function wrapAsArray(oneOrMore) {
  if (Array.isArray(oneOrMore)) {
    return oneOrMore;
  }
  return [oneOrMore];
}

function search(phrase) {
  const tokens = tokenizeForSearch(phrase);
  const hits = {};
  const results = Object.values(tokens.flatMap(x => searchIndex[x]?.match(/.{1,3}/g) || [])
    .reduce((all, one) => {
      all[one] = all[one] || { id: one, count: 0 };
      all[one].count += 1;
      return all;
    }, {}))
    .filter(x => x.count === tokens.length)
    .map(x => shortIdentifier.expand(x.id));
  return { tokens, results };
}

const EveryWordIsIgnoredNotice = ({ query }) => {
  return (
    <Alert severity="error">
      <AlertTitle>
        <b>Your search matches too many verses</b>. Try using words that are less common.
      </AlertTitle>
      <br/>
      <LearnMoreSection title="Learn more">
        <ToKeepSearchEfficient />

        <p>
          Your search for <u><em>{query}</em></u>, contains only ignored words
          so there are no results to show.
        </p>

        <TryAWebSearch />
      </LearnMoreSection>
    </Alert>
  );
};

const ToKeepSearchEfficient = () => (
  <p>
    To keep the search efficient, we ignore the most common words. Most
    of the one hundred or so words that occur in more than 1000 verses are
    excluded, like <em>the</em>, <em>an</em>, and <em>our</em>.
  </p>
);

const TryAWebSearch = () => (
  <p>
    If these limitations keep you from finding the verse you are looking for,
    you could try a web search through your favorite search engine. If you do
    that, please consider sending a quick email to <FeedbackLink /> with what
    you were searching for so we can make this app better (by updating this
    search to handle your query).
  </p>
);

const NoResultsNotice = ({ searchTokens, query }) => {
  if (!searchTokens.length) {
    return <EveryWordIsIgnoredNotice query={query} />;
  }
  return (
    <Alert severity="error">
      <AlertTitle>
        <b>No verses match the word stems </b><TokenSummaryList tokens={searchTokens} />
      </AlertTitle>
      <br/>
      <LearnMoreSection title="Learn more">
        <p>
          To keep search flexible, search terms are "stemmed" -- converted to
          their simplest form.  For example, the words "trust", "trusted", and
          "trusting" all have the stem "trust". Likewise, words "one", "first",
          and "1" all have the stem "1".
        </p>

        <ToKeepSearchEfficient />

        <p>
          When you search for <u><em>{query}</em></u>, we convert that to
          stems <TokenSummaryList tokens={searchTokens} />. No verses in this
          translation contain <PluralizeStems count={searchTokens.length} />.
        </p>

        <TryAWebSearch />
      </LearnMoreSection>
    </Alert>
  );
};

const PluralizeStems = ({ count }) => {
  if (count === 1) {
    return "that stem";
  }
  if (count === 2) {
    return "both of those stems";
  }
  return "all of those stems";
}


const TokenSummaryList = ({ tokens }) => {
  if (tokens.length === 0) {
    return ''
  }
  if (tokens.length === 1) {
    return <TokenSummary token={tokens[0]} />;
  }
  if (tokens.length === 2) {
    return <span><TokenSummary token={tokens[0]}/> and <TokenSummary token={tokens[1]} /></span>;
  }
  const [lastToken, ...mostOfTheTokensButReversed] = tokens.reverse();
  return (<span>
    {mostOfTheTokensButReversed.reverse().map(x => (<span><TokenSummary key={x} token={x}/>, </span>))}
    and <TokenSummary token={lastToken}/>
  </span>);
}

const TokenSummary = ({ token }) => <em>{token}</em>

export default Search;
