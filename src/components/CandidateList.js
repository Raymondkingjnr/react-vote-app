import React from "react";
import { useFetchProjects } from "../components/FetchCandidates";
import { Link } from "react-router-dom";

const CandidateList = () => {
  const { loading, candidates } = useFetchProjects();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <div className="card-container">
        {candidates?.map((candidate, index) => {
          const { name, category, id, sex, imgurl, voteCount } = candidate;

          return (
            <div className="items" key={id} index={index}>
              <img src={imgurl} alt="name" />
              <h5> name: {name}</h5>
              <p>
                sex : <span>{sex}</span>
              </p>
              <p> category : {category}</p>
              <p>
                votes : <span>{voteCount}</span>
              </p>

              <Link to={`/payment/${id}`} className="vote-btn">
                Vote
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CandidateList;
