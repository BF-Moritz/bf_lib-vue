import { sleep } from './sleep.js';

let info;
let lastUpdate;
let updating = false;

/**
 *
 * @param {Object} badges Badges Object
 */
export default async function resolveBadges(badges, channelID) {
	while (updating) {
		await sleep(10);
	}

	if (!info || Date.now() - lastUpdate > 3600000) {
		updating = true;
		const globalURL = 'http://badges.twitch.tv/v1/badges/global/display';
		const channelURL = `http://badges.twitch.tv/v1/badges/channels/${channelID}/display`;

		const globalRes = await fetch(globalURL);
		const channelRes = await fetch(channelURL);

		const globalInfo = await globalRes.json();
		const channelInfo = await channelRes.json();

		info = { ...globalInfo.badge_sets, ...channelInfo.badge_sets };
		lastUpdate = Date.now();
		updating = false;
	}

	const parsedBadges = [];

	badges.forEach((badge) => {
		const currentBadge = info[badge.name];
		if (currentBadge && currentBadge.versions[badge.version]) {
			parsedBadges.push({
				name: badge.name,
				url: currentBadge.versions[badge.version].image_url_4x,
				title: currentBadge.versions[badge.version].title || null
			});
		} else {
			console.log(currentBadge);
		}
	});
	return parsedBadges;
}
