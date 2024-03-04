const express = require("express");
const router = express.Router();

const fetchSummoner = async (name, tag) => {
    const urlRiotAccount = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`;
    const resRiotAccount = await fetch(urlRiotAccount, {
        method: "GET",
        headers: {
            "X-Riot-Token": process.env.API_KEY,
        },
    });

    const puuidRiot = await resRiotAccount.json();

    const urlSummoner = `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuidRiot.puuid}`;
    const resSummmoner = await fetch(urlSummoner, {
        method: "GET",
        headers: {
            "X-Riot-Token": process.env.API_KEY,
        },
    });

    return resSummmoner.json();
};

router.get("/", async (req, res) => {
    const summonerRes = await fetchSummoner(req.query.name, req.query.tag);

    res.status(200).json({
        playerName: summonerRes.name,
        summonerLevel: summonerRes.summonerLevel,
        profileIcon: summonerRes.profileIconId,
    });
});

module.exports = router;
