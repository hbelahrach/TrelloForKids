import React, { Component } from "react";
import logo from "../assets/images/logo.png";

const hello = () => {
	return (
		<div className="padding-left-large header">
			<img
				style={{
					width: "15em",
					border: "none"
				}}
				src={logo}
			/>
		</div>
	);
};

export default hello;
