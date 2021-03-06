#!/bin/sh

echo "Downloading and caching data for offline development to: "$1
curl 'https://api.orion-search.org/v1/graphql' \
  -H 'authority: api.orion-search.org'\
  -H 'x-hasura-admin-secret: orionkszmozilla' \
  -H 'sec-fetch-dest: empty' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36' \
  -H 'dnt: 1' \
  -H 'content-type: application/json' \
  -H 'accept: */*' \
  -H 'origin: https://api.orion-search.org' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'referer: https://api.orion-search.org/console' \
  -H 'accept-language: en-US,en;q=0.9,el;q=0.8' \
  --data-binary '{"query":"query seedData {\n  byCountry: viz_paper_country {\n    country\n    count\n    ids: paper_ids\n  }\n  byTopic: viz_paper_topics {\n    field_of_study_id\n    topic: name\n    count\n    ids: paper_ids\n  }\n  byYear: viz_paper_year {\n    year\n    count\n    ids: paper_ids\n  }\n  diversity: viz_metrics_by_country {\n    year\n    country\n    diversity: shannon_diversity\n    rca: rca_sum\n    femaleShare: female_share\n    topic: name\n  }\n  topics: viz_paper_topics {\n    topic: name\n  }\n  vectors: doc_vectors {\n    vector3d: vector_3d\n    id\n  }\n}\n","variables":null,"operationName":"seedData"}' --compressed >> $1
