class DeckEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            cardInput: "",
            cardInputResults: [],
            renderDeck: false,
            loadedCards: []
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
                    "imageUrl": result.cards[0].imageUrl,
                    "supertype": result.cards[0].supertype
                };
                
                this.setState({ 
                    loadedCards: [...this.state.loadedCards, cardObj] ,
                    cardInput: val
                }, () => {this.props.updateDeck(this.state.loadedCards);})
            }
        )
    }

    deleteCard(id) {;
        let newCards = this.state.loadedCards.filter(obj => obj.id != id);
        console.log(newCards);
        this.setState({ loadedCards: newCards }, () => {this.props.updateDeck(this.state.loadedCards);})
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
        $("#tags").autocomplete({
            //source: this.state.cardInputResults,
            source: this.state.cardInputResults,
            select: (e, ui) => this.loadCard(ui.item.value)
        })
    }

    render() {
        return (
            <div>
                <label for="tags">Enter a card name</label>
                <div className="ui-widget input-group mb-3">
                    <input placeholder="eg Pikachu" onInput={(e) => this.handleChange(e)} id="tags" />
                </div>

                <button onClick={() => this.loadCard(this.state.cardInput)}>Insert another</button>
                <button onClick={() => this.props.toggleViewState("game")}>Play the game</button>

                <Deck 
                    cards={this.state.loadedCards} 
                    onDeckCardClick={this.deleteCard}
                    view={true}
                />
            </div>
        );
    }
};