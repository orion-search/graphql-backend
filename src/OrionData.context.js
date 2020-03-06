import React, { useRef, useState, useContext, createContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { csv } from "d3";

import LoadingBar from "./components/shared/loading-bar";
import { SEED_DATA } from "./queries";
import papersByCountry from "./data/paper_country.csv";
import papersByTopic from "./data/paper_topics.csv";
import topTopics from "./data/top_topics.csv";

const OrionDataContext = createContext({});

const FetchOnline = ({ children }) => {
  const data = useRef();
  const [ready, setReady] = useState(false);

  useQuery(SEED_DATA, {
    onCompleted: ({ byCountry, byTopic, byYear, topics, diversity }) => {
      data.current = {
        diversity,
        papers: {
          byCountry,
          byTopic,
          byYear
        },
        topics
      };
      setReady(true);
    }
  });

  return (
    <OrionDataContext.Provider value={data.current}>
      {!ready && <LoadingBar />}
      {ready && children}
    </OrionDataContext.Provider>
  );
};

const FetchOffline = ({ children }) => {
  const data = useRef();
  const [ready, setReady] = useState(false);

  Promise.all([
    csv(papersByCountry, d => ({
      country: d.country,
      count: +d.count,
      ids: d.ids.split("|").map(i => +i)
    })),
    csv(papersByTopic, d => ({
      topic_id: d.id,
      name: d.name,
      level: +d.level,
      frequency: +d.frequency,
      ids: d.paper_ids.split("|").map(i => +i)
    })),
    csv(topTopics)
  ]).then(([byCountry, byTopic, topics], error) => {
    data.current = {
      papers: {
        byCountry,
        byTopic
      },
      topics
    };
    setReady(true);
  });

  return (
    <OrionDataContext.Provider value={data.current}>
      {!ready && <LoadingBar />}
      {ready && children}
    </OrionDataContext.Provider>
  );
};

export const OrionDataProvider = ({ children }) => {
  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <FetchOnline>{children}</FetchOnline>
      )}
      {process.env.NODE_ENV === "production" && (
        <FetchOnline>{children}</FetchOnline>
      )}
    </>
  );
};

export const OrionDataConsumer = OrionDataContext.Consumer;

export const useOrionData = () => useContext(OrionDataContext);
