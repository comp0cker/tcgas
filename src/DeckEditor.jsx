class DeckEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            cardInput: "",
            cardInputResults: [],
            loadedCards: [],
            renderDeck: false
        };

        this.deleteCard = this.deleteCard.bind(this);
    }

    handleChange(e) {
        this.setState({
            cardInput: e.target.value
        })
        
        fetch(getCardUrl(e.target.value))
        .then(res => res.json())
        .then(
            (result) => {
                $('#tags').autocomplete("option", { 
                    source: result.cards.map(card => {return card.name + " (" + card.set + " - " + card.number + ")"}) 
                });
            }
        )
        
    }

    loadCard(val) {
        let name = val.split(" (")[0]
        let set = val.split(" (")[1].split(" - ")[0]
        let number = val.split(" (")[1].split(" - ")[1].split(")")[0]

        fetch(getCardUrl(name, set, number))
        .then(res => res.json())
        .then(
            result => {
                let cardObj = {
                    "name": name,
                    "set": set,
                    "number": number,
                    "id": Date.now(),
                    "imageUrl": result.cards[0].imageUrl
                };

                console.log(cardObj)
                console.log([...this.state.loadedCards, cardObj] )
        
                this.setState({ 
                    loadedCards: [...this.state.loadedCards, cardObj] ,
                    cardInput: val
                });
            }
        )
    }

    deleteCard(id) {
        console.log(id);
        let newCards = this.state.loadedCards.filter(obj => obj.id != id);
        console.log(newCards);
        this.setState({ loadedCards: newCards })
    }

    fetchCardUrl(obj) {
        fetch(getCardUrl(obj.name, obj.set, obj.number))
        .then(res => res.json())
        .then(
            result => {
                this.passResult(result.cards[0].imageUrl)
            }
        )
    }

    componentDidMount() {
        $("img").draggable ();
        $("img").draggable ('enable');

        $("#tags").autocomplete({
            //source: this.state.cardInputResults,
            source: this.state.cardInputResults,
            select: (e, ui) => this.loadCard(ui.item.value)
        })
    }

    render() {
        return (
            <div>
                <div className="ui-widget">
                    <label for="tags">Enter a card name: </label>
                    <input onInput={(e) => this.handleChange(e)} id="tags" />
                    <button onClick={() => this.loadCard(this.state.cardInput)}>Insert another</button>
                </div>

                <Deck 
                    cards={this.state.loadedCards} 
                    deleteCard={this.deleteCard}
                />
            </div>
        );
    }
};

ReactDOM.render(
    <DeckEditor />,
    document.getElementById('root')
);