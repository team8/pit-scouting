import axios from "axios";

export const pullTeams = async (event_key) => {
    let data = await axios.get(`https://www.thebluealliance.com/api/v3/event/${event_key}/teams/simple`, {
        headers: {
            "X-TBA-Auth-Key": "v62ZvFvAkyWVH1qwd1m8Kyyhll0VEvyxUGo7pqpM1re827yjVZlgtjdpBEQJNcn2"
        }
    });

    data = data.data;
    return data.map(function(team) {
        return {
            name: team.nickname,
            number: team.team_number
        }
    }).sort((a, b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0))
}