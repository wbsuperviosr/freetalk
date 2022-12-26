import { PortableTextComponents } from "@portabletext/react";
// import { Player } from 'video-react';

interface PTC extends PortableTextComponents {
	block: any;
}

function renderTable(raw_string: string) {
	const rows = raw_string.split(";");

	return (
		<table className="table-fixed text-sm border-spacing-2 font-noto font-extralight border-collapse border border-slate-400 w-full">
			<thead>
				<tr>
					{rows[0].split("|").map((item, j) => (
						<th className="border border-slate-300" key={j}>
							{item}
						</th>
					))}
				</tr>
			</thead>

			<tbody>
				{rows.slice(1, rows.length - 1).map((row, index) => {
					return (
						<tr key={index}>
							{row.split("|").map((item, k) => (
								<th
									className="border px-2 border-slate-300"
									key={k}
								>
									{item}
								</th>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

export const LXPortableTextComponents: PTC = {
	marks: {
		link: (props: any) => {
			return (
				<a className={"text-lxd"} href={props.value.href}>
					{props.children}
				</a>
			);
		},
		imagelink: (props: any) => {
			return <img src={props.value.href} alt={props.text} />;
		},
		internalLink: (props: any) => {
			return <span>{props.children}</span>;
		},
		videolink: (props: any) => {
			// return <Player autoPlay>
			//     <source src={props.value.href}></source>
			// </Player>
			const domain = "https://assets.wbavengers.com";
			const source = props.value.href.startsWith("https")
				? props.value.href
				: `${domain}/${props.value.href}`;
			return (
				<video controls>
					<source src={source} type="video/mp4" />
				</video>
			);
		},
		u: (props: any) => {
			return <u>{props.children}</u>;
		},
	},
	list: {
		bullet: ({ children }) => (
			<ul className="py-0 ml-1 list-disc list-inside">{children}</ul>
		),
		number: ({ children }) => (
			<ol className="py-0 ml-1 list-decimal list-inside">{children}</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => <li className="pb-2">{children}</li>,
		number: ({ children }) => <li className="pb-2">{children}</li>,
	},
	block: {
		blockquote: ({ children }: { children: string }) => {
			return (
				<blockquote className="text-gray-500 px-2 border-l-2">
					{children}
				</blockquote>
			);
		},
		h1: ({ children }: { children: string }) => {
			return <h1 className="text-4xl font-bold py-2">{children}</h1>;
		},
		h2: ({ children }: { children: string }) => {
			return <h2 className="text-3xl font-bold py-2">{children}</h2>;
		},
		h3: ({ children }: { children: string }) => {
			return <h3 className="text-2xl font-bold py-2">{children}</h3>;
		},
		h4: ({ children }: { children: string }) => {
			return <h4 className="text-xl font-bold py-2">{children}</h4>;
		},
		h5: ({ children }: { children: string }) => {
			return <h5 className="text-lg font-bold py-2">{children}</h5>;
		},
		h6: ({ children }: { children: string }) => {
			return <h6 className="text-md font-bold py-2">{children}</h6>;
		},
		table: ({ children }: { children: string }) => {
			return renderTable(children[0]);
		},
	},
};
