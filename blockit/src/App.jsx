import { useEffect, useState } from "react";
import "./App.css";
import useAlert from "./hooks/useAlert";
import Logo from "./components/Logo";
import BlockBar from "./components/BlockBar";
import Form from "./components/Form";
import List from "./components/List";
import Blocked from "./components/Blocked";

function App() {
	const [tabs, setTabs] = useState([]);

	const [blocked, setBlocked] = useState(false);

	const [addUrl, setAddUrl] = useState(false);

	useEffect(() => {
		chrome.storage.local.get(["blocked", "blockedURLS"], function (result) {
			if (result.blocked !== undefined) {
				setBlocked(result.blocked);
			}
			if (result.blockedURLS) {
				setTabs(result.blockedURLS);
			}
		});
	}, []);

	useEffect(() => {
		chrome.storage.local.set({ blocked });
	}, [blocked]);

	function blockSites(value) {
		chrome.runtime.sendMessage({ action: "toggleBlocking", value });
		setBlocked(true);
	}

	function unblockSites(value) {
		chrome.runtime.sendMessage({ action: "toggleBlocking", value });
		setBlocked(false);
	}

	function addURL(newURL) {
		const updatedTabs = [...tabs, { id: crypto.randomUUID(), url: newURL }];
		setTabs(updatedTabs);

		chrome.storage.local.set({ blockedURLS: updatedTabs }, function () {
			chrome.runtime.sendMessage({ action: "updateBlockedURLS" });
		});
	}

	const deleteURL = (id) => {
		const newTabs = tabs.filter((tab) => tab.id !== id);
		setTabs(newTabs);

		chrome.storage.local.set({ blockedURLS: newTabs }, function () {
			chrome.runtime.sendMessage({ action: "updateBlockedURLS" });
		});
	};

	const handleAddUrl = () => {
		setAddUrl(!addUrl);
	};

	return (
		<>
			<Logo />

			<h1 className="font-mono text-center">BlockIt</h1>

			<Blocked blocked={blocked} />

			<BlockBar blockSites={blockSites} unblockSites={unblockSites} />

			<button
				onClick={handleAddUrl}
				className="button-2 text-center justify-center items-center flex m-auto "
			>
				{addUrl ? "Hide Form" : "Add Url"}
			</button>
			{addUrl && <Form addURL={addURL} />}
			{addUrl && <List deleteURL={deleteURL} tabs={tabs} />}
		</>
	);
}

export default App;
