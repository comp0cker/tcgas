class Deck extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                {this.props.cards.map(obj => 
                    <Card 
                        name={obj.name} 
                        set={obj.set}
                        number={obj.number}
                        id={obj.id}
                        imageUrl={obj.imageUrl}
                        supertype={obj.supertype}
                        class="deck"
                        view={this.props.view}

                        onCardClick={() => this.props.onDeckCardClick(obj.id)}
                />)}
            </div>
        );
    }
};