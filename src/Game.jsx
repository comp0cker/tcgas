class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            cardInput: "",
            cardInputResults: [],
            loadedCards: [],
            renderDeck: false
        };
    }

    handleChange(e) {
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

    updateLoadedCard(ui) {
        console.log(ui.item.value);
        let name = ui.item.value.split(" (")[0]
        let set = ui.item.value.split(" (")[1].split(" - ")[0]
        let number = ui.item.value.split(" (")[1].split(" - ")[1].split(")")[0]

        let cardObj = {
            "name": name,
            "set": set,
            "number": number
        };

        this.setState({ loadedCards: [...this.state.loadedCards, cardObj] });
    }

    componentDidMount() {
        $("img").draggable ();
        $("img").draggable ('enable');

        $("#tags").autocomplete({
            //source: this.state.cardInputResults,
            source: this.state.cardInputResults,
            select: (e, ui) => this.updateLoadedCard(ui)
        })
    }

    render() {
        return (
            <div>
                <div className="ui-widget">
                    <label for="tags">Enter a card name: </label>
                    <input onInput={(e) => this.handleChange(e)} id="tags" />
                </div>

                <Deck 
                    cards={this.state.loadedCards} 
                />
            </div>
        );
    }
};

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);