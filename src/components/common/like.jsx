import React from "react";

const Like = ({ onLike, product }) => {
    let classes = "fa fa-heart";

    if (!product.liked)
        classes += "-o"

    return(
        <React.Fragment>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

            <i
                className={classes}
                style={ { cursor: "pointer"} }
                onClick={ () => onLike(product) }
            />
        </React.Fragment>
    );};

export default Like;