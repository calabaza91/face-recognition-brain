import React from "react";

const Rank = ({name, entries}) => {
    return(
        <div className="white">
            <div className="f2">
                {`${name}, your current entry count is:`}
            </div>
            <div className="f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank;