import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ round }) => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/matches')
            .then(response => {
                setMatches(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Error fetching matches: ", error);
            });
    }, []);

    const filteredRound = matches.filter(match => match.round === round);

    return (
        <>
            {filteredRound.map(match => (
                <div key={match.match_id} className="border-top border-secondary p-3 d-flex align-items-center justify-content-between gap-2 games">
                    <div className="d-flex align-items-center justify-content-between gap-3 info-teams">
                        <img src={match.home_team_logo} alt={match.home_team_name} />
                        <p className="text-white fs-5 mb-0">{match.home_team_name}</p>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                        {
                            match.home_score == null ?
                            <input type="number" name="home_score" /> :
                            <p className="text-white m-0 score">{match.home_score}</p>
                        }
                        <p className="text-white fs-5 mb-0">X</p>
                        {
                            match.away_score == null ?
                            <input type="number" name="away_score" /> :
                            <p className="text-white m-0 score">{match.away_score}</p>
                        }
                    </div>

                    <div className="d-flex align-items-center justify-content-between gap-3 info-teams">
                        <p className="text-white fs-5 mb-0">{match.away_team_name}</p>
                        <img src={match.away_team_logo} alt={match.away_team_name} />
                    </div>
                </div>
            ))}
        </>
    )
}