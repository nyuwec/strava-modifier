import { ActivityType, Strava, SummaryActivity } from 'strava';

const strava = new Strava({
  client_id: '[REPLACE]',
  client_secret: '[REPLACE]',
  refresh_token: '[REPLACE]',
});


function filterActivities(activities: SummaryActivity[]): SummaryActivity[] {
  return activities.filter( (activity) =>
    (activity.type == ActivityType.Run)
  );
}

(async () => {
  try {
    console.log("Get all activities...");
    const activities = await retrieveAllActivities();
    console.log("Retrieved activities: #" + activities.length);

    const filtered = filterActivities(activities);
    console.log("Filtered activities: #" + filtered.length);

    let remainingItems = filtered.length;
    for(let activity of filtered) {
      try {
        console.log(`Updating ${activity.id}: ${activity.name} - ${activity.start_date}...`)
        const updated = await strava.activities.updateActivityById({
          id: activity.id,
          name: activity.name.replace("Run", "Ride"),
          type: ActivityType.Ride,
          start_date_local: activity.start_date_local,
          elapsed_time: activity.elapsed_time,
          // description: string,
          // distance: number,
          // trainer: number,
          // commute: number,
        });
        console.log(`Successful update ${updated.id}: ${updated.name} - ${updated.start_date}`);

        remainingItems--;
        console.log(`|| waiting... remaining items: ${remainingItems}`);
        await devApiDelay();
      } catch (error) {
        console.log(error);
        remainingItems--;
      }
    }
    console.log("Done updating.");
  } catch (error) {
    console.log(error);
  }
})();

async function retrieveAllActivities(page: number = 1): Promise<SummaryActivity[]> {
  const activities = await strava.activities.getLoggedInAthleteActivities({page: page, per_page: 200});
  await devApiDelay();
  if (activities.length == 200) {
    console.log(`\tgot #${activities.length} items, getting next page...`);
    return activities.concat(await retrieveAllActivities(page + 1));
  } else {
    console.log(`\tlast page with #${activities.length} items`);
    return activities;
  }
}

async function devApiDelay() {
  return new Promise( resolve => setTimeout(resolve, 9000) );
}
