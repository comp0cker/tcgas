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
        $("img").draggable ();
        $("img").draggable ('enable');
        //$("img").on( "dragstart", ( event, ui ) => this.onCardDrag() );
        $( "img" ).draggable( "option", "stack", "img" );

        /*
        $("img").position({
            my: "center",
            at: "center",
            of: "img"
        });
        */
    }

    onDeckCardClick(cardId) {
        let clickedCard = this.state.deck.filter(card => card.id === cardId)[0];
        this.setState({
            hand: [...this.state.hand, clickedCard]
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