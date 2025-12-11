"use client";
import React from "react";
import UploadClassMaterials from "@/components/resources/UploadClassMaterials";
import ResourceCentral from "@/components/resources/ResourceCentral";

export default function Resources() {
	//TODO: Change the <br/> tags to actual padding and margin. they are just here for quick separation
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white mr-20 ">
			{/*TODO: Finish CSS for these sections, as some of them are inconsistent to the whole project. Link to database. */}
			<UploadClassMaterials />
			<ResourceCentral />
		</div>
	);
}
