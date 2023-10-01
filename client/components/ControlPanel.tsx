import ThemeSwitcher from "../islands/ThemeSwitcher.tsx";

interface ControlPanelProps {
	users: string[];
	roomKey: string;
	username: string;
}

export default function ControlPanel(props: ControlPanelProps) {
	const { users, roomKey, username } = props;

	return (
		<article className={"flex flex-col gap-4 h-full w-full p-8"}>
			<h1 className={"font-bold text-2xl py-4"}>Control Panel</h1>
			<h2 className={"text-xl font-bold"}>Room Information</h2>
			<ul className={"font-semibold"}>
				<li>
					Room Key: <span className={"font-mono font-normal"}>{roomKey}</span>
				</li>
				<li>
					Username: <span className={"font-mono font-normal"}>{username}</span>
				</li>
			</ul>
			<h3 className={"text-xl font-bold"}>Users ({users.length})</h3>
			<ul className={"flex-grow overflow-y-auto"}>
				<li className={"flex items-center justify-start gap-x-2 text-lg"}>
					<span className={"w-2 h-2 rounded-full inline-block bg-orange-600"} />
					<span>Maid@{roomKey} - server</span>
				</li>
				{users.map((user) => {
					return (
						<li className={"flex items-center justify-start gap-x-2 text-lg"}>
							<span className={"w-2 h-2 rounded-full inline-block bg-emerald-600"} />
							{String(user)}
						</li>
					);
				})}
			</ul>
			<div className={"rounded-md p-4 bg-black text-white flex items-center justify-between"}>
				<ThemeSwitcher />
				<a href='/' className='underline text-white'>
					exit
				</a>
			</div>
		</article>
	);
}
