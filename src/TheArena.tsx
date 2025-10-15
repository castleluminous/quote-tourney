import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, Typography } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Quote = {
    number: number;
    quote: string;
};

function TheArena(props: { rows: Quote[] }) {
    const next = localStorage.getItem('nextRoundQuotes')
    const current = localStorage.getItem('currentRoundQuotes')
    const fight = localStorage.getItem('currentFightQuotes')
    const round = localStorage.getItem('numRounds')
    const loadWin = localStorage.getItem('winner')
    const [nextRoundQuotes, setNextRoundQuotes] = useState<Quote[]>(next ? JSON.parse(next) : [])
    const [currentRoundQuotes, setCurrentRoundQuotes] = useState<Quote[]>(current ? JSON.parse(current) : [])
    const [currentFightQuotes, setCurrentFightQuotes] = useState<Quote[]>(fight ? JSON.parse(fight) : [])
    const [numRounds, setNumRounds] = useState(round ? JSON.parse(round) : 1)
    const [winner, setWinner] = useState<Quote | undefined>(loadWin && loadWin !== "undefined" ? JSON.parse(loadWin) : undefined)
    const [firstRender, setFirstRender] = useState(true);


    const resetStuff = () => {
        setNextRoundQuotes([])
        setCurrentRoundQuotes(props.rows)
        setCurrentFightQuotes([])
        setNumRounds(1)
        setWinner(undefined)
    }

    const saveProgress = () => {
        localStorage.setItem("nextRoundQuotes", JSON.stringify(nextRoundQuotes));
        localStorage.setItem("currentRoundQuotes", JSON.stringify(currentRoundQuotes));
        localStorage.setItem("currentFightQuotes", JSON.stringify(currentFightQuotes));
        localStorage.setItem("numRounds", JSON.stringify(numRounds));
        localStorage.setItem("winner", JSON.stringify(winner));
    }

    const startStuff = () => {
        const currentQuotes: Quote[] = []
        const numQuotes = Math.min(5, currentRoundQuotes.length)
        for (var i = 0; i < numQuotes; i++) {
            currentQuotes.push(currentRoundQuotes[i])
        }
        setCurrentRoundQuotes(currentRoundQuotes.filter((_, i) => i >= numQuotes))
        setCurrentFightQuotes(currentQuotes)
    }

    const selectWinner = (quote: Quote) => {
        setNextRoundQuotes([...nextRoundQuotes, quote])
        setCurrentFightQuotes([])
    }

    useLayoutEffect(() => {
        if (firstRender) { setFirstRender(false); return; };
        if (currentRoundQuotes.length > 0) {
            startStuff()
        }
        else if (currentRoundQuotes.length === 0 && nextRoundQuotes.length > 1) {
            setCurrentRoundQuotes(nextRoundQuotes)
            setNextRoundQuotes([])
            setNumRounds(numRounds + 1)
        }
        else {
            setWinner(nextRoundQuotes[0])
        }
    }, [nextRoundQuotes]);

    return (
        <div>
            <Button onClick={resetStuff}>start or reset the whole thing (does not override save, but still, careful!)</Button>
            <h2>Round {numRounds}</h2>
            <Button onClick={saveProgress}>save your progress</Button>
            <div style={{ padding: "10px" }}>to load progress, refresh page. it's weird. i know. i'm lazy :(</div>
            {currentFightQuotes.length !== 0 && currentFightQuotes.map((quote) => <Card style={{ padding: "10px" }}><CardContent><b>Quote #{quote.number}</b></CardContent> {quote.quote} <CardContent><Button onClick={() => selectWinner(quote)}>Select This Quote</Button></CardContent></Card>)}
            {winner && <Card style={{ padding: "10px" }}><CardContent><b>Winner:</b></CardContent><CardContent><b>Quote #{winner.number}</b></CardContent> {winner.quote} </Card>}
            <h3>misc. stuff</h3>
            <Accordion>
                <AccordionSummary
                    id="next"
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography component="span">Quotes in the next round</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {nextRoundQuotes.map((quote) => quote.number + ": " + quote.quote).join(" ~ ")}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    id="next"
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography component="span">Quotes in the current round (careful, might be chunky)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {currentRoundQuotes.map((quote) => quote.number + ": " + quote.quote).join(" ~ ")}
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default TheArena