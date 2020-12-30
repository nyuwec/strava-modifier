# strava-modifier
quick example project on how to modify existing Strava activities

## OAuth setup

1. On Strava settings page: https://www.strava.com/settings/api create your API application, use `localhost` as Authorization Callback Domain, other properties could be anything
1. After your app is created you'll need the `Client ID` and `Client Secret` values.
1. Open this URL in your browser, make sure you provide the above `Client ID`: `https://www.strava.com/oauth/authorize?client_id=[REPLACE_CLIENT_ID]&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:write,activity:read_all`
1. You have to authorize the requested privileges to your API app. You'll be redirected to localhost.
1. Check the URL in your browser and copy the `code` parameter.
1. Execute the following command in the terminal, replacing the referenced codes.
```
curl -X POST https://www.strava.com/oauth/token \
        -F client_id=[REPLACE_CLIENT_ID] \
        -F client_secret=[REPLACE_CLIENT_SECRET] \
        -F code=[REPLACE_CODE] \
        -F grant_type=authorization_code
```
7. Get the `refresh_token` from the resulted JSON and with the `Client ID` and `Client Secret` use them in the modifier.ts.

## Run
1. Install all the dependencies: `npm install`
1. Open the `src/modifier.ts` file.
1. Check and modify the `filterActivities` function to filter the activities you would like to modify.
1. Check and update the `strava.activities.updateActivityById` function call parameters with the ones you want to see.
1. Run the modifier: `npm run modifier`

## Notes
- Make sure you'll be in the Rate Limits of a non-production Strava API app: 100 requests every 15 minutes, 1000 daily
