import { Button, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";

type Quote = {
    number: number;
    quote: string;
};

function TheArena(props: {rows: Quote[]}) {
    const [nextRoundQuotes, setNextRoundQuotes] = useState<Quote[]>([])
    const [currentRoundQuotes, setCurrentRoundQuotes] = useState<Quote[]>(props.rows)
    const [currentFightQuotes, setCurrentFightQuotes] = useState<Quote[]>([])
    const [winner, setWinner] = useState<Quote>()

    const resetStuff = () => {
        setNextRoundQuotes([])
        setCurrentRoundQuotes(props.rows)
        setCurrentFightQuotes([])
        setWinner(undefined)
    }

    const startStuff = () => {
        const currentQuotes : Quote[] = []
        const numQuotes = Math.min(5, currentRoundQuotes.length)
        for (var i = 0; i < numQuotes; i++) {
            currentQuotes.push(currentRoundQuotes[i])
        }
        setCurrentRoundQuotes(currentRoundQuotes.filter((_, i) => i >= numQuotes))
        setCurrentFightQuotes(currentQuotes)
    }

    const selectWinner = (quote : Quote) => {
        setNextRoundQuotes([...nextRoundQuotes, quote])
        setCurrentFightQuotes([])
    }

    useEffect(() => {
        if (currentRoundQuotes.length > 0){
        startStuff()}
        else if (currentRoundQuotes.length === 0 && nextRoundQuotes.length > 1) {
            setCurrentRoundQuotes(nextRoundQuotes)
            setNextRoundQuotes([])
        }
        else {
            setWinner(nextRoundQuotes[0])
        }
    }, [nextRoundQuotes]);

  return (
    <div>
    <Button onClick={resetStuff}>reset</Button>
    {currentFightQuotes.length !== 0 && currentFightQuotes.map((quote) => <Card style={{padding: "10px"}}><CardContent>Quote # {quote.number}</CardContent> {quote.quote} <CardContent><Button onClick={() => selectWinner(quote)}>Select This Quote</Button></CardContent></Card>)}
    {winner && <Card style={{padding: "10px"}}>Winner: {winner.number} {winner.quote}</Card>}
    </div>
    )
}

export default TheArena