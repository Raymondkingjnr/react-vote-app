import { createClient } from "contentful";
import { createClient as createManagementClient } from "contentful-management";
import { useEffect, useState } from "react";

const client = createClient({
  space: "d7lzs6qggye2",
  environment: "master",
  accessToken: "t4oUCqE8tJBO-vQRzkelsKclMIQDe9ZQynVZY8gsVXY",
});

const manageClient = createManagementClient({
  accessToken: "mFGUMt573GD8x07wk4TVqDbyPw9AKcDjmKqN3amoS6Y",
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [candidates, setcandidates] = useState([]);

  const getData = async () => {
    try {
      const resp = await client.getEntries({ content_type: "candidate" });
      const candidates = resp?.items?.map((item) => {
        const { category, name, sex, voteCount, img } = item?.fields;
        const id = item?.sys?.id;
        const imgurl = img?.fields?.file?.url;
        return { category, name, sex, voteCount, id, imgurl };
      });
      setcandidates(candidates);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getSingleData = async (entryId) => {
    try {
      const resp = await client.getEntry(entryId);

      const { category, name, sex, voteCount, img } = resp?.fields;
      const id = resp?.sys?.id;
      const imgurl = img?.fields?.file?.url;
      return { category, name, sex, voteCount, id, imgurl };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateVoteCount = (candidateID, numberOfVotes) => {
    console.log("updating vote");
    setcandidates((prevCandidates) => {
      return prevCandidates.map((candidate) => {
        if (candidate.id === candidateID) {
          return {
            ...candidate,
            voteCount: candidate.voteCount + numberOfVotes,
          };
        }
        return candidate;
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return { loading, candidates, getSingleData, updateVoteCount };
};
