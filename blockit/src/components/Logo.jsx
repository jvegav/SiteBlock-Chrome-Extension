import React from "react";

import blockit_logo from "/assets/logo_blockit.png";

const Logo = () => {
	return (
		<div className="flex justify-center">
			<img
				src={blockit_logo}
				className="logo blockit w-[150px] h-[150px]"
				alt="BlockIt logo"
			/>
		</div>
	);
};

export default Logo;
