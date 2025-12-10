"use client";
import React from "react";
import UploadClassMaterials from "@/components/resources/UploadClassMaterials";
import ResourceCentral from "@/components/resources/ResourceCentral";

/*https://media.discordapp.net/attachments/1358638544691658776/1433253407983931484/image.png?ex=690404c1&is=6902b341&hm=a72a52426cead12fb468bda72273eb91e2412a1b75d32e608f8c0fc913f9e0e3&=&format=webp&quality=lossless

layout shown above:
2 sections, one on left and one on right. left says "resource central and lets users upload class materials, right says "shared materials" and has a list of files/links where people can download notes and stuff.
*/
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
