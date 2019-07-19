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
                        supertype={obj.supertype}
                        class="hand"

                        onCardClick={() => this.props.onHandCardClick(obj.id, obj.supertype)}
                />)}
            </div>
        );
    }
}