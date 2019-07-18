class Hand extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="fixed-bottom">
                {this.props.cards.map(obj => 
                    <Card 
                        name={obj.name} 
                        set={obj.set}
                        number={obj.number}
                        id={obj.id}
                        imageUrl={obj.imageUrl}
                        class="hand"

                        onCardClick={() => this.props.playCard(obj.id)}
                />)}
            </div>
        );
    }
}