import {
  ConnectWallet,
  useAddress,
  useContract,
  useContractRead,
  Web3Button,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0x6fAe9FB97DFcc4ab00B5E567BB83B846ed21fcf3";
  const [input, setInput] = useState("");
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getRecommendation");

  return (
    <div className={styles.container}>
      {address ? (
        <>
        <div className="heading">
          <h1>Have anything to say to us? Share below ;) </h1>
        </div>
          <div className={styles.recommendationForm}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Recommendation"
            />

            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call("setRecommendation", input)}
              accentColor="#A020F0"
            >
              Enter Recommendation
            </Web3Button>
          </div>

          <div>
            {isLoading ? (
              "Loading..."
            ) : (
              <ul>
                {data.map((item: string, index: number) => (
                  <li key={index} className={styles.recommendation}>
                    {item}
                    <Web3Button
                      contractAddress={contractAddress}
                      action={(contract) => contract.call("deleteRecommendation", index)}
                      accentColor="#A020F0"
                    >
                      Delete Recommendation
                    </Web3Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      ) : (
        <ConnectWallet accentColor="#A020F0" colorMode="light" />
      )}
    </div>
  );
};

export default Home;