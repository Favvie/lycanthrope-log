let JOURNAL = [];

function addEntry(event, werewolf) {
	JOURNAL.push({ events: event, werewolf: werewolf });
}
// adds data to the journal
addEntry(["cooked lunch", "made dinner", "climbed tree"], false);
addEntry(["made lunch", "cook dinner", "dance"], true);
addEntry(["cooked lunch", "made dinner", "climbed tree"], false);
addEntry(["danced", "made dinner", "climbed tree"], true);
addEntry(["cooked lunch", "made dinner", "climbed tree"], false);
addEntry(["danced", "made dinner", "climbed tree"], true);
addEntry(["cooked lunch", "made dinner", "climbed tree"], false);
addEntry(["cooked lunch", "made dinner", "worked"], true);
addEntry(["danced", "made dinner", "climbed tree"], false);
addEntry(["danced", "hoousing", "soapped"], false);

// console.log(journal);

// calculate correlation
// when phi = zero= no correlation
// when phi = 1 = perfectly related
// when phi = -1 = related but in opposite i.e if one occurs the other does not.
function phi([n00, n01, n10, n11]) {
	return (
		(n11 * n00 - n10 * n01) /
		Math.sqrt((n10 + n11) * (n00 + n01) * (n01 + n11) * (n00 + n10))
	);
}

// correlation need four values
// first value =n00= when the event and turning both do not occur
// second value =n01= when the event does not occurs but the turning does
// third value =n10= when the event occurs but the turning does not
// fourth value =n11= when the event and turning both occur

function tableFor(event, journal) {
	let table = [0, 0, 0, 0];
	for (let entry of journal) {
		let index = 0;
		if (entry.events.includes(event)) index += 1;
		if (entry.werewolf) index += 2;
		table[index] += 1;
	}
	return table;
}

// to find every type of event
function journalEvents(journal) {
	let events = [];
	for (let entry of journal) {
		for (let event of entry.events) {
			if (!events.includes(event)) events.push(event);
		}
	}
	return events;
}

// determine correlation of every event
for (let event of journalEvents(JOURNAL)) {
	console.log(event + ":", phi(tableFor(event, JOURNAL)));
	let correlation = phi(tableFor(event, JOURNAL));
	if (correlation > 0) {
		console.log("slightly related");
	} else if (correlation < 0) {
		console.log("negatively related");
	} else if (correlation === 0) {
		console.log("perfectly related");
	}
}
