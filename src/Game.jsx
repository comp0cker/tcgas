class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deck: props.deck
        }

        this.onCardClick = this.onCardClick.bind(this);
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

    onCardClick() {
        console.log("clicked");
    }

    onCardDrag() {
        console.log("dragged");
    }

    render() {
        return (
            <div>
                <button onClick={() => this.shuffleDeck()}>shuffle</button>
                {this.state.deck.map(obj => 
                    <Card 
                        name={obj.name} 
                        set={obj.set}
                        number={obj.number}
                        id={obj.id}
                        imageUrl={obj.imageUrl}

                        onCardClick={() => this.onCardClick()}
                />)}
            </div>
        );
    }
}