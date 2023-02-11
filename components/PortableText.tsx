import { PortableTextComponents } from "@portabletext/react";
import { Body, Reference } from "../models/postModel";

const domain = "https://assets.wbavengers.com";
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
									className="border overflow-hidden px-2 border-slate-300 font-light"
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
			let src = "";
			if (props.value.href.startsWith("https")) {
				src = props.value.href;
			} else {
				src = `${domain}/${props.value.href}`;
			}

			return <img src={src} alt={props.text} className="w-full" />;
		},
		internalLink: (props: any) => {
			return <span>{props.children}</span>;
		},
		videolink: (props: any) => {
			const source = props.value.href.startsWith("https")
				? props.value.href
				: `${domain}/${props.value.href}`;
			return (
				<video controls>
					<source src={source} type="video/mp4" />
				</video>
			);
		},
		Citelink: (props: any) => {
			const children = props.children[0].split("||");
			const text: string = children[0];
			const count: number = Number(children[1]);
			return (
				<>
					<span>{text}</span>
					{props.value.reference.map(
						(ref: Reference, index: number) => {
							return (
								<span className="text-lxd text-sm" key={index}>
									<a href={`#${ref._key}`}>
										[{index + count}]
									</a>
								</span>
							);
						}
					)}
				</>
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
		normal: (obj: any) => {
			return <p id={obj.value._key}>{obj.children}</p>;
		},
	},
};

export function extractText(bodies: any) {
	let text = "";

	if (bodies) {
		for (const body of bodies) {
			for (const child of body.children) {
				text += child.text;
			}
		}
	}
	return text;
}
