import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import LoadGraph from "./LoadGraph"
import {  SearchControl, ControlsContainer } from "@react-sigma/core";
import {  useState  } from "react";

const MyGraph = ({ sendNode }) => {
const [node, setNode] = useState(1)

const onNodeClick = (node) => {
  setNode(node)
  sendNode(node)
};

  return (
    <>
      <div>
        <SigmaContainer style={{ height: "600px", width: "850px" }}>
          <ControlsContainer position={"top-right"}>
            <SearchControl style={{ width: "200px" }} />
          </ControlsContainer>
          <LoadGraph  onNodeClick={onNodeClick} ></LoadGraph>
        </SigmaContainer>
      </div>
    </>
  );
};

export default MyGraph
