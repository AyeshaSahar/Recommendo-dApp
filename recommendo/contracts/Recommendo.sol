// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Recommendations {
    string[] public recommendations;
    
    function setRecommendation(string memory _recommendation) public {
        recommendations.push(_recommendation);
    }

    function getRecommendation() public view returns (string[] memory) {
        return recommendations;
    }
    
    function getRecommendationsLength() public view returns (uint) {
        uint recommendationsLength = recommendations.length;
        return recommendationsLength;
    }
    
    function deleteRecommendation(uint _index) public {
        require(_index < recommendations.length, "This recommendation index does not exist.");
        recommendations[_index] = recommendations[getRecommendationsLength() - 1];
        recommendations.pop();
    }
}
