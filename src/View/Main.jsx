class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            view: "deckEdit",
            deck: []
        }

        this.toggleViewState = this.toggleViewState.bind(this);
        this.updateDeck = this.updateDeck.bind(this);
    }

    toggleViewState(view) {
        this.setState({
            view: view
        })
    }

    updateDeck(deck) {
        this.setState({ deck: deck });
    }

    render() {
        return (
            this.state.view === "deckEdit" ? <DeckEditor toggleViewState={this.toggleViewState} updateDeck={this.updateDeck}/> :
            this.state.view === "game" ? <Game deck={this.state.deck} /> : 
            null
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);