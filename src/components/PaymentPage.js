import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchProjects } from "./FetchCandidates";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

export const PaymentPage = () => {
  const { id } = useParams();
  const { getSingleData, updateVoteCount } = useFetchProjects();
  const [candidateData, setCandidateData] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    No_votes: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      const candidate = await getSingleData(id);

      if (candidate) {
        setCandidateData(candidate);
      }
    };
    fetchCandidateDetails();
  }, []);

  const config = {
    public_key: "FLWPUBK_TEST-8cb54c76502ce534e33756e2ec17c219-X",
    tx_ref: Date.now(),
    amount: 50 * formData.No_votes,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: formData.email,
      phone_number: formData.phoneNumber,
      name: formData.name,
    },
    customizations: {
      title: "my Payment Title",
      description: "Payment for items in cart",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div>
      {" "}
      <h1>{candidateData?.name}</h1>
      <form>
        <div>
          <label> Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label> name</label>
          <input
            type="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label> Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label> No_votes</label>
          <input
            type="number"
            name="multiplier"
            value={formData.No_votes}
            onChange={handleChange}
          />
        </div>
      </form>
      <div className="btns">
        <button
          onClick={() => {
            handleFlutterPayment({
              callback: (response) => {
                const candidateId = candidateData.id;
                const numberOfVote = formData.No_votes;
                updateVoteCount(candidateId, numberOfVote);

                console.log(response);
                closePaymentModal();
              },
              onClose: () => {
                console.log("You close me ooo");
              },
              catch(error) {
                console.log(error);
              },
            });
          }}
        >
          Testing FW Payment
        </button>
        <button>
          <Link to={"/"}>Go Back.</Link>
        </button>
      </div>
    </div>
  );
};
