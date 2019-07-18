class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deck: props.deck,
            hand: props.hand
        }

        this.onDeckCardClick = this.onDeckCardClick.bind(this);
        this.playCardFromHand = this.playCardFromHand.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deck !== this.state.deck) {
          this.setState({ deck: nextProps.deck });
        }
    }

    shuffleDeck() {
        this.setState({
            deck: _.shuffle(this.state.deck)
        })
    }

    componentDidMount() {
        // Center the deck
        $(".deck").position({
            my: "center",
            at: "center",
            of: ".deck"
        });

        // Start the game by shuffling the deck
        this.shuffleDeck();

    }

    componentDidUpdate() {
        // Make the hand draggable
        $(".hand").draggable ();
        $(".hand").draggable ('enable');
        $( ".hand" ).draggable( "option", "stack", ".hand" )
    }

    onDeckCardClick(cardId) {
        let clickedCard = this.state.deck.filter(card => card.id === cardId)[0];
        this.setState({
            hand: [...this.state.hand, clickedCard],
            deck: this.state.deck.filter(card => card.id !== cardId)
        })

        console.log("clicked" + cardId);
    }

    onCardDrag() {
        console.log("dragged");
    }

    playCardFromHand() {
        console.log("played!");
    }

    render() {
        return (
            <div>
                <button onClick={() => this.shuffleDeck()}>shuffle</button>
                <Deck 
                    cards={this.state.deck}
                    onDeckCardClick={this.onDeckCardClick}
                />
                <Hand 
                    cards={this.state.hand}
                    onHandCardClick={this.playCardFromHand}
                />
            </div>
        );
    }
}