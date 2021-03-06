/** @jsx jsx */

import { css, jsx } from "@emotion/core";
import { cold } from "react-hot-loader";
import { useHistory } from "react-router-dom";
import { Fragment, useEffect } from "react";
import styled from "@emotion/styled";

import { Row, Column } from "../../components/shared/layout";
import { MultiItemSelect } from "../../components/shared/dropdown";
import { accessors, urls } from "../../utils";
import Summary from "./Summary";
import Explainer from "./Explainer";

import { useOrionData } from "../../OrionData.context";

const LatentSpace = ({ papers = [], filters }) => {
  const {
    stage: {
      views: { particles },
    },
    papers: { byCountry, byTopic },
  } = useOrionData();

  const history = useHistory();

  const resetFilters = () => {
    particles.viz.resetFilters();
    history.push(urls.explore, {
      filters: {
        [accessors.names.country]: [],
        [accessors.names.topic]: [],
      },
    });
  };

  useEffect(() => {
    const updateSelectedPapers = (ids) => {
      // particles.viz.filter([]);
      // setSelectedPaperIds(ids);
      history.push(urls.explore, {
        filters: {
          ids,
        },
      });
    };

    particles.viz.show();
    particles.viz.setParticleSelectionCallback(updateSelectedPapers);
    particles.viz.filter(papers);

    return function cleanup() {
      particles.viz.hide();
    };
  }, [particles.viz, papers, history]);

  // useEffect(() => {
  //   particles.viz.filter(selectedPaperIds);
  // }, [selectedPaperIds, particles.viz]);

  return (
    <Fragment>
      <div
        css={css`
          position: absolute;
          top: 60px;
          width: 25%;
        `}
      >
        <Column>
          <Row>
            {papers.length ? (
              <Summary paperIds={papers} onFilterReset={() => resetFilters()} />
            ) : (
              <Explainer />
            )}
          </Row>
        </Column>
      </div>
      <Filters
        dimensions={[
          {
            data: byCountry.map((p) => accessors.types.country(p)),
            filter: filters.country || [],
            placeholder: "Search by Country...",
            selected: filters.country,
            title: "Country",
            accessor: "country",
          },
          {
            data: byTopic.map((p) => accessors.types.topic(p)),
            filter: filters.topic || [],
            placeholder: "Search by Topic...",
            selected: filters.topic,
            title: "Topic",
            accessor: "topic",
          },
        ]}
      />
    </Fragment>
  );
};

const Filters = ({ dimensions }) => {
  const Filter = styled(MultiItemSelect)`
    width: 35%;
    max-width: 300px;
    margin-right: ${(props) => props.theme.spacing.large};
    font-size: ${(props) => props.theme.type.sizes.normal};
  `;

  const history = useHistory();

  // keep track of filter state
  const filters = dimensions.map((d) => ({
    [d.accessor]: d.filter,
  }));

  return (
    <Row
      css={css`
        position: absolute;
        top: 64px;
        left: 35%;
        width: 50%;
        justify-content: flex-start;
      `}
    >
      {dimensions.map((dimension) => (
        <Filter
          closeMenuOnSelect={false}
          isMulti
          key={`${dimension.title}-filter`}
          name={dimension.title}
          defaultValue={
            dimension.selected?.length
              ? dimension.selected.map((d) => ({ value: d, label: d }))
              : []
          }
          onChange={(e) => {
            history.push(urls.explore, {
              filters: {
                ...filters[0],
                ...filters[1],
                [dimension.accessor]: e ? e.map((_) => _.value) : [],
              },
            });
          }}
          options={dimension.data.map((d) => ({ value: d, label: d }))}
          placeholder={dimension.placeholder}
        />
      ))}
    </Row>
  );
};

export default cold(LatentSpace);
