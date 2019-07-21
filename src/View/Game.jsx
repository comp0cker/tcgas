class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deck: props.deck,
            hand: [],
            field: [],
            discard: [],
            lostZone: [],
            prizes: []
        };

        this.drawCard = this.drawCard.bind(this);
        this.playCardFromHand = this.playCardFromHand.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.deck !== this.state.deck) {
            this.setState({ deck: nextProps.deck });
        }
    }

    setUpGame() {
        this.drawCard(7);
        //this.prizeFromTopDeck(6);
    }

    shuffleDeck() {
        this.setState({
            deck: _.shuffle(this.state.deck)
        });
    }

    drawCard(numCards) {
        let cards = this.state.deck.slice(0, numCards);
        let newDeck = this.state.deck.slice(numCards, this.state.deck.length);
        console.log(cards);

        this.setState({
            hand: this.state.hand.concat(cards),
            deck: newDeck
        });
    }

    prizeFromTopDeck(numCards) {
        let cards = this.state.deck.slice(0, numCards);
        let newDeck = this.state.deck.slice(numCards, this.state.deck.length);
        this.setState({
            prizes: this.state.hand.concat(cards),
            deck: newDeck
        })
    }

    componentDidMount() {
        // Start the game by shuffling the deck
        this.shuffleDeck();
        // Center the deck
    }

    componentDidUpdate() {
        $(".hand-div").sortable();
        // Make the hand draggable
        /*
        $(".hand").draggable();
        $(".hand").draggable("enable");
        $(".hand").draggable("option", "stack", ".hand");
        $(".hand").draggable("option", "snap", $(".hand"));

        $(".field").draggable();
        $(".field").draggable("enable");
        $(".field").draggable("option", "stack", ".field");
        $(".field").draggable("option", "snap", $(".field"));
        */
    }

    onDeckCardClick(cardId) {
        let clickedCard = this.state.deck.filter(card => card.id === cardId)[0];
        this.setState({
            hand: [...this.state.hand, clickedCard],
            deck: this.state.deck.filter(card => card.id !== cardId)
        });

        console.log("clicked" + cardId);
    }

    onCardDrag() {
        console.log("dragged");
    }

    playCardFromHand(id, supertype) {
        let clickedCard = this.state.hand.filter(card => card.id === id)[0];
        if (supertype === "Pokémon") {
            this.setState({
                field: [...this.state.field, clickedCard],
                hand: this.state.hand.filter(card => card.id !== id)
            });
        } else if (supertype === "Trainer") {
            this.setState({
                discard: [...this.state.discard, clickedCard],
                hand: this.state.hand.filter(card => card.id !== id)
            });
        } else {
            console.log(supertype);
        }
    }

    takePrize(id) {
        console.log(this.state.prizes);
    }

    render() {
        return (
            <div className="container">
                <button onClick={() => this.startGame()}>start game</button>

                <div className="row ">
                    <div className="col prize-area">
                        <Card 
                            cardBack={true}
                            onCardClick={() => this.takePrize()}
                        />
                    </div>
                    <div className="col deck-area">
                        <button onClick={() => this.shuffleDeck()}>shuffle</button>
                        <button onClick={() => this.drawCard(7)}>draw 7</button>
                        <button onClick={() => this.prizeFromTopDeck(6)}>prize 6</button>

                        {this.state.deck.length === 0 ? null : <Card 
                            cardBack={true}
                            onCardClick={() => this.drawCard(1)}
                        />}
                    </div>
                </div>

                <div className="row">
                    <div className="col discard-area">
                        <Discard cards={this.state.discard} />
                    </div>
                    <div className="col lost-zone-area">
                        <LostZone cards={this.state.lostZone} />
                    </div>
                </div>

                <div className="row">
                    <div className="col field-area">
                        <Field
                            cards={this.state.field}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col hand-area">
                        <Hand
                            cards={this.state.hand}
                            onHandCardClick={this.playCardFromHand}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
